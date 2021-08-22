import BN from 'bn.js';
import { RegisterStatus } from '../config/lib/config';

export interface Erc20Token {
  address: string;
  source: string;
  backing: string;
  symbol: string;
  decimals: string | number;
  name: string;
  logo: string;
  status: RegisterStatus | null;
  balance: BN;
}

// eslint-disable-next-line no-magic-numbers
export type Erc20RegisterStatus = 0 | 1 | 2;
