import React, {createContext, useState} from 'react';

import {loadState, State, storeState} from '../../state';

type UpdateState = (state: State) => void;

// Load state from local storage
const loadedState = loadState();

export const StateContext = createContext<[State, UpdateState]>([loadedState, () => undefined]);

export const StateProvider: React.FC = (props) => {
    const [state, setState] = useState(loadedState);

    const updateState: UpdateState = (partialNewState) => {
        // Merge current and new state (shallow)
        const newState = {
            ...state,
            ...partialNewState
        };

        storeState(newState);
        setState(newState);
    };

    return (
        <StateContext.Provider value={[state, updateState]} {...props} />
    );
};
