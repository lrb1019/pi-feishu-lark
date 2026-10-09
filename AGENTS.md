# 项目约定

本仓库在原飞书插件基础上适配 Pi；范围与既有调查见
`docs/适配工作区说明.md` 和 `docs/渠道方案对比.md`。
调查针对旧版本，不代表当前源码已通过运行验证。

## 项目 skills

使用 `.agents/skills/` 中的工作流前，读取 `.agents/skills/README.md`，
了解来源、Pi 适配和操作边界。安装不等于已执行 setup；
任务跟踪配置未完成时先运行 `/skill:setup-matt-pocock-skills`。

GitHub 操作显式指定 `lrb1019/pi-feishu-lark`，不依赖 fork 的自动仓库推断。
创建或修改 Issues、提交、推送、创建 PR 和发布仅在用户明确授权时执行。

## 验证边界

开发验证优先离线，不请求模型、不使用真实飞书凭据、不启动 Bot。
真实连接、替换已安装插件或修改服务器需单独授权。
远程工具权限必须通过会话创建、恢复和更新路径验证，skills 不是安全沙箱。
