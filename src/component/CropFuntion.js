import { useEffect, useRef, useState } from 'react';
import '../style/main.css'

var newMouseX, newMouseY

const CropFuntion = () => {
    
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    const canvasOffSetX = useRef(null);
    const canvasOffSetY = useRef(null);
    
    const startX = useRef(null);
    const startY = useRef(null);

    useEffect(()=>{

        const canvas = canvasRef.current;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'grey';
        context.lineWidth = 1;
        contextRef.current = context;

        const canvasOffSet = canvas.getBoundingClientRect(); //현재 엘리먼트 요소찾는법 
        canvasOffSetX.current = canvasOffSet.left;  //현재 요소의 왼쪽위치 
        canvasOffSetY.current = canvasOffSet.top;  //현재 요소의 top 위치

    },[]);

    const startDrawingRectangle = ({nativeEvent}) => {

        nativeEvent.preventDefault();  //이벤트 기본동작을 막아준다. 
        nativeEvent.stopPropagation(); //이벤트 버블링 막아준다.

        startX.current = nativeEvent.clientX - canvasOffSetX.current;
        startY.current = nativeEvent.clientY - canvasOffSetY.current;


        setIsDrawing(true);

    };

    const drawRectangle = ({nativeEvent}) => {
        
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

        console.log('reactWidth = '+rectWidth);
        console.log('reactHeight = '+rectHeight)
        
        
    };

    const stopDrawingRectangle = () => {
        setIsDrawing(false);
    };


    const imageCrop = () => {
        
    }

    return(
        <div>
            <canvas className="test_crop_canvas"
                ref={canvasRef}
                onMouseDown={startDrawingRectangle}
                onMouseMove={drawRectangle}
                onMouseUp={stopDrawingRectangle}
                onMouseLeave={stopDrawingRectangle}
            />

            

            {/* <input type='button' value='crop'></input> */}
        </div>
    )
}

export default CropFuntion;