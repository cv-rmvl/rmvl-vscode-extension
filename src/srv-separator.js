const vscode = require('vscode');

const SRV_LANGUAGE_ID = 'rmvl.srv';
const SRV_SEPARATOR_PATTERN = /^\s*---\s*$/;

/**
 * Draws the request/response boundary in visible RMVL service editors.
 */
class SrvSeparatorDecorationController {
  constructor() {
    const labelBase = {
      color: new vscode.ThemeColor('descriptionForeground'),
      backgroundColor: new vscode.ThemeColor('editor.background'),
      fontWeight: '600'
    };

    this.separatorDecoration = vscode.window.createTextEditorDecorationType({
      isWholeLine: true,
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
      // Stretch the label container to the row width, rather than `---` width.
      textDecoration: 'none; position: absolute; display: block; left: 0; right: 0; top: 0; height: 100%; pointer-events: none',
      before: {
        ...labelBase,
        contentText: 'Request',
        textDecoration: 'none; position: absolute; right: 1rem; top: 20%; transform: translateY(-50%); z-index: 1; font-size: 0.68em; line-height: 1; white-space: nowrap'
      },
      after: {
        ...labelBase,
        contentText: 'Response',
        textDecoration: 'none; position: absolute; right: 1rem; top: 80%; transform: translateY(-50%); z-index: 1; font-size: 0.68em; line-height: 1; white-space: nowrap'
      }
    });

    this.sourceDecoration = vscode.window.createTextEditorDecorationType({
      opacity: '0',
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
    });
  }

  update(editor) {
    if (!editor) return;
    if (editor.document.languageId !== SRV_LANGUAGE_ID) {
      editor.setDecorations(this.separatorDecoration, []);
      editor.setDecorations(this.sourceDecoration, []);
      return;
    }

    const separators = [];
    const sources = [];

    for (let index = 0; index < editor.document.lineCount; ++index) {
      const line = editor.document.lineAt(index);
      if (!SRV_SEPARATOR_PATTERN.test(line.text)) continue;

      separators.push(line.range);
      const start = line.text.indexOf('---');
      sources.push(new vscode.Range(index, start, index, start + 3));
    }

    editor.setDecorations(this.separatorDecoration, separators);
    editor.setDecorations(this.sourceDecoration, sources);
  }

  dispose() {
    this.separatorDecoration.dispose();
    this.sourceDecoration.dispose();
  }
}

/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function registerSrvSeparatorDecorations(context) {
  const controller = new SrvSeparatorDecorationController();
  const updateVisibleEditors = () => {
    vscode.window.visibleTextEditors.forEach((editor) => controller.update(editor));
  };

  context.subscriptions.push(
    controller,
    vscode.window.onDidChangeVisibleTextEditors(updateVisibleEditors),
    vscode.window.onDidChangeActiveTextEditor((editor) => controller.update(editor)),
    vscode.workspace.onDidChangeTextDocument((event) => {
      vscode.window.visibleTextEditors
        .filter((editor) => editor.document === event.document)
        .forEach((editor) => controller.update(editor));
    })
  );

  updateVisibleEditors();
}

module.exports = {
  registerSrvSeparatorDecorations,
  SRV_SEPARATOR_PATTERN
};
