import { BigNumber } from '@ethersproject/bignumber';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

import { impersonateAccount, setBalance as setAccountBalance } from '@nomicfoundation/hardhat-network-helpers';
import { fp } from '@balancer-labs/v2-helpers/src/numbers';

export async function getSigners(): Promise<SignerWithAddress[]> {
  // @ts-ignore TS2339
  const { ethers } = await import('hardhat');
  return ethers.getSigners();
}

export async function getSigner(index = 0): Promise<SignerWithAddress> {
  return (await getSigners())[index];
}

export async function impersonate(address: string, balance = fp(100)): Promise<SignerWithAddress> {
  await impersonateAccount(address);
  await setBalance(address, balance);
  // @ts-ignore TS2339
  const { ethers } = await import('hardhat');
  const signer = ethers.provider.getSigner(address);
  return SignerWithAddress.create(signer);
}

export async function setBalance(address: string, balance: BigNumber): Promise<void> {
  await setAccountBalance(address, balance);
}
