const vscode = require('vscode');

const { CMakeCIP, ParaKeywordCIP, ParaFuncCIP, MsgKeywordCIP } = require('./code-completion');
const { whatCmd, searchCmd, executeCMakeCfg } = require('./commands');
const { CMakeHP, ParaHP, MsgHP } = require('./hover');

/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function activate(context) {
  // Commands
  context.subscriptions.push(vscode.commands.registerCommand('rmvl.command.what', () => whatCmd(context)));
  context.subscriptions.push(vscode.commands.registerCommand('rmvl.command.search', searchCmd));
  // Completion Item Provider
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('cmake', new CMakeCIP()));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('rmvl.para', new ParaKeywordCIP()));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('rmvl.para', new ParaFuncCIP(), ':'));
  context.subscriptions.push(vscode.languages.registerCompletionItemProvider('rmvl.msg', new MsgKeywordCIP()));
  // Hover Provider
  context.subscriptions.push(vscode.languages.registerHoverProvider('cmake', new CMakeHP()));
  context.subscriptions.push(vscode.languages.registerHoverProvider('rmvl.para', new ParaHP()));
  context.subscriptions.push(vscode.languages.registerHoverProvider('rmvl.msg', new MsgHP()));

  context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((document) => executeCMakeCfg(document)));
}

function deactivate() { }

module.exports = {
  activate, deactivate
}
