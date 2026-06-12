# LoongCode 用户文档站设计

> 状态：已与用户逐节确认通过（2026-06-12）
> 基线版本：LoongCode v0.7.0

## 概述

为 LoongCode（基于 Tauri 2 + React 19 的桌面 Agent IDE，Claude Code CLI 的图形外壳）编写一套面向用户的详细使用说明，以独立仓库 `LoongCode0/docs` 维护，采用 VitePress 构建，发布到 GitHub Pages（`https://loongcode0.github.io/docs/`）。

本仓库（`loongcode_docs`）与源码仓库（`../longlong-ade`）完全分离；源码仓库中既有的文档 spec 不沿用，本设计为全新设计。

## 目标读者

- **主要**：零基础新用户——第一次接触 LoongCode、甚至第一次接触 AI 编程工具的用户。步骤详细、截图丰富、术语首次出现即解释。
- 文档语言：仅简体中文。

## 内容范围

覆盖四块（均已确认）：

1. 安装与快速上手
2. 全部功能详解
3. 设置与配置
4. FAQ 与故障排查

**非目标**：

- 不写开发者文档（构建、架构、贡献指南）
- 不写 API 文档
- 不写 Claude Code CLI 本身的教程——只讲到「装好并被 LoongCode 识别」为止，更深入的用法附官方文档链接

## 技术方案

- **框架**：VitePress（最新稳定版）+ 默认主题（自带侧边栏导航、本地中文全文搜索、深色模式、移动端适配）
- **包管理**：pnpm
- **部署**：不使用 GitHub Actions。本地构建，构建产物提交到 `main` 分支的 `docs/` 目录，GitHub Pages 配置为「`main` 分支 `/docs` 目录」发布
- **base 路径**：`/docs/`（与站点地址 `https://loongcode0.github.io/docs/` 匹配）

## 仓库布局

```
loongcode_docs/  (main 分支，远程 github.com/LoongCode0/docs)
├── README.md               # 仓库说明：本地预览/构建/发布方法
├── package.json            # vitepress 依赖 + docs:dev / docs:build 脚本
├── .gitignore              # node_modules、VitePress 缓存等
├── bin/
│   └── deploy.bat          # 一键发布：构建 + git add docs + 提交 + 推送 main
├── specs/                  # 设计文档（本文件）
├── src/                    # 文档源文件（VitePress srcDir）
│   ├── .vitepress/
│   │   └── config.mts      # 站点配置（导航/侧边栏/搜索/base/outDir）
│   ├── public/
│   │   └── images/         # 截图存放处（用户替换占位时使用）
│   └── …（所有 .md 页面）
└── docs/                   # 构建产物（含 .nojekyll），GitHub Pages 发布源
```

说明：因 `docs/` 被构建产物占用，文档源文件放 `src/`（VitePress 常规约定），设计 spec 放根目录 `specs/`。

## 发布流程

1. `pnpm docs:dev` — 本地实时预览
2. `pnpm docs:build` — 将 `src/` 构建输出到仓库根 `docs/`（VitePress `outDir` 指向 `../../docs`，并生成 `.nojekyll`）
3. `bin/deploy.bat` — 一键发布：构建 → `git add docs` → 提交 → 推送 `main`
4. GitHub 仓库 Settings → Pages：选择 `main` 分支 `/docs` 目录（一次性手动设置）

## 站点结构（25 页）

顶部导航：**入门指南 | 功能详解 | 设置与配置 | 参考**

