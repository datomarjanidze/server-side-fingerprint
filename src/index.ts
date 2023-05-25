import { createHash } from 'node:crypto'
import {
  EOL,
  availableParallelism,
  arch,
  cpus,
  devNull,
  endianness,
  homedir,
  hostname,
  machine,
  networkInterfaces,
  type NetworkInterfaceInfo,
  platform,
  release,
  tmpdir,
  totalmem,
  type,
  userInfo,
  type UserInfo,
  version
} from 'node:os'

class ServerSideFingerprint {
  generateFingerprintData(): string {
    return JSON.stringify({
      EOL: this.getEOL(),
      availableParallelism: this.getAvailableParallelism(),
      arch: this.getArch(),
      cpuInfo: this.getCpuInfo(),
      devNull: this.getDevNull(),
      endianness: this.getEndianness(),
      homedir: this.getHomedir(),
      hostname: this.getHostname(),
      machine: this.getMachine(),
      networkInterfaces: this.getNetworkInterfaces(),
      platform: this.getPlatform(),
      release: this.getRelease(),
      tmpdir: this.getTmpdir(),
      totalmem: this.getTotalmem(),
      type: this.getType(),
      userInfo: this.getUserInfo(),
      version: this.getVersion()
    })
  }

  private getEOL(): string {
    return EOL
  }

  private getAvailableParallelism(): number {
    return availableParallelism()
  }

  private getArch(): string {
    return arch()
  }

  private getCpuInfo(): { model: string; speed: number }[] {
    return cpus().reduce((acc, cpu) => {
      acc.push({ model: cpu.model, speed: cpu.speed })
      return acc
    }, [])
  }

  private getDevNull(): string {
    return devNull
  }

  private getEndianness(): string {
    return endianness()
  }

  private getHomedir(): string {
    return homedir()
  }

  private getHostname(): string {
    return hostname()
  }

  private getMachine(): string {
    return machine()
  }

  private getNetworkInterfaces(): NodeJS.Dict<NetworkInterfaceInfo[]> {
    return networkInterfaces()
  }

  private getPlatform(): string {
    return platform()
  }

  private getRelease(): string {
    return release()
  }

  private getTmpdir(): string {
    return tmpdir()
  }

  private getTotalmem(): number {
    return totalmem()
  }

  private getType(): string {
    return type()
  }

  private getUserInfo(): UserInfo<string> {
    return userInfo()
  }

  private getVersion(): string {
    return version()
  }
}

export function generateFingerprint(): string {
  const serverSideFingerprint = new ServerSideFingerprint()

  return createHash('md5')
    .update(serverSideFingerprint.generateFingerprintData())
    .digest('hex')
}
