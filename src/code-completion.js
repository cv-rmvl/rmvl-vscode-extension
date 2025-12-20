const vscode = require('vscode');

const strCMakeMap = new Map();
const strParaMap = new Map();

strCMakeMap.set("rmvl_compile_definitions", new vscode.MarkdownString(
  `#### 将预处理定义添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_definitions(<target>\n  <INTERFACE | PUBLIC | PRIVATE> [items1...]\n  [<INTERFACE | PUBLIC | PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_definitions(\n  aaa\n  INTERFACE HAVE_AAA\n)\n\`\`\``
));
strCMakeMap.set("rmvl_install_directories", new vscode.MarkdownString(
  '#### 将指定路径下的所有文件安装至特定目标\n##### 用法:\n```\nrmvl_install_directories(<directory> [DST_LIB])\n```\n##### 示例:\n```\nrmvl_install_directories(include/rmvl)\n```'
));

strCMakeMap.set("rmvl_update_build", new vscode.MarkdownString(
  `#### 更新 RMVL 目标构建的标志位，用于控制是否构建指定模块，不影响用户的选择\n- 主要更新 \`BUILD_rmvl_xxx_INIT\` 变量\n- 在满足条件时，设置 \`BUILD_rmvl_xxx_INIT\` 为 \`ON\`，否则为 \`OFF\`\n##### 用法:\n\`\`\`\nrmvl_update_build(<name> [CONDITION])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_update_build(\n  hik_camera\n  HikSDK_FOUND\n)\n\`\`\``
));
strCMakeMap.set("rmvl_add_module", new vscode.MarkdownString(
  `#### 在当前目录中添加新的 RMVL 模块，并会依次添加至\n- 局部变量 \`modules_build\`\n- 缓存变量 \`RMVL_MODULES_BUILD\`\n中\n##### 用法:\n\`\`\`\nrmvl_add_module(<module_name> [INTERFACE] [EXTRA_HEADER <list of other include directories>]\n  [EXTRA_SOURCE <list of other source directories>] [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_module(\n  my_module               # 需要生成的模块 (文件夹名)\n  EXTRA_HEADER xxx_h      # 参与构建的除 \`include\` 文件夹以外的其余头文件目录\n  EXTRA_SOURCE xxx_src    # 参与构建的除 \`src\` 文件夹以外的其余源文件目录\n  DEPENDS core            # 依赖的 RMVL 模块 (文件夹名)\n  EXTERNAL \${OpenCV_LIBS} # 依赖的第三方目标库\n)\n\`\`\``
));
strCMakeMap.set("rmvl_compile_options", new vscode.MarkdownString(
  `#### 将编译选项添加至指定目标\n##### 用法:\n\`\`\`\nrmvl_compile_options(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_compile_options(\n  my_module  # RMVL 目标名\n  PRIVATE -w # 编译选项\n)\n\`\`\``
));
strCMakeMap.set("rmvl_add_test", new vscode.MarkdownString(
  `#### 此命令用于为指定模块添加新的 RMVL 测试\n##### 用法:\n\`\`\`\nrmvl_add_test(<name> <Unit|Performance> <DEPENDS> [rmvl_target...]\n  <EXTERNAL> [test_target...])\n\`\`\`\n##### 示例:\n\`\`\`\nrmvl_add_test(\n  detector Unit              # 测试名\n  DEPENDS  armor_detector    # 依赖的 RMVL 目标库\n  EXTERNAL GTest::gtest_main # 依赖的第三方目标库，一般是测试工具\n)\n\`\`\``
));
strCMakeMap.set("rmvl_add_exe", new vscode.MarkdownString(
  '#### 此命令用于为指定模块添加新的 RMVL 可执行文件\n##### 用法:\n```\nrmvl_add_exe(<name> SOURCES <file_name>\n  [DEPENDS <list of rmvl dependencies>]\n  [EXTERNAL <list of 3rd party dependencies>]\n)\n```\n##### 示例:\n```\nrmvl_add_exe(\n  demo             # 可执行文件名\n  SOURCES demo.cpp # 源文件\n  DEPENDS core     # 依赖的 RMVL 模块\n)\n```'
));
strCMakeMap.set("rmvl_set_properties", new vscode.MarkdownString(
  `#### 设置如何构建指定 Target 的属性\n#### 用法:\n\`\`\`\nrmvl_set_properties(target1 target2 ...\n  PROPERTIES prop1 value1\n  prop2 value2 ...)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_set_properties(\n  detector                   # 目标名\n  PROPERTIES CXX_STANDARD 17 # 属性\n)\n\`\`\``
));
strCMakeMap.set("rmvl_download", new vscode.MarkdownString(
  `#### 下载并参与 RMVL 的构建\n##### 用法:\n\`\`\`\nrmvl_download(\n  <dl_name> <dl_kind>\n  <...>\n)\n\`\`\`\n##### 示例 1:\n\`\`\`\nrmvl_download(\n  benchmark GIT\n  xxx : master # 仓库地址与分支/标签名\n)\n\`\`\`\n##### 示例 2\n\`\`\`\nrmvl_download(\n  googletest URL\n  xxx # 要下载的路径（一般是压缩文件）\n)\n\`\`\``
));
strCMakeMap.set("system_date", new vscode.MarkdownString(
  `#### 获取系统日期\n#### 用法:\n\`\`\`\nsystem_date(\n  <output year> <output month> <output day>\n)\n\`\`\`\n#### 示例:\n\`\`\`\nsystem_date(\n  year  # 年份，格式为 yyyy\n  month # 月份，格式为 mm\n  day   # 日期，格式为 dd\n)\n\`\`\``
));
strCMakeMap.set("rmvl_generate_para", new vscode.MarkdownString(
  `#### 根据指定的目标名在 \`param\` 文件夹下对应的 \`*.para\` 参数规范文件和可选的模块名生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_para(\n  <target_name>\n  [MODULE module_name]\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_para(\n  mytarget        # 目标名称\n  MODULE mymodule # 模块名称为 mymodule\n)\n\`\`\``
));
strCMakeMap.set("rmvl_generate_module_para", new vscode.MarkdownString(
  `#### 根据给定模块下所有的 para 目标，生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_module_para(\n  <module_name>\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_module_para(module_name) # 模块名\n\`\`\``
));
strCMakeMap.set("rmvl_generate_msg", new vscode.MarkdownString(
  `#### 根据指定的目标名在 \`msg\` 文件夹下对应的 \`*.msg\` 消息类型描述文件和可选的模块名生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_msg(\n  <name>\n  [MODULE module_name]\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_msg(\n  mymsg           # 目标名称\n  MODULE mymodule # 模块名称为 mymodule\n)\n\`\`\``
));
strCMakeMap.set("rmvl_generate_module_msg", new vscode.MarkdownString(
  `#### 根据给定模块下所有的 msg 目标，生成对应的 C++ 代码\n#### 用法:\n\`\`\`\nrmvl_generate_module_msg(\n  <name>\n)\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_generate_module_msg(module_name) # 模块名\n\`\`\``
));
strCMakeMap.set("rmvl_link_directories", new vscode.MarkdownString(
  `#### 将指定目录添加至运行时动态库链接的搜索路径\n#### 用法:\n\`\`\`\nrmvl_link_directories(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_link_directories(\n  my_module              # RMVL 目标名\n  PRIVATE /path/to/mylib # 链接库的路径\n)\n\`\`\``
));
strCMakeMap.set("rmvl_link_libraries", new vscode.MarkdownString(
  `#### 将指定目标链接至指定的库\n#### 用法:\n\`\`\`\nrmvl_link_libraries(<target> [BEFORE]\n  <INTERFACE|PUBLIC|PRIVATE> [items1...]\n  [<INTERFACE|PUBLIC|PRIVATE> [items2...] ...])\n\`\`\`\n#### 示例:\n\`\`\`\nrmvl_link_libraries(\n  my_module    # RMVL 目标名\n  PUBLIC mylib # 链接库的名称\n)\n\`\`\`\n#### 注意:\n若使用 RMVL 目标，需要引入 rmvl_ 前缀，例如\n\`\`\`\nrmvl_link_libraries(\n  my_module\n  PUBLIC rmvl_core\n)\n\`\`\``
));

