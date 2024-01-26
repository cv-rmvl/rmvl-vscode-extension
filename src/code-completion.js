const vscode = require('vscode');

const strMap = new Map();

strMap.set("rmvl_compile_definition", new vscode.MarkdownString(
    `#### 将预处理定义添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_definitions(<target>\n  <INTERFACE | PUBLIC | PRIVATE> [items1...]\n  [<INTERFACE | PUBLIC | PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_definitions(\n  aaa\n  INTERFACE HAVE_AAA\n)\n\`\`\``
));
strMap.set("rmvl_install_directories", new vscode.MarkdownString(
    '#### 将指定路径下的所有文件安装至特定目标\n##### 用法:\n```\nrmvl_install_directories(<directory> [DST_LIB])\n```\n##### 示例:\n```\nrmvl_install_directories(include/rmvl)\n```'
));
strMap.set("rmvl_add_module", new vscode.MarkdownString(
    `#### 在当前目录中添加新的 RMVL 模块\n##### 用法:\n\`\`\`\nrmvl_add_module(<module_name> [INTERFACE] [EXTRA_HEADER <list of other include directories>]\n  [EXTRA_SOURCE <list of other source directories>] [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_module(\n  my_module               # 需要生成的模块 (文件夹名)\n  EXTRA_HEADER xxx_h      # 参与构建的其余头文件目录\n  EXTRA_SOURCE xxx_src    # 参与构建的其余头文件目录\n  DEPENDS core            # 依赖的 RMVL 模块 (文件夹名)\n  EXTERNAL \${OpenCV_LIBS} # 依赖的第三方目标库\n)\n\`\`\``
));
strMap.set("rmvl_compile_options", new vscode.MarkdownString(
    `#### 将编译选项添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_options(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_options(\n  my_module  # RMVL 目标名\n  PRIVATE -w # 编译选项\n)\n\`\`\``
));
strMap.set("rmvl_add_test", new vscode.MarkdownString(
    `#### 此命令用于为指定模块添加新的 RMVL 测试\n##### 用法:\n\`\`\`\nrmvl_add_test(<name> <Unit|Performance> <DEPENDS> [rmvl_target...]\n  <DEPEND_TESTS> [test_target...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_test(\n  detector Unit                  # 测试名\n  DEPENDS armor_detector         # 需要依赖的 RMVL 目标库\n  DEPEND_TESTS GTest::gtest_main # 需要依赖的第三方测试工具目标库\n)\n\`\`\``
));
strMap.set("rmvl_add_exe", new vscode.MarkdownString(
    '#### 此命令用于为指定模块添加新的 RMVL 可执行文件\n##### 用法:\n```\nrmvl_add_exe(<name> SOURCES <file_name>\n  [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>]\n' +
    ')\n```\n##### 示例:\n```\nrmvl_add_exe(\n  demo             # 可执行文件名（包含 rmvl_ 前缀）\n  SOURCES demo.cpp # 源文件\n  DEPENDS core     # 依赖的 RMVL 模块\n)\n```'
));
strMap.set("rmvl_set_properties", new vscode.MarkdownString(
    `#### 设置如何构建指定 Target 的属性\n#### 用法:\n\`\`\`\nrmvl_set_properties(target1 target2 ...\n  PROPERTIES prop1 value1\n  prop2 value2 ...)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_set_properties(\n  detector                   # 目标名\n  PROPERTIES CXX_STANDARD 17 # 属性\n)\n\`\`\``
));
strMap.set("rmvl_download", new vscode.MarkdownString(
    `#### 下载并参与 RMVL 的构建\n##### 用法:\n\`\`\`\nrmvl_download(\n  <dl_name> <dl_kind>\n  <...>\n)\n\`\`\`\n##### 示例 1:\n\`\`\`\nrmvl_download(\n  benchmark GIT\n  xxx : master # 仓库地址与分支/标签名\n)\n\`\`\`\n##### 示例 2\n\`\`\`\nrmvl_download(\n  googletest URL\n  xxx # 要下载的路径（一般是压缩文件）\n)\n\`\`\``
));
strMap.set("system_date", new vscode.MarkdownString(
    `#### 获取系统日期\n#### 用法:\n\`\`\`\nsystem_date(\n  <output year> <output month> <output day>\n)\n\`\`\`\n#### 示例:\n\`\`\`\nsystem_date(\n  year  # 年份，格式为 yyyy\n  month # 月份，格式为 mm\n  day   # 日期，格式为 dd\n)\n\`\`\``
));
strMap.set("rmvl_generate_para", new vscode.MarkdownString(
    `#### 根据指定的目标名在 param 文件夹下对应的 *.para 参数规范文件和可选的模块名生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_para(\n  <target_name>\n  [MODULE module_name]\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_para(\n  mytarget        # 目标名称\n  MODULE mymodule # 模块名称为 mymodule\n)\n\`\`\``
));
strMap.set("rmvl_generate_module_para", new vscode.MarkdownString(
    `#### 根据给定模块下所有的 para 目标，生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_module_para(\n  <module_name>\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_module_para(module_name) # 模块名\n\`\`\``
));
strMap.set("rmvl_link_directories", new vscode.MarkdownString(
    `#### 将指定目录添加至运行时动态库链接的搜索路径\n#### 用法:\n\`\`\`\nrmvl_link_directories(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_link_directories(\n  my_module              # RMVL 目标名\n  PRIVATE /path/to/mylib # 链接库的路径\n)\n\`\`\``
));
strMap.set("rmvl_link_libraries", new vscode.MarkdownString(
    `#### 将指定目标链接至指定的库\n#### 用法:\n\`\`\`\nrmvl_link_libraries(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_link_libraries(\n  my_module    # RMVL 目标名\n  PUBLIC mylib # 链接库的名称\n)\n\`\`\`\n#### 注意:\n若使用 RMVL 目标，需要引入 rmvl_ 前缀，例如\n\`\`\`\nrmvl_link_libraries(\n  my_module\n  PUBLIC rmvl_core\n)\n\`\`\``
));
strMap.set("eye", new vscode.MarkdownString('单位矩阵'));
strMap.set("diag", new vscode.MarkdownString(
    `对角矩阵，例如\n\`\`\`\nMatx33f::diag({1.2, -2.1, 4})\n\`\`\`\n生成的矩阵为\n\`\`\`\n┌ 1.2   0   0 ┐\n│  0  -2.1  0 │\n└  0    0   4 ┘\n\`\`\`\n`
));
strMap.set("ones", new vscode.MarkdownString('将所有元素全部置 `1`'));
strMap.set("zeros", new vscode.MarkdownString('将所有元素全部置 `0`'));
strMap.set("all", new vscode.MarkdownString(
    `将所有元素全部设置为一个值，例如\n\`\`\`\nMatx33f::all(3.1)\n\`\`\`\n将矩阵的所有元素设置为 \`3.1\``
));
strMap.set("randu", new vscode.MarkdownString(
    `矩阵的每一个元素均服从均匀分布，例如\n\`\`\`\nMatx33f::randu(0, 1)\n\`\`\`\n生成矩阵的每一个元素均服从 \`[0, 1)\` 上的均匀分布`
));
strMap.set("randn", new vscode.MarkdownString(
    `矩阵的每一个元素均服从正态分布，例如\n\`\`\`\nMatx33f::randn(0, 1)\n\`\`\`\n生成矩阵的每一个元素均服从均值为 \`0\`，方差为 \`1\` 的正态分布`
));


