import { defineConfig } from 'vitepress'
import type { Plugin } from 'vite'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

// 占位图片插件：让文档在「截图尚未放置」时仍能正常构建。
// 处理两类引用：
//   1. 旧约定 `![alt](...)`（括号内字面三个点）；
//   2. 已按规范填好的 `/images/xxx.png` 路径，但对应图片文件还没放进 src/public/images/。
// 两种情况都解析为透明 1×1 PNG 数据 URL，使构建通过而无需图片实际存在；
// 一旦把真实截图放进 src/public/images/（同名），插件即放行，VitePress 正常加载真实图片。
// 待全站截图全部补齐后，本插件可整体删除。
function placeholderImagePlugin(): Plugin {
  const PLACEHOLDER_ID = '...'
  // 虚拟模块 ID 不能直接用 '\0...'：Rollup 分包时 basename('\0...') 规范化成 ".."，
  // 会触发 chunkFileNames 的 Invalid substitution 报错（子目录页面必现）。
  const VIRTUAL_ID = '\0vitepress-placeholder-image'
  const TRANSPARENT_PNG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  let publicDir = ''

  return {
    name: 'vitepress-placeholder-image',
    enforce: 'pre',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === PLACEHOLDER_ID || id === `./${PLACEHOLDER_ID}`) {
        return VIRTUAL_ID
      }
      // 已填 /images/ 路径但图片尚未放置 → 透明图兜底；放图后此分支不命中，交回 VitePress 正常处理。
      if (id.startsWith('/images/') && publicDir && !existsSync(join(publicDir, id))) {
        return VIRTUAL_ID
      }
    },
    load(id) {
      if (id === VIRTUAL_ID) {
        return `export default "${TRANSPARENT_PNG}"`
      }
    }
  }
}

const config = defineConfig({
  lang: 'zh-CN',
  title: 'LoongCode 使用文档',
  description: 'LoongCode 桌面 Agent IDE 详细使用说明（基于 v0.8.0）',
  base: '/docs/',
  // srcDir 由 CLI 参数 'src' 传入（见 package.json scripts），outDir 相对于 srcDir 解析
  outDir: '../docs',
  // 默认深色（玄墨），用户切换后以 localStorage 为准
  appearance: 'dark',
  vite: {
    plugins: [placeholderImagePlugin()]
  },
  themeConfig: {
    // 与桌面端侧栏一致：深色用黑底金龙，浅色用宣纸底古铜龙
    logo: { light: '/logo-light.png', dark: '/logo.png', alt: 'LoongCode' },
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
            { text: '动态工作流', link: '/features/workflows' },
            { text: '后台任务活动', link: '/features/background-tasks' },
            { text: '定时执行消息', link: '/features/scheduled-send' },
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
            { text: '移动端配对', link: '/settings/mobile-pairing' },
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/LoongCode0/loongcode-release' }]
  }
})

// favicon 的 href 不会被 VitePress 自动加 base 前缀，须手动拼接；
// 从 config.base 派生（而非写死 '/docs/logo.png'），这样服务器 redeploy.sh 把 base sed 成 '/' 后仍然正确。
config.head = [
  ...(config.head ?? []),
  ['link', { rel: 'icon', type: 'image/png', href: `${config.base}logo.png` }]
]

export default config
