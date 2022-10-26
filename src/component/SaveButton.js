import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const SaveButton = () => {

    let state = useSelector((state)=>{ return state.DefaultSetting })
    const [details, setDetails] = useState('')


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

    return(
        <div>
            <input type='button' value='저장' onClick={saveImage}></input>
        </div>
    )
}

export default SaveButton;