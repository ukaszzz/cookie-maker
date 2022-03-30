import { Addon } from './Addon';
import { Base } from './Base';

export interface Cookie {
    addons: Addon[],
    base: Base
}