import React, { forwardRef, useEffect, useRef } from 'react'

import { fabric } from 'fabric';

const DrawingCanvas = forwardRef((props, ref) => {

    let canvas;
    useEffect(() => {
        const options = {
            backgroundColor: "grey",
            isDrawingMode: true,
        };

        canvas = new fabric.Canvas(ref.current, options);

        return () => {

            canvas.dispose();
        }
    }, []);

    const draw = () => {
        canvas.set({ isDrawingMode: !canvas.get("isDrawingMode") })
    }
    const share = () => {
    }

    const deleteObject = () => {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
        }
    }


    return (
        <div>
            <canvas width="300" height="300" ref={ref} />
            <button onClick={() => draw()}>Draw</button>
            <button onClick={() => share()}>Draw</button>
            <button onClick={() => deleteObject()}>Delete</button>
        </div>
    )
})

export default DrawingCanvas