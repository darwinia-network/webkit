import { THEME } from '../config/lib/config';
import { HashInfo } from '../utils';

export interface StorageInfo extends HashInfo {
  theme?: THEME;
}
