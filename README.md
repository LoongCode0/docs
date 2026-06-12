# LoongCode 用户文档站

本仓库是 [LoongCode](https://github.com/LoongCode0) 桌面 Agent IDE 的用户文档站，使用 [VitePress](https://vitepress.dev/) 构建，发布至 GitHub Pages。

## 本地预览

```bash
pnpm install
pnpm docs:dev
```

浏览器访问 `http://localhost:5173/docs/` 即可实时预览。

## 构建

```bash
pnpm docs:build
```

构建产物输出至仓库根目录的 `docs/` 文件夹（GitHub Pages 发布源）。

## 发布

1. 先提交 `src/` 源文件改动：

   ```bash
   git add src
   git commit -m "docs: 更新文档内容"
   ```

2. 再运行部署脚本（构建 + 提交产物 + 推送）：

   ```bat
   bin\deploy.bat
   ```

## GitHub Pages 一次性设置

1. 进入仓库 **Settings → Pages**
2. Source 选择 **Deploy from a branch**
3. Branch 选择 `main`，目录选择 `/docs`
4. 保存后等待约 1 分钟，即可通过 `https://<用户名>.github.io/docs/` 访问

## 目录结构

```
loongcode_docs/
├── src/              # 文档源文件（VitePress 输入）
│   ├── .vitepress/   # VitePress 配置与主题
│   ├── guide/        # 入门指南
│   ├── features/     # 功能详解
│   ├── settings/     # 设置与配置
│   ├── reference/    # 参考资料
│   └── public/       # 静态资源
├── docs/             # 构建产物（GitHub Pages 发布源，随源码一起提交）
├── specs/            # 需求与设计文档
├── plans/            # 实施计划文档
└── bin/              # 脚本（deploy.bat 等）
```
