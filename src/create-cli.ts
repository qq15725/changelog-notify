import { execSync } from 'node:child_process'
import https from 'node:https'
import http from 'node:http'
import path from 'node:path'
import { URL } from 'node:url'
import consola from 'consola'
import { cac } from 'cac'
import { bin, name, version } from '../package.json'
import { cache, lookupFile, normalizePath } from './utils'
import type { Options } from './types'

export function createCli(options: Options) {
  const {
    cwd,
    cacheDir: cacheDir_,
  } = options

  const pkgPath = lookupFile(cwd, ['package.json'], { pathOnly: true })
  const cacheDir = normalizePath(
    cacheDir_
      ? path.resolve(cwd, cacheDir_)
      : pkgPath
        ? path.join(path.dirname(pkgPath), `node_modules/.${ name }`)
        : path.join(cwd, `.${ name }`),
  )
  const cachePath = path.join(cacheDir, 'git_hash')

  const cli = cac(Object.keys(bin)[0])

  cli
    .command('[webhook]', 'changelog notify')
    .option('-f, --format <format>', 'Pretty format for git log option')
    .option('-t, --title <title>', 'Notify title')
    .action(async (webhook, commandOptions) => {
      const {
        title = options.title || '',
        format = options.format || '%h %s @%an',
      } = commandOptions
      const prev = cache(cachePath)

      const current = execSync(
        'git rev-parse --short HEAD',
        { encoding: 'utf-8' },
      ).trim()

      const content = title + execSync(
        [
          'git', 'log',
          prev ? `${ prev }..${ current }` : '',
          '--no-merges',
          `--pretty=format:"${ format }"`,
        ].filter(Boolean).join(' '),
        { encoding: 'utf-8' },
      ).trim()

      cache(cachePath, current)

      if (!content) return

      consola.log(content)

      if (!webhook) return

      let body: any
      let responseHandle: ((res: http.IncomingMessage) => void) | undefined
      if (webhook.includes('qyapi.weixin.qq.com')) {
        body = {
          msgtype: 'markdown',
          markdown: { content },
        }
        responseHandle = response => {
          response.setEncoding('utf8')
          response.on('data', body => {
            const data = JSON.parse(body)
            if (data.errcode) consola.error(data)
          })
        }
      } else {
        body = { content }
      }
      const client = webhook.startsWith('https') ? https : http
      const req = client.request(
        new URL(webhook),
        { method: 'POST', headers: { 'Content-Type': 'application/json' } },
        responseHandle,
      )
      req.write(JSON.stringify(body))
      req.end()
    })

  cli
    .help()
    .version(version)
    .parse(process.argv, { run: false })

  return cli
}
