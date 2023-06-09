import { config as loadEnv } from 'dotenv'
import consola from 'consola'
import { createCli } from './create-cli'

createCli({ ...loadEnv().parsed, cwd: process.cwd() })
  .runMatchedCommand()
  ?.catch((err: unknown) => {
    consola.error(err)
    process.exitCode = 1
  })

