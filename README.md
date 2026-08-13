# dynamic-ui

基于 Vue 3 + Vite + TypeScript + Element Plus 的动态 UI 渲染项目。

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Element Plus](https://element-plus.org/)
- [Vitest](https://vitest.dev/)

## 环境要求

- Node.js: `^22.18.0` 或 `>=24.12.0`
- npm

## 安装依赖

```bash
npm install
```

## 开发

```bash
npm run dev
```

## 构建

```bash
npm run build
```

## 测试

```bash
# 运行测试
npm run test

# 监听模式运行测试
npm run test:watch
```

## 预览

```bash
npm run preview
```

## 项目结构

```
src/
  ├── components/     # 组件目录（动态组件、基础组件等）
  ├── data/           # 数据与状态管理
  ├── spec/           # 组件规范与类型定义
  ├── assets/         # 静态资源
  ├── App.vue         # 根组件
  └── main.ts         # 入口文件
```
