import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            console.log('notification', action)
            return action.payload
        },
        removeNotification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (msg, duration) => {
    return async dispatch => {
        dispatch(displayNotification(msg))
        setTimeout(() => dispatch(removeNotification('')), duration*1000)
    }
}

export default notificationSlice.reducer
export const {displayNotification, removeNotification} = notificationSlice.actions
