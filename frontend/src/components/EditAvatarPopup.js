import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault()
      
        onUpdateAvatar({
          avatar: avatarRef.current.value
        })
      }
      



    return(
        <PopupWithForm
            name='edit-img-user'
            title='Обновить Аватар'
            nameButton='Сохранить'
            size='size_m'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >

            <input
                type="url"
                className="popup__data popup__data_margin"
                name="url_img_user"
                id="edit-img-src"
                placeholder="Ссылка на картинку"
                ref={avatarRef}
                required
                
                />
            <span className="error" id="edit-img-src-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;