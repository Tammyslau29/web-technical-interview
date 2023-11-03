import { Home } from "../types/Home";

export interface State {
    homes: Home[];
    selectedHome: Home | null;
}

export enum ActionTypes {
    ADD_HOME = 'ADD_HOME',
    UPDATE_HOME = 'UPDATE_HOME',
    DELETE_HOME = 'DELETE_HOME',
    SET_SELECTED_HOME = 'SET_SELECTED_HOME',
    SET_HOMES = 'SET_HOMES'
}

type Action =
    | { type: ActionTypes.ADD_HOME; payload: Home }
    | { type: ActionTypes.UPDATE_HOME; payload: Home }
    | { type: ActionTypes.DELETE_HOME; payload: number }
    | { type: ActionTypes.SET_SELECTED_HOME; payload: Home | null }
    | { type: ActionTypes.SET_HOMES; payload: Home[] };


export const HomesReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionTypes.ADD_HOME:
            return {
                ...state,
                homes: [...state.homes, action.payload],
            };
        case ActionTypes.UPDATE_HOME:
            const updatedHome = action.payload;
            const homes = state.homes.map((home) => {
                if (home.id === updatedHome.id) {
                    return updatedHome;
                }
                return home;
            });
            return {
                ...state,
                homes,
            };
        case ActionTypes.DELETE_HOME:
            const id = action.payload;
            const updatedHomes = state.homes.filter((home) => home.id !== id);
            return {
                ...state,
                homes: updatedHomes,
            };
        case ActionTypes.SET_SELECTED_HOME:
            return {
                ...state,
                selectedHome: action.payload,
            };
        case ActionTypes.SET_HOMES:
            return {
                ...state,
                homes: action.payload,
            };
        default:
            return state;
    }
};

export const addHome = (home: Home): Action => ({
    type: ActionTypes.ADD_HOME,
    payload: home,
});

export const updateHome = (home: Home): Action => ({
    type: ActionTypes.UPDATE_HOME,
    payload: home,
});

export const removeHome = (id: number): Action => ({
    type: ActionTypes.DELETE_HOME,
    payload: id,
});

export const setSelectedHome = (home: Home): Action => ({
    type: ActionTypes.SET_SELECTED_HOME,
    payload: home,
});

export const setHomes = (homes: Home[]): Action => ({
    type: ActionTypes.SET_HOMES,
    payload: homes,
});

