import React from 'react';

function ImagePopup({card, onClose}) {
    return(
        <div className={card ? 'popup popup_opened' : 'popup popup_pic'} id="show-image">
            <div className="popup__container">
                <button className="popup__close popup__close_pic" type="button" id="close-show_image" onClick={onClose}></button>
                <img src={card?.link} alt={card?.name} className="popup__image"/>
                <p className="popup__description-place">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;