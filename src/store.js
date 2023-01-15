import { configureStore, createSlice } from '@reduxjs/toolkit'

// 밝은 - brightness ,어두운 - grayscale, 빛바랜 - sepia, 선명한 - seturate, 대비된 - contrate, 색전환 - hueRotate

// const a = 3; // primitive type
// let b = 'asdf'; // primitive type
// const c = b;
// b = 'df';
// console.log(b, c);

// const person1 = { age: 30 }; // object type
// const person2 = person1;
// person1.age = 20;

// console.log(person1, person2);

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
        flip: false,
    },
    reducers: {  //state 변경함수
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
    reducer: {   // 1. 위에서 slice를 만들고 여기에 등록을 해야한다.
        DefaultSetting: DefaultSetting.reducer,
        StartSet: StartSet.reducer
    }
})


