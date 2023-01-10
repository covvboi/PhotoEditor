import { useImperativeHandle } from "react";
import { useRef, forwardRef } from "react";

export const CanvasLayer = forwardRef(
    ({
        width,
        height,
        scale,
        onMousedown
    },
        ref
    ) => {
        const canvasRef = useRef(null);
        const cropCanvasRef = useRef(null);

        useImperativeHandle(ref, () => ({
            canvasRef: canvasRef,
            cropCanvasRef: cropCanvasRef,
        }));

        return (
            <>
                <canvas className='canvas'
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
                    onMouseDown={(e) => onMousedown(e)}
                />
            </>
        )
    })