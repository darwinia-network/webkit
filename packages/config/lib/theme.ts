import { NetworkConfig } from '../../model';
import dark from '../theme/antd/dark.json';
import light from '../theme/antd/light.json';
import vars from '../theme/antd/vars.json';
import crab from '../theme/network/crab.json';
import crabDark from '../theme/network/dark/crab.json';
import darwiniaDark from '../theme/network/dark/darwinia.json';
import pangolinDark from '../theme/network/dark/pangolin.json';
import darwinia from '../theme/network/darwinia.json';
import pangolin from '../theme/network/pangolin.json';

export const NETWORK_LIGHT_THEME: NetworkConfig<{ [key in keyof typeof darwinia]: string }> = {
  crab,
  darwinia,
  pangolin,
  ethereum: pangolin,
  ropsten: pangolin,
};

export const SKIN_THEME = {
  dark,
  light,
  vars,
};

export const NETWORK_DARK_THEME: NetworkConfig<{ [key in keyof typeof darwiniaDark]: string }> = {
  crab: crabDark,
  darwinia: darwiniaDark,
  pangolin: pangolinDark,
  ethereum: pangolinDark,
  ropsten: pangolinDark,
};

export enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}
