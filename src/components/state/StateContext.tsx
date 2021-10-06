import React, {createContext, useEffect, useState} from 'react';

import {loadState, storeState, State, DEFAULT_STATE} from '../../state';

type UpdateState = (state: State) => Promise<void>;

export const StateContext = createContext<[State, UpdateState]>([DEFAULT_STATE, () => Promise.resolve()]);

export const StateProvider: React.FC = (props) => {
    const [state, setState] = useState(DEFAULT_STATE);

    useEffect(() => {
        (async () => {
            setState(await loadState());
        })();
    }, []);

    const updateState: UpdateState = async (partialNewState) => {
        // Merge current and new state (shallow)
        const newState = {
            ...state,
            ...partialNewState
        };

        await storeState(newState);
        setState(newState);
    };

    console.log(state);

    return (
        <StateContext.Provider value={[state, updateState]} {...props} />
    );
};
