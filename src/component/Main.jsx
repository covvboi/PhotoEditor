import React, {useEffect, useState} from 'react'
import './style/main.scss'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import {GrRotateLeft, GrRotateRight} from "react-icons/gr"
import {CgMergeVertical, CgMergeHorizontal} from "react-icons/cg"
import {IoMdUndo, IoMdRedo, IoIosImage} from "react-icons/io"
import { BsFilterLeft } from 'react-icons/bs';

const filterElement = [
    {
        name : '밝은',
        maxValue : 200
    },
    {
        name : '어두운',
        maxValue : 200
    },
    {
        name : '빛바랜',
        maxValue : 200
    },
    {
        name : '선명한',
        maxValue : 200
    },
    {
        name : '대비된',
        maxValue : 200
    },
    {
        name : '색전환'
    }
];

const Main = () => {
    const [property, setProperty] = useState(
        {
            name : '밝은',
            maxValue : 200
        }
    )
    const [details, setDetails] = useState('')
    const [crop, setCrop] = useState('')
    const [state, setState] = useState({
        image: '',
        밝은 : 100,
        어두운 : 0,
        빛바랜 : 0,
        선명한 : 100,
        대비된 : 100,
        색전환 : 0,
        rotate : 0,
        vartical : 1,
        horizontal : 1 
    })
    console.log(state)
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    const leftRotate = () => {
        setState({
            ...state,
            rotate : state.rotate - 90 
        })
    } 
    const RightRotate = () => {
        setState({
            ...state,
            rotate : state.rotate + 90 
        })
    } 
    //
    const varticalFlip = () => {
        setState({
            ...state,
            vartical : state.vartical === 1 ? -1 : 1
        })
    } 
    const horizontalFlip = () => {
        setState({
            ...state,
            horizontal : state.horizontal === 1 ? -1 : 1
        })
    } 
    //
    const imageHandle = (e) => {
        if(e.target.files.length !==0){

            const reader = new FileReader()

            reader.onload = () => {
                setState({
                    ...state,
                    image : reader.result
                })
            }
            reader.readAsDataURL(e.target.files[0])
        }
    } 
    const imageCrop = () => {
        const canvas = document.createElement('canvas')
        const scaleX = details.naturalWidth / details.width
        const scaleY = details.naturalHeight / details.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            details,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const base64Url = canvas.toDataURL('image/jpg')

        setState({
            ...state,
            image : base64Url
        })

    }
    const saveImage = () => {
        const canvas = document.createElement('canvas')
        canvas.width = details.naturalWidth
        canvas.height = details.naturalHeight
        const ctx = canvas.getContext('2d')

        ctx.filter = `brightness(${state.밝은}%) brightness(${state.밝은}%) grayscale(${state.어두운}%) sepia(${state.빛바랜}%) saturate(${state.선명한}%) contrast(${state.대비된}%) hue-rotate(${state.색전환}deg)`

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(state.rotate * Math.PI / 180)
        ctx.scale(state.vartical, state.horizontal)

        ctx.drawImage(
            details,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        )

        const link = document.createElement('a')
        link.download = 'image_edit.jpg'
        link.href = canvas.toDataURL()
        link.click()
    }
    
    

    return (
        <div className="image_editor">

            <div className="card">

                {/* <div className="card_header">
                    <h2> PHOTO EDITOR + </h2>
                </div> */}


                <div className="card_body">
                    <div className="sidebar">
                        <div className="side_body">

                            <div className="filter_section">
                                <span onClick={()=>{}}><BsFilterLeft/> 필터 </span>
                                <div className="filter_key">
                                    {
                                    filterElement.map((v,i)=><button className={property.name === v.name ? 'active' : ''} onClick={()=>setProperty(v)} key={i}>{v.name}</button>)
                                    }
                                </div>
                            </div>

                            <div className="filter_slider">
                                <div className="label_bar">
                                    <label htmlFor="range">감도조절</label>
                                    <span>100%</span>
                                </div>
                                <input name={property.name} onChange={inputHandle} value={state[property.name]} max={property.maxValue} type="range" />
                            </div>


                            
                        </div>

                            {/* <div className="rotate">
                                <label htmlFor="">Rotate & Filp</label>
                                <div className="icon">
                                    <div onClick={leftRotate}><GrRotateLeft/></div>
                                    <div onClick={RightRotate}><GrRotateRight/></div>
                                    <div onClick={varticalFlip}><CgMergeVertical/></div>
                                    <div onClick={horizontalFlip}><CgMergeHorizontal/></div>

                                </div>
                            </div>

                        <div className="reset">
                            <button onClick={()=>{setDetails(null)}}>Reset</button>
                            <button onClick={saveImage} className="save">Save Image</button>
                        </div> */}
                    </div>

                            </div>
                    <div className="image_section">

                        <div className="image">
                            
                            {
                                state.image ? <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                                    <img onLoad={(e)=>setDetails(e.currentTarget)} style={{filter : `brightness(${state.밝은}%) grayscale(${state.어두운}%) sepia(${state.빛바랜}%) saturate(${state.선명한}%) contrast(${state.대비된}%) hue-rotate(${state.색전환}deg)`,transform : `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizontal})`}} src={state.image} alt="" /> 
                                </ReactCrop>  : 
                                        <label htmlFor="choose"> 
                                            <IoIosImage/>
                                            <span>Choose Image</span>
                                        </label>
                            }
                        </div>

                        <div className="rotate">
                                {/* <label htmlFor="">Rotate & Filp</label> */}
                                <div className="icon">
                                    <div onClick={leftRotate}><GrRotateLeft/></div>
                                    <div onClick={RightRotate}><GrRotateRight/></div>
                                    <div onClick={varticalFlip}><CgMergeVertical/></div>
                                    <div onClick={horizontalFlip}><CgMergeHorizontal/></div>

                                </div>
                            </div>

                        <div className="image_select">
                            <div className="reset">
                                {/* <button onClick={()=>{setDetails(null)}}>Reset</button> */}
                                <button onClick={saveImage} className="save">저장하기</button>
                            
                            {/* <button className="undo"><IoMdUndo/></button>
                            <button className="redo"><IoMdRedo/></button> */}
                            {
                                crop && <button onClick={imageCrop} className="crop">이미지 자르기</button>  
                            }
                            <label htmlFor="choose">사진 내보내기</label>
                            <input onChange={imageHandle} type="file" id='choose' />
                            </div>

                        </div>

                            {/* <div className="rotate">
                                <label htmlFor="">Rotate & Filp</label>
                                <div className="icon">
                                    <div onClick={leftRotate}><GrRotateLeft/></div>
                                    <div onClick={RightRotate}><GrRotateRight/></div>
                                    <div onClick={varticalFlip}><CgMergeVertical/></div>
                                    <div onClick={horizontalFlip}><CgMergeHorizontal/></div>

                                </div>
                            </div>

                            <div className="reset">
                                <button onClick={()=>{setDetails(null)}}>Reset</button>
                                <button onClick={saveImage} className="save">Save Image</button>
                            </div> */}



                    </div>
            </div>
        </div>
    )
}





export default Main