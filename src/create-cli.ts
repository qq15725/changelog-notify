import { execSync } from 'node:child_process'
import { cac } from 'cac'
import { bin, version } from '../package.json'
import type { Options } from './types'

export function createCli(_options: Options) {
  const cli = cac(Object.keys(bin)[0])

  cli
    .command('', '')
    .action(async () => {
      const prev = ''
      const current = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' })
      const log = execSync(
        `git log ${ prev }..${ current.trim() } --no-merges --pretty=format:"#%h %s @%an"`,
        { encoding: 'utf-8' },
      )
      // eslint-disable-next-line no-console
      console.log(log)
    })

  cli
    .help()
    .version(version)
    .parse(process.argv, { run: false })

  return cli
}
