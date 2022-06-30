import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import localStorageService from "../services/localStorage.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        addComment: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        deleteComment: (state, action) => {
            state.entities.splice(
                state.entities.findIndex((c) => c._id === action.payload.id),
                1
            );
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    addComment,
    deleteComment
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (data) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        created_at: Date.now(),
        userId: localStorageService.getUserId()
    };
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(addComment(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const removeComment = (id) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(deleteComment(id));
        }
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
