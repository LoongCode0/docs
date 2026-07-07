# CLI 与任务配置

**入口：** 任务输入栏底部选择器栏（Selector Bar）

任务级配置控制单个任务使用哪套 CLI 工具、哪个模型、多深的思考深度以及多宽松的执行授权。每个任务的配置相互独立。

**默认值分两种情况：**

- **首次新建任务**（从未改过任何配置）时，使用出厂默认，各项默认值见下文。
- **修改过任意任务的配置后**，整套配置会被记为「最后配置」，之后新建任务自动继承你上次的选择（v0.4.0 起）。这份记忆是应用级的，重启应用后依然有效。

::: tip 你看到的「默认」可能是上次的配置
新建任务时各选项显示的值，往往不是出厂默认，而是你上一次使用的配置。如果发现新任务的模型或授权模式「莫名」变了，多半是上次任务中改过——直接在选择器栏改回即可。
:::

> 若尚未安装 Claude CLI、Codex CLI 或 OpenCode CLI，请先参阅 [环境准备](/guide/prerequisites)。CLI 的可执行文件路径可在 [常规设置 → CLI 命令](/settings/general#cli-命令) 中自定义。

---

## 多 CLI 架构

自 v0.7.0 起，应用支持多套 CLI 工具链，可在同一工作区中混合使用；自 **v0.9.0** 起新增第三个家族 **OpenCode CLI**：

| 工具 | 标识 | 适用场景 |
|------|------|---------|
| Claude CLI | Anthropic 图标 | Claude 系列模型，支持 OAuth 直连或第三方供应商 |
| Codex CLI | OpenAI 图标 | Codex/GPT 系列模型，支持 OpenAI 兼容接口 |
| OpenCode CLI | opencode.ai 图标 | 开源 CLI，复用应用已配置的 OpenAI 兼容供应商（deepseek、GLM 等），无需重复填写 Key（v0.9.0 起） |

在任务的选择器栏中点击 CLI 图标或名称，即可在各 CLI 之间切换。三个家族的模型、思考深度、权限等配置各记各的、互不串台。

---

## 任务级配置项

![LoongCode 主界面任务输入框下方的选择器栏，依次展示 CLI 选择、模型档位、思考深度、执行授权四组下拉控件，突出当前选中的配置值](/images/cli_1.png)

### CLI 选择

选择本任务使用的工具链：**Claude CLI**、**Codex CLI** 或 **OpenCode CLI**。选择后，下方的模型、思考深度、执行授权选项会随之切换为对应工具链的选项。

---

### 模型

选择本任务实际调用的模型档位。

**Claude CLI 模型档位**（由轻量到强力）：

| 档位 | 对应角色 |
|------|---------|
| Haiku | 轻量任务 |
| Sonnet | 常规任务 |
| Opus | 复杂任务 |
| Fable | 专项档位（v0.6.5 起） |

**出厂默认：** Opus

> 各档位对应的具体模型版本由当前激活的[模型供应商](/settings/providers)决定。

**Codex CLI 模型：** 通过 [模型供应商](/settings/providers) 中的 Codex OAuth 或自定义供应商配置；未手动选择模型时，默认使用 `gpt-5.5`（界面原文）。

**OpenCode CLI 模型：** OpenCode 没有原生 OAuth 档位，其模型下拉**复用应用已配置的 OpenAI 兼容供应商**（模型映射经配置注入 OpenCode，无需重复填写 API Key）。因此需先在 [模型供应商](/settings/providers) 中为某个供应商填好 OpenAI 接口地址与模型，再回到任务中选择该「供应商 / 模型」。

---

### 思考深度

控制模型在回答前花多少算力进行内部推理（即"扩展思考"功能的深度）。

**Claude CLI 思考深度**（由浅到深）：

| 档位 | 界面原文 |
|------|---------|
| 低 | low |
| 中 | medium |
| 高 | high |
| 超高 | xhigh |
| 最高 | max |
| 极限 | ultracode |

**Codex CLI 思考深度**（由浅到深）：

| 档位 | 界面原文 |
|------|---------|
| 极简 | minimal |
| 低 | low |
| 中 | medium |
| 高 | high |
| 超高 | xhigh |

**OpenCode CLI 思考深度**（由浅到深，v0.9.0 起）：

| 档位（界面原文） | 说明 |
|------|------|
| **default** | 首档，不指定推理深度，使用所选模型的内置默认（同时保护不支持推理的模型） |
| minimal / low / medium / high / xhigh | 由浅到深指定 OpenCode 的推理深度 |

**出厂默认：**
- Claude CLI：max
- Codex CLI：medium
- OpenCode CLI：default（不指定，跟随模型内置默认）

思考深度越高，回答质量通常越好，但耗时与 Token 消耗也相应增加。若希望加快响应，可手动调低档位。

---

### 执行授权

控制 CLI 在执行文件操作、运行命令等行为时的自主程度。

**Claude CLI 授权模式**（v0.9.0 起与 Claude CLI 的 `--permission-mode` 对齐为 6 档，界面显示原文）：

| 模式（界面原文） | 说明 |
|------|------|
| **default** | 每次写文件、执行命令前均弹出权限卡片，等你确认后再执行 |
| **plan** | 先生成完整操作计划，确认后再执行 |
| **acceptEdits** | 文件编辑操作自动通过，其他操作仍需确认 |
| **auto** | 自动档（v0.9.0 新增）：放行裁决交回 Claude CLI 自身，由 CLI 决定哪些操作直接放行、哪些仍需询问 |
| **dontAsk** | 不询问档（v0.9.0 新增）：同样交由 Claude CLI 裁决，本模式下尽量不打断询问 |
| **bypassPermissions** | 所有操作自动通过，无需确认 |

> `auto` 与 `dontAsk` 是本版对齐 Claude CLI 新增的两档，应用不再代为自动放行，而是把 `--permission-mode` 透传给被拉起的 Claude CLI 由其裁决。

**Codex CLI 授权模式：**

| 档位（界面原文） | 说明 |
|------|------|
| **只读** | 仅允许读取文件，不执行写入或命令 |
| **自动** | 自动执行大多数操作，高风险操作询问确认 |
| **完全访问** | 所有操作自动通过，等同于 Claude 的 bypassPermissions |

**OpenCode CLI 授权档位**（v0.9.0 起，界面显示原文）：

| 档位（界面原文） | 说明 |
|------|------|
| **auto** | 自动执行文件编辑与命令，不逐条询问（默认档） |
| **ask** | 每次改文件、执行命令前都弹出审批卡片，等你确认 |

**出厂默认：**
- Claude CLI：完全自主（bypassPermissions）
- Codex CLI：自动
- OpenCode CLI：auto

::: warning 出厂默认为完全自主
Claude CLI 的出厂默认即为"完全自主"——该模式与 Codex 的"完全访问"、OpenCode 的 `auto` 都会跳过逐条确认，CLI 可在无人值守情况下修改、删除文件或执行系统命令。若你希望逐步确认每个操作，请改为 `default` / `plan`（Claude）、"只读"（Codex）或 `ask`（OpenCode）。建议仅在受控环境（沙盒、CI）或你完全了解任务内容时使用完全自主模式。
:::

---

## 与全局设置的关系

任务级配置仅影响当前任务，不修改全局默认值。关系如下：

| 配置层级 | 位置 | 作用范围 |
|---------|------|---------|
| CLI 可执行文件路径 | [常规设置 → CLI 命令](/settings/general#cli-命令) | 全局，所有任务共用 |
| 模型供应商 / API Key | [模型供应商](/settings/providers) | 全局，决定可用的模型集合 |
| 模型 / 思考深度 / 授权 | 任务选择器栏 | 单任务，新建任务继承上次配置 |

---

## 下一步

- [模型供应商](/settings/providers) — 配置第三方 API 以解锁更多模型选择
- [依赖管理](/settings/dependencies) — 检测与安装 Claude CLI / Codex CLI / OpenCode CLI
