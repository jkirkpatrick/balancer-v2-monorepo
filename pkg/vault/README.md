# <img src="../../logo.svg" alt="Balancer" height="128px">

_NOTE_: requires balancer-js to be built before running tests (depends on contents of `balancer-js/dist`)

_NOTE_: requires typechain TestWETH to be built before running tests (depends on contents of `typechain/dist`)

_NOTE_: dependes on helpers which requires standalone-utils to be built before running tests (depends on contents of `standalone-utils/artifacts`)

# Balancer V2 Vault

[![NPM Package](https://img.shields.io/npm/v/@balancer-labs/v2-vault.svg)](https://www.npmjs.org/package/@balancer-labs/v2-vault)
[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-blue)](https://docs.balancer.fi/products/the-vault)

This package contains the source code of Balancer V2's main contract, the [`Vault`](./contracts/Vault.sol).

It is generally not used directly, as two other packages should fulfill all development needs:

- To get the Solidity interface of the Vault and related contracts, see [`v2-interfaces`](../interfaces).
- To get the deployment address in all networks, as well as ABIs and tools to deploy to a test network, see [`v2-deployments`](../deployments).

## Overview

### Installation

```console
$ npm install @balancer-labs/v2-vault
```

## Licensing

[GNU General Public License Version 3 (GPL v3)](../../LICENSE).
