const assert = require('assert');

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const { SRV_SEPARATOR_PATTERN } = require('../../src/srv-separator');
// const myExtension = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Registers RMVL service language', async () => {
		const languages = await vscode.languages.getLanguages();
		assert.ok(languages.includes('rmvl.srv'));
	});

	test('Recognizes standalone RMVL service separators', () => {
		assert.ok(SRV_SEPARATOR_PATTERN.test('---'));
		assert.ok(SRV_SEPARATOR_PATTERN.test('  ---  '));
		assert.ok(!SRV_SEPARATOR_PATTERN.test('int32 value ---'));
		assert.ok(!SRV_SEPARATOR_PATTERN.test('--- # comment'));
	});
});
