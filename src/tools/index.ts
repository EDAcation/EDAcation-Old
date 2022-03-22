import {initialize as initializeNextpnr} from './nextpnr';
import {initialize as initializeYosys} from './yosys';

/* TODO: Consider creating a generic tool class. Tool loading should also not occur more than once.
         The interface should probably indicate the loading status somewhere. */

export const initialize = () => {
    initializeNextpnr();
    initializeYosys();
};
