import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    isLoading: false,
    errMsg: null,
    leaders: []
}, action) => {
    switch(action.type) {
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMsg: null, leaders: []};
        
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, leaders: []};

        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMsg: null, leaders: action.payload};

        default:
            return state;
    }
}