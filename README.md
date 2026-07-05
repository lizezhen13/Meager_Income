# 💰 Meager Income

<p align="right">
  🇨🇳 中文 | <a href="README_EN.md">🇺🇸 English</a>
</p>

一个轻量有趣的**实时工资可视化**工具。输入你的薪资信息，它会为你实时计算每一秒、每一分、每一小时你赚了多少钱，让枯燥的打工时间变得可视化、可量化。

---

## ✨ 功能特性

- ⚡ **实时收入计算** — 根据月薪、工作时长、每月工作天数，实时显示你当前已经赚了多少钱
- 📊 **多维度收入统计** — 展示每秒、每分钟、每小时、每天的收入速率
- ⏱️ **工作计时器** — 精确记录今日工作时长
- 📈 **工作进度条** — 直观显示当天工作完成百分比
- 🏆 **成就系统** — 随着收入累积，解锁趣味成就，增添打工乐趣
- 📱 **响应式设计** — 适配桌面与移动设备
- 🐳 **Docker 支持** — 一键容器化部署

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| React 18 | UI 框架 |
| TypeScript | 类型安全 |
| Vite 6 | 构建工具 |
| CSS Modules | 组件级样式隔离 |

---

## 🚀 快速开始

### 💻 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器默认运行在 `http://localhost:1213`

### 📦 生产构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 🐳 Docker 部署

```bash
# 使用 Docker Compose 一键启动
docker-compose up -d
```

服务将暴露在 `http://localhost:1213`

---

## 📖 使用说明

1. 🔧 打开应用，在设置页输入你的**月薪**、**每日工作时长**、**每月工作天数**
2. ▶️ 点击「**开始打工**」进入工作界面
3. 👀 实时观察你的收入数字不断增长
4. ⏯️ 可随时暂停、继续或结束计时
5. 🎉 达成收入目标后解锁趣味成就

---

## 📂 项目结构

```
├── src/
│   ├── components/      # React 组件
│   ├── hooks/           # 自定义 Hooks（核心计时与收入逻辑）
│   ├── styles/          # 全局样式
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 根组件
│   └── main.tsx         # 应用入口
├── docker-compose.yml   # Docker Compose 配置
├── Dockerfile           # Docker 镜像构建
├── nginx.conf           # Nginx 配置
├── index.html           # HTML 入口
├── package.json
└── vite.config.ts       # Vite 配置
```