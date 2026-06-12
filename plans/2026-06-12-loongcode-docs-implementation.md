# LoongCode 用户文档站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在本仓库（`D:\Codes\loongcode_docs`，远程 `github.com/LoongCode0/docs`）建成一个 VitePress 中文用户文档站（29 页），本地构建输出到 `docs/`，由 GitHub Pages 从 `main:/docs` 发布。

**Architecture:** 文档源文件在 `src/`（VitePress srcDir），构建产物输出到仓库根 `docs/`。Task 1 先搭好骨架并创建全部 29 个占位页，保证从第一天起 `pnpm docs:build` 始终通过（站内死链检查即「测试」）；后续任务逐批把占位页填成正文，每批构建验证 + 提交。

**Tech Stack:** VitePress 1.x（默认主题 + 本地搜索）、pnpm、GitHub Pages（main 分支 /docs 目录）。

**对 spec 的一处修正**（基于源码核实）：spec 中的 `settings/appearance.md`（主题与语言）调整为 `settings/general.md`（**常规设置**）。因为实际应用中主题/语言只是「设置 → 常规」里的两项，该分区还包含数据目录、CLI 命令、网络代理、环境变量、提示音、回合代码快照、自动压缩、自动归档等必须文档化的配置。总页数不变（29）。

**写作总规范（所有内容任务共用，不再重复）：**

- 简体中文；零基础读者；术语首次出现用一句话解释
- 操作写编号步骤，每步一个动作；菜单路径用「设置 → 模型供应商」格式；界面元素名**加粗**
- 界面文案必须与源码 i18n 字典一致（见附录 A），禁止编造不存在的按钮/菜单；不确定的细节保守描述
- 截图占位统一 `![截图描述](...)`，描述含三要素：哪个界面 + 什么状态 + 突出什么区域
- 善用容器：`::: tip` / `::: warning` / `::: danger`
- 功能页模板：**这是什么 → 在哪里打开 → 怎么用（分步）→ 小技巧/注意事项**
- 设置页模板：**入口位置 → 配置项逐条说明 → 注意事项**
- 版本基线 v0.7.0，不写开发者文档，不写 Claude Code CLI 教程（附官方链接）

---

### Task 1: 仓库骨架 + VitePress 初始化 + 29 个占位页

**Files:**
- Create: `package.json`、`.gitignore`、`README.md`、`bin/deploy.bat`
- Create: `src/.vitepress/config.mts`、`src/public/.nojekyll`、`src/public/images/.gitkeep`
- Create: 29 个 `.md` 占位页（路径见 config 侧边栏，与之一一对应）

- [ ] **Step 1: 写 package.json**

```json
{
  "name": "loongcode-docs",
  "private": true,
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev src",
    "docs:build": "vitepress build src",
    "docs:preview": "vitepress preview src"
  }
}
```

- [ ] **Step 2: 写 .gitignore**

```
node_modules/
src/.vitepress/cache/
src/.vitepress/dist/
```

注意：根目录 `docs/` 是发布产物，**不要**忽略。

- [ ] **Step 3: 安装 VitePress**

Run: `pnpm add -D vitepress`
Expected: devDependencies 中出现 `vitepress`（1.6+），生成 `pnpm-lock.yaml`

- [ ] **Step 4: 写 src/.vitepress/config.mts（完整内容）**

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LoongCode 使用文档',
  description: 'LoongCode 桌面 Agent IDE 详细使用说明（基于 v0.7.0）',
  base: '/docs/',
  outDir: '../docs',
  themeConfig: {
    nav: [
      { text: '入门指南', link: '/guide/what-is-loongcode' },
      { text: '功能详解', link: '/features/tasks-and-workspaces' },
      { text: '设置与配置', link: '/settings/general' },
      { text: '参考', link: '/reference/shortcuts' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: 'LoongCode 是什么', link: '/guide/what-is-loongcode' },
            { text: '安装', link: '/guide/installation' },
            { text: '前置依赖', link: '/guide/prerequisites' },
            { text: '快速上手', link: '/guide/quick-start' },
            { text: '界面导览', link: '/guide/interface-overview' }
          ]
        }
      ],
      '/features/': [
        {
          text: '功能详解',
          items: [
            { text: '任务与工作区', link: '/features/tasks-and-workspaces' },
            { text: '多任务分屏', link: '/features/multi-pane' },
            { text: '对话面板', link: '/features/conversation' },
            { text: '文件与编辑器', link: '/features/files-and-editor' },
            { text: '集成终端', link: '/features/terminal' },
            { text: 'Git 集成', link: '/features/git' },
            { text: '斜杠命令与文件面板', link: '/features/slash-commands' },
            { text: '代码检查点', link: '/features/checkpoints' },
            { text: '子智能体', link: '/features/subagents' },
            { text: '权限与审批', link: '/features/permissions' },
            { text: '浏览器标签页', link: '/features/browser' },
            { text: '使用统计', link: '/features/usage-stats' }
          ]
        }
      ],
      '/settings/': [
        {
          text: '设置与配置',
          items: [
            { text: '常规设置', link: '/settings/general' },
            { text: 'CLI 与任务配置', link: '/settings/cli' },
            { text: '模型供应商', link: '/settings/providers' },
            { text: 'MCP 服务器', link: '/settings/mcp' },
            { text: '插件', link: '/settings/plugins' },
            { text: '技能', link: '/settings/skills' },
            { text: '机器人渠道', link: '/settings/bots' },
            { text: '依赖管理', link: '/settings/dependencies' }
          ]
        }
      ],
      '/reference/': [
        {
          text: '参考',
          items: [
            { text: '快捷键一览', link: '/reference/shortcuts' },
            { text: '常见问题', link: '/reference/faq' },
            { text: '故障排查', link: '/reference/troubleshooting' }
          ]
        }
      ]
    },
    search: { provider: 'local' },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    socialLinks: [{ icon: 'github', link: 'https://github.com/LoongCode0/docs' }]
  }
})
```

- [ ] **Step 5: 创建 src/public/.nojekyll（空文件）和 src/public/images/.gitkeep（空文件）**

`.nojekyll` 构建时会被复制到 `docs/` 根，防止 GitHub Pages 走 Jekyll 流程。

- [ ] **Step 6: 创建 29 个占位页**

`src/index.md` 占位内容：

```md
# LoongCode 使用文档

