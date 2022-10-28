// import { useEffect, useRef, useState } from 'react';
import '../style/main.css'
import { BsFilterLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { slideHandle, blankStart  } from '../store.js';



const filterElement = [
    {
        name: 'brightness',  //brightness
        maxValue: 200
    },
    {
        name: 'grayscale',  //grayscale
        maxValue: 200
    },
    {
        name: 'sepia',  //sepia
        maxValue: 200
    },
    {
        name: 'saturate',  //saturate
        maxValue: 200
    },
    {
        name: 'contrast',  //contrast
        maxValue: 200
    },
    {
        name: 'huerotate'  //hueRotate
    }
];



const FilterHeader = () => {

    let state = useSelector((state) => { return state.DefaultSetting })
    let start = useSelector((start) => { return start.StartSet })
    let dispatch = useDispatch()

    console.log(state);
    console.log(state[start.name]);



    const inputHandle = (filter, e) => {
        console.log(filter, e);

        dispatch(slideHandle(
            {
                filterName: filter.name,
                value: e.target.value
            }
        ))
    }

    return (
        <>
            <div className="filter_section">
                <BsFilterLeft />
                <span className='filter_span'>Filter</span>
                <div className='filter_key'>
                    {

                        filterElement.map((a, i) =>
                            <button className={start.name === a.name ? 'active' : ''}
                                onClick={() => { dispatch(blankStart(a)) }}
                                key={i}>
                                {a.name}
                            </button>
                        )

                    }
                </div>

            
            </div>

            <div className="filter_slider">
                <div className='label_bar'>
                    <label className='filter_span' htmlFor='range'>Sensitivity</label>
                    <span className='filter_span'>100%</span>
                </div>
                <input name={start.name} onChange={(e) => inputHandle(start, e)} value={state[start.name]} max={start.maxValue} className='filter_range' type='range'></input>
            </div>
        </>
    )
}

export default FilterHeader;