strParaMap.set("eye", new vscode.MarkdownString('单位矩阵'));
strParaMap.set("diag", new vscode.MarkdownString(
  `对角矩阵，例如\n\`\`\`\nMatx33f::diag({1.2, -2.1, 4})\n\`\`\`\n生成的矩阵为\n\`\`\`\n┌ 1.2   0   0 ┐\n│  0  -2.1  0 │\n└  0    0   4 ┘\n\`\`\`\n`
));
strParaMap.set("ones", new vscode.MarkdownString('将所有元素全部置 `1`'));
strParaMap.set("zeros", new vscode.MarkdownString('将所有元素全部置 `0`'));
strParaMap.set("all", new vscode.MarkdownString(
  `将所有元素全部设置为一个值，例如\n\`\`\`\nMatx33f::all(3.1)\n\`\`\`\n将矩阵的所有元素设置为 \`3.1\``
));
strParaMap.set("randu", new vscode.MarkdownString(
  `矩阵的每一个元素均服从均匀分布，例如\n\`\`\`\nMatx33f::randu(0, 1)\n\`\`\`\n生成矩阵的每一个元素均服从 \`[0, 1)\` 上的均匀分布`
));
strParaMap.set("randn", new vscode.MarkdownString(
  `矩阵的每一个元素均服从正态分布，例如\n\`\`\`\nMatx33f::randn(0, 1)\n\`\`\`\n生成矩阵的每一个元素均服从均值为 \`0\`，方差为 \`1\` 的正态分布`
));


