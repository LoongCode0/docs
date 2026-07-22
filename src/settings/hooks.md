# 钩子（Hooks）

**入口：** 侧边栏 → **设置** → **钩子**

钩子（Hooks）让你在 Claude Code / Codex / Kimi Code CLI 生命周期的特定事件发生时（如工具调用前后、会话开始或结束等）自动执行命令、发起 HTTP 请求，或调用额外的 Prompt / Agent / MCP 工具，适合做校验拦截、通知提醒、审计留痕等自动化场景。

本页通过顶部 **Claude | Codex | Kimi** 切换栏分别维护各 CLI 的钩子配置（Kimi 家族自 v0.10.0 起纳入）。

::: tip 暂不覆盖 OpenCode
钩子设置目前不覆盖 OpenCode（顶部切换栏为 Claude / Codex / Kimi 三项）；Codex 的钩子为**实验性功能**。
:::

![截图：钩子设置页面，顶部 Claude/Codex 切换栏与全局/项目/插件范围标签，列表按 Event 分组展示各条钩子的 Matcher 与动作类型](/images/hooks_1.png)

---

## 钩子范围

顶部提供三个范围标签：

| 标签 | 含义 |
|------|------|
| **全局** | 写入用户级配置（Claude 为 `~/.claude/settings.json`，Codex 为 `~/.codex/config.toml`），跨项目生效 |
| **项目** | 仅当前工作区生效；需先在主界面选中某个工作区的任务，否则该标签置灰并提示「需先选中某个工作区的任务」。Claude 家族下项目范围进一步分两个子标签：**团队共享**（写入可提交到版本库的项目配置）与**仅本机**（写入本机专属、不建议提交的本地配置） |
| **插件** | 已安装插件贡献的钩子，只读展示，附带**插件：{名称}**徽标，不提供新建 / 编辑 / 删除入口 |

::: tip Kimi 家族仅用户级
Kimi 家族不显示范围标签——它的钩子只有**用户级**一档，全部读写 `~/.kimi-code/config.toml` 中的 `[[hooks]]` 配置段，跨项目生效。
:::

::: tip 组织托管钩子
若组织通过 `managed-settings.json` 统一下发了钩子策略，「全局」标签页会以只读的**组织托管**徽标展示这些条目，同样不可编辑或删除；若组织禁用了全部钩子，页面顶部会出现提示「组织已禁用所有钩子」。
:::

---

## 钩子列表

列表按**Event**（触发事件）分组显示，每组标题形如 `PreToolUse (2)`，点击组标题可单独折叠 / 展开；分组数≥2 时列表上方出现**全部展开** / **全部折叠**按钮。

每条钩子记录显示：

- **Matcher** — 匹配的工具名（支持正则），留空显示 `*`（匹配全部工具）
- **动作类型** — 该钩子组下全部动作的类型，逗号分隔（如 `command, http`）
- 只读来源标注**组织托管**或**插件：{名称}**徽标；可编辑的钩子在右侧显示编辑（铅笔）与删除（垃圾桶）图标

列表为空时显示「暂无钩子」。

---

## 新建 / 编辑钩子

点击右上角**新建钩子**按钮（或某条钩子的编辑图标）进入表单。表单顶部可切换 **表单** / **原始**（Claude 为 JSON，Codex 为 TOML）两种编辑方式，互相转换。

### 表单模式

| 字段 | 说明 |
|------|------|
| **Event** | 触发事件下拉；Claude 提供 30 项（`SessionStart`、`UserPromptSubmit`、`PreToolUse`、`PermissionRequest`、`PostToolUse`、`SubagentStop`、`Stop`、`PreCompact` 等覆盖会话/工具/子智能体/压缩全生命周期的事件），Codex 提供 10 项精简子集，Kimi 提供 16 项（`UserPromptSubmit`、`PreToolUse`、`PostToolUse`、`PermissionRequest`、`SessionStart`、`SubagentStart`、`Stop`、`PreCompact`、`Notification` 等） |
| **Matcher** | 留空匹配所有工具，支持正则，如 `Bash` 或 `Edit\|Write` |
| **动作** | 一个钩子组可包含多个动作：先为每个动作选择**类型**，再填写该类型专属字段；点击**添加动作**追加一个新动作，存在多个动作时每个动作右上角出现删除按钮 |

动作类型随 CLI 不同而不同：

| 类型 | 支持的 CLI | 关键字段 |
|------|-----------|---------|
| **Command** | Claude / Codex | Command、Args、Timeout(s)、Status message、Async、If（Codex 额外提供 Command (Windows) 与 Shell，用于跨平台命令差异） |
| **HTTP** | 仅 Claude | URL、Headers、Allowed env vars、Timeout(s) |
| **Prompt** | Claude / Codex | Prompt（多行文本）、Model、Timeout(s) |
| **Agent** | Claude / Codex | Prompt（多行文本）、Timeout(s) |
| **MCP Tool** | 仅 Claude | Server、Tool、Timeout(s) |

::: tip Kimi 的表单更精简
Kimi 家族的钩子表单只有 **Event、Matcher、Command、Timeout(s)** 四个字段——动作类型固定为执行命令，没有 HTTP / Prompt / Agent / MCP 等其他动作类型，也不提供「原始」编辑模式。
:::

::: tip 未知动作类型
若某条钩子的动作类型不在上表中（例如来自更新版本 CLI 的新类型），表单模式无法渲染对应字段，请切到**原始**模式直接编辑。
:::

### 原始模式

以 JSON（Codex 为 TOML）文本直接编辑该钩子组的 `matcher` / `actions` 结构，适合批量粘贴或填写表单未覆盖的字段。切回**表单**模式时会尝试解析当前原始文本；解析失败则停留在原始模式并显示错误提示，已输入的内容不会被清空。

保存成功后返回列表，并提示「已保存钩子」（编辑）或「已添加钩子」（新建）。

---

## 删除钩子

点击列表中某条钩子的删除（垃圾桶）图标，弹出确认对话框：

> 「确定删除「{event}」下的这个钩子组？此操作不可撤销。」

确认后立即删除并提示「已删除」。组织托管与插件来源的钩子不提供删除入口。

---

## 下一步

- [MCP 服务器](/settings/mcp) — 配置外部工具服务，与钩子同属扩展 AI 能力的机制
- [权限与审批](/features/permissions) — 工具调用的另一层控制——运行时授权
