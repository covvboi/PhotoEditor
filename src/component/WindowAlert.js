import '../style/main.css'
import { useState } from 'react';

const WindowAlert = () => {
    
    const [sizeAlert, setSizeAlert] = useState(false);

    window.addEventListener('resize', function(){
        // console.log('resize envet!');
        if(window.innerWidth <= 650){
            setSizeAlert(true)
        }else{
            setSizeAlert(false)
        }
    })

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