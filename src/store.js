import { configureStore, createSlice } from '@reduxjs/toolkit'

// 밝은 - brightness ,어두운 - grayscale, 빛바랜 - sepia, 선명한 - seturate, 대비된 - contrate, 색전환 - hueRotate


let DefaultSetting = createSlice({   // useState() 역할 이걸 slice라고 부름
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
        vartical: 1,
        horizontal: 1
    },

    reducers: {  //state 변경함수
        slideHandle(state, action) {
            state[action.payload.filterName] = action.payload.value;
        },
        urlHandle(state, action) {
            console.log(action);
            state.image = action.payload
        }
        
    }
})
export let { slideHandle, urlHandle } = DefaultSetting.actions

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
    reducer: {   // 1. 위에서 slice를 만들고 여기에 등록을 해야한다.
        DefaultSetting: DefaultSetting.reducer,
        StartSet: StartSet.reducer
    }
})


