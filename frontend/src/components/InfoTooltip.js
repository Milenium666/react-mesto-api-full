function InfoTooltip({img, subTitle, isOpen, onClose}) {
    return(
        <div className={isOpen ? 'popup popup_opened' : 'popup'}>
            <div className="popup__container">
                <div className='popup__content'>
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <div className={`${img}`}></div>
                    <p className='popup__subtitle'>{subTitle}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip;