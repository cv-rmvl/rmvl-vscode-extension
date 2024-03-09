# RMVL 参数与 CMake 扩展

包含 `*.para` 参数规范文件的语法支持以及相关 CMake 宏的扩展支持

#### [Repository](https://github.com/cv-rmvl/rmvl-vscode-extension.git) | [Issues](https://github.com/cv-rmvl/rmvl-vscode-extension/issues) | [RMVL Documents](https://cv-rmvl.github.io/master) | [RMVL Repository](https://github.com/cv-rmvl/rmvl.git)

### *.para 参数规范文件使用方法

- 目前包含整型、浮点型、字符串、点、矩阵、向量共 6 种变量类型
- 参数规范文件扩展名为 `*.para`，该部分扩展仅在符合该扩展名的文件中生效

##### 使用方法

| 数据类型与提示 |                             含义                             |
| :------------: | :----------------------------------------------------------: |
|   `ParaHelp`   |          生成并选择对应的代码提示，即可创建示例代码          |
|    基本类型    | 包括 `int`、`uint8_t`、`double`、`float`、`string` 等，对标 C++ 的基础类型和 STL 的 `std::string` |
|    矩阵类型    | 包括形如 `Matx??`、`Vec?` 的类型，对标 OpenCV 的 `cv::Matx` 和 `cv::Vec`，可使用列表初始化，也可使用相关静态函数初始化（RMVL 扩展均有提供对应的代码提示） |
|    复合类型    | 包括 `vector` 和形如 `Point?` 的类型，对标 C++ STL 的 `std::vector` 以及 OpenCV 的`cv::Point2?` 和 `cv::Point3?`，只能使用列表初始化 |

### CMake 扩展

- 在现有 CMake 的插件基础上增加了适用于 RMVL 的一组宏、函数

##### 使用方法

| 函数名与提示  |                          含义                          |
| :-----------: | :----------------------------------------------------: |
|  `FindRMVL`   | 一键完成 `RMVL` 的 `find_package`，并包含相关宏和函数  |
|  `rmvl_xxx`   | 基本功能，在对应文件键入 `rmvl` 后即可显示所支持的功能 |
| `system_date` |                      获取系统时间                      |
