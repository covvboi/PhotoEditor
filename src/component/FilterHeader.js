import { BsFilterLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, blankStart } from '../store.js';
import '../style/main.css'



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

    const inputHandle = (filter, e) => {
        dispatch(updateState(
            {
                [filter.name]: e.target.value
            }
        ))
    }

    return (
        <>
            <div className="filter_section">
                <div className="filter_container">
                    <div className='filter_filter_span'>
                        <BsFilterLeft />
                    </div>
                    <span className='filter_filter_span'>Filter</span>
                </div>

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