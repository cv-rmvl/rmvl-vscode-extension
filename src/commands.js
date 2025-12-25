const vscode = require('vscode');
const { exec } = require('child_process');
const { posix } = require('path');
const fs = require('fs');

/**
 * 从某个 HTML 文件读取能被 Webview 加载的 HTML 内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的 `*.html` 文件相对路径
 */
function getWebViewContent(context, templatePath) {
  const resourcePath = posix.join(context.extensionPath, templatePath);
  const dirPath = posix.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, 'utf-8');
  // vscode 不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和 JS 的路径替换
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      return ($1 + vscode.Uri.file(posix.resolve(dirPath, $2))
        .with({ scheme: 'vscode-resource' }).toString() + '"'
      );
    }
  );
  return html;
}

/**
 * @param {any} context
 */
function whatCmd(context) {
  const panel = vscode.window.createWebviewPanel('rmvlHelpIndex', 'RMVL 扩展使用说明', vscode.ViewColumn.One, {
    enableScripts: true
  });
  panel.webview.html = getWebViewContent(context, 'src/rmvl.command.what.html');
}

async function searchCmd() {
  const answer = await vscode.window.showInformationMessage('要查阅 RMVL 的内容', '用户手册', '源代码', '发行说明');
  if (answer === '用户手册')
    vscode.commands.executeCommand('vscode.open', 'https://cv-rmvl.github.io');
  else if (answer === '源代码')
    vscode.commands.executeCommand('vscode.open', 'https://github.com/cv-rmvl/rmvl');
  else if (answer === '发行说明')
    vscode.commands.executeCommand('vscode.open', 'https://github.com/cv-rmvl/rmvl/wiki/ChangeLog');
}

// 监听保存文件事件，自动执行 CMake 配置
let outputChannel;

/**
 * @param {{ fileName: string; }} document
 */
function executeCMakeCfg(document) {
  if (document.fileName.endsWith('.para') || document.fileName.endsWith('.msg')) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      if (!outputChannel) {
        outputChannel = vscode.window.createOutputChannel("RMVL Parameters");
        outputChannel.show(true);
      }
      // CMake 命令配置
      const cmakeConfig = vscode.workspace.getConfiguration('cmake', workspaceFolders[0].uri);
      const cmakeExecutablePath = cmakeConfig.get('cmakePath');
      if (!cmakeExecutablePath) {
        outputChannel.appendLine("[rmvl] CMake 可执行文件路径未配置，跳过此步骤");
        return;
      }
      const buildDirectory = cmakeConfig.get('buildDirectory', '${workspaceFolder}/build');
      const resolvedBuildDirectory = buildDirectory.replace('${workspaceFolder}', workspaceFolders[0].uri.fsPath);
      const cmakeCommand = `${cmakeExecutablePath} -S ${workspaceFolders[0].uri.fsPath} -B ${resolvedBuildDirectory}`;
      // 执行 CMake 命令
      exec(cmakeCommand, (error, stdout, stderr) => {
        outputChannel.appendLine(`[rmvl] ${document.fileName} 已生效，将自动运行 CMake 配置...`);
        outputChannel.appendLine(`[proc] 命令: ${cmakeCommand}`);
        if (error) {
          outputChannel.appendLine(`[rmvl] 错误: ${error.message}`);
          return;
        }
        if (stderr) {
          outputChannel.appendLine(`[rmvl] 标准错误: ${stderr}`);
          return;
        }
        outputChannel.appendLine(`[rmvl] CMake 配置成功！`);
      });
    }
  }
};

module.exports = {
  whatCmd, searchCmd, executeCMakeCfg
}
