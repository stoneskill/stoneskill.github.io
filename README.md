# stoneskill.github.io

李强强（stoneskill）的个人站点。静态页面从本仓库默认分支 `main` 的根目录，由 GitHub Pages 发布。

- 首页：https://stoneskill.github.io/
- 书签：https://stoneskill.github.io/json/browser_bookmark.json
- 书签（images 路径）：https://stoneskill.github.io/images/browser_bookmark.json
- 示例 JSON：https://stoneskill.github.io/json/test.json

## 页面

单页站点，包含简介、关于、工作、书签和联系。HTML、CSS、JavaScript 都是为本站手写的，没有使用第三方主题、模板、起步套件或 UI 组件库。字体使用系统字体栈，没有嵌入受版权限制的字体或图片。

书签一节读取 `json/browser_bookmark.json`。同一份数据也放在 `images/browser_bookmark.json`。

## GitHub Pages

仓库 `stoneskill/stoneskill.github.io` 使用「从分支部署」：

- Branch: `main`
- Folder: `/`（仓库根目录）

对应设置路径：Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `/ (root)`。

仓库里有 `.nojekyll`，页面按原文件提供，不经过 Jekyll。
