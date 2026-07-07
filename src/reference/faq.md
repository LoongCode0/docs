# 常见问题

本页收录使用中的高频疑问。若未找到你需要的答案，请前往 [故障排查](/reference/troubleshooting) 查看具体问题的解决指引。

---

### LoongCode 是免费的吗？需要什么账号？

LoongCode 应用本身可从 GitHub Releases 免费下载，源码仓库公开发布。

使用 AI 功能需要本机安装 Claude CLI、Codex CLI 或 OpenCode CLI 中的任意一个，AI 服务的费用（如 API 调用计费、订阅计划等）由各 CLI 对应的供应商决定，与 LoongCode 本身无关，请参阅你所使用的 CLI 文档了解具体计费规则。

---

### 检测不到 Claude CLI 怎么办？

常见原因是 CLI 未安装或安装路径不在系统 PATH 中。处理步骤：

1. 前往**设置 → 依赖管理**，查看 Claude CLI 的检测状态，可在此直接安装。
2. 若已安装但仍无法识别，可在**设置 → 常规 → CLI 命令**中手动填写可执行文件的完整路径。

详见 [故障排查 — CLI 未被识别](/reference/troubleshooting#cli-未被识别--任务无法启动) 与 [前置依赖](/guide/prerequisites)。

---

### Claude、Codex 和 OpenCode 任务可以同时用吗？

可以。每个任务在创建时可独立选择使用 Claude CLI、Codex CLI 或 OpenCode CLI，彼此互不影响，可同时运行多个不同 CLI 的任务。多 CLI 能力自 v0.7.0 起支持，OpenCode 家族自 v0.9.0 起加入。

详见 [任务与工作区](/features/tasks-and-workspaces) 及 [CLI 与任务配置](/settings/cli)。

---

### 我的对话数据存在哪里？

所有任务记录和设置文件保存在本机的数据目录中：

- **Windows：** `%APPDATA%\com.loongcode.desktop\`
- **macOS：** `~/Library/Application Support/com.loongcode.desktop/`

数据库文件为目录下的 `loongcode.db`。你可以在**设置 → 常规 → 数据目录**中查看当前路径；修改路径后，应用会自动把数据迁移到新位置并重新加载。

详见 [常规设置](/settings/general)。

---

### 自动更新支持哪些平台？

**Windows** 支持应用内自动更新——当有新版本时，右上角会显示更新徽标，点击并确认重启即可完成升级。

**macOS** 请手动从 [GitHub Releases（LoongCode0/loongcode-release）](https://github.com/LoongCode0/loongcode-release/releases/latest) 下载最新的 `.dmg` 文件覆盖安装；应用内自动更新的平台支持范围以官方发布说明为准。

详见 [安装 LoongCode](/guide/installation)。

---

### macOS 提示「无法验证开发者」怎么办？

这是 macOS Gatekeeper 的安全提示，并非应用本身的问题。解决方法：

- **方式一：** 在 Finder 中找到 LoongCode.app，按住 `Control` 键并单击（或右键），选择**打开**，在弹出对话框中确认打开。
- **方式二：** 在终端中运行以下命令移除隔离属性，之后正常双击启动：

```bash
xattr -cr /Applications/LoongCode.app
```

---

### 怎么切换界面语言或主题？

前往**设置 → 常规**：

- **语言：** 在"语言"下拉列表中选择中文或 English，切换后立即生效。
- **主题：** 在"主题"下拉列表中选择任一配色方案，切换即时生效。

详见 [常规设置](/settings/general)。

---

### 归档的任务去哪了，怎么找回？

归档任务不会被删除，仍保存在本地数据库中。找回方式：

在左侧任务栏的任务列表区域，点击**任务 / 归档**标签切换到**归档**视图，即可看到所有已归档任务。点击任意归档任务即可重新打开。

详见 [任务与工作区](/features/tasks-and-workspaces)。

---

### 上下文满了怎么办？

有两种处理方式：

1. **自动压缩（推荐开启）：** 在**设置 → 常规 → 自动压缩**中开启后，上下文接近上限时应用会自动执行压缩摘要并继续任务。
2. **手动压缩：** 在对话面板底部工具栏点击压缩按钮，手动触发摘要压缩。

此外，自 v0.3.1 起支持上下文超限自动恢复，超限产生的错误会被自动处理。

详见 [对话面板](/features/conversation)。

---

### 如何重新打开新手引导？

前往**设置 → 常规 → 使用引导**区块：

- 点击**从头重看**按钮可重新播放完整的 5 章引导。
- 每章右侧的**重看**按钮可单独重放某一章节。

详见 [常规设置](/settings/general)。

---

### token 用量在哪里看？

前往**设置 → 使用统计**，可查看历史 token 消耗数据。

详见 [使用统计](/features/usage-stats)。

---

### 支持 Linux 吗？

目前 LoongCode 仅发布了 **Windows（x64 / ARM64）** 和 **macOS（Universal）** 版本，暂未发布 Linux 安装包。如有 Linux 支持需求，请持续关注官方发布渠道。

---

## 下一步

- [快捷键一览](/reference/shortcuts) — 常用键盘操作速查
- [故障排查](/reference/troubleshooting) — 遇到具体问题时的解决指引
