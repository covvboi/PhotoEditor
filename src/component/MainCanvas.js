import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/main.css'

import { GrRotateLeft, GrRotateRight } from "react-icons/gr"
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg"
import { urlHandle } from '../store.js';
import { CanvasLayer } from './CanvasLayer';

const MainCanvas = () => {

    const canRef = useRef(null);
    const cardBodyRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    let cropModel = null;
    let state = useSelector((state) => { return state.DefaultSetting });
    let dispatch = useDispatch();

    const image = new Image();

    const ImageHandler = (event) => {
        const canvas = canRef.current.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();

        reader.onloadend = (event) => {
            image.onload = () => {
                setWidth(image.naturalWidth);
                setHeight(image.naturalHeight);
                setTimeout(() => {
                    ctx.drawImage(
                        image,
                        0,
                        0,
                        image.naturalWidth,
                        image.naturalHeight
                    );

                    dispatch(urlHandle(
                        {
                            image: event.target.result
                        }
                    ))

                    if ((cardBodyRef.current.offsetWidth + cardBodyRef.current.offsetHeight) < (image.naturalWidth + image.naturalHeight)) {
                        setScale((cardBodyRef.current.offsetWidth + cardBodyRef.current.offsetHeight) * 0.6 / (image.naturalWidth + image.naturalHeight));
                    } else {
                        setScale(1);
                    }

                });

            };
            image.src = event.target.result;

        };
        reader.readAsDataURL(event.target.files[0]);
    };

    useEffect(() => {
        const canvas = canRef.current.canvasRef.current;
        const currentImage = state.image;
        const ctx = canvas.getContext('2d');
        image.src = currentImage;
        ctx.filter = `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.huerotate}deg)`;
        ctx.drawImage(image, 0, 0);
    });

    const startDrawingRectangle = ({ nativeEvent }) => {
        nativeEvent.preventDefault();  //이벤트 기본동작을 막아준다. 
        nativeEvent.stopPropagation(); //이벤트 버블링 막아준다.

        const rect = canRef.current.canvasRef.current.getBoundingClientRect();
        const context = canRef.current.cropCanvasRef.current.getContext('2d');
        const multiple = (1 / scale);


        const startX = (nativeEvent.clientX - rect.x) * multiple;
        const startY = (nativeEvent.clientY - rect.y) * multiple;

        const reset = () => {
            context.clearRect(
                0,
                0,
                canRef.current.cropCanvasRef.current.width,
                canRef.current.cropCanvasRef.current.height
            );
            context.beginPath();
        }
        reset();

        const onMouseMove = (e) => {
            reset();
            context.strokeStyle = 'red';
            context.lineWidth = 1 * multiple;

            context.rect(
                startX,
                startY,
                (e.clientX - nativeEvent.clientX) * multiple,
                (e.clientY - nativeEvent.clientY) * multiple
            );

            cropModel = {
                x: startX,
                y: startY,
                width: (e.clientX - nativeEvent.clientX) * multiple,
                height: (e.clientY - nativeEvent.clientY) * multiple,
            };

            context.stroke();
        };

        const onMouseUpOrLeave = (e) => {
            canRef.current.cropCanvasRef.current.removeEventListener('mousemove', onMouseMove);
            canRef.current.cropCanvasRef.current.removeEventListener('mouseup', onMouseUpOrLeave);
            canRef.current.cropCanvasRef.current.removeEventListener('mouseleave', onMouseUpOrLeave);
        }

        canRef.current.cropCanvasRef.current.addEventListener('mousemove', onMouseMove);
        canRef.current.cropCanvasRef.current.addEventListener('mouseup', onMouseUpOrLeave);
        canRef.current.cropCanvasRef.current.addEventListener('mouseleave', onMouseUpOrLeave);

    };

    const imageCrop = async () => {
        if (!cropModel) {
            return;
        }

        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const currentImage = canvas.toDataURL();

        const image = await new Promise((resolve) => {
            const tempImage = new Image();
            tempImage.src = currentImage;
            tempImage.onload = () => {
                resolve(tempImage);
            }

        });


        const reset = () => {
            context.clearRect(
                0,
                0,
                canRef.current.cropCanvasRef.current.width,
                canRef.current.cropCanvasRef.current.height
            );
            context.beginPath();
        }
        reset();

        setWidth(cropModel.width);
        setHeight(cropModel.height);

        await new Promise((resolve) => {
            setTimeout(() => resolve(), 0);
        });

        context.drawImage(
            image,
            cropModel.x,
            cropModel.y,
            cropModel.width,
            cropModel.height,
            0,
            0,
            cropModel.width,
            cropModel.height,
        );

    }

    const saveImage = () => {

        const canvas = canRef.current.canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.resetTransform();
        ctx.restore();



        const link = document.createElement('a');
        link.download = 'image_edit.jpg';
        link.href = canvas.toDataURL();
        link.click();

    }


    const rotateVertical = async () => {
        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const currentImage = canvas.toDataURL();

        const tempImage = new Image();
        tempImage.src = currentImage;

        await new Promise(resolve => {
            tempImage.onload = () => resolve();
        });

        context.clearRect(0, 0, canvas.width, canvas.height);

        await new Promise(resolve => {
            setTimeout(() => resolve());
        });

        context.translate(canvas.width / 2, canvas.height / 2);
        context.scale(-1, 1)
        context.drawImage(tempImage, -tempImage.width / 2, -tempImage.height / 2);
        context.restore();
        context.resetTransform();

    }


    const rotateHorizontal = async () => {
        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const currentImage = canvas.toDataURL();

        const tempImage = new Image();
        tempImage.src = currentImage;

        await new Promise(resolve => {
            tempImage.onload = () => resolve();
        });

        context.clearRect(0, 0, canvas.width, canvas.height);

        await new Promise(resolve => {
            setTimeout(() => resolve());
        });

        context.translate(canvas.width / 2, canvas.height / 2);
        context.scale(1, -1)
        context.drawImage(tempImage, -tempImage.width / 2, -tempImage.height / 2);
        context.restore();
        context.resetTransform();

    }


    const rotateleft = async () => {
        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const currentImage = canvas.toDataURL();

        const tempImage = new Image();
        tempImage.src = currentImage;

        await new Promise(resolve => {
            tempImage.onload = () => resolve();
        });

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();

        const newHeight = width;
        const newWidth = height;

        setWidth(newWidth);
        setHeight(newHeight);

        await new Promise(resolve => {
            setTimeout(() => resolve());
        });

        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(-90 * Math.PI / 180);
        context.drawImage(tempImage, -tempImage.width / 2, -tempImage.height / 2);
        context.restore();
        context.resetTransform();

    }



    const rotateRight = async () => {
        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const currentImage = canvas.toDataURL();

        const tempImage = new Image();
        tempImage.src = currentImage;


        // 이 처리는, 비동기 코드를 동기식으로 다시 변경한 코드
        // onload 가 실행될때 resolve 가 호출되는 promise 를 기다리는 코드.
        await new Promise(resolve => {
            tempImage.onload = () => resolve();
        });

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();

        const newHeight = width;
        const newWidth = height;

        setWidth(newWidth);
        setHeight(newHeight);

        // setTimeout 콜백함수가 실행될때 resolve 가 호출되는 promise 를 기다리는 코드.
        await new Promise(resolve => {
            setTimeout(() => resolve());
        });

        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(90 * Math.PI / 180);
        context.drawImage(tempImage, -tempImage.width / 2, -tempImage.height / 2);
        context.restore();
        context.resetTransform();
    }



    return (
        <div>

            <div className="rotate">
                <div className="rotate_text"> Rotate & Filp </div>
                <div className="icon">
                    <div onClick={rotateleft} className='rotate_btn'><GrRotateLeft /></div>
                    <div onClick={rotateRight} className='rotate_btn'><GrRotateRight /></div>
                    <div onClick={rotateVertical} className='rotate_btn'><CgMergeVertical /></div>
                    <div onClick={rotateHorizontal} className='rotate_btn'><CgMergeHorizontal /></div>
                </div>
            </div>


            <div className='card_body' ref={cardBodyRef} style={{ position: 'relative' }}>

                <CanvasLayer
                    ref={canRef}
                    width={width}
                    height={height}
                    scale={scale}
                    onMousedown={(e) => startDrawingRectangle(e)}>
                </CanvasLayer>

                {/* <canvas className='canvas'
                    ref={canvasRef}
                    width={width}
                    height={height}
                    style={{
                        scale: `${scale}`,
                    }}
                    alt="" />

                <canvas className="crop_canvas"
                    width={width}
                    height={height}
                    ref={cropCanvasRef}
                    style={{
                        scale: `${scale}`
                    }}
                    onMouseDown={(e) => startDrawingRectangle(e)}
                /> */}

            </div>


            <div className='btn_group'>

                <label htmlFor='choose'>
                    <span className='import_image'>
                        Choose Image
                        </span>
                </label>

                <input className='import_btn' type="file" id='choose' onChange={ImageHandler}></input>

                <input type='button' className='crop_btn' value='Crop' onClick={imageCrop}></input>

                <input type='button' className='save_btn' value='Save' onClick={saveImage}></input>

            </div>


        </div>
    )

}

export default MainCanvas;