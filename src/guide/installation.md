# 安装

## 系统要求

| 要求 | 说明 |
|------|------|
| 操作系统 | Windows 10/11（x64 或 ARM64）；macOS（Intel 或 Apple Silicon） |
| 磁盘空间 | 建议预留 1 GB 以上可用空间（应用本体 + 会话数据增长） |
| 网络 | 下载安装包需联网访问 GitHub Releases；使用时需联网访问 AI 服务 |
| 前置依赖 | 需要安装 Claude Code CLI、Codex CLI 或 OpenCode CLI 中的至少一个（见[前置依赖](/guide/prerequisites)） |

::: warning Linux 暂未支持
当前版本（v0.7.0）不提供 Linux 安装包，Linux 用户请关注后续版本。
:::

## Windows 安装

1. 前往 [GitHub Releases（LoongCode0/loongcode-release）](https://github.com/LoongCode0/loongcode-release/releases/latest) 下载最新版安装包。
2. 根据你的系统架构选择对应文件（不确定就选 x64，绝大多数电脑适用，ARM 设备也能兼容运行 x64 版）：
   - 普通电脑选 `LoongCode_*_x64-setup.exe`
   - 搭载高通芯片的 ARM 设备选 `LoongCode_*_arm64-setup.exe`
3. 双击下载好的 `.exe` 文件，按安装向导提示完成安装。
4. 安装完成后，桌面会出现 LoongCode 快捷方式，双击即可启动。

![截图：Windows 安装向导界面，安装进行中，显示安装进度条与目标路径选择步骤，突出进度条与路径输入框](/images/installation_1.png)  

### 处理「Windows 已保护你的电脑」提示

由于 LoongCode 暂未进行操作系统级代码签名，Windows SmartScreen 可能会在首次安装时弹出如下提示。

![截图：Windows SmartScreen「未知发布者」安全提示对话框，突出「更多信息」链接](/images/installation_2.png)

遇到此提示时：

1. 点击 **更多信息**（蓝色链接文字）。
2. 点击随后出现的 **仍要运行** 按钮。
3. 安装程序将正常继续。

::: warning 为什么会出现这个提示？
LoongCode 暂未购买操作系统级代码签名证书，因此被 Windows 标记为「未知发布者」——这是 SmartScreen 对所有未签名软件的标准提示，不代表软件有问题。请确认你的下载链接直接来自官方 GitHub Releases（github.com/LoongCode0/loongcode-release），不经任何第三方转发，即可放心安装。
:::

## macOS 安装

1. 前往 [GitHub Releases（LoongCode0/loongcode-release）](https://github.com/LoongCode0/loongcode-release/releases/latest) 下载最新的 `.dmg` 文件（Intel 和 Apple Silicon 共用同一个通用包）。
2. 双击 `.dmg` 文件，将弹出安装窗口。
3. 把 **LoongCode** 图标拖入右侧的「**应用程序**」文件夹。
4. 打开「应用程序」，双击 LoongCode 启动。

![截图：macOS DMG 安装窗口，展示将 LoongCode 拖入应用程序文件夹的操作界面](/images/installation_3.png)

### 处理「无法验证开发者」或「已损坏」提示

由于 LoongCode 暂未购买 Apple 代码签名证书，首次启动时 macOS 可能提示「无法验证开发者」或「已损坏，无法打开」。这是 macOS 对所有未签名应用的标准提示，不代表软件有问题——只要安装包直接下载自官方 GitHub Releases（github.com/LoongCode0/loongcode-release），即可放心按以下方式打开。

**方式一（推荐先试）**：

1. 打开「**应用程序**」文件夹。
2. 对 **LoongCode** 图标**右键单击**，在菜单中选择「**打开**」。
3. 在弹出对话框中点击「**打开**」确认。

**方式二**（方式一无效时）：

打开「终端」应用，执行以下命令：

```bash
xattr -cr /Applications/LoongCode.app
```

执行完毕后切换到 Finder，在「应用程序」文件夹双击 LoongCode 即可正常打开。

::: tip 安装后无需重复操作
无论使用哪种方式完成首次打开，之后正常双击即可启动，不需要每次都执行这些步骤。
:::

## 自动更新

::: warning 当前仅 Windows 支持自动更新
macOS 版暂不提供应用内自动更新，如需更新请手动下载新版安装包；平台支持范围以官方发布说明为准。
:::

当 LoongCode 检测到新版本时，界面右上角会出现**更新**徽标。

1. 点击右上角的**更新**徽标。
2. 在弹出的确认对话框中点击**立即重启**。

确认后，LoongCode 会自动完成新版本的安装并重启，无需其他操作。

![截图：LoongCode 标题栏右上角出现更新徽标，突出显示更新图标区域](/images/installation_4.png)

::: tip 下载的是完整安装包
自动更新下载的是完整安装包，文件较大，更新过程中请保持网络连接。
:::

## 卸载

**Windows**：

- Windows 11：打开系统「**设置 → 应用 → 已安装的应用**」，找到 **LoongCode**，点击卸载。
- Windows 10：打开系统「**设置 → 应用 → 应用和功能**」，找到 **LoongCode**，点击卸载。

**macOS**：

打开「**应用程序**」文件夹，将 **LoongCode** 拖入废纸篓，并清空废纸篓。

### 数据目录

卸载应用不会自动删除用户数据。LoongCode 的数据（对话记录、设置、数据库等）默认保存在：

- Windows：`%APPDATA%\com.loongcode.desktop\`（即 `C:\Users\<用户名>\AppData\Roaming\com.loongcode.desktop\`）
- macOS：`~/Library/Application Support/com.loongcode.desktop/`

数据目录支持自定义，实际位置可在卸载前打开「设置 → 常规 → **数据目录**」查看。如需彻底清除所有数据，卸载后手动删除该目录即可。

## 下一步

LoongCode 装好后，还需要准备它的「引擎」——前往[前置依赖](/guide/prerequisites)页面安装 Claude Code CLI。
