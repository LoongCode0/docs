# LoongCode 是什么

## LoongCode 是什么

LoongCode 是一款基于 **Tauri 2 + React 19** 构建的**桌面 Agent IDE**（集成开发环境）。它把原本只能在命令行中使用的 AI 编程助手——Claude Code CLI 和 OpenAI Codex CLI——封装进一个现代化的图形界面，让你无需打开终端就能享受完整的 AI 辅助编程体验。

![截图：LoongCode 主界面全景，展示左侧任务栏、中央对话区与右侧工具面板](...)

## 它是如何工作的

LoongCode **本身不直接调用任何模型 API**。它的工作方式是：在你每次发起对话时，LoongCode 在后台以子进程方式拉起本机已安装的 `claude` 或 `codex` 命令行工具，通过流式 JSON 协议与它们通信，再把实时返回的事件流渲染成你看到的对话与工具调用界面。

这意味着：
- 你的 API 密钥和模型配置由 CLI 工具自己管理，LoongCode 不经手。
- CLI 工具的版本升级（如 Anthropic 发布新版 Claude Code）不需要重装 LoongCode，两者相互独立。

## 能用它做什么

**多任务并行对话**：每个「任务」对应一个独立的 AI 会话，你可以同时开启多个任务，它们在后台并行运行互不干扰。左侧任务栏实时显示每个任务的状态（运行中 / 等待输入 / 空闲）。

**工作区与文件管理**：内置文件树、文件查看面板与 Markdown 预览，可直接在 LoongCode 中浏览和管理项目文件；通过 `@` 提及语法可以在对话中快速引用任意文件。

**Git 集成**：标题栏内置 commit 菜单与 Git 审查面板，支持分支切换、查看 diff、查看未推送提交数量，无需切换到其他工具。

**双 CLI 支持（Claude / Codex）**：从 v0.7.0 起，LoongCode 同时支持 Claude Code CLI 和 OpenAI Codex CLI。你可以为每个任务单独选择使用哪个 CLI，两套模型配置各自独立、互不影响。

**可扩展能力（MCP / 插件 / 技能 / 子智能体）**：通过设置页面可以管理 MCP 服务器（为 AI 提供额外工具能力）、插件、技能（自定义斜杠命令）和子智能体，灵活扩展 AI 的能力边界。

**移动端消息渠道（微信 / 飞书机器人）**：支持通过微信或飞书机器人与 LoongCode 中的 AI 任务交互，方便在手机上查看进度或发送指令（当前版本支持纯文本交互）。

## 与 Claude Code / Codex 的关系

可以这样理解：**CLI 是引擎，LoongCode 是驾驶舱**。

- **Claude Code CLI**（由 Anthropic 提供）和 **Codex CLI**（由 OpenAI 提供）负责真正的模型调用、代码执行和文件操作——这是「引擎」。
- **LoongCode** 负责把引擎的能力以图形界面的形式呈现出来，提供多任务管理、历史记录、Git 集成等工作流增强——这是「驾驶舱」。

两者解耦运行：CLI 工具升级新版本后，LoongCode 无需做任何改动；同样，LoongCode 界面的更新也不影响 CLI 的正常工作。

## 支持的平台

| 平台 | 架构 | 支持情况 |
|------|------|----------|
| Windows | x64 | 支持，含自动更新 |
| Windows | ARM64 | 支持，含自动更新 |
| macOS | Intel + Apple Silicon（通用包） | 支持 |
| Linux | — | 暂未发布 |

::: tip 不确定自己的 Windows 架构？
绝大多数近几年的电脑都是 x64。如果你使用的是搭载高通芯片的 Windows 笔记本（如 Surface Pro X），则选 ARM64。不确定就装 x64，ARM64 设备可以兼容运行 x64 版本。
:::
