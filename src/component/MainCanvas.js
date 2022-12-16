import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/main.css'

import { GrRotateLeft, GrRotateRight } from "react-icons/gr"
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg"

// var newMouseX, newMouseY

// const MAX_CANVAS_WIDTH = 410;
// const MAX_CANVAS_HEIGHT = 400;

const CanvasTest = () => {

    /////////////////
    const cropCanvasRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [canvasTop, setCanvasTop] = useState(0);

    let cropModel = null;

    let state = useSelector((state) => { return state.DefaultSetting })

    let dispatch = useDispatch()

    const canvasRef = useRef(null);
    const cardBodyRef = useRef(null);

    
    // brightness
    let brightness = 
        `brightness(${state.brightness}%)`;

    let sepia = 
        `sepia(1)`;



    const ImageHandler = (event) => {

        const image = new Image();
        const canvas = canvasRef.current;
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
                        
                    // ctx.filter = sepia
                    // ctx.translate(canvas.width / 2, canvas.height / 2);   
                    // ctx.drawImage(image, -image.width / 2 , -image.height/ 2 );
                    // ctx.resetTransform();  
                        
                    if ((cardBodyRef.current.offsetWidth + cardBodyRef.current.offsetHeight) < (image.naturalWidth + image.naturalHeight)) {
                        setScale((cardBodyRef.current.offsetWidth + cardBodyRef.current.offsetHeight) * 0.6 / (image.naturalWidth + image.naturalHeight));
                    } else {
                        setScale(1);
                    }

                    // if (cardBodyRef.current.offsetWidth < image.naturalWidth){
                    //     setScale(cardBodyRef.current.offsetWidth / image.naturalWidth)
                    // } else if (cardBodyRef.current.offsetHeight < image.naturalHeight) {
                    //     setScale(cardBodyRef.current.offsetHeight / image.naturalHeight)
                    // } else {
                    //     setScale(1)
                    // }

                    setCanvasTop((cardBodyRef.current.offsetHeight / 2) - (image.naturalHeight / 2));

                    console.log(
                        (cardBodyRef.current.offsetHeight / 2) - (image.naturalHeight / 2)
                    )
        

                });
            };
            image.src = event.target.result;

        };
        reader.readAsDataURL(event.target.files[0]);
    };



        useEffect(() => {
    
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const currentImage = canvas.toDataURL();

            const tempImage = new Image();
            tempImage.src = currentImage;

            tempImage.onload = () => {

                ctx.filter = `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.huerotate}deg)`;

                ctx.translate(canvas.width / 2, canvas.height / 2);
                // ctx.drawImage(tempImage, -tempImage.width / 2, -tempImage.height / 2);
                ctx.drawImage(tempImage, -tempImage.width / 2 , -tempImage.height/ 2 );
            
                // ctx.restore();

                ctx.resetTransform();

                

            };
        
        
        },)

    


    ///////////
    const startDrawingRectangle = ({ nativeEvent }) => {
        nativeEvent.preventDefault();  //이벤트 기본동작을 막아준다. 
        nativeEvent.stopPropagation(); //이벤트 버블링 막아준다.

        const rect = canvasRef.current.getBoundingClientRect();
        const context = cropCanvasRef.current.getContext('2d');
        const multiple = (1 / scale);


        const startX = (nativeEvent.clientX - rect.x) * multiple;
        const startY = (nativeEvent.clientY - rect.y) * multiple;

        const reset = () => {
            context.clearRect(
                0,
                0,
                cropCanvasRef.current.width,
                cropCanvasRef.current.height
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
            cropCanvasRef.current.removeEventListener('mousemove', onMouseMove);
            cropCanvasRef.current.removeEventListener('mouseup', onMouseUpOrLeave);
            cropCanvasRef.current.removeEventListener('mouseleave', onMouseUpOrLeave);
        }

        cropCanvasRef.current.addEventListener('mousemove', onMouseMove);
        cropCanvasRef.current.addEventListener('mouseup', onMouseUpOrLeave);
        cropCanvasRef.current.addEventListener('mouseleave', onMouseUpOrLeave);

    };

    const imageCrop = async () => {
        if (!cropModel) {
            return;
        }

        const canvas = canvasRef.current;
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
                cropCanvasRef.current.width,
                cropCanvasRef.current.height
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

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.resetTransform();
        ctx.restore();

        const link = document.createElement('a');
        link.download = 'image_edit.jpg';
        link.href = canvas.toDataURL();
        link.click();

        console.log(state);
        console.log(link);


    }


    const rotateVertical = async () => {
        const canvas = canvasRef.current;
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
        const canvas = canvasRef.current;
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
        const canvas = canvasRef.current;
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
        const canvas = canvasRef.current;
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

                <canvas className='canvas'
                    ref={canvasRef}
                    width={width}
                    height={height}
                    style={{
                        // filter: `brightness(${state.brightness}%) grayscale(${state.grayscale}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) hue-rotate(${state.huerotate}deg)`,
                        // transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizontal})`,
                        scale: `${scale}`,
        
                    }}
                    alt="" />




                <canvas className="test_crop_canvas"
                    width={width}
                    height={height}
                    ref={cropCanvasRef}
                    style={{
                        scale: `${scale}`
                    }}
                    onMouseDown={(e) => startDrawingRectangle(e)}
                // onMouseMove={drawRectangle}
                // onMouseUp={stopDrawingRectangle}
                // onMouseLeave={stopDrawingRectangle}  // 이런식으로 이벤트 처리하지말자 
                />

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

export default CanvasTest;