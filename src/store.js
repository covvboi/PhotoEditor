import { configureStore, createSlice } from '@reduxjs/toolkit'

let DefaultSetting = createSlice({   
    name: 'defaultState',
    initialState:
    {
        image: '',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        huerotate: 0,
        rotate: 0,
        flip: false,
    },
    reducers: {  
        updateState(state, action) {
            const newstate = {
                ...state,
                ...action.payload
            };
            return newstate;
        },
    }
})
export let { updateState, urlHandle } = DefaultSetting.actions

let StartSet = createSlice({
    name: 'startState',
    initialState:
        { name: 'brightness', maxValue: 200 }
    ,
    reducers: {
        blankStart(state, action) {
            state.name = action.payload.name;
            state.maxValue = action.payload.maxValue;
        }
    }
})
export let { blankStart } = StartSet.actions

//
export default configureStore({
    reducer: {  
        DefaultSetting: DefaultSetting.reducer,
        StartSet: StartSet.reducer
    }
})


