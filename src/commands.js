const vscode = require('vscode');
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

function whatCmd() {
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

module.exports = {
    whatCmd, searchCmd
}
