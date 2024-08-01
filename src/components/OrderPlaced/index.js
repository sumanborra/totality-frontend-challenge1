
import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';

import 'reactjs-popup/dist/index.css';

import "./index.css"

const OrderPlaced = (props) =>{
    const[popupValue, setPopUpValue] = useState(true)

    const handleClickClose = () =>{
        setPopUpValue({popupValue:false})
    }
   
    return (
        <div className="popup-container">
        <h1>hello</h1>
        <Popup open={popupValue} onClose={handleClickClose}>
          <div className='avatar-display-container'>
            
              <h1>hello</h1>
          </div>
          <div  className="custom-button-comtainer-pop">
            <button type="button" className="trigger-button" onClick={handleClickClose}>
              Close
            </button>
            
          </div>
        </Popup>
      </div>
    )

}
export default OrderPlaced;