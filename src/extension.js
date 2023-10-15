const vscode = require('vscode');

function activate(context) {
    ///////////////////////// CMake for RMVL /////////////////////////
    const cmakeExtensionProvider = vscode.languages.registerCompletionItemProvider('cmake', {
        provideCompletionItems() {
            // compile definition
            const rmvlCompileDefinition = new vscode.CompletionItem('rmvl_compile_definitions', vscode.CompletionItemKind.Function);
            rmvlCompileDefinition.insertText = new vscode.SnippetString("rmvl_compile_definitions(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIAVTE|} ${3:MY_DR}\n)");
            rmvlCompileDefinition.documentation = new vscode.MarkdownString(
                "#### 将预处理定义添加至指定目标\n##### 用法:\n```\nrmvl_compile_definitions(<target>\n  <INTERFACE | PUBLIC | PRIVATE> [items1...]\n  [<INTERFACE | PUBLIC | PRIVATE> [items2...] ...])\n```\n##### 示例:\n```\nrmvl_compile_definitions(\n  aaa\n  INTERFACE HAVE_AAA\n)\n```"
            );
            // install directories
            const rmvlInstallDirectories = new vscode.CompletionItem('rmvl_install_directories', vscode.CompletionItemKind.Function);
            rmvlInstallDirectories.insertText = new vscode.SnippetString("rmvl_install_directories(\n  ${1:where_to_install}\n)");
            rmvlInstallDirectories.documentation = new vscode.MarkdownString(
                "#### 将指定路径下的所有文件安装至特定目标\n##### 用法:\n```\nrmvl_install_directories(<directory> [DST_LIB])\n```\n##### 示例:\n```\nrmvl_install_directories(include/rmvl)\n```"
            );
            // add module
            const rmvlAddModule = new vscode.CompletionItem('rmvl_add_module', vscode.CompletionItemKind.Function);
            rmvlAddModule.insertText = new vscode.SnippetString("rmvl_add_module(\n  ${1:module_name}\n  DEPENDS ${2:core}\n)");
            rmvlAddModule.documentation = new vscode.MarkdownString(
                "#### 在当前目录中添加新的 RMVL 模块\n##### 用法:\n```\nrmvl_add_module(<module_name> [INTERFACE] [EXTRA_HEADER <list of other include directories>]\n  [EXTRA_SOURCE <list of other source directories>] [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>])\n```\n##### 示例:\n```\nrmvl_add_module(\n  my_module               # 需要生成的模块 (文件夹名)\n  EXTRA_HEADER xxx_h      # 参与构建的其余头文件目录\n  EXTRA_SOURCE xxx_src    # 参与构建的其余头文件目录\n  DEPENDS core            # 依赖的 RMVL 模块 (文件夹名)\n  EXTERNAL ${OpenCV_LIBS} # 依赖的第三方目标库\n)\n```"
            );
            // compile options
            const rmvlCompileOptions = new vscode.CompletionItem('rmvl_compile_options', vscode.CompletionItemKind.Function);
            rmvlCompileOptions.insertText = new vscode.SnippetString("rmvl_compile_options(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIVATE|} options\n)");
            rmvlCompileOptions.documentation = new vscode.MarkdownString(
                "#### 将编译选项添加至指定目标\n##### 用法:\n```\nrmvl_compile_options(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n```\n##### 示例:\n```\nrmvl_compile_options(\n  my_module  # RMVL 目标名\n  PRIVATE -w # 编译选项\n)\n```"
            );
            // add test
            const rmvlAddTest = new vscode.CompletionItem('rmvl_add_test', vscode.CompletionItemKind.Function);
            rmvlAddTest.insertText = new vscode.SnippetString("rmvl_add_test(\n  ${2:test_name} ${1|Unit,Performance|}\n  DEPENDS ${2:module_name}\n  DEPEND_TESTS ${2:GTest::gtest_main}\n)");
            rmvlAddTest.documentation = new vscode.MarkdownString(
                "#### 此命令用于为指定模块添加新的 RMVL 测试\n##### 用法:\n```\nrmvl_add_test(<name> <Unit|Performance> <DEPENDS> [rmvl_target...]\n  <DEPEND_TESTS> [test_target...])\n```\n##### 示例:\n```\nrmvl_add_test(\n  detector Unit                  # 测试名\n  DEPENDS armor_detector         # 需要依赖的 RMVL 目标库\n  DEPEND_TESTS GTest::gtest_main # 需要依赖的第三方测试工具目标库\n)\n```"
            );
            // add exeutable
            const rmvlAddExe = new vscode.CompletionItem('rmvl_add_exe', vscode.CompletionItemKind.Function);
            rmvlAddExe.insertText = new vscode.SnippetString("rmvl_add_exe(\n  ${1:sample_name}\n  SOURCES ${1:file_name}.cpp\n  DEPENDS ${2:module_name}\n)");
            rmvlAddExe.documentation = new vscode.MarkdownString(
                "#### 此命令用于为指定模块添加新的 RMVL 可执行文件\n##### 用法:\n```\nrmvl_add_exe(<name> SOURCES <file_name>\n  [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>]\n)\n```\n##### 示例:\n```\nrmvl_add_exe(\n  demo             # 可执行文件名（包含 rmvl_ 前缀）\n  SOURCES demo.cpp # 源文件\n  DEPENDS core     # 依赖的 RMVL 模块\n)\n```"
            );
            // set properties
            const rmvlSetProperties = new vscode.CompletionItem('rmvl_set_properties', vscode.CompletionItemKind.Function);
            rmvlSetProperties.insertText = new vscode.SnippetString("rmvl_set_properties(\n  ${1:module_name} PROPERTIES\n  ${2:properties}\n)");
            rmvlSetProperties.documentation = new vscode.MarkdownString(
                "设置如何构建指定 Target 的属性\n用法:\n```\nrmvl_set_properties(target1 target2 ...\n  PROPERTIES prop1 value1\n  prop2 value2 ...)\n```\n示例:\n```\nrmvl_set_properties(\n  detector                   # 目标名\n  PROPERTIES CXX_STANDARD 17 # 属性\n)\n```"
            );
            // download
            const rmvlDownload = new vscode.CompletionItem('rmvl_download', vscode.CompletionItemKind.Function);
            rmvlDownload.insertText = new vscode.SnippetString("rmvl_download(\n  \${2:module_name} \${1|GIT,URL|}\n  \${0:address_git_or_url}\n)");
            rmvlDownload.documentation = new vscode.MarkdownString(
                "#### 下载并参与 RMVL 的构建\n##### 用法:\n```\nrmvl_download(\n  <dl_name> <dl_kind>\n  <...>\n)\n```\n##### 示例 1:\n```\nrmvl_download(\n  benchmark GIT\n  xxx : master # 仓库地址与分支/标签名\n)\n```\n##### 示例 2\n```\nrmvl_download(\n  googletest URL\n  xxx # 要下载的路径（一般是压缩文件）\n)\n```"
            );

            return [
                rmvlCompileDefinition, rmvlInstallDirectories,
                rmvlAddModule, rmvlCompileOptions,
                rmvlAddTest, rmvlAddExe,
                rmvlSetProperties, rmvlDownload
            ];
        }
    });

    ///////////////////////// RMVL Parameter /////////////////////////
    const paraExtensionProvider = vscode.languages.registerCompletionItemProvider('rmvl.para', {
        provideCompletionItems() {
            // keyword
            const types = [
                'int', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'Mat', 'Point', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t',
                'float', 'double', 'string',
                'Matx11f', 'Matx12f', 'Matx13f', 'Matx14f', 'Matx15f', 'Matx16f', 'Matx11d', 'Matx12d', 'Matx13d', 'Matx14d', 'Matx15d', 'Matx16d',
                'Matx21f', 'Matx22f', 'Matx23f', 'Matx24f', 'Matx25f', 'Matx26f', 'Matx21d', 'Matx22d', 'Matx23d', 'Matx24d', 'Matx25d', 'Matx26d',
                'Matx31f', 'Matx32f', 'Matx33f', 'Matx34f', 'Matx35f', 'Matx36f', 'Matx31d', 'Matx32d', 'Matx33d', 'Matx34d', 'Matx35d', 'Matx36d',
                'Matx41f', 'Matx42f', 'Matx43f', 'Matx44f', 'Matx45f', 'Matx46f', 'Matx41d', 'Matx42d', 'Matx43d', 'Matx44d', 'Matx45d', 'Matx46d',
                'Matx51f', 'Matx52f', 'Matx53f', 'Matx54f', 'Matx55f', 'Matx56f', 'Matx51d', 'Matx52d', 'Matx53d', 'Matx54d', 'Matx55d', 'Matx56d',
                'Matx61f', 'Matx62f', 'Matx63f', 'Matx64f', 'Matx65f', 'Matx66f', 'Matx61d', 'Matx62d', 'Matx63d', 'Matx64d', 'Matx65d', 'Matx66d',
                'Vec2f', 'Vec3f', 'Vec4f', 'Vec5f', 'Vec6f', 'Point2f', 'Point3f', 'Vec2d', 'Vec3d', 'Vec4d', 'Vec5d', 'Vec6d', 'Point2d', 'Point3d'

            ];
            // class or struct
            const classLists = ['vector'];
            // return value
            const completionItems = [];

            for (const type of types) {
                completionItems.push(new vscode.CompletionItem(type, vscode.CompletionItemKind.Keyword));
            }
            for (const classList of classLists) {
                completionItems.push(new vscode.CompletionItem(classList, vscode.CompletionItemKind.Class));
            }

            // snippet
            const paraSnippet = new vscode.CompletionItem('ParaHelp', vscode.CompletionItemKind.Snippet);
            paraSnippet.insertText = new vscode.SnippetString(
                "###### 下列代码均为示例代码，使用前需删除 ######\n" +
                "int NUMERIC_DEMO = 12       # 整型数字示例\n" +
                "float FLOAT_DEMO = 3.1f     # 浮点型数字示例\n" +
                "string STR_DEMO = \"ab12+/?\" # 字符串示例\n" +
                "vector<Point> POINTS_DEMO = {{1, 1}, \\\n" +
                "                             {-2, 30}, \\\n" +
                "                             {3, 7}} # vector 表示的点集示例\n" +
                "Vec3d VEC3F_DEMO = {3.1, 2.2, 1.3}   # 向量示例\n" + 
                "################################################\n"
            );
            paraSnippet.documentation = new vscode.MarkdownString("显示 RMVL Parameters 的示例代码");

            completionItems.push(paraSnippet);

            return completionItems;
        }
    });

    context.subscriptions.push(
        cmakeExtensionProvider, paraExtensionProvider
    );
}

function deactivate() { }

module.exports = {
    activate, deactivate
}
