import { FormInstance } from 'antd';
import { Unit } from 'web3-utils';
import { Erc20Token } from './erc20';
import { Deposit } from './evolution';
import { NetConfig, Token } from './network';
import { DeepRequired } from './util';

/* ---------------------------------------------------Components props--------------------------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TransferFormValues<T = any, U = TransferNetwork> = { transfer: U } & T;

export interface CustomFormControlProps<T = string> {
  value?: T;
  onChange?: (value: T) => void;
}

export interface BridgeFormProps<T = Bridges> {
  form: FormInstance<TransferFormValues<T>>;
  setSubmit: React.Dispatch<React.SetStateAction<(value: TransferFormValues) => void>>;
}

/* ---------------------------------------------------Bridge elements--------------------------------------------------- */

export interface TransferNetwork {
  from: NetConfig | null;
  to: NetConfig | null;
}

export type NoNullTransferNetwork = DeepRequired<TransferNetwork, ['from' | 'to']>;

interface TransferParty {
  recipient?: string;
  sender?: string;
}

export interface TransferAsset<T> {
  amount?: string;
  asset?: T | null;
  checked?: boolean;
  unit?: Unit;
  assetType?: 'erc20' | 'native' | 'darwinia';
  erc20?: Erc20Token;
}

type Transfer<T> = (T extends Array<unknown>
  ? { assets?: TransferAsset<T[0]>[] } & Omit<TransferAsset<T>, 'asset'>
  : TransferAsset<T>) &
  TransferParty;

/* ---------------------------------------------------E2D--------------------------------------------------- */

export type E2DAsset = Exclude<Token, 'native'> | 'deposit';

export type E2D = Transfer<E2DAsset> & { deposit?: Deposit };

/* ---------------------------------------------------D2E--------------------------------------------------- */

export type D2EAsset = Exclude<Token, 'native'>;

export type D2E<T = D2EAsset[]> = Transfer<T>;

/* ---------------------------------------------------Bridge--------------------------------------------------- */

export type Bridges = E2D & D2E;
