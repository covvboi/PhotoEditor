// import {GrRotateLeft, GrRotateRight} from "react-icons/gr"
// import {CgMergeVertical, CgMergeHorizontal} from "react-icons/cg"
// import '../style/main.css'
// import '../App.css';

// import { useSelector, useDispatch } from 'react-redux';
// import { leftRotateHandle, rightRotateHandle, varticalFlipHandle, horizontalFlipHandle } from '../store.js';

// const RotateHeader = () => {

//     let state = useSelector((state)=>{ return state.DefaultSetting })
//     let dispatch = useDispatch();
    
//     const leftRotate = () => {
//         dispatch(leftRotateHandle(   
//             state.rotate - 90
//         ))
//     }

//     const rightRotate = () => {
//         dispatch(rightRotateHandle(
//             state.rotate + 90
//         ))
//     }

//     const varticalFlip = () => {
//         dispatch(varticalFlipHandle(
//             state.vartical === 1 ? -1 : 1
//         ))
//     }

//     const horizontalFlip = () => {
//         dispatch(horizontalFlipHandle(
//             state.horizontal === 1 ? -1 : 1
//         ))
//     }

//     return(
//         <div>
//             <div className="rotate">
//                 <div className="icon">
//                     <div onClick={leftRotate}  className='rotate_btn'><GrRotateLeft/></div>
//                     <div onClick={rightRotate} className='rotate_btn'><GrRotateRight/></div>
//                     <div onClick={varticalFlip} className='rotate_btn'><CgMergeVertical/></div>
//                     <div onClick={horizontalFlip} className='rotate_btn'><CgMergeHorizontal/></div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default RotateHeader;