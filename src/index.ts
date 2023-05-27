import { createHash } from 'node:crypto'
import {
  EOL,
  availableParallelism,
  arch,
  type CpuInfo,
  cpus,
  devNull,
  endianness,
  homedir,
  hostname,
  machine,
  platform,
  release,
  tmpdir,
  totalmem,
  type,
  type UserInfo,
  userInfo,
  version
} from 'node:os'

export interface FingerprintData {
  EOL: string
  availableParallelism: number
  arch: string
  cpuInfo: CpuPartialInfo[]
  devNull: string
  endianness: string
  homedir: string
  hostname: string
  machine: string
  platform: string
  release: string
  tmpdir: string
  totalmem: number
  type: string
  userInfo: UserInfo<string>
  version: string
}

export type CpuPartialInfo = Pick<CpuInfo, 'model' | 'speed'>

/**
 * @description Generates the data that is used for fingerprint
 * creation.
 * @returns Fingerprint JSON data.
 */
export function generateFingerprintData(): FingerprintData {
  const _userInfo = userInfo()

  return {
    EOL,
    availableParallelism: availableParallelism(),
    arch: arch(),
    cpuInfo: cpus().reduce((acc: CpuPartialInfo[], cpu) => {
      acc.push({ model: cpu.model, speed: cpu.speed })
      return acc
    }, []),
    devNull,
    endianness: endianness(),
    homedir: homedir(),
    hostname: hostname(),
    machine: machine(),
    platform: platform(),
    release: release(),
    tmpdir: tmpdir(),
    totalmem: totalmem(),
    type: type(),
    userInfo: {
      username: _userInfo.username,
      uid: _userInfo.uid,
      gid: _userInfo.gid,
      shell: _userInfo.shell,
      homedir: _userInfo.homedir
    },
    version: version()
  }
}

/**
 * @description Generates the fingerprint.
 * @returns The fingerprint string.
 */
export function generateFingerprint(): string {
  return createHash('md5')
    .update(JSON.stringify(generateFingerprintData()))
    .digest('hex')
}