class CMakeCIP {
    provideCompletionItems() {
        // compile definition
        const rmvlCompileDefinition = new vscode.CompletionItem('rmvl_compile_definitions', vscode.CompletionItemKind.Function);
        rmvlCompileDefinition.insertText = new vscode.SnippetString('rmvl_compile_definitions(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIAVTE|} ${3:MY_DR}\n)');
        rmvlCompileDefinition.documentation = strMap.get("rmvl_compile_definition");
        // install directories
        const rmvlInstallDirectories = new vscode.CompletionItem('rmvl_install_directories', vscode.CompletionItemKind.Function);
        rmvlInstallDirectories.insertText = new vscode.SnippetString('rmvl_install_directories(\n  ${1:where_to_install}\n)');
        rmvlInstallDirectories.documentation = strMap.get("rmvl_install_directories");
        // add module
        const rmvlAddModule = new vscode.CompletionItem('rmvl_add_module', vscode.CompletionItemKind.Function);
        rmvlAddModule.insertText = new vscode.SnippetString('rmvl_add_module(\n  ${1:module_name}\n  DEPENDS ${2:core}\n)');
        rmvlAddModule.documentation = strMap.get("rmvl_add_module");
        // compile options
        const rmvlCompileOptions = new vscode.CompletionItem('rmvl_compile_options', vscode.CompletionItemKind.Function);
        rmvlCompileOptions.insertText = new vscode.SnippetString('rmvl_compile_options(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIVATE|} options\n)');
        rmvlCompileOptions.documentation = strMap.get("rmvl_compile_options");
        // add test
        const rmvlAddTest = new vscode.CompletionItem('rmvl_add_test', vscode.CompletionItemKind.Function);
        rmvlAddTest.insertText = new vscode.SnippetString('rmvl_add_test(\n  ${2:test_name} ${1|Unit,Performance|}\n  DEPENDS ${2:module_name}\n  DEPEND_TESTS ${2:GTest::gtest_main}\n)');
        rmvlAddTest.documentation = strMap.get("rmvl_add_test");
        // add exeutable
        const rmvlAddExe = new vscode.CompletionItem('rmvl_add_exe', vscode.CompletionItemKind.Function);
        rmvlAddExe.insertText = new vscode.SnippetString('rmvl_add_exe(\n  ${1:sample_name}\n  SOURCES ${1:file_name}.cpp\n  DEPENDS ${2:module_name}\n)');
        rmvlAddExe.documentation = strMap.get("rmvl_add_exe");
        // set properties
        const rmvlSetProperties = new vscode.CompletionItem('rmvl_set_properties', vscode.CompletionItemKind.Function);
        rmvlSetProperties.insertText = new vscode.SnippetString('rmvl_set_properties(\n  ${1:module_name} PROPERTIES\n  ${2:properties}\n)');
        rmvlSetProperties.documentation = strMap.get("rmvl_set_properties");
        // download
        const rmvlDownload = new vscode.CompletionItem('rmvl_download', vscode.CompletionItemKind.Function);
        rmvlDownload.insertText = new vscode.SnippetString('rmvl_download(\n  ${2:module_name} ${1|GIT,URL|}\n  ${0:address_git_or_url}\n)');
        rmvlDownload.documentation = strMap.get("rmvl_download");
        // system date
        const systemDate = new vscode.CompletionItem(`system_date`, vscode.CompletionItemKind.Function);
        systemDate.insertText = new vscode.SnippetString(`system_date(output_year output_month output_day)`);
        systemDate.documentation = strMap.get("system_date");
        // generate para
        const rmvlGeneratePara = new vscode.CompletionItem(`rmvl_generate_para`, vscode.CompletionItemKind.Function);
        rmvlGeneratePara.insertText = new vscode.SnippetString(`rmvl_generate_para(\n  \${1:target_name}\n  MODULE \${2:module_name}\n)`);
        rmvlGeneratePara.documentation = strMap.get("rmvl_generate_para");
        // generate module para
        const rmvlGenerateModulePara = new vscode.CompletionItem(`rmvl_generate_module_para`, vscode.CompletionItemKind.Function);
        rmvlGenerateModulePara.insertText = new vscode.SnippetString(`rmvl_generate_module_para(\${1:module_name})`);
        rmvlGenerateModulePara.documentation = strMap.get("rmvl_generate_module_para");
        // link directories
        const rmvlLinkDirectories = new vscode.CompletionItem(`rmvl_link_directories`, vscode.CompletionItemKind.Function);
        rmvlLinkDirectories.insertText = new vscode.SnippetString(`rmvl_link_directories(\n  \${1:module_name}\n  \${2|PUBLIC,INTERFACE,PRIVATE|} \${3:path_to_libs}\n)`);
        rmvlLinkDirectories.documentation = strMap.get("rmvl_link_directories");
        // link libraries
        const rmvlLinkLibraries = new vscode.CompletionItem(`rmvl_link_libraries`, vscode.CompletionItemKind.Function);
        rmvlLinkLibraries.insertText = new vscode.SnippetString(`rmvl_link_libraries(\n  \${1:module_name}\n  \${2|PUBLIC,INTERFACE,PRIVATE|} \${3:mylibs}\n)`);
        rmvlLinkLibraries.documentation = strMap.get("rmvl_link_libraries");

        // 初始化并包含 RMVL
        const findRMVL = new vscode.CompletionItem('FindRMVL', vscode.CompletionItemKind.Module);
        findRMVL.insertText = new vscode.SnippetString(
            `# include rmvl\nfind_package(RMVL REQUIRED)\nlist(APPEND CMAKE_MODULE_PATH \\\${RMVL_DIR})\n# use rmvl functions and macros\ninclude(RMVLUtils)\nset(para_template_path \"\\\${RMVL_DIR}/templates\" CACHE STRING "GenPara template path")\ninclude(RMVLGenPara)\ninclude(RMVLModule)\n`
        );
        findRMVL.documentation = new vscode.MarkdownString(`使用 \`find_package\` 寻找 RMVL，并包含相关模块，包含\n- \`RMVLUtils\`\n- \`RMVLGenPara\`\n- \`RMVLModule\``);

        return [
            rmvlCompileDefinition, rmvlInstallDirectories, rmvlAddModule, rmvlCompileOptions,
            rmvlAddTest, rmvlAddExe, rmvlSetProperties, rmvlDownload, systemDate, rmvlGeneratePara,
            rmvlGenerateModulePara, rmvlLinkDirectories, rmvlLinkLibraries, findRMVL
        ];
    }
}

