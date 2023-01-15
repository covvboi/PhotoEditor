import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/main.css'

import { GrRotateLeft, GrRotateRight } from "react-icons/gr"
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg"
import { updateState } from '../store.js';
import { CanvasLayer } from './CanvasLayer';
import { useLayoutEffect } from 'react';

const MainCanvas = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => { return state.DefaultSetting });

    const canRef = useRef(null);
    const cardBodyRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const shouldSwapWidthHeight = Math.abs(state.rotate) % 180 > 0;

    let cropModel = null;

    const [rotatedImageUrl, setRotatedImageUrl] = useState(state.image);
    const [filterAppliedImageUrl, setFilterAppliedImageUrl] = useState(state.image);

    useLayoutEffect(() => {
        if (!state.image) {
            return;
        }
        const image = new Image();
        const canvas = document.createElement('canvas');
        const newWidth = shouldSwapWidthHeight ? height : width;
        const newHeight = shouldSwapWidthHeight ? width : height;
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext('2d');
        image.src = state.image;
        image.onload = () => {
            context.clearRect(0, 0, newWidth, newHeight);
            context.save();
            setTimeout(() => {
                context.translate(canvas.width / 2, canvas.height / 2);
                if (state.flip) {
                    context.scale(1, -1);
                }
                context.rotate(state.rotate * Math.PI / 180);
                context.drawImage(image, -image.width / 2, -image.height / 2);
                context.restore();
                context.resetTransform();
                const url = canvas.toDataURL();
                setRotatedImageUrl(url);
            }, 0);
        }
    }, [
        state.image,
        state.rotate,
        state.flip,
        shouldSwapWidthHeight,
        width,
        height,
    ]);

    useEffect(() => {
        if (!rotatedImageUrl) {
            return;
        }
        const canvas = document.createElement('canvas');
        const newWidth = shouldSwapWidthHeight ? height : width;
        const newHeight = shouldSwapWidthHeight ? width : height;
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext('2d');

        const image = new Image();
        image.src = rotatedImageUrl;
        image.onload = () => {
            context.filter = `
                brightness(${state.brightness}%) 
                grayscale(${state.grayscale}%) 
                sepia(${state.sepia}%)
                saturate(${state.saturate}%)
                contrast(${state.contrast}%) 
                hue-rotate(${state.huerotate}deg)
            `;
            context.drawImage(image, 0, 0);
            setFilterAppliedImageUrl(canvas.toDataURL());
        }
    }, [
        rotatedImageUrl,
        width,
        height,
        shouldSwapWidthHeight,
        state.brightness,
        state.grayscale,
        state.saturate,
        state.contrast,
        state.huerotate,
        state.sepia
    ]);

    useEffect(() => {
        if (!filterAppliedImageUrl) {
            return;
        }
        const canvas = canRef.current.canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = filterAppliedImageUrl;
        image.onload = () => {
            context.drawImage(image, 0, 0);
        }
    }, [filterAppliedImageUrl])

    const onImageUploaded = (event) => {
        const canvas = canRef.current.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();
        const image = new Image();

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

                    dispatch(updateState(
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

    const startDrawingRectangle = ({ nativeEvent }) => {
        nativeEvent.preventDefault();  
        nativeEvent.stopPropagation(); 

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

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const currentImage = rotatedImageUrl;

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

        canvas.width = cropModel.width;
        canvas.height = cropModel.height;

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

        setWidth(cropModel.width);
        setHeight(cropModel.height);
        dispatch(updateState(
            {
                image: canvas.toDataURL(),
                rotate: 0,
                flip: false,
            },
        ));
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
        dispatch(updateState(
            {
                rotate: state.rotate + 180,
                flip: !state.flip,
            },
        ));
    }


    const rotateHorizontal = async () => {
        dispatch(updateState(
            {
                flip: !state.flip,
            },
        ));
    }


    const rotateleft = async () => {
        dispatch(updateState(
            {
                rotate: state.rotate - 90,
            },
        ));
    }



    const rotateRight = async () => {
        dispatch(updateState(
            {
                rotate: state.rotate + 90,
            },
        ));
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
                    width={shouldSwapWidthHeight ? height : width}
                    height={shouldSwapWidthHeight ? width : height}
                    scale={scale}
                    onMousedown={(e) => startDrawingRectangle(e)}>
                </CanvasLayer>

            </div>


            <div className='btn_group'>

                <label htmlFor='choose'>
                    <span className='import_image'>
                        Choose Image
                        </span>
                </label>

                <input className='import_btn' type="file" id='choose' onChange={onImageUploaded}></input>

                <input type='button' className='crop_btn' value='Crop' onClick={imageCrop}></input>

                <input type='button' className='save_btn' value='Save' onClick={saveImage}></input>

            </div>


        </div>
    )

}

export default MainCanvas;