import React, {createContext} from 'react';

import {State, DEFAULT_STATE} from '../../old_state';

type UpdateState = (state: Partial<State>) => Promise<void>;

export const StateContext = createContext<[State, UpdateState]>([DEFAULT_STATE, () => Promise.resolve()]);

export const StateProvider: React.FC = (props) => {
    return (
        <StateContext.Provider value={[DEFAULT_STATE, () => Promise.resolve()]} {...props} />
    );
};
