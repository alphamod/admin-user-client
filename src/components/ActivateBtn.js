import React, { useState } from 'react';
import other from '../API/other';

const ActivateBtn = ({ active, id }) => {
    const [activeState, setActiveState] = useState(active);
    const activateAPI = other.userActivation
    const handleActivation = () => {
        activateAPI(id, activeState).then(response => {
            console.log(response.data.message);
            setActiveState(response.data.newActive);
            console.log(activeState);
        }, error => {
            console.log(error);
        })
    }
    return (
        <>
            {
                activeState ? <button className="btn btn-primary" onClick={handleActivation}><span><img className="activeImg" src="https://img.icons8.com/emoji/344/green-circle-emoji.png" /></span>Deactivate</button> : <button className="btn btn-primary" onClick={handleActivation}><span><img className="activeImg" src="https://img.icons8.com/emoji/344/red-circle-emoji.png" /></span>Activate</button>
            }
        </>
    )
}

export default ActivateBtn
