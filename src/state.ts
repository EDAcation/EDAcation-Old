import {Storage} from './storage';

export interface State {
    storages: Storage<unknown, unknown>[];
}


const DEFAULT_STATE: State = {
    storages: []
};

export const loadState = () => {
    // Load state from local storage
    let loadedState: State;
    try {
        loadedState = JSON.parse(localStorage.getItem('state') ?? '');
    } catch (err) {
        loadedState = DEFAULT_STATE;
    }

    const state = loadedState;

    // TODO: transform JSON state to JS

    return state;
};

export const storeState = (state: State) => {
    const storedState = state;

    // TODO: transform JS state to JSON

    // Store state in local storage
    // localStorage.setItem('state', JSON.stringify(storedState));
};
