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

```shell
npm i -g changelog-notify
```

## 🦄 Usage

```shell
cd you-project-root

changelog-notify "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=you-key" \
  --title="### ✅ CI" \
  --format="\n> #%h %s (@%an)"
```

Cache the current git hash and notify the change log

> cache path `node_modules/.changelog-notify/${ current_branch }`

```shell
### ✅ CI
> #ec1faff release: v0.0.1 (@qq15725)
> #5f49a6f feat: notify to webhook (@qq15725)
> #78e7c3e feat: init (@qq15725)
> #39d1f6e Initial commit (@qq15725)
```
