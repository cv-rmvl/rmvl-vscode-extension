const path = require('path');
const vscode = require('vscode');

const languageFolders = {
  'rmvl.para': 'param',
  'rmvl.msg': 'msg',
  'rmvl.srv': 'srv'
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toSnakeCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function paraEnumAt(document, lineNumber) {
  let inEnum = false;
  for (let index = 0; index <= lineNumber; index++) {
    const line = document.lineAt(index).text;
    if (/^\s*enum\b/.test(line))
      inEnum = true;
    if (/^\s*endenum\b/.test(line))
      inEnum = false;
  }
  return inEnum;
}

function declaredIdentifier(document, position) {
  const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z_][A-Za-z0-9_]*/);
  if (!wordRange)
    return;

  const word = document.getText(wordRange);
  const line = document.lineAt(position.line).text;
  let match;

  if (document.languageId === 'rmvl.para') {
    match = line.match(/^\s*enum\s+([A-Za-z_]\w*)\b/);
    if (!match && paraEnumAt(document, position.line))
      match = line.match(/^\s*([A-Za-z_]\w*)\s*(?:=|,|#|$)/);
    if (!match)
      match = line.match(/^\s*(?:[A-Za-z_/]\w*(?:\/[A-Za-z_]\w*)*|vector\s*<[^>]+>)\s+([A-Za-z_]\w*)\b/);
  } else {
    match = line.match(/^\s*[A-Za-z][A-Za-z0-9_/]*(?:\[[0-9]*\])?\s+([A-Za-z_][A-Za-z0-9_]*)\b/);
  }

  if (!match || match[1] !== word)
    return;
  const identifierStart = match.index + match[0].lastIndexOf(match[1]);
  if (wordRange.start.character !== identifierStart)
    return;
  return { word, range: wordRange };
}

function generationInfo(document) {
  const languageFolder = languageFolders[document.languageId];
  if (!languageFolder || document.uri.scheme !== 'file')
    return;

  let idlRoot = path.dirname(document.uri.fsPath);
  while (path.dirname(idlRoot) !== idlRoot && path.basename(idlRoot) !== languageFolder)
    idlRoot = path.dirname(idlRoot);
  if (path.basename(idlRoot) !== languageFolder)
    return;

  const relativeFile = path.relative(idlRoot, document.uri.fsPath);
  const relativeName = relativeFile.slice(0, -path.extname(relativeFile).length).split(path.sep).join('/');
  return {
    root: path.dirname(idlRoot),
    relativeName,
    targetName: path.basename(relativeName)
  };
}

async function existingFile(uri) {
  return vscode.workspace.fs.stat(uri).then(() => true, () => false);
}

async function generatedHeaders(document, info, token) {
  const uris = [];
  if (document.languageId === 'rmvl.para') {
    const standalone = vscode.Uri.file(path.join(info.root, 'include', 'rmvlpara', `${info.relativeName}.hpp`));
    if (await existingFile(standalone))
      uris.push(standalone);

    // MODULE 模式生成 include/rmvlpara/<module>/<target>.h。
    const modulePattern = new vscode.RelativePattern(
      vscode.Uri.file(info.root),
      `include/rmvlpara/*/${info.targetName}.h`
    );
    uris.push(...await vscode.workspace.findFiles(modulePattern, null, undefined, token));
  } else {
    const outputFolder = document.languageId === 'rmvl.msg' ? 'rmvlmsg' : 'rmvlsrv';
    const relativeHeader = `${toSnakeCase(info.relativeName)}.hpp`;
    const uri = vscode.Uri.file(path.join(info.root, 'include', outputFolder, relativeHeader));
    if (await existingFile(uri))
      uris.push(uri);
  }
  return uris;
}

function serviceSection(document, lineNumber) {
  for (let index = 0; index < lineNumber; index++) {
    if (/^\s*---\s*(?:#.*)?$/.test(document.lineAt(index).text))
      return 'Response';
  }
  return 'Request';
}

function declarationLocations(header, word, section) {
  const locations = [];
  const declaration = new RegExp(`\\b${escapeRegExp(word)}\\b\\s*(?:\\{\\}|=|[,;{])`);
  let currentSection;

  for (let index = 0; index < header.lineCount; index++) {
    const text = header.lineAt(index).text;
    if (/^\s*class\s+Request\b/.test(text))
      currentSection = 'Request';
    else if (/^\s*class\s+Response\b/.test(text))
      currentSection = 'Response';

    if (section && currentSection !== section)
      continue;
    if (/^\s*(?:\/\*|\*|\/\/|#)/.test(text) || !declaration.test(text))
      continue;

    const start = text.search(new RegExp(`\\b${escapeRegExp(word)}\\b`));
    const range = new vscode.Range(index, start, index, start + word.length);
    locations.push(new vscode.Location(header.uri, range));
  }
  return locations;
}

class IDLDefinitionProvider {
  async provideDefinition(document, position, token) {
    const identifier = declaredIdentifier(document, position);
    if (!identifier)
      return;

    const info = generationInfo(document);
    if (!info) {
      vscode.window.showWarningMessage('无法确定生成头文件的位置，请先将 IDL 文件保存到 param、msg 或 srv 目录。');
      return;
    }

    const headers = await generatedHeaders(document, info, token);
    if (token.isCancellationRequested)
      return;
    if (headers.length === 0) {
      vscode.window.showWarningMessage(`未找到 ${path.basename(document.fileName)} 对应的生成头文件，请先保存文件并执行 CMake 配置。`);
      return;
    }

    const section = document.languageId === 'rmvl.srv' ? serviceSection(document, position.line) : undefined;
    const locations = [];
    for (const uri of headers) {
      if (token.isCancellationRequested)
        return;
      const header = await vscode.workspace.openTextDocument(uri);
      locations.push(...declarationLocations(header, identifier.word, section));
    }

    if (locations.length === 0) {
      vscode.window.showWarningMessage(`生成头文件中未找到 ${identifier.word} 的声明，请保存文件并重新执行 CMake 配置。`);
      return;
    }
    return locations;
  }
}

module.exports = {
  IDLDefinitionProvider
};
