import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'LoongCode 使用文档',
  description: 'LoongCode 桌面 Agent IDE 详细使用说明（基于 v0.7.0）',
  base: '/docs/',
  // srcDir 由 CLI 参数 'src' 传入（见 package.json scripts），outDir 相对于 srcDir 解析
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
