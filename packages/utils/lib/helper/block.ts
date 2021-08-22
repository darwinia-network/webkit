import { ApiPromise } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types';
import { hexToU8a } from '@polkadot/util';
import { remove0x } from '../helper';
import { convert } from '../mmrConvert/ckb_merkle_mountain_range_bg';

export type ClaimNetworkPrefix = 'Darwinia' | 'Pangolin';

export interface MMRProof {
  mmrSize: string;
  peaks: string[];
  siblings: string[];
}

interface EncodeMMRoot {
  prefix: ClaimNetworkPrefix;
  methodID: string;
  index: number;
  root: string;
}

export function encodeBlockHeader(blockHeaderStr: string) {
  const blockHeaderObj = JSON.parse(blockHeaderStr);
  const registry = new TypeRegistry();

  return registry.createType('Header', {
    parentHash: blockHeaderObj.parent_hash,
    // eslint-disable-next-line id-denylist
    number: blockHeaderObj.block_number,
    stateRoot: blockHeaderObj.state_root,
    extrinsicsRoot: blockHeaderObj.extrinsics_root,
    digest: {
      logs: blockHeaderObj.digest,
    },
  });
}

export function encodeMMRRootMessage(root: EncodeMMRoot) {
  const registry = new TypeRegistry();

  return registry.createType(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    '{"prefix": "Vec<u8>", "methodID": "[u8; 4; methodID]", "index": "Compact<u32>", "root": "H256"}' as any,
    root
  );
}

export async function getMMRProof(
  api: ApiPromise,
  blockNumber: number,
  mmrBlockNumber: number,
  blockHash: string
): Promise<MMRProof> {
  await api.isReady;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const proof = await api.rpc.headerMMR.genProof(blockNumber, mmrBlockNumber);
  const proofStr = proof.proof.substring(1, proof.proof.length - 1);
  const proofHexStr = proofStr.split(',').map((item: string) => {
    return remove0x(item.replace(/(^\s*)|(\s*$)/g, ''));
  });
  const encodeProof = proofHexStr.join('');
  const mmrProofConverted: string = convert(
    blockNumber,
    proof.mmrSize,
    hexToU8a('0x' + encodeProof),
    hexToU8a(blockHash)
  );

  const [mmrSize, peaksStr, siblingsStr] = mmrProofConverted.split('|');
  const peaks = peaksStr.split(',');
  const siblings = siblingsStr.split(',');

  return {
    mmrSize,
    peaks,
    siblings,
  };
}

export async function getMPTProof(
  api: ApiPromise,
  hash = '',
  proofAddress = '0xf8860dda3d08046cf2706b92bf7202eaae7a79191c90e76297e0895605b8b457'
) {
  await api.isReady;

  const proof = await api.rpc.state.getReadProof([proofAddress], hash);
  const registry = new TypeRegistry();

  return registry.createType('Vec<Bytes>', proof.proof.toJSON());
}
