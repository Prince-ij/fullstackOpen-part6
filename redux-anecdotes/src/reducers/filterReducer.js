import { createSlice } from "@reduxjs/toolkit"
// export const filter = (filter) => {
//     return {
//         type: 'FILTER',
//         payload: filter
//     }
// }

// const filterReducer = (state='', action) => {
//     switch (action.type) {
//         case 'FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter(state, action) {
            return action.payload
        }
    }
})



export default filterSlice.reducer
export const {filter} = filterSlice.actions
