import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

//Not sure if this is right.  Assign object properties too or does const comment = action.payload do all that?
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            // FIX 1: You are close on this. First, the current list of comments is stored in state.comments. Using just 'comments'
            // as you have will render as undefined. Secondly, since the 'id' properties of the comments are simply equivalent to
            // their index position in the array (i.e. the first comment in the array has an id of 0, the second an id of 1, etc.),
            // we can just set the id of the new comment to the length of the existing comments array. This is because the length
            // of an array will always be one greater than the index of the last element in the array. For example, an array with
            // with 3 elements (a length of 3) would have indices of 0, 1, and 2. 
            // OLD CODE: comment.id = comments.length + 2;
            comment.id = state.comments.length;
            // END FIX 1

            // FIX 2: Your previous code was trying to completely replace the comments property of the state object (an array)
            // with your new comment (a songle object). What we need to do instead is add the new comment to the existing array
            // so we don't lose the previous comments. We should do that with the 'concat' array method. We use 'concat' instead of
            // 'push' because 'concat' creates a new array whereas 'push' destructively changes the old array. In React, we must retain
            // a record of everything we do in the virtual DOM and so destructive methods are not good practice.
            // OLD CODE: return {...state, errMess: null, comments: comment};
            return {...state, comments: state.comments.concat(comment)};
            // END FIX 2

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
};