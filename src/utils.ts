import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'

export const IS_WINDOWS = os.platform() === 'win32'

export function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

export function normalizePath(id: string): string {
  return path.posix.normalize(IS_WINDOWS ? slash(id) : id)
}

interface LookupFileOptions {
  pathOnly?: boolean
  rootDir?: string
  predicate?: (file: string) => boolean
}

export function lookupFile(
  dir: string,
  formats: string[],
  options?: LookupFileOptions,
): string | undefined {
  for (const format of formats) {
    const fullPath = path.join(dir, format)
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
      const result = options?.pathOnly
        ? fullPath
        : fs.readFileSync(fullPath, 'utf-8')
      if (!options?.predicate || options.predicate(result)) {
        return result
      }
    }
  }
  const parentDir = path.dirname(dir)
  if (
    parentDir !== dir
    && (!options?.rootDir || parentDir.startsWith(options?.rootDir))
  ) {
    return lookupFile(parentDir, formats, options)
  }
  return undefined
}

export function cache(filename: string, value?: string): string {
  const dir = path.dirname(filename)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, '', 'utf8')
  }
  if (value) {
    fs.writeFileSync(filename, value, 'utf8')
    return value
  } else {
    return fs.readFileSync(filename, 'utf8')
  }
}