> 本页内容编写中。
```

其余 28 页按 config 侧边栏路径创建（`src/guide/*.md` 5 个、`src/features/*.md` 12 个、`src/settings/*.md` 8 个、`src/reference/*.md` 3 个），每页内容统一为：

```md
# <对应侧边栏中文标题>

> 本页内容编写中。
```

- [ ] **Step 7: 构建验证（这是本计划的「测试」）**

Run: `pnpm docs:build`
Expected: `build complete`，无 dead link 报错；仓库根出现 `docs/` 目录且含 `.nojekyll`、`index.html`

- [ ] **Step 8: 写 bin/deploy.bat**

```bat
@echo off
setlocal
cd /d "%~dp0.."
echo [1/3] Building site...
call pnpm docs:build
if errorlevel 1 (
  echo Build failed, aborting.
  exit /b 1
)
echo [2/3] Committing build output...
git add docs
git diff --cached --quiet && echo Nothing to deploy. && exit /b 0
git commit -m "docs: 更新站点构建产物"
echo [3/3] Pushing to main...
git push origin main
endlocal
```

- [ ] **Step 9: 写 README.md**

内容必须包含：项目简介（LoongCode 用户文档站）、本地预览（`pnpm install` + `pnpm docs:dev`）、构建（`pnpm docs:build` → 输出到 `docs/`）、发布（先提交 `src/` 源文件改动，再运行 `bin\deploy.bat`）、GitHub Pages 一次性设置说明（Settings → Pages → Deploy from a branch → `main` + `/docs`）、目录结构说明（src=源文件 / docs=构建产物 / specs+plans=设计文档）。

- [ ] **Step 10: 提交**

```bash
git add -A
git commit -m "feat: VitePress 站点骨架与 29 个占位页"
```

---

### Task 2: 首页 index.md

**Files:**
- Modify: `src/index.md`（替换占位内容）

- [ ] **Step 1: 用 hero 布局写首页（完整内容如下，details 文字可在此基础上润色但不得改变事实）**

```md
---
layout: home

hero:
  name: LoongCode
  text: 桌面 Agent IDE
  tagline: 把 Claude Code 与 Codex 装进图形界面——多任务并行、终端、文件、Git 一站式 AI 编程工作台
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quick-start
    - theme: alt
      text: LoongCode 是什么？
      link: /guide/what-is-loongcode
    - theme: alt
      text: 下载安装
      link: /guide/installation

features:
  - icon: 💬
    title: 多任务并行对话
    details: 多个 AI 任务分屏并行，实时流式输出，思考过程、工具调用、代码改动一目了然。
  - icon: 🗂️
    title: 工作区与文件管理
    details: 按项目组织任务，内置文件树与 Monaco 编辑器，@ 一下就能把文件喂给 AI。
  - icon: 🔀
    title: 深度 Git 集成
    details: 分支/Worktree 切换、变更审查面板、AI 一键生成提交消息。
  - icon: 🤖
    title: 双 CLI 引擎
    details: 同时支持 Claude Code 与 OpenAI Codex，每个任务可独立选择 CLI、模型与权限模式。
  - icon: 🧩
    title: 可扩展
    details: MCP 服务器、插件市场、技能、子智能体，按需扩展 AI 的能力边界。
  - icon: 📱
    title: 跨出桌面
    details: 接入微信 / 飞书机器人，离开电脑也能驱动任务继续跑。
---

::: info 版本说明
本文档基于 **LoongCode v0.7.0** 编写。
:::

![LoongCode 主界面全景：左侧任务栏 + 中央对话区 + 右侧文件/终端面板，正在运行一个编码任务](...)
```

- [ ] **Step 2: 构建验证**

Run: `pnpm docs:build`
Expected: `build complete`，无报错

- [ ] **Step 3: 提交**

```bash
git add src/index.md
git commit -m "docs: 编写首页"
```

---

### Task 3: 入门指南（一）—— what-is-loongcode / installation / prerequisites

**Files:**
- Modify: `src/guide/what-is-loongcode.md`、`src/guide/installation.md`、`src/guide/prerequisites.md`

**素材（先读再写）：**
- `D:\Codes\longlong-ade\README.md`、`D:\Codes\longlong-ade\CLAUDE.md`（开头架构部分）
- `D:\Codes\longlong-ade\docs\release-install-notes.md`（未签名应用的安装提示）
- `D:\Codes\longlong-ade\docs\RELEASE_NOTES_0.1.0.md`（产品定位）、`RELEASE_NOTES_0.2.5.md`（多平台包）、`RELEASE_NOTES_0.7.0.md`（Codex 支持）
- `D:\Codes\longlong-ade\src\i18n\surfaces\settingsDeps.ts`、`settingsGeneral.ts`（依赖管理/CLI 命令的确切文案）

- [ ] **Step 1: 写 what-is-loongcode.md**

大纲（H2）：
1. **LoongCode 是什么** —— 桌面 Agent IDE；把命令行的 Claude Code / Codex 图形化
2. **它是如何工作的** —— 不直接调用模型 API；本地拉起 `claude` / `codex` CLI 子进程并通信（一句话原理 + 一张示意说明，无需截图）
3. **能用它做什么** —— 对照首页 6 个亮点逐条展开一段话
4. **与 Claude Code / Codex 的关系** —— CLI 是引擎、LoongCode 是驾驶舱；CLI 升级不影响使用
5. **支持的平台** —— Windows x64/ARM64、macOS（Intel + Apple Silicon）；Linux 暂未发布

截图占位 1 张：主界面全景。

- [ ] **Step 2: 写 installation.md**

大纲（H2）：
1. **系统要求** —— 操作系统列表；需可联网；磁盘空间建议
2. **Windows 安装** —— 下载 `.exe`（NSIS）→ 双击 → 步骤；SmartScreen「未知发布者」提示的处理（来自 release-install-notes.md，照实写）
3. **macOS 安装** —— 下载 `.dmg` → 拖入应用程序；「无法验证开发者」时右键打开或执行 `xattr -cr`（命令照 release-install-notes.md 原样给出）
4. **自动更新** —— 仅 Windows；右上角出现**更新**徽标 → 点击 → 确认重启
5. **卸载** —— Windows 控制面板卸载 / macOS 删除应用；数据目录位置提示（`~/.config/loongcode/`）

截图占位 4 张：Windows 安装向导、macOS 拖入安装、SmartScreen 提示、更新徽标。

- [ ] **Step 3: 写 prerequisites.md**

大纲（H2）：
1. **为什么需要 CLI** —— LoongCode 是图形外壳，引擎是 Claude Code CLI（必装）或 Codex CLI（可选）
2. **方式一：应用内一键安装（推荐）** —— 「设置 → 依赖管理」：自动检测、一键安装 Claude/Codex/git、安装来源选择（官方脚本/GitHub/镜像加速）；步骤化描述，文案以 `settingsDeps.ts` 为准
3. **方式二：手动安装** —— 给 Anthropic / OpenAI 官方安装文档链接；装好后 LoongCode 启动时在 PATH 自动发现
4. **手动指定 CLI 路径** —— 「设置 → 常规 → CLI 命令」可改用自定义命令/路径
5. **账号与 API 准备** —— 两条路：CLI 官方登录，或在「设置 → 模型供应商」配置第三方供应商（细节链接到 /settings/providers）

截图占位 2 张：依赖管理页检测结果、一键安装进行中。

- [ ] **Step 4: 构建验证**

Run: `pnpm docs:build` — Expected: `build complete`

- [ ] **Step 5: 提交**

```bash
git add src/guide
git commit -m "docs: 入门指南——产品介绍/安装/前置依赖"
```

---

### Task 4: 入门指南（二）—— quick-start / interface-overview

**Files:**
- Modify: `src/guide/quick-start.md`、`src/guide/interface-overview.md`

**素材：**
- `D:\Codes\longlong-ade\src\onboarding\tourChapters.ts`、`src\i18n\surfaces\onboarding.ts`（5 章导览的确切章节与步骤文案）
- `src\i18n\surfaces\shell.ts`（「＋ 新建任务」、草稿文案、输入框占位符）
- `src\components\SelectorBar.tsx`（CLI/思考深度/执行授权的确切选项值）
- 附录 A 的「任务创建文案」「Onboarding 章节」表

- [ ] **Step 1: 写 quick-start.md**

大纲（H2，全程按零基础用户第一次打开应用的时间线）：
1. **首次启动：跟着新手引导走** —— 介绍内置 5 章导览（起步/看代码/进阶选项/Git/设置），可跳过、可在「设置 → 常规 → 使用引导」重开
2. **第 1 步：打开工作区** —— 用引导提供的**打开示例工作区**，或自选本地项目文件夹；解释「工作区 = 项目文件夹」
3. **第 2 步：新建任务** —— 点左侧栏底部「**＋ 新建任务**」→ 进入草稿态；解释「任务 = 一次独立的 AI 会话」
4. **第 3 步：配置任务（可全部保持默认）** —— 逐项说明：CLI（Claude CLI / Codex CLI）、模型、思考深度（low/medium/high/xhigh/max/ultracode）、执行授权（default/plan/acceptEdits/bypassPermissions）、工作区、分支；新手建议默认值 + 提示「新建任务会记住上次配置」
5. **第 4 步：发送第一条消息** —— 输入框占位符原文「向 Claude 提问，输入 @ 添加文件，/ 使用命令，$ 使用技能」；给一个示例提问
6. **第 5 步：看懂 AI 的回复** —— 流式文字、思考块、工具卡片（读文件/改代码 Diff）、需要你点头的提问卡片；任务状态颜色（运行中/成功/出错/提问中）
7. **下一步** —— 链接到界面导览与功能详解

截图占位 5 张：新手引导首屏、新建任务草稿态、配置下拉展开、首条消息流式回复、提问卡片。

- [ ] **Step 2: 写 interface-overview.md**

大纲：开头 1 张全局标注大图（占位描述要求「主界面，用数字 ①-⑥ 标注各区域」），然后每个区域一个 H2：
1. **① 左侧任务栏** —— 工作区树、任务列表（状态色点、未读）、搜索、归档入口、「＋ 新建任务」；悬浮 Logo 可折叠（v0.7.0）
2. **② 顶部标题栏** —— 当前工作区/分支切换器、提交菜单、更新徽标位置
3. **③ 中央对话区** —— 消息流、工具卡片、分屏时的多 pane
4. **④ 输入框** —— 选择器条（CLI/模型/思考深度/授权）、上下文用量指示、@ / / / $ 触发
5. **⑤ 右侧面板** —— 文件树、编辑器、终端、浏览器、审查、Todo 各标签
6. **⑥ 设置入口** —— 在哪里打开设置（指向设置章节）

截图占位 1 张（标注大图）。

- [ ] **Step 3: 构建验证**

Run: `pnpm docs:build` — Expected: `build complete`

- [ ] **Step 4: 提交**

```bash
git add src/guide
git commit -m "docs: 入门指南——快速上手/界面导览"
```

---

### Task 5: 功能详解（一）—— tasks-and-workspaces / multi-pane / conversation

**Files:**
- Modify: `src/features/tasks-and-workspaces.md`、`src/features/multi-pane.md`、`src/features/conversation.md`

**素材：**
- `src\i18n\surfaces\shell.ts`、`contextMenu.ts`（任务行右键、归档、置顶文案）
- `src\i18n\surfaces\chat.ts`、`composer.ts`（思考块、权限卡、上下文用量、压缩）
- Release Notes：0.4.2（草稿态/最近活动排序）、0.4.3（归档）、0.6.0（分屏）、0.6.1（拖拽停靠）、0.6.2（分栏继承工作区）、0.7.0（左侧栏折叠/运行时长）、0.3.1（思考块/上下文超限恢复）、0.4.1（优雅中断）、0.2.6（编辑消息回滚）、0.3.0（链接就地打开）

每页按功能页模板写。要点：

- [ ] **Step 1: 写 tasks-and-workspaces.md**

要点：工作区添加/切换（树形侧栏）；任务生命周期与状态色（空闲/运行中/成功/出错/提问中，提问中蓝色高亮）；任务按最近活动排序；置顶；搜索；归档（手动 + 自动归档可在常规设置配置）与归档视图找回；未读提示；删除与复制任务（右键菜单）。截图约 2 张。

- [ ] **Step 2: 写 multi-pane.md**

要点：什么是分屏（多个任务/草稿并排）；Ctrl+N 新建草稿分栏；拖拽分栏停靠/交换位置；关闭分栏与 Ctrl+Shift+T 复活；新建分栏继承当前工作区；左侧任务栏折叠（悬浮 Logo）腾出空间。截图约 2 张。

- [ ] **Step 3: 写 conversation.md**

要点：流式输出与运行时长指示；Markdown 渲染（表格/代码高亮/链接就地打开）；思考块（可展开）；工具调用卡片（读文件/写文件/编辑 Diff/网络搜索/子 Agent 子卡片——子 Agent 细节链接 /features/subagents）；AskUserQuestion 提问卡片（单选/多选/其他）；上下文用量指示器与手动压缩；中断当前轮（优雅停止）；编辑历史消息重跑（可连带回滚代码，链接 /features/checkpoints）；会话分叉；重启应用后历史完整还原。截图约 3 张。

- [ ] **Step 4: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/features
git commit -m "docs: 功能详解——任务工作区/分屏/对话面板"
```

---

### Task 6: 功能详解（二）—— files-and-editor / terminal / git

**Files:**
- Modify: `src/features/files-and-editor.md`、`src/features/terminal.md`、`src/features/git.md`

**素材：**
- `src\i18n\surfaces\files.ts`、`terminalBrowser.ts`、`review.ts`、`dialogs.ts`、`contextMenu.ts`
- Release Notes：0.3.2（拖拽外部文件）、0.2.0（worktree 跟随）、0.5.0（AI 提交消息）
- 附录 A 快捷键表（文件树/编辑器/终端部分）

- [ ] **Step 1: 写 files-and-editor.md**

要点：右侧文件树（实时变更监听）；双击打开 Monaco 编辑器（语法高亮、Ctrl+S 保存）；Diff 对比视图；Markdown 预览；文件树右键菜单与剪贴板快捷键（Ctrl+C/X/V、Delete）；Ctrl+P 文件搜索面板；对话中 @ 引用文件；从系统拖文件进输入框。截图约 2 张。

- [ ] **Step 2: 写 terminal.md**

要点：Ctrl+` 打开/关闭；真实 PTY 终端（可跑交互式命令）；AI 与终端联动（Agent 执行命令、读取输出）；环境变量注入（全局环境变量在常规设置）。截图约 1 张。

- [ ] **Step 3: 写 git.md**

要点：标题栏分支/Worktree 统一切换器（搜索分支 / worktree）；Agent 创建 worktree 时任务自动跟随（文件树/终端/审查全部切过去）；审查面板（文件 Diff、+N −M 统计、未推送计数）；AI 一键生成提交消息；提交菜单（暂存+提交）；回滚变更确认框（`::: danger` 提示不可逆）。截图约 3 张。

- [ ] **Step 4: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/features
git commit -m "docs: 功能详解——文件编辑/终端/Git"
```

---

### Task 7: 功能详解（三）—— slash-commands / checkpoints / subagents

**Files:**
- Modify: `src/features/slash-commands.md`、`src/features/checkpoints.md`、`src/features/subagents.md`

**素材：**
- Release Notes：0.5.2（命令面板双徽标、子智能体可视化管理）、0.2.6（编辑消息回滚代码）
- `src\i18n\surfaces\settingsSubagents.ts`、`settingsGeneral.ts`（回合代码快照开关文案）

- [ ] **Step 1: 写 slash-commands.md**

要点：输入框三种触发——`/` 命令面板（聚合 user/project/plugin/skill/builtin 命令，带来源徽标，可搜索）、`@` 文件引用面板、`$` 技能调用；各给一个使用示例。截图约 1 张。

- [ ] **Step 2: 写 checkpoints.md**

要点：「回合代码快照」是什么（每轮对话前自动快照工作区代码）；开关位置「设置 → 常规」；如何回滚——编辑历史消息重跑时选择连带回滚代码；`::: danger` 回滚会丢弃之后的代码改动。截图约 1 张。

- [ ] **Step 3: 写 subagents.md**

要点：什么是子智能体（主 Agent 派生的专项 Agent）；对话中子 Agent 输出自动折叠成子卡片，点击展开；「设置 → 子智能体」可视化管理自定义 Agent（新建/编辑提示词）。截图约 1 张。

- [ ] **Step 4: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/features
git commit -m "docs: 功能详解——斜杠命令/检查点/子智能体"
```

---

### Task 8: 功能详解（四）—— permissions / browser / usage-stats

**Files:**
- Modify: `src/features/permissions.md`、`src/features/browser.md`、`src/features/usage-stats.md`

**素材：**
- `src\i18n\surfaces\chat.ts`（权限请求卡片、计划批准文案）、`SelectorBar.tsx`（授权选项）
- Release Notes：0.3.0（内嵌浏览器/选元素加入聊天）、0.4.2（浏览器多标签全局化）、0.6.4（浏览器面板修复）
- `src\i18n\surfaces\settingsUsage.ts`

- [ ] **Step 1: 写 permissions.md**

要点：为什么有权限（AI 改文件/执行命令前需授权）；四种 Claude 授权模式逐条解释（default 每次询问 / plan 先出计划再批准 / acceptEdits 自动接受编辑 / bypassPermissions 全自动，`::: warning` 风险提示）；Codex 的三档（只读/自动/完全访问）；对话中的权限请求卡片与计划批准卡片怎么操作。截图约 2 张。

- [ ] **Step 2: 写 browser.md**

要点：内嵌浏览器标签页（右侧面板）；多标签；选取网页元素加入聊天（把页面内容喂给 AI）；AI 回复中的链接就地打开；Agent 可操作网页。截图约 1 张。

- [ ] **Step 3: 写 usage-stats.md**

要点：「设置 → 使用统计」入口；按日期 × 模型聚合的 token 用量表；活跃热力图；用量趋势；用途（成本核对）。截图约 1 张。

- [ ] **Step 4: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/features
git commit -m "docs: 功能详解——权限/浏览器/使用统计"
```

---

### Task 9: 设置与配置（一）—— general / cli / providers / dependencies

**Files:**
- Modify: `src/settings/general.md`、`src/settings/cli.md`、`src/settings/providers.md`、`src/settings/dependencies.md`

**素材：**
- `src\i18n\surfaces\settingsGeneral.ts`（常规设置每一项的确切文案——逐项照抄）
- `src\i18n\surfaces\settingsProviders.ts`、`settingsDeps.ts`
- `src\components\settings\GeneralSettings.tsx`、`modelProviders\ModelProvidersSettings.tsx`、`dependencies\DependenciesSettings.tsx`（核对配置项与默认值）
- Release Notes：0.2.6（8 套主题）、0.5.1（中英双语）、0.5.2（上下文窗口默认值）、0.6.3（安装来源选择器）、0.6.5（Fable 档位、git 镜像加速）、0.7.0（Codex 设置）

- [ ] **Step 1: 写 general.md（常规设置）**

按设置页模板逐项写：主题（8 套，列出名字）、语言（中文/English）、数据目录、CLI 命令、网络代理、环境变量、提示音、回合代码快照、自动压缩、自动归档、使用引导（重开新手导览）。每项：作用 + 怎么改 + 默认值。截图约 2 张。

- [ ] **Step 2: 写 cli.md（CLI 与任务配置）**

要点：双 CLI 概念（Claude / Codex 任务可混用）；任务级配置（每个任务独立记忆 CLI/模型/思考深度/授权）；Claude 模型档位（含 Fable）与思考深度全档位列表；Codex 推理档位（minimal/low/medium/high/xhigh）；CLI 路径自动发现与手动指定（链接 general 的 CLI 命令项）。截图约 1 张。

- [ ] **Step 3: 写 providers.md（模型供应商）**

要点：作用（不用官方账号、走第三方 API）；内置供应商列表（从 `settingsProviders.ts`/组件中照实列出 8 家）；添加供应商步骤（API Key、Base URL）；自定义供应商；模型上下文窗口默认值；`::: warning` API Key 保密。截图约 2 张。

- [ ] **Step 4: 写 dependencies.md（依赖管理）**

要点：自动检测 Claude/Codex/git 与版本显示；一键安装/升级；安装来源选择（官方/GitHub/镜像加速，国内网络建议）；安装失败信息保留便于排错（链接 /reference/troubleshooting）。截图约 1 张。

- [ ] **Step 5: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/settings
git commit -m "docs: 设置——常规/CLI/供应商/依赖管理"
```

---

### Task 10: 设置与配置（二）—— mcp / plugins / skills / bots

**Files:**
- Modify: `src/settings/mcp.md`、`src/settings/plugins.md`、`src/settings/skills.md`、`src/settings/bots.md`

**素材：**
- `src\i18n\surfaces\settingsSkillsMcp.ts`、`settingsPlugins.ts`、`settingsBots.ts`
- `src\components\settings\McpServersSettings.tsx`、`PluginsSettings.tsx`、`SkillsSettings.tsx`
- Release Notes：0.5.0（微信 ClawBot）、0.6.0（飞书）

- [ ] **Step 1: 写 mcp.md**

要点：MCP 一句话解释（让 AI 连接外部工具/数据源的协议）；添加 MCP 服务器步骤（名称/命令/参数）；启用/停用；常见问题（启动失败看哪里）。截图约 1 张。

- [ ] **Step 2: 写 plugins.md**

要点：插件市场浏览/搜索；安装/升级/启停；插件提供的命令在 `/` 面板带 plugin 徽标。截图约 1 张。

- [ ] **Step 3: 写 skills.md**

要点：技能是什么（预置的专项工作流）；安装与管理；对话中用 `$` 或 `/` 调用。截图约 1 张。

- [ ] **Step 4: 写 bots.md**

要点：用途（离开电脑用 IM 驱动任务）；微信接入步骤（照 `settingsBots.ts` 文案与 0.5.0 说明，保守描述）；飞书接入步骤（0.6.0）；`::: warning` 安全提醒（消息可驱动 AI 操作你的代码）。截图约 2 张。

- [ ] **Step 5: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/settings
git commit -m "docs: 设置——MCP/插件/技能/机器人"
```

---

### Task 11: 参考 —— shortcuts / faq / troubleshooting

**Files:**
- Modify: `src/reference/shortcuts.md`、`src/reference/faq.md`、`src/reference/troubleshooting.md`

**素材：** 附录 A 快捷键表；Release Notes 0.3.1（上下文超限自动恢复）、0.6.1（Windows 输入法硬冻修复）、0.6.2（并发流式修复）；`docs\release-install-notes.md`

- [ ] **Step 1: 写 shortcuts.md**

按作用域分四个表格（快捷键 | 功能）：

全局：Ctrl+N 新建草稿分栏 / Ctrl+Shift+T 复活最近关闭的分栏 / Ctrl+P 文件搜索 / Ctrl+` 开关终端
文件树：Delete 删除 / Ctrl+C 复制 / Ctrl+X 剪切 / Ctrl+V 粘贴
编辑器：Ctrl+S 保存
文本编辑通用：Ctrl+A 全选 / Ctrl+Z 撤销 / Ctrl+C/X/V

注明 macOS 用 Cmd 替代 Ctrl。无截图。

- [ ] **Step 2: 写 faq.md（12 条，每条 H3 + 简答 + 相关链接）**

固定题目清单：
1. LoongCode 是免费的吗？需要什么账号？
2. 检测不到 Claude CLI 怎么办？
3. Claude 和 Codex 任务可以同时用吗？
4. 我的对话数据存在哪里？（`~/.config/loongcode/` 本地 SQLite）
5. 自动更新支持哪些平台？（仅 Windows；macOS 手动下载）
6. macOS 提示「无法验证开发者」怎么办？
7. 怎么切换界面语言/主题？
8. 归档的任务去哪了，怎么找回？
9. 上下文满了怎么办？（自动压缩 + 手动压缩按钮）
10. 如何重新打开新手引导？（设置 → 常规 → 使用引导）
11. token 用量在哪里看？
12. 支持 Linux 吗？

- [ ] **Step 3: 写 troubleshooting.md（每个问题 H2：现象 → 原因 → 解决步骤）**

固定问题清单：
1. CLI 未被识别 / 任务无法启动（PATH 检查 → 依赖管理重装 → 手动指定 CLI 命令）
2. 任务报错或卡住（中断重试 → 上下文超限会自动恢复 → 查看错误卡片）
3. 更新失败（手动下载安装包覆盖安装）
4. Windows 下输入法导致界面卡死（旧版搜狗输入法问题已在 0.6.1 修复，请升级到最新版）
5. 依赖安装失败（看保留的失败日志 → 换安装来源/镜像 → 检查代理）
6. 网络问题（设置 → 常规 → 网络代理）

- [ ] **Step 4: 构建验证 + 提交**

Run: `pnpm docs:build` — Expected: `build complete`

```bash
git add src/reference
git commit -m "docs: 参考——快捷键/FAQ/故障排查"
```

---

### Task 12: 整体审校 + 构建发布 + GitHub Pages 上线

**Files:**
- Modify: 全站审校中发现的问题页
- Create/Update: `docs/`（构建产物）

- [ ] **Step 1: 占位页扫描（必须为 0）**

Run: `grep -rn "本页内容编写中" src`
Expected: 无输出

- [ ] **Step 2: 截图占位统计（应在 35-45 张左右）**

Run: `grep -rno "!\[[^]]*\](\.\.\.)" src | wc -l`（PowerShell 可用 `(Select-String -Path src -Pattern '\]\(\.\.\.\)' -Recurse).Count` 等价替代）
Expected: 计数在 35-50 区间；同时抽查 10 条描述是否含「界面+状态+突出区域」三要素

- [ ] **Step 3: 全站构建 + 本地预览检查**

Run: `pnpm docs:build`（Expected: `build complete`，零 dead link 报错）
Run: `pnpm docs:preview`，浏览器检查：四个顶部导航可达、侧边栏 29 页齐全、本地搜索中文可用、深色模式正常、窄窗口不破版

- [ ] **Step 4: 提交源文件 + 构建产物**

```bash
git add -A
git commit -m "docs: 全站审校与首次完整构建"
```

- [ ] **Step 5: 创建远程仓库并推送（需要用户 GitHub 权限，若 gh 未登录则提示用户手动建仓）**

```bash
gh repo create LoongCode0/docs --public --source . --push
```

若 `gh` 不可用，改为提示用户在 GitHub 网页新建 `LoongCode0/docs` 空仓库后执行：

```bash
git remote add origin https://github.com/LoongCode0/docs.git
git push -u origin main
```

- [ ] **Step 6: 配置 GitHub Pages（一次性手动操作，告知用户）**

GitHub 仓库 → Settings → Pages → Build and deployment → Source 选 **Deploy from a branch** → Branch 选 `main` + `/docs` → Save。

- [ ] **Step 7: 验证线上站点**

等待 Pages 部署完成后访问 `https://loongcode0.github.io/docs/`：首页样式正常（base 路径正确）、任意内页可达、搜索可用。
Expected: 全部正常；若样式 404 检查 config.mts 的 `base` 是否为 `/docs/`

- [ ] **Step 8: 收尾提交（如有修正）**

```bash
git add -A
git commit -m "docs: 上线后修正"
git push
```

---

## 附录 A：素材速查表（已核实，写作时直接引用）

### 关键 i18n 文件（确切界面文案的唯一可信来源）

| 文件（均在 `D:\Codes\longlong-ade\src\i18n\surfaces\`） | 内容 |
|---|---|
| `common.ts` | 通用按钮（取消/确认/保存/删除…） |
| `shell.ts` | 侧栏/任务列表/新建任务/分支切换/终端开关 |
| `composer.ts` | 输入框、模型选择、上下文用量、压缩 |
| `chat.ts` | 权限卡、计划批准、思考块、运行时长 |
| `dialogs.ts` | 提交对话框、回滚确认 |
| `settingsGeneral.ts` / `settingsDeps.ts` / `settingsProviders.ts` / `settingsPlugins.ts` / `settingsSkillsMcp.ts` / `settingsUsage.ts` / `settingsBots.ts` / `settingsSubagents.ts` | 各设置分区全部文案 |
| `onboarding.ts` | 新手引导 5 章 32 步文案 |
| `review.ts` / `files.ts` / `terminalBrowser.ts` / `contextMenu.ts` | 审查面板/文件操作/终端浏览器/右键菜单 |

### 设置分区（确切名称与组件）

常规 / 依赖管理 / 模型供应商 / 插件 / 技能 / MCP 服务器 / 子智能体 / 使用统计
（组件在 `src\components\settings\`，侧栏定义在 `src\components\SettingsSidebar.tsx`）

### 任务创建文案（已核实）

- 新建按钮：「**＋ 新建任务**」（左侧栏底部）
- 输入框占位符：「向 Claude 提问，输入 @ 添加文件，/ 使用命令，$ 使用技能」
- CLI 选项：`Claude CLI` / `Codex CLI`（`SelectorBar.tsx`）
- Claude 思考深度：low / medium / high / xhigh / max / ultracode
- Codex 推理档位：minimal / low / medium / high / xhigh
- Claude 执行授权：default / plan / acceptEdits / bypassPermissions
- Codex 执行授权：只读 / 自动 / 完全访问

### 快捷键（来源：`src\App.tsx:301-464`、`MonacoCodeEditor.tsx`、`shell.ts`、`contextMenu/`）

| 快捷键 | 功能 | 作用域 |
|---|---|---|
| Ctrl+N | 新建草稿分栏 | 全局 |
| Ctrl+Shift+T | 复活最近关闭的分栏 | 全局 |
| Ctrl+P | 文件搜索面板 | 全局 |
| Ctrl+` | 打开/关闭终端 | 全局 |
| Ctrl+S | 保存当前文件 | 编辑器 |
| Delete / Ctrl+C / Ctrl+X / Ctrl+V | 删除/复制/剪切/粘贴 | 文件树 |
| Ctrl+A / Ctrl+Z | 全选 / 撤销 | 文本编辑 |

（macOS 一律 Cmd 替代 Ctrl）

### Onboarding 5 章（`src\onboarding\tourChapters.ts`）

起步(5 步：欢迎→打开示例工作区→新建任务→配置→首条消息) / 看代码(4 步) / 进阶选项(3 步：模型→思考深度→执行授权) / Git(2 步) / 设置(6 步)

### 版本功能索引（写各功能页时核对细节用，文件在 `D:\Codes\longlong-ade\docs\`）

| 版本 | 关键功能 |
|---|---|
| 0.2.0 | Worktree 侦测与自动跟随 |
| 0.2.6 | 8 套主题、编辑消息回滚代码 |
| 0.3.0 | 内嵌浏览器、选网页元素加入聊天、链接就地打开 |
| 0.3.1 | 思考块、上下文超限自动恢复 |
| 0.3.2 | 上下文用量指示、依赖一键安装、新手引导、拖拽外部文件 |
| 0.4.0 | 右键菜单、依赖版本管理、记住上次任务配置 |
| 0.4.1 | 优雅中断、全局环境变量 |
| 0.4.2 | 草稿态、浏览器多标签、最近活动排序 |
| 0.4.3 | 任务归档（手动+自动+归档视图） |
| 0.5.0 | 微信机器人、AI 提交消息 |
| 0.5.1 | 中英双语界面 |
| 0.5.2 | 子智能体管理、上下文窗口默认值、命令面板双徽标 |
| 0.6.0 | 飞书机器人、分屏、每任务独立 CLI |
| 0.6.1 | 分屏拖拽停靠、Windows 输入法死锁修复 |
| 0.6.3 | Claude 安装来源选择器 |
| 0.6.5 | Fable 模型档位、git 镜像加速 |
| 0.7.0 | Codex CLI 接入、左侧栏折叠、运行时长指示 |

### 其他关键事实

- 数据目录（任务 3 执行期间经源码核实修正）：Windows `%APPDATA%\com.loongcode.desktop\`、macOS `~/Library/Application Support/com.loongcode.desktop/`，内含 `loongcode.db`（SQLite）；可在「设置 → 常规 → 数据目录」查看与自定义（依据 src-tauri/src/bootstrap.rs:79-93、tauri.conf.json identifier）
- 自动更新：仅 Windows；检查源为 GitHub Releases
- 平台：Windows x64/ARM64、macOS universal；Linux 未发布
- 首次启动：自动开启新手导览；示例工作区由导览第 2 步按钮创建；不预创建任务