class ParaKeywordCIP {
    provideCompletionItems() {
        // keyword
        const types = [
            'int', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'Point', 'uint8_t', 'uint16_t', 'uint32_t',
            'uint64_t', 'float', 'double', 'string', 'Point2f', 'Point3f', 'Point2d', 'Point3d',
        ];
        // class or struct
        const classLists = [
            'vector', 'Matx11f', 'Matx12f', 'Matx13f', 'Matx14f', 'Matx15f', 'Matx16f', 'Matx11d', 'Matx12d', 'Matx13d', 'Matx14d', 'Matx15d', 'Matx16d',
            'Matx21f', 'Matx22f', 'Matx23f', 'Matx24f', 'Matx25f', 'Matx26f', 'Matx21d', 'Matx22d', 'Matx23d', 'Matx24d', 'Matx25d', 'Matx26d',
            'Matx31f', 'Matx32f', 'Matx33f', 'Matx34f', 'Matx35f', 'Matx36f', 'Matx31d', 'Matx32d', 'Matx33d', 'Matx34d', 'Matx35d', 'Matx36d',
            'Matx41f', 'Matx42f', 'Matx43f', 'Matx44f', 'Matx45f', 'Matx46f', 'Matx41d', 'Matx42d', 'Matx43d', 'Matx44d', 'Matx45d', 'Matx46d',
            'Matx51f', 'Matx52f', 'Matx53f', 'Matx54f', 'Matx55f', 'Matx56f', 'Matx51d', 'Matx52d', 'Matx53d', 'Matx54d', 'Matx55d', 'Matx56d',
            'Matx61f', 'Matx62f', 'Matx63f', 'Matx64f', 'Matx65f', 'Matx66f', 'Matx61d', 'Matx62d', 'Matx63d', 'Matx64d', 'Matx65d', 'Matx66d',
            'Vec2f', 'Vec3f', 'Vec4f', 'Vec5f', 'Vec6f', 'Vec2d', 'Vec3d', 'Vec4d', 'Vec5d', 'Vec6d'];
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
}

class ParaFuncCIP {
    provideCompletionItems(document, position) {
        const line = document.lineAt(position.line).text;
        const prefixReg = line.match(/(Matx[0-9]{2}|Vec[0-9])[fd]::/g);
        const prefix = prefixReg[prefixReg.length - 1];
        const prefixIndex = line.lastIndexOf(prefix, position.character);
        if (prefixIndex === -1 || prefixIndex !== position.character - prefix.length) {
            return undefined;
        }
        // eye()
        const eyeMethod = new vscode.CompletionItem('eye', vscode.CompletionItemKind.Method);
        eyeMethod.documentation = strMap.get("eye");
        eyeMethod.insertText = new vscode.SnippetString('eye()');
        // diag()
        const diagMethod = new vscode.CompletionItem('diag', vscode.CompletionItemKind.Method);
        diagMethod.documentation = strMap.get("diag");
        diagMethod.insertText = new vscode.SnippetString('diag(\{${1}\})');
        // ones()
        const onesMethod = new vscode.CompletionItem('ones', vscode.CompletionItemKind.Method);
        onesMethod.documentation = strMap.get("ones");
        onesMethod.insertText = new vscode.SnippetString('ones()');
        // zeros()
        const zerosMethod = new vscode.CompletionItem('zeros', vscode.CompletionItemKind.Method);
        zerosMethod.documentation = strMap.get("zeros");
        zerosMethod.insertText = new vscode.SnippetString('zeros()');
        // all()
        const allMethod = new vscode.CompletionItem('all', vscode.CompletionItemKind.Method);
        allMethod.documentation = strMap.get("all");
        allMethod.insertText = new vscode.SnippetString('all(${1})');
        // randu()
        const randuMethod = new vscode.CompletionItem('randu', vscode.CompletionItemKind.Method);
        randuMethod.documentation = strMap.get("randu");
        randuMethod.insertText = new vscode.SnippetString('randu(${1}, ${2})');
        // randu()
        const randnMethod = new vscode.CompletionItem('randn', vscode.CompletionItemKind.Method);
        randnMethod.documentation = strMap.get("randn");
        randnMethod.insertText = new vscode.SnippetString('randn(${1}, ${2})');
        return [eyeMethod, diagMethod, onesMethod, zerosMethod, allMethod, randuMethod, randnMethod];
    }
}

module.exports = {
    CMakeCIP, ParaKeywordCIP, ParaFuncCIP, strMap
}
