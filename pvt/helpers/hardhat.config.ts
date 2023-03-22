import '@nomiclabs/hardhat-toolbox';
import { hardhatBaseConfig } from '@balancer-labs/v2-common';
// types
import type { HardhatUserConfig } from 'hardhat/config';
import { name } from './package.json';

const config: HardhatUserConfig = {
  solidity: {
    compilers: hardhatBaseConfig.compilers,
    overrides: { ...hardhatBaseConfig.overrides(name) },
  },
  paths: {
    sources: './tasks',
  },
  // warnings: hardhatBaseConfig.warnings,
};

export default config;
