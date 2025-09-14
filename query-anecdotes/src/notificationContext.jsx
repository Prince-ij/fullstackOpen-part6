import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET':
            return action.payload
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const useNotificationMsg = () => {
    const msgAndDispatch = useContext(NotificationContext)
    return msgAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const msgAndDispatch = useContext(NotificationContext)
    return msgAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [msg, msgDispatcher] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[msg, msgDispatcher]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