```
src/
├── index.md                       # 首页：产品定位、核心亮点卡片、「快速开始」按钮，1 张主界面全景截图
│
├── guide/                         # ① 入门指南（零基础路径，按顺序读完即可上手）
│   ├── what-is-loongcode.md       # LoongCode 是什么：定位、与 Claude Code CLI 的关系、能做什么
│   ├── installation.md            # 安装：系统要求、Windows/macOS 安装步骤、未签名应用提示、自动更新
│   ├── prerequisites.md           # 前置依赖：Claude Code CLI 安装（含应用内一键安装）、API/账号准备
│   ├── quick-start.md             # 快速上手：首次启动 → 创建工作区 → 第一个任务 → 第一轮对话 → 看懂回复
│   └── interface-overview.md      # 界面导览：一张全局标注图 + 逐区域说明（任务栏/对话区/右侧栏/标题栏）
│
├── features/                      # ② 功能详解
│   ├── tasks-and-workspaces.md    # 任务与工作区：多工作区、任务状态、置顶/搜索/归档、未读提示
│   ├── multi-pane.md              # 多任务分屏：分屏布局、拖拽、左侧栏折叠
│   ├── conversation.md            # 对话面板：流式输出、Markdown 渲染、工具卡片、提问卡片、中断/分叉/编辑重跑
│   ├── files-and-editor.md        # 文件与编辑器：文件树、Monaco 编辑、Diff 对比、@文件、拖拽发送
│   ├── terminal.md                # 集成终端：PTY 终端、Agent 联动、环境变量
│   ├── git.md                     # Git 集成：分支/Worktree 切换与跟随、审查面板、AI 提交消息、提交菜单
│   ├── slash-commands.md          # 斜杠命令与文件面板：/ 命令来源、@ 文件引用
│   ├── checkpoints.md             # 代码检查点：快照与回滚
│   ├── subagents.md               # 子智能体：子 Agent 卡片、自定义 Agent
│   ├── permissions.md             # 权限与审批：权限模式、Plan 审批、交互式权限卡片
│   ├── browser.md                 # 浏览器标签页：内嵌 Webview、Agent 操作网页
│   └── usage-stats.md             # 使用统计：token 用量、热力图、趋势
│
├── settings/                      # ③ 设置与配置
│   ├── providers.md               # 模型供应商：内置 8 家 + 自定义供应商
│   ├── cli.md                     # CLI 设置：Claude/Codex 多 CLI、路径指定、任务级模型/推理强度
│   ├── mcp.md                     # MCP 服务器：添加/启停/排错
│   ├── plugins.md                 # 插件：市场安装、升级、启停
│   ├── skills.md                  # 技能：安装与管理
│   ├── bots.md                    # 机器人渠道：微信 / 飞书接入
│   ├── dependencies.md            # 依赖管理：一键安装 Claude/Codex/git、镜像加速
│   └── appearance.md              # 外观与语言：8 套主题、界面语言
│
└── reference/                     # ④ 参考
    ├── shortcuts.md               # 快捷键一览（表格：全局/对话/终端/编辑器）
    ├── faq.md                     # 常见问题（10-15 条）
    └── troubleshooting.md         # 故障排查：CLI 检测不到、任务报错、更新失败、输入法卡死等
```

## 内容规范

### 页面模板

- **功能页**（features/）：这是什么 → 在哪里打开 → 怎么用（分步） → 小技巧/注意事项
- **设置页**（settings/）：入口位置 → 配置项逐条说明 → 注意事项
- **指南页**（guide/）：按零基础用户的操作顺序逐步推进

### 写作风格

- 每个操作写成编号步骤，每步一个动作
- 菜单路径用「设置 → 模型供应商」格式；界面元素名加粗
- 不假设读者懂 AI 编程工具；术语（MCP、Worktree 等）首次出现时用一句话解释
- 善用 VitePress 容器：`::: tip`（技巧）、`::: warning`（注意）、`::: danger`（危险操作如回滚）

### 截图占位规范

- 统一图片语法：`![截图描述](...)`，括号内保留 `...`，用户后续替换为实际路径
- 描述写清三要素：**哪个界面 + 处于什么状态 + 需要突出什么区域**
  - 例：`![设置页-模型供应商列表，展开 deepseek 配置项，高亮 API Key 输入框](...)`
- 截图文件建议统一放 `src/public/images/`，替换时把 `...` 改为 `/images/xxx.png`
- 预计全站 35-45 张截图占位

### 信息来源与准确性

- 依据源码仓库（`../longlong-ade`）的 README.md、CLAUDE.md、25 份 Release Notes（v0.1.0–v0.7.0）及源码本身撰写
- 不确定的交互细节保守描述，禁止编造不存在的按钮/菜单
- 首页标注「本文档基于 LoongCode v0.7.0」

## 验收标准

1. `pnpm docs:build` 零报错（VitePress 自动检查站内死链）
2. 本地 `pnpm docs:dev` 检查：导航/侧边栏完整、搜索可用、移动端不破版
3. 25 个页面全部有实质内容，无 TODO/空壳页面
4. 推送后 `https://loongcode0.github.io/docs/` 可访问且样式正常（base 路径正确）

## 实施顺序

1. 初始化仓库骨架：package.json、VitePress 配置（base/outDir/导航/侧边栏）、.gitignore、README、bin/deploy.bat
2. 编写首页 + 入门指南（5 页，新用户第一印象，优先级最高）
3. 编写功能详解（12 页，逐模块）
4. 编写设置与配置（8 页）
5. 编写参考（3 页：快捷键/FAQ/故障排查）
6. 整体审校：构建零报错、链接、截图占位齐全
7. 构建并推送，配置 GitHub Pages，验证线上站点
