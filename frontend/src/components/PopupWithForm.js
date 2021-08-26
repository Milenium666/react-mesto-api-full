import React from 'react';

function PopupWithForm({name, title, nameButton, children, isOpen, size, onClose, onSubmit}) {
    return(
        <div className={isOpen ? 'popup popup_opened' : 'popup'} id={name}>
      <div className="popup__container">
          <div className={`popup__content popup__content_${size}`}>
              <button className="popup__close" type="button" onClick={onClose}></button>
              <h2 className="popup__edit">{title}</h2>
              <form className="popup__data-container" id={name} onSubmit={onSubmit} type="submit" >
                    {children}
                  <button type="submit" className="popup__button-save" >{nameButton}</button>
              </form>
          </div>
      </div>
  </div>
    )
}

export default PopupWithForm;