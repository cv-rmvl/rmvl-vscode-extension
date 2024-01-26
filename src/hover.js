const vscode = require('vscode');
const { strMap } = require('./code-completion');

class ParaHP {
    /**
     * @param {{ getWordRangeAtPosition: (arg0: any) => any; getText: (arg0: any) => any; }} document
     * @param {any} position
     */
    provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        const word = document.getText(wordRange);
        // return corresponding hover information according to the word
        let hoverText = '';
        if (strMap.has(word))
            hoverText = strMap.get(word).value;
        // return a hover
        const hover = new vscode.Hover(hoverText);
        return hover;
    }
}

module.exports = {
    ParaHP
}