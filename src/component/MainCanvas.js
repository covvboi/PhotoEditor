import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { urlHandle } from '../store.js';
// import  CropFuntion  from './CropFuntion'


import '../style/main.css'

var newMouseX, newMouseY

const MAX_CANVAS_WIDTH = 410;
const MAX_CANVAS_HEIGHT = 400;


const image = new Image();


const CanvasTest = () => {

    // const [details, setDetails] = useState('')

    /////////////////
    const cropCanvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    const canvasOffSetX = useRef(null);
    const canvasOffSetY = useRef(null);

    const startX = useRef(null);
    const startY = useRef(null);
    //////////

    // HTML element reference는 react의 useRef 훅을 이용해 가져올수있음.
    let state = useSelector((state) => { return state.DefaultSetting })
    let dispatch = useDispatch()


    const canvasRef = useRef(null);
    const [canvasImage, setCanvasImage] = useState('');



    useEffect(() => {

        const canvas = cropCanvasRef.current;
        canvas.width = 410;   //캔버스의 왼쪽 공간 ?
        canvas.height = 400;  // 위쪽 공간 ?


        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'grey';
        context.lineWidth = 1;
        contextRef.current = context;

        const canvasOffSet = canvas.getBoundingClientRect(); //현재 엘리먼트 요소찾는법 
        canvasOffSetX.current = canvasOffSet.left;  //현재 요소의 왼쪽위치 
        canvasOffSetY.current = canvasOffSet.top;  //현재 요소의 top 위치





    }, []);
    //////////////////



    const ImageHandler = (event) => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reader = new FileReader();

        reader.onloadend = (event) => {

            // const image = new Image();
            image.onload = () => {

                const width = image.width > image.height
                    ? MAX_CANVAS_WIDTH
                    : (image.width * MAX_CANVAS_HEIGHT) / image.height;

                const height = image.width > image.height
                    ? (image.height * MAX_CANVAS_WIDTH) / image.width
                    : MAX_CANVAS_HEIGHT;

                ctx.drawImage(image, 0, 0, width, height);
                console.log(image);

                var imageData = canvas.toDataURL('image/jpg');
                setCanvasImage(imageData);
                // console.log(imageData);
                // console.log(state);

                dispatch(urlHandle(
                    reader.result
                ))

            };
            image.src = event.target.result;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

        };
        reader.readAsDataURL(event.target.files[0]);
    };

    ///////////
    const startDrawingRectangle = ({ nativeEvent }) => {

        nativeEvent.preventDefault();  //이벤트 기본동작을 막아준다. 
        nativeEvent.stopPropagation(); //이벤트 버블링 막아준다.

        startX.current = nativeEvent.clientX - canvasOffSetX.current;
        startY.current = nativeEvent.clientY - canvasOffSetY.current;


        setIsDrawing(true);

    };

    const drawRectangle = ({ nativeEvent }) => {

        if (!isDrawing) {
            return;
        }
        nativeEvent.preventDefault();
        nativeEvent.stopPropagation();

        newMouseX = nativeEvent.clientX - canvasOffSetX.current;
        newMouseY = nativeEvent.clientY - canvasOffSetY.current;

        const rectWidth = newMouseX - startX.current;
        const rectHeight = newMouseY - startY.current;

        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current.strokeRect(startX.current, startY.current, rectWidth, rectHeight);

        console.log(startX.current);  // 시작점 x좌표
        console.log(startY.current);  // 시작점 y좌표 

        console.log('reactWidth = ' + rectWidth);
        console.log('reactHeight = ' + rectHeight)


    };

    const stopDrawingRectangle = () => {
        setIsDrawing(false);
    };
    ///////////

    const imageCrop = () => {

        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');


        const rectWidth = newMouseX - startX.current;
        const rectHeight = newMouseY - startY.current;

        // const img = new Image();
        image.onload = () => {

            // const canvas = imageLayer.current;
            // const ctx = canvas.getContext('2d');
            // canvas.width = rectWidth;
            // canvas.height = rectHeight;

            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            ctx.drawImage(image, startX.current, startY.current, rectWidth, rectHeight, 0, 0, rectWidth, rectHeight);
            ctx.save();

            console.log(ctx);

        }
        image.src = canvas.toDataURL();
        console.log(image.src);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // console.log(startX.current,startY.current,rectWidth,rectHeight);

    }

    const saveImage = () => {

        const canvas = canvasRef.current;
        // canvas.width = image.naturalWidth
        // canvas.height = image.naturalHeight
        const ctx = canvas.getContext('2d')

        ctx.filter = `brightness(${state.밝은}%) brightness(${state.밝은}%) grayscale(${state.어두운}%) sepia(${state.빛바랜}%) saturate(${state.선명한}%) contrast(${state.대비된}%) hue-rotate(${state.색전환}deg)`;

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(state.rotate * Math.PI / 180)
        ctx.scale(state.vartical, state.horizontal)
        ctx.save();
        // ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const link = document.createElement('a');
        link.download = 'image_edit.jpg'
        link.href = canvas.toDataURL()
        link.click()

        console.log(state);
    }

    return (
        <div>
            <div className='card_body'>
                <canvas className='canvas'
                    ref={canvasRef}
                    width={MAX_CANVAS_WIDTH}
                    height={MAX_CANVAS_HEIGHT}
                    style={{ filter: `brightness(${state.밝은}%) grayscale(${state.어두운}%) sepia(${state.빛바랜}%) saturate(${state.선명한}%) contrast(${state.대비된}%) hue-rotate(${state.색전환}deg)`, transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizontal})` }}

                    alt=""



                />
                {/* <CropFuntion></CropFuntion> */}
                <canvas className="test_crop_canvas"
                    ref={cropCanvasRef}
                    style={{ transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizontal})` }}
                    onMouseDown={startDrawingRectangle}
                    onMouseMove={drawRectangle}
                    onMouseUp={stopDrawingRectangle}
                    onMouseLeave={stopDrawingRectangle}
                />
            </div>

            <div className='btn_group'>
                <input type="file" onChange={ImageHandler}></input>
                <input type='button' value='crop' onClick={imageCrop} ></input>
                <input type='button' value='save' onClick={saveImage}></input>
                {/* <button onClick={saveImage} className="save">저장하기</button> */}



            </div>


        </div>
    )

}

export default CanvasTest;