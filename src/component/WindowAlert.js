import '../style/main.css'
import { useEffect, useRef, useState } from 'react';


const WindowAlert = () => {
    
    const [sizeAlert, setSizeAlert] = useState(false);

    // const showAlert = () => {
    //     setSizeAlert(true)
    // }

    window.addEventListener('resize', function(){
        // console.log('resize envet!');
        if(window.innerWidth <= 650){
            setSizeAlert(true)
            // alert('800 px')
        }else{
            setSizeAlert(false)
        }
    })

    // const handleResize = () => {
    //     console.log(`브라우저 화면 사이즈 x: ${window.innerWidth}, y: ${window.innerHeight}`);
    // }

    // useEffect(()=> {
    //     window.addEventListener('resize', handleResize);
    //     return () => { //clean up
    //         window.removeEventListener('resize', handleResize)
    //     }
    // },[])


    return (
        <div>
            <Alertwindow sizeAlert={sizeAlert}></Alertwindow>
        </div>
    )
}

function Alertwindow({ sizeAlert }){
    if(!sizeAlert) return null;
    return(
        <div className="size_alert">
            <div className='size_alert_body'>
                Photo Editor의 최적화를 위해 화면을 키워주세요 :)

            </div>
        </div>
    )

}

export default WindowAlert;