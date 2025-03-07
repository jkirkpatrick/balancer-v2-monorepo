import { Contract } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

export { Artifact } from 'hardhat/types';
export { Libraries } from '@nomiclabs/hardhat-ethers/types';

import Task from './task';

export const NETWORKS = ['goerli', 'mainnet', 'polygon', 'arbitrum', 'optimism', 'gnosis', 'bsc', 'avalanche'];

export type Network = typeof NETWORKS[number];

export type TaskRunOptions = {
  force?: boolean;
  from?: SignerWithAddress;
};

export type NAry<T> = T | Array<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Param = boolean | string | number | BigNumber | any;

export type Input = {
  [key: string]: NAry<Param>;
};

export type RawInputByNetwork = {
  [key in Network]: RawInputKeyValue;
};

export type RawInputKeyValue = {
  [key: string]: NAry<Param> | Output | Task;
};

export type RawInput = RawInputKeyValue | RawInputByNetwork;

export type Output = {
  [key: string]: string;
};

export type RawOutput = {
  [key: string]: string | Contract;
};
