import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
    isLoading: false,
    errMsg: null,
    promos: []
}, action) => {
    switch(action.type) {
        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errMsg: null, promos: []};
        
        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, promos: []};

        case ActionTypes.ADD_PROMOS:
            return {...state, isLoading: false, errMsg: null, promos: action.payload};

        default:
            return state;
    }
}