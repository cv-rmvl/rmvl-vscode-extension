const vscode = require('vscode');

const { CMakeCIP, ParaKeywordCIP, ParaFuncCIP } = require('./code-completion');
const { whatCmd, searchCmd } = require('./commands');
const { ParaHP } = require('./hover');

/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function activate(context) {
    // Commands
    context.subscriptions.push(vscode.commands.registerCommand('rmvl.command.what', whatCmd));
    context.subscriptions.push(vscode.commands.registerCommand('rmvl.command.search', searchCmd));
    // Completion Item Provider
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('cmake', new CMakeCIP()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('rmvl.para', new ParaKeywordCIP()));
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('rmvl.para', new ParaFuncCIP(), ':'));
    // Hover Provider
    context.subscriptions.push(vscode.languages.registerHoverProvider('rmvl.para', new ParaHP()));
}

function deactivate() { }

module.exports = {
    activate, deactivate
}
