import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baserURL';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString();

    return fetch(baseURL + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
        console.log('Post comments', error.message);
        alert('Your comment could not be posted');
    });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading());

    return fetch(baseURL + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMsg = new Error(error.message);
                throw errMsg;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => {
            dispatch(dishesFailed(error.message));
        });

    // setTimeout(() => {
    //     dispatch(addDishes(DISHES));
    // }, 2000)
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LODAING
});

export const dishesFailed = (errMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => async (dispatch) => {
    try {
        const response = await fetch(baseURL + 'comments');
        if (response.ok)
            var comments = await response.json();
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        return dispatch(addComments(comments));
    } catch (error) {
        return dispatch(commentsFailed(error.message));
    }
}

export const commentsFailed = (errMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => async (dispatch) => {
    dispatch(promosLoading());

    try {
        const response = await fetch(baseURL + 'promotions');
        if (response.ok)
            var promos = await response.json();
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        return dispatch(addPromos(promos));
    } catch (error) {
        return dispatch(promosFailed(error.message));
    }
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => async (dispatch) => {
    dispatch(leadersLoading());

    try {
        const response = await fetch(baseURL + 'leaders');
        if (response.ok)
            var leaders = await response.json();
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        return dispatch(addLeaders(leaders));
    } catch (error) {
        return dispatch(leadersFailed(error.message));
    }
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (firstName, lastName, telNum, email, agree, contactType, message) => (dispatch) => {
    const newFeedback = {
        firstname: firstName,
        lastName: lastName,
        telNum: telNum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }

    newFeedback.date = new Date().toISOString();

    return fetch(baseURL + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(feedback => alert(JSON.stringify(feedback)))
    .catch(error => {
        console.log('Post feedback', error.message);
        alert('Your feedback could not be posted');
    });    
}