class CMakeCIP {
  provideCompletionItems() {
    // compile definition
    const rmvlCompileDefinition = new vscode.CompletionItem('rmvl_compile_definitions', vscode.CompletionItemKind.Function);
    rmvlCompileDefinition.insertText = new vscode.SnippetString('rmvl_compile_definitions(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIAVTE|} ${3:MY_DR}\n)');
    rmvlCompileDefinition.documentation = strParaMap.get("rmvl_compile_definition");
    // install directories
    const rmvlInstallDirectories = new vscode.CompletionItem('rmvl_install_directories', vscode.CompletionItemKind.Function);
    rmvlInstallDirectories.insertText = new vscode.SnippetString('rmvl_install_directories(\n  ${1:where_to_install}\n)');
    rmvlInstallDirectories.documentation = strParaMap.get("rmvl_install_directories");
    // update build
    const rmvlUpdateBuild = new vscode.CompletionItem('rmvl_update_build', vscode.CompletionItemKind.Function);
    rmvlUpdateBuild.insertText = new vscode.SnippetString('rmvl_update_build(${1:module_name} ${2:condition})');
    rmvlUpdateBuild.documentation = strParaMap.get("rmvl_update_build");
    // add module
    const rmvlAddModule = new vscode.CompletionItem('rmvl_add_module', vscode.CompletionItemKind.Function);
    rmvlAddModule.insertText = new vscode.SnippetString('rmvl_add_module(\n  ${1:module_name}\n  DEPENDS ${2:core}\n)');
    rmvlAddModule.documentation = strParaMap.get("rmvl_add_module");
    // compile options
    const rmvlCompileOptions = new vscode.CompletionItem('rmvl_compile_options', vscode.CompletionItemKind.Function);
    rmvlCompileOptions.insertText = new vscode.SnippetString('rmvl_compile_options(\n  ${1:module_name}\n  ${2|PUBLIC,INTERFACE,PRIVATE|} options\n)');
    rmvlCompileOptions.documentation = strParaMap.get("rmvl_compile_options");
    // add test
    const rmvlAddTest = new vscode.CompletionItem('rmvl_add_test', vscode.CompletionItemKind.Function);
    rmvlAddTest.insertText = new vscode.SnippetString('rmvl_add_test(\n  ${2:test_name} ${1|Unit,Performance|}\n  DEPENDS ${3:module_name}\n  EXTERNAL ${4:GTest::gtest_main}\n)');
    rmvlAddTest.documentation = strParaMap.get("rmvl_add_test");
    // add exeutable
    const rmvlAddExe = new vscode.CompletionItem('rmvl_add_exe', vscode.CompletionItemKind.Function);
    rmvlAddExe.insertText = new vscode.SnippetString('rmvl_add_exe(\n  ${1:sample_name}\n  SOURCES ${2:file_name}.cpp\n  DEPENDS ${3:module_name}\n)');
    rmvlAddExe.documentation = strParaMap.get("rmvl_add_exe");
    // set properties
    const rmvlSetProperties = new vscode.CompletionItem('rmvl_set_properties', vscode.CompletionItemKind.Function);
    rmvlSetProperties.insertText = new vscode.SnippetString('rmvl_set_properties(\n  ${1:module_name} PROPERTIES\n  ${2:properties}\n)');
    rmvlSetProperties.documentation = strParaMap.get("rmvl_set_properties");
    // download
    const rmvlDownload = new vscode.CompletionItem('rmvl_download', vscode.CompletionItemKind.Function);
    rmvlDownload.insertText = new vscode.SnippetString('rmvl_download(\n  ${2:module_name} ${1|GIT,URL|}\n  ${0:address_git_or_url}\n)');
    rmvlDownload.documentation = strParaMap.get("rmvl_download");
    // system date
    const systemDate = new vscode.CompletionItem(`system_date`, vscode.CompletionItemKind.Function);
    systemDate.insertText = new vscode.SnippetString(`system_date(output_year output_month output_day)`);
    systemDate.documentation = strParaMap.get("system_date");
    // generate para
    const rmvlGeneratePara = new vscode.CompletionItem(`rmvl_generate_para`, vscode.CompletionItemKind.Function);
    rmvlGeneratePara.insertText = new vscode.SnippetString(`rmvl_generate_para(\n  \${1:target_name}\n  MODULE \${2:module_name}\n)`);
    rmvlGeneratePara.documentation = strParaMap.get("rmvl_generate_para");
    // generate module para
    const rmvlGenerateModulePara = new vscode.CompletionItem(`rmvl_generate_module_para`, vscode.CompletionItemKind.Function);
    rmvlGenerateModulePara.insertText = new vscode.SnippetString(`rmvl_generate_module_para(\${1:module_name})`);
    rmvlGenerateModulePara.documentation = strParaMap.get("rmvl_generate_module_para");
    const rmvlGenerateMsg = new vscode.CompletionItem(`rmvl_generate_msg`, vscode.CompletionItemKind.Function);
    rmvlGenerateMsg.insertText = new vscode.SnippetString(`rmvl_generate_msg(\n  \${1:msg_name}\n  MODULE \${2:module_name}\n)`);
    rmvlGenerateMsg.documentation = strParaMap.get("rmvl_generate_msg");
    // generate module msg
    const rmvlGenerateModuleMsg = new vscode.CompletionItem(`rmvl_generate_module_msg`, vscode.CompletionItemKind.Function);
    rmvlGenerateModuleMsg.insertText = new vscode.SnippetString(`rmvl_generate_module_msg(\${1:module_name})`);
    rmvlGenerateModuleMsg.documentation = strParaMap.get("rmvl_generate_module_msg");
    // link directories
    const rmvlLinkDirectories = new vscode.CompletionItem(`rmvl_link_directories`, vscode.CompletionItemKind.Function);
    rmvlLinkDirectories.insertText = new vscode.SnippetString(`rmvl_link_directories(\n  \${1:module_name}\n  \${2|PUBLIC,INTERFACE,PRIVATE|} \${3:path_to_libs}\n)`);
    rmvlLinkDirectories.documentation = strParaMap.get("rmvl_link_directories");
    // link libraries
    const rmvlLinkLibraries = new vscode.CompletionItem(`rmvl_link_libraries`, vscode.CompletionItemKind.Function);
    rmvlLinkLibraries.insertText = new vscode.SnippetString(`rmvl_link_libraries(\n  \${1:module_name}\n  \${2|PUBLIC,INTERFACE,PRIVATE|} \${3:mylibs}\n)`);
    rmvlLinkLibraries.documentation = strParaMap.get("rmvl_link_libraries");

    // find_package RMVL
    const findRMVL = new vscode.CompletionItem('FindRMVL', vscode.CompletionItemKind.Module);
    findRMVL.insertText = new vscode.SnippetString(`find_package(RMVL REQUIRED)\n`);
    findRMVL.documentation = new vscode.MarkdownString(`使用 \`find_package\` 寻找 RMVL`);

    return [
      rmvlCompileDefinition, rmvlInstallDirectories, rmvlUpdateBuild, rmvlAddModule, rmvlCompileOptions, rmvlAddTest,
      rmvlAddExe, rmvlSetProperties, rmvlDownload, systemDate, rmvlGeneratePara, rmvlGenerateModulePara,
      rmvlGenerateMsg, rmvlGenerateModuleMsg, rmvlLinkDirectories, rmvlLinkLibraries, findRMVL
    ];
  }
}

