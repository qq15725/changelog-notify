<h1 align="center">changelog-notify</h1>

<p align="center">
  <a href="https://unpkg.com/changelog-notify">
    <img src="https://img.shields.io/bundlephobia/minzip/changelog-notify" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/changelog-notify">
    <img src="https://img.shields.io/npm/v/changelog-notify.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/changelog-notify">
    <img src="https://img.shields.io/npm/dm/changelog-notify" alt="Downloads">
  </a>
  <a href="https://github.com/qq15725/changelog-notify/issues">
    <img src="https://img.shields.io/github/issues/qq15725/changelog-notify" alt="Issues">
  </a>
  <a href="https://github.com/qq15725/changelog-notify/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/changelog-notify.svg" alt="License">
  </a>
</p>

## 📦 Install

```sh
npm i -g changelog-notify
```

## 🦄 Usage

```sh
cd you-project-root

changelog-notify "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=you-key" \
  --title="### ✅ CI" \
  --format="\n> #%h %s (@%an)"
```
