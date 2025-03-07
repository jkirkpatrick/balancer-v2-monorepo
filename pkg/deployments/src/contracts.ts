import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';

import { getSigner } from './signers';
import { Artifact, Libraries, Param } from './types';

export async function deploy(
  artifact: Artifact,
  args: Array<Param> = [],
  from?: SignerWithAddress,
  libs?: Libraries
): Promise<Contract> {
  if (!args) args = [];
  if (!from) from = await getSigner();
  // @ts-ignore TS2339
  const { ethers } = await import('hardhat');

  const factory = await ethers.getContractFactoryFromArtifact(artifact, { libraries: libs });
  const deployment = await factory.connect(from).deploy(...args);
  // @ts-ignore TS2322
  return deployment.deployed();
}

export async function instanceAt(artifact: Artifact, address: string): Promise<Contract> {
  // @ts-ignore TS2339
  const { ethers } = await import('hardhat');
  // @ts-ignore TS2322
  return ethers.getContractAt(artifact.abi, address);
}

export async function deploymentTxData(artifact: Artifact, args: Array<Param> = [], libs?: Libraries): Promise<string> {
  // @ts-ignore TS2339
  const { ethers } = await import('hardhat');
  const factory = await ethers.getContractFactoryFromArtifact(artifact, { libraries: libs });

  const { data } = factory.getDeployTransaction(...args);
  if (data === undefined) throw new Error('Deploy transaction with no data. Something is very wrong');

  return data.toString();
}
