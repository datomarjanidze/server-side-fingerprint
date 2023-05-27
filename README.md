## Server Side Fingerprint v1.2.0 Documentation

<p align="center">
  <a href="https://www.npmjs.com/package/server-side-fingerprint" target="_blank"><img src="https://img.shields.io/npm/v/server-side-fingerprint.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/server-side-fingerprint" target="_blank"><img src="https://img.shields.io/npm/l/server-side-fingerprint.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/package/server-side-fingerprint" target="_blank"><img src="https://img.shields.io/npm/dm/server-side-fingerprint.svg" alt="NPM Downloads" /></a>
</p>

### Table of contents

- [Installation](#Installation)
- [Description](#Description)
- [Usage example](#Usage-example)
- [API](#API)
  - [Types](#Types)
  - [generateFingerprint](#generateFingerprint)

### Installation

```console
npm i server-side-fingerprint
```

### Description

Node.js library for generating server-side MD5 fingerprint hash from the
operating system's data that looks like this:

```json
{
  "EOL": "\n",
  "availableParallelism": 8,
  "arch": "arm64",
  "cpuInfo": [
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    },
    {
      "model": "Apple M1",
      "speed": 24
    }
  ],
  "devNull": "/dev/null",
  "endianness": "LE",
  "homedir": "/Users/datomarjanidze",
  "hostname": "Datos-MacBook-Air.local",
  "machine": "arm64",
  "platform": "darwin",
  "release": "23.1.0",
  "tmpdir": "/var/folders/9w/gl_7whfjvxw7h3ftnvz48s3c0000gn/T",
  "totalmem": 8181934592,
  "type": "Darwin",
  "userInfo": {
    "uid": 555,
    "gid": 41,
    "username": "datomarjanidze",
    "homedir": "/Users/datomarjanidze",
    "shell": "/bin/bash"
  },
  "version": "Darwin Kernel Version 23.1.0: Mon Mar  6 20:00:40 PST 2023; root:xnu-8791.102.1~5/RELEASE_ARM64_T8103"
}
```

### Usage example

```ts
import { generateFingerprint } from 'server-side-fingerprint'

const fingerprint = generateFingerprint()
console.log(fingerprint) // 'a923cd82ad685819e1bcbd3acbab179f'
```

### API

#### Types

```ts
import { UserInfo, CpuInfo } from 'node:os'

interface FingerprintData {
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

type CpuPartialInfo = Pick<CpuInfo, 'model' | 'speed'>
```

#### generateFingerprint()

- Returns: `string`

#### generateFingerprintData()

- Returns: `FingerprintData`
