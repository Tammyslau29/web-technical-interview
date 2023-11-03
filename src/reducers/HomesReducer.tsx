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
            // Implement your update logic
            return state;
        case ActionTypes.DELETE_HOME:
            // Implement your delete logic
            return state;
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

const updateItem = (home: Home): Action => ({
    type: ActionTypes.UPDATE_HOME,
    payload: home,
});

const deleteItem = (itemId: number): Action => ({
    type: ActionTypes.DELETE_HOME,
    payload: itemId,
});

const setSelectedHome = (home: Home | null): Action => ({
    type: ActionTypes.SET_SELECTED_HOME,
    payload: home,
});

export const setHomes = (homes: Home[]): Action => ({
    type: ActionTypes.SET_HOMES,
    payload: homes,
});