class ParaKeywordCIP {
  provideCompletionItems() {
    // keyword
    const types = [
      'int', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'Point', 'uint8_t', 'uint16_t', 'uint32_t',
      'uint64_t', 'float', 'double', 'size_t', 'string', 'Point2f', 'Point3f', 'Point2d', 'Point3d',
      'enum', 'endenum', 'bool', 'false', 'true'
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

    const enumSnippet = new vscode.CompletionItem('enum', vscode.CompletionItemKind.Snippet);
    enumSnippet.insertText = new vscode.SnippetString('enum Flag\n  ${1}\nendenum\n');

    completionItems.push(paraSnippet, enumSnippet);

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
    eyeMethod.documentation = strParaMap.get("eye");
    eyeMethod.insertText = new vscode.SnippetString('eye()');
    // diag()
    const diagMethod = new vscode.CompletionItem('diag', vscode.CompletionItemKind.Method);
    diagMethod.documentation = strParaMap.get("diag");
    diagMethod.insertText = new vscode.SnippetString('diag(\{${1}\})');
    // ones()
    const onesMethod = new vscode.CompletionItem('ones', vscode.CompletionItemKind.Method);
    onesMethod.documentation = strParaMap.get("ones");
    onesMethod.insertText = new vscode.SnippetString('ones()');
    // zeros()
    const zerosMethod = new vscode.CompletionItem('zeros', vscode.CompletionItemKind.Method);
    zerosMethod.documentation = strParaMap.get("zeros");
    zerosMethod.insertText = new vscode.SnippetString('zeros()');
    // all()
    const allMethod = new vscode.CompletionItem('all', vscode.CompletionItemKind.Method);
    allMethod.documentation = strParaMap.get("all");
    allMethod.insertText = new vscode.SnippetString('all(${1})');
    // randu()
    const randuMethod = new vscode.CompletionItem('randu', vscode.CompletionItemKind.Method);
    randuMethod.documentation = strParaMap.get("randu");
    randuMethod.insertText = new vscode.SnippetString('randu(${1}, ${2})');
    // randu()
    const randnMethod = new vscode.CompletionItem('randn', vscode.CompletionItemKind.Method);
    randnMethod.documentation = strParaMap.get("randn");
    randnMethod.insertText = new vscode.SnippetString('randn(${1}, ${2})');
    return [eyeMethod, diagMethod, onesMethod, zerosMethod, allMethod, randuMethod, randnMethod];
  }
}

module.exports = {
  CMakeCIP, ParaKeywordCIP, ParaFuncCIP, strCMakeMap, strParaMap
}
