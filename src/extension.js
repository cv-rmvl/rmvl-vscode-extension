const vscode = require('vscode');

function activate(context) {
    //////////////////////////// Commands ////////////////////////////
    const commandWhatProvider = vscode.commands.registerCommand('rmvl.command.what', function () {
        const panel = vscode.window.createWebviewPanel('rmvlHelpIndex', 'RMVL 扩展使用说明', vscode.ViewColumn.One, {});
        // Load help page content here
        panel.webview.html = `
            <html>
            <style>
              h1 {
                color: 888;
                font-size: 24px;
                margin-bottom: 16px;
              }
              ul {
                list-style-type: disc;
                padding-left: 20px;
                margin: 0;
              }
              li + li {
                margin-top: 8px;
              }
              a {
                color: #007acc;
                text-decoration: none;
              }
            </style>
            <body>
              <h1>RMVL 扩展使用说明</h1>
              <h4>为谁提供服务？</h4>
              <p>该扩展为 <span style="color: orange">RMVL</span> 项目提供服务，有关 RMVL 的介绍可参考下面的内容：</p>
              <ul>
                <li><a href="https://vision.scutbot.cn/rmvl/master/">RMVL 说明文档首页</a></li>
                <li><a href="https://vision.scutbot.cn/rmvl/master/d1/dfb/intro.html">RMVL 简介</a></li>
                <li><a href="https://github.com/cv-rmvl/rmvl">Github 地址</a></li>
              </ul>
              <h4>该扩展插件支持什么操作？</h4>
              <p>RMVL 部分 CMake 函数</p>
              <ul>
                <li>提供了一组形如 <span style="color: orange">rmvl_*</span> 的函数</li>
                <li>代码块：<span style="color: orange">RMVL</span> ，输入即可快速包含必要的包</li>
                <li>输入：<span style="color: orange">Ctrl + I</span> 或使用 <span style="color: orange">Ctrl + Shift + P</span> 键入 Trigger Suggest 可触发建议
              </ul>
              <p>RMVL Parameter 参数规范文件语法</p5>
              <ul>
                <li>包含基本的类型、变量定义、内置成员函数的语法高亮与补全</li>
                <li>代码块：<span style="color: orange">ParaHelp</span> ，输入即可快速浏览示例代码</li>
                <li>输入：<span style="color: orange">Ctrl + I</span> 或使用 <span style="color: orange">Ctrl + Shift + P</span> 键入 Trigger Suggest 可触发建议
              </ul>
            </body>
            </html>`;
    });

    const commandSearchProvider = vscode.commands.registerCommand('rmvl.command.search', async function () {
        const answer = await vscode.window.showInformationMessage('要查阅 RMVL 的内容', '文档手册', '源代码', '发行说明');
        if (answer === '文档手册')
            vscode.commands.executeCommand('vscode.open', 'https://vision.scutbot.cn/rmvl/master');
        else if (answer === '源代码')
            vscode.commands.executeCommand('vscode.open', 'https://github.com/cv-rmvl/rmvl');
        else if (answer === '发行说明')
            vscode.commands.executeCommand('vscode.open', 'https://github.com/cv-rmvl/rmvl/wiki/ChangeLog');
    });

    ///////////////////////// CMake for RMVL /////////////////////////
    const cmakeFunctionsProvider = vscode.languages.registerCompletionItemProvider('cmake', {
        provideCompletionItems() {
            // compile definition
            const rmvlCompileDefinition = new vscode.CompletionItem('rmvl_compile_definitions', vscode.CompletionItemKind.Function);
            rmvlCompileDefinition.insertText = new vscode.SnippetString('rmvl_compile_definitions(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIAVTE|} ${3:MY_DR}\n)');
            rmvlCompileDefinition.documentation = new vscode.MarkdownString(
                `#### 将预处理定义添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_definitions(<target>\n  <INTERFACE | PUBLIC | PRIVATE> [items1...]\n  [<INTERFACE | PUBLIC | PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_definitions(\n  aaa\n  INTERFACE HAVE_AAA\n)\n\`\`\``
            );
            // install directories
            const rmvlInstallDirectories = new vscode.CompletionItem('rmvl_install_directories', vscode.CompletionItemKind.Function);
            rmvlInstallDirectories.insertText = new vscode.SnippetString('rmvl_install_directories(\n  ${1:where_to_install}\n)');
            rmvlInstallDirectories.documentation = new vscode.MarkdownString(
                '#### 将指定路径下的所有文件安装至特定目标\n##### 用法:\n```\nrmvl_install_directories(<directory> [DST_LIB])\n```\n##### 示例:\n```\nrmvl_install_directories(include/rmvl)\n```'
            );
            // add module
            const rmvlAddModule = new vscode.CompletionItem('rmvl_add_module', vscode.CompletionItemKind.Function);
            rmvlAddModule.insertText = new vscode.SnippetString('rmvl_add_module(\n  ${1:module_name}\n  DEPENDS ${2:core}\n)');
            rmvlAddModule.documentation = new vscode.MarkdownString(
                `#### 在当前目录中添加新的 RMVL 模块\n##### 用法:\n\`\`\`\nrmvl_add_module(<module_name> [INTERFACE] [EXTRA_HEADER <list of other include directories>]\n  [EXTRA_SOURCE <list of other source directories>] [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_module(\n  my_module               # 需要生成的模块 (文件夹名)\n  EXTRA_HEADER xxx_h      # 参与构建的其余头文件目录\n  EXTRA_SOURCE xxx_src    # 参与构建的其余头文件目录\n  DEPENDS core            # 依赖的 RMVL 模块 (文件夹名)\n  EXTERNAL \${OpenCV_LIBS} # 依赖的第三方目标库\n)\n\`\`\``
            );
            // compile options
            const rmvlCompileOptions = new vscode.CompletionItem('rmvl_compile_options', vscode.CompletionItemKind.Function);
            rmvlCompileOptions.insertText = new vscode.SnippetString('rmvl_compile_options(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIVATE|} options\n)');
            rmvlCompileOptions.documentation = new vscode.MarkdownString(
                `#### 将编译选项添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_options(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_options(\n  my_module  # RMVL 目标名\n  PRIVATE -w # 编译选项\n)\n\`\`\``
            );
            // add test
            const rmvlAddTest = new vscode.CompletionItem('rmvl_add_test', vscode.CompletionItemKind.Function);
            rmvlAddTest.insertText = new vscode.SnippetString('rmvl_add_test(\n  ${2:test_name} ${1|Unit,Performance|}\n  DEPENDS ${2:module_name}\n  DEPEND_TESTS ${2:GTest::gtest_main}\n)');
            rmvlAddTest.documentation = new vscode.MarkdownString(
                `#### 此命令用于为指定模块添加新的 RMVL 测试\n##### 用法:\n\`\`\`\nrmvl_add_test(<name> <Unit|Performance> <DEPENDS> [rmvl_target...]\n  <DEPEND_TESTS> [test_target...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_test(\n  detector Unit                  # 测试名\n  DEPENDS armor_detector         # 需要依赖的 RMVL 目标库\n  DEPEND_TESTS GTest::gtest_main # 需要依赖的第三方测试工具目标库\n)\n\`\`\``
            );
            // add exeutable
            const rmvlAddExe = new vscode.CompletionItem('rmvl_add_exe', vscode.CompletionItemKind.Function);
            rmvlAddExe.insertText = new vscode.SnippetString('rmvl_add_exe(\n  ${1:sample_name}\n  SOURCES ${1:file_name}.cpp\n  DEPENDS ${2:module_name}\n)');
            rmvlAddExe.documentation = new vscode.MarkdownString(
                '#### 此命令用于为指定模块添加新的 RMVL 可执行文件\n##### 用法:\n```\nrmvl_add_exe(<name> SOURCES <file_name>\n  [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>]\n' +
                ')\n```\n##### 示例:\n```\nrmvl_add_exe(\n  demo             # 可执行文件名（包含 rmvl_ 前缀）\n  SOURCES demo.cpp # 源文件\n  DEPENDS core     # 依赖的 RMVL 模块\n)\n```'
            );
            // set properties
            const rmvlSetProperties = new vscode.CompletionItem('rmvl_set_properties', vscode.CompletionItemKind.Function);
            rmvlSetProperties.insertText = new vscode.SnippetString('rmvl_set_properties(\n  ${1:module_name} PROPERTIES\n  ${2:properties}\n)');
            rmvlSetProperties.documentation = new vscode.MarkdownString(
                `设置如何构建指定 Target 的属性\n用法:\n\`\`\`\nrmvl_set_properties(target1 target2 ...\n  PROPERTIES prop1 value1\n  prop2 value2 ...)\n\`\`\`\n示例:\n\`\`\`\nrmvl_set_properties(\n  detector                   # 目标名\n  PROPERTIES CXX_STANDARD 17 # 属性\n)\n\`\`\``
            );
            // download
            const rmvlDownload = new vscode.CompletionItem('rmvl_download', vscode.CompletionItemKind.Function);
            rmvlDownload.insertText = new vscode.SnippetString('rmvl_download(\n  ${2:module_name} ${1|GIT,URL|}\n  ${0:address_git_or_url}\n)');
            rmvlDownload.documentation = new vscode.MarkdownString(
                `#### 下载并参与 RMVL 的构建\n##### 用法:\n\`\`\`\nrmvl_download(\n  <dl_name> <dl_kind>\n  <...>\n)\n\`\`\`\n##### 示例 1:\n\`\`\`\nrmvl_download(\n  benchmark GIT\nxxx : master # 仓库地址与分支/标签名\n)\n\`\`\`\n##### 示例 2\n\`\`\`\nrmvl_download(\n  googletest URL\n  xxx # 要下载的路径（一般是压缩文件）\n)\n\`\`\``
            );
            // 初始化并包含 RMVL
            const includeRMVL = new vscode.CompletionItem('RMVL', vscode.CompletionItemKind.Snippet);
            includeRMVL.insertText = new vscode.SnippetString(
                `# include rmvl\nfind_package(RMVL REQUIRED)\nlist(APPEND CMAKE_MODULE_PATH \\\${RMVL_DIR})\n# use rmvl functions and macros\ninclude(RMVLUtils)\nset(para_template_path \"\\\${RMVL_DIR}/templates\" CACHE STRING "GenPara template path")\ninclude(RMVLGenPara)\ninclude(RMVLModule)\n`
            );
            includeRMVL.documentation = new vscode.MarkdownString(`使用 \`find_package\` 寻找 RMVL，并包含相关模块，包含\n- \`RMVLUtils\`\n- \`RMVLGenPara\`\n- \`RMVLModule\``);

            return [
                rmvlCompileDefinition, rmvlInstallDirectories, rmvlAddModule, rmvlCompileOptions,
                rmvlAddTest, rmvlAddExe, rmvlSetProperties, rmvlDownload,
                includeRMVL
            ];
        }
    });

    ///////////////////// RMVL Parameter Keyword /////////////////////
    const rmvlparaKeywordsProvider = vscode.languages.registerCompletionItemProvider('rmvl.para', {
        provideCompletionItems() {
            // keyword
            const types = [
                'int', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'Mat', 'Point', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
                'float', 'double', 'string', 'Point2d', 'Point3d'

            ];
            // class or struct
            const classLists = [
                'vector', 'Matx11f', 'Matx12f', 'Matx13f', 'Matx14f', 'Matx15f', 'Matx16f', 'Matx11d', 'Matx12d', 'Matx13d', 'Matx14d', 'Matx15d', 'Matx16d',
                'Matx21f', 'Matx22f', 'Matx23f', 'Matx24f', 'Matx25f', 'Matx26f', 'Matx21d', 'Matx22d', 'Matx23d', 'Matx24d', 'Matx25d', 'Matx26d',
                'Matx31f', 'Matx32f', 'Matx33f', 'Matx34f', 'Matx35f', 'Matx36f', 'Matx31d', 'Matx32d', 'Matx33d', 'Matx34d', 'Matx35d', 'Matx36d',
                'Matx41f', 'Matx42f', 'Matx43f', 'Matx44f', 'Matx45f', 'Matx46f', 'Matx41d', 'Matx42d', 'Matx43d', 'Matx44d', 'Matx45d', 'Matx46d',
                'Matx51f', 'Matx52f', 'Matx53f', 'Matx54f', 'Matx55f', 'Matx56f', 'Matx51d', 'Matx52d', 'Matx53d', 'Matx54d', 'Matx55d', 'Matx56d',
                'Matx61f', 'Matx62f', 'Matx63f', 'Matx64f', 'Matx65f', 'Matx66f', 'Matx61d', 'Matx62d', 'Matx63d', 'Matx64d', 'Matx65d', 'Matx66d',
                'Vec2f', 'Vec3f', 'Vec4f', 'Vec5f', 'Vec6f', 'Point2f', 'Point3f', 'Vec2d', 'Vec3d', 'Vec4d', 'Vec5d', 'Vec6d'];
            // return value
            const completionItems = [];

            for (const type of types) {
                completionItems.push(new vscode.CompletionItem(type, vscode.CompletionItemKind.Keyword));
            }
            for (const classList of classLists) {
                const item = new vscode.CompletionItem(classList, vscode.CompletionItemKind.Class);
                if (classList === 'vector') {
                    item.insertText = new vscode.SnippetString('vector<${0}>');
                }
                completionItems.push(item);
            }

            // snippet
            const paraSnippet = new vscode.CompletionItem('ParaHelp', vscode.CompletionItemKind.Snippet);
            paraSnippet.insertText = new vscode.SnippetString(
                '######### 下列代码均为示例代码，使用前需删除 #########\n' +
                'int NUMERIC_DEMO = 12               # 整型数字示例\n' +
                'float FLOAT_DEMO = 3.1f             # 浮点型数字示例\n' +
                'string STR_DEMO = \'ab12+/?\'         # 字符串示例\n' +
                'vector<int> VECTOR_DEMO = {1, 2, 3} # 整型列表示例 \n' +
                'Matx33f MATX33_DEMO = {1, 2, 3, \\\n' +
                '                       4, 5, 6, \\\n' +
                '                       7, 8, 9}    # 3x3 矩阵示例\n' +
                'Vec3d VEC3F_DEMO = {3.1, 2.2, 1.3} # 向量示例\n' +
                'Vec4d VEC4_DEMO = Vec4d::ones()    # 使用函数的向量示例\n' +
                '######################################################\n'
            );
            paraSnippet.documentation = new vscode.MarkdownString('显示 RMVL Parameters 的示例代码');

            completionItems.push(paraSnippet);

            return completionItems;
        }
    });

    //////////////////// RMVL Parameter Functions ////////////////////
    const rmvlparaFunctionsProvider = vscode.languages.registerCompletionItemProvider('rmvl.para', {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position.line).text;
            const prefixReg = line.match(/(Matx[0-9]{2}|Vec[0-9])[fd]::/g);
            const prefix = prefixReg[prefixReg.length - 1];
            const prefixIndex = line.lastIndexOf(prefix, position.character);
            if (prefixIndex === -1 || prefixIndex !== position.character - prefix.length) {
                return undefined;
            }
            const eyeMethod = new vscode.CompletionItem('eye', vscode.CompletionItemKind.Method);
            eyeMethod.documentation = new vscode.MarkdownString('单位矩阵');
            const diagMethod = new vscode.CompletionItem('diag', vscode.CompletionItemKind.Method);
            diagMethod.documentation = new vscode.MarkdownString('对角矩阵');
            diagMethod.insertText = new vscode.SnippetString('diag(\{${0}\})');
            const onesMethod = new vscode.CompletionItem('ones', vscode.CompletionItemKind.Method);
            onesMethod.documentation = new vscode.MarkdownString('将所有元素全部置 `1`');
            const zerosMethod = new vscode.CompletionItem('zeros', vscode.CompletionItemKind.Method);
            zerosMethod.documentation = new vscode.MarkdownString('将所有元素全部置 `0`');
            return [eyeMethod, diagMethod, onesMethod, zerosMethod];
        }
    }, ':'); // triggered whenever a ':' is being typed

    ///////////////////////// Characters '(' /////////////////////////
    const charactersProvider = vscode.languages.registerCompletionItemProvider('rmvl.para', {
        provideCompletionItems(document, position) {
            if (document.lineAt(position).text.substring(0, position.character).endsWith('(')) {
                vscode.window.activeTextEditor.insertSnippet(
                    new vscode.SnippetString('${0})')
                );
            }
            return undefined;
        }
    }, '(');

    context.subscriptions.push(
        // 命令
        commandWhatProvider, commandSearchProvider,
        // RMVL CMake 扩展
        cmakeFunctionsProvider,
        // RMVL Parameter 扩展
        rmvlparaKeywordsProvider, rmvlparaFunctionsProvider,
        // 符号扩展
        charactersProvider
    );
}

function deactivate() { }

module.exports = {
    activate, deactivate
}
