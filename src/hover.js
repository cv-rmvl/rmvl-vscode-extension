const vscode = require('vscode');
const { strCMakeMap, strParaMap } = require('./code-completion');

class CMakeHP {
    /**
     * @param {{ getWordRangeAtPosition: (arg0: any) => any; getText: (arg0: any) => any; }} document
     * @param {any} position
     */
    provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        const word = document.getText(wordRange);
        // return corresponding hover information according to the word
        let hoverText = '';
        if (strCMakeMap.has(word))
            hoverText = strCMakeMap.get(word).value;
        // return a hover
        const hover = new vscode.Hover(hoverText);
        return hover;
    }
}

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
        if (strParaMap.has(word))
            hoverText = strParaMap.get(word).value;
        // return a hover
        const hover = new vscode.Hover(hoverText);
        return hover;
    }
}

module.exports = {
    CMakeHP, ParaHP
}