import { useEffect, useRef, useState } from 'react';
import '../style/main.css'
import { BsFilterLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { slideHandle, blankStart, SlideStart, slideHandle2 } from '../store.js';



const filterElement = [
    {
        name : '밝은',  //brightness
        maxValue : 200
    },
    {
        name : '어두운',  //grayscale
        maxValue : 200
    },
    {
        name : '빛바랜',  //sepia
        maxValue : 200
    },
    {
        name : '선명한',  //seturate
        maxValue : 200
    },
    {
        name : '대비된',  //contrate
        maxValue : 200
    },
    {
        name : '색전환'  //hueRotate
    }
];

const FilterHeader = () => {

    let state = useSelector((state)=>{ return state.DefaultSetting })
    let abc = useSelector((abc)=>{return abc.StartSet })
    let dispatch = useDispatch()

    console.log(state);
    console.log(state[abc.name]);

    const [property, setProperty] = useState(
        {
            name : '밝은',
            maxValue : 200
        }
    )

    // const clickFilter =  (e) => {
    //     dispatch(blankStart(e))
    // }

    const [testState, setTestState] = useState(
    
        
    )

    const inputHandle = (e) => {
        
        dispatch(slideHandle(
            
                // filterName : e.target.name ,
                e.target.value
            
        ))
    
    
    }
    //     console.log('tqtqtqt');
    //     console.log(abc);
    //     console.log(abc.name);
    //     console.log("/");
    //     console.log(property.name);
    //     console.log(state[abc.name]);

    return(
        <>
        <div className="filter_section">
                <BsFilterLeft/>
            <span className='filter_span'>필터</span>
            <div className='filter_key'>
                {
    
                    filterElement.map((a,i)=><button className={abc.name === a.name ? 'active' : ''} onClick={()=>{dispatch(blankStart(a))}} key={i}> {a.name}</button>)
                    
                }
            </div>

            {/* <h4>{abc.maxValue}</h4>
            <button onClick={()=>{dispatch(blankStart(2))}}>+</button>
             */}
        </div>

        <div className="filter_slider">
            <div className='label_bar'>
                <label className='filter_span' htmlFor='range'>감도조절</label>
                <span className='filter_span'>100%</span>
            </div>
                <input name={abc.name} onChange={inputHandle} value={state[abc.name]} max={abc.maxValue} className='filter_range' type='range'></input>
        </div>
        </>
    )
}

export default FilterHeader;