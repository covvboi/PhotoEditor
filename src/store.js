import { configureStore, createSlice, current } from '@reduxjs/toolkit'


let DefaultSetting = createSlice({   // useState() 역할 이걸 slice라고 부름
    name : 'defaultState',
    initialState : 
        {
        image : '',
        밝은 : 100,
        어두운 : 0,
        빛바랜 : 0,
        선명한 : 100,
        대비된 : 100,
        색전환 : 0,
        rotate : 0,
        vartical : 1,
        horizontal : 1   
        },
        // {id : '밝은', value : 100},
        // {id : '어두운', value : 0},
        // {id : '빛바랜', value : 0},
        // {id : '선명한', value : 100},
        // {id : '대비된', value : 100},
        // {id : '색전환', value : 0}
    
        reducers : {  //state 변경함수
        slideHandle(state, action){  // 여기있는건 위에있는 state값
            console.log(action);
            // let 필터 = state.findIndex((a)=>{return a.id === action.payload.filterName})
            // state[필터] = action.payload
            
            state.밝은 = action.payload
            state.어두운 = action.payload
            // state.빛바랜 = action.payload
            console.log(state);
        },
        urlHandle(state, action){
            console.log(action);
            state.image = action.payload
        },
        leftRotateHandle(state, action){
            console.log(action);
            state.rotate = action.payload
        },
        rightRotateHandle(state, action){
            console.log(action);

            state.rotate = action.payload
        },
        varticalFlipHandle(state, action){
            state.vartical = action.payload
        },
        horizontalFlipHandle(state, action){
            state.horizontal = action.payload
        },
    
    }
})
export let { slideHandle, slideHandle2, urlHandle, leftRotateHandle, rightRotateHandle, varticalFlipHandle, horizontalFlipHandle} = DefaultSetting.actions

let StartSet = createSlice({
    name : 'startState',
    initialState :
        { name : '밝은', maxValue : 200 }
    ,
    reducers : {
        blankStart(state, action){
            state.name = action.payload.name;
            state.maxValue = action.payload.maxValue;

            console.log(action);
            // console.log(state.name);
            // console.log(state.maxValue);

        }
    
    }
})
export let { blankStart ,SlideStart} = StartSet.actions





//
export default configureStore({
    reducer: {   // 1. 위에서 slice를 만들고 여기에 등록을 해야한다.
        DefaultSetting : DefaultSetting.reducer,
        StartSet : StartSet.reducer
    }
}) 


// CORE STATE
// const [defaultState, setDefaultState] = useState({
//     image: '',
//     밝은 : 100,
//     어두운 : 0,
//     빛바랜 : 0,
//     선명한 : 100,
//     대비된 : 100,
//     색전환 : 0,
//     rotate : 0,
//     vartical : 1,
//     horizontal : 1 
// });