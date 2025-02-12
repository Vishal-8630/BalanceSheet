import React from 'react';
import { RxCross1 } from "react-icons/rx";
import { useNotification } from '../../contexts/NotificationContext';

const Notification = () => {
    const { notification, setNotificationMessage } = useNotification();

    const handleCrossClick = () => {
        setNotificationMessage(null);
    }
  return (
    <div className='container'>
        <div className="notification__container flex-j-sb">
            <div className="notification__message">
                { notification }
            </div>
            <div className="notification__cross flex-center">
                <RxCross1 className='cross' onClick={handleCrossClick}/>
            </div>
        </div>
    </div>
  )
}

export default Notification