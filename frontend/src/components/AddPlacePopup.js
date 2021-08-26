import PopupWithForm from './PopupWithForm';
import React from 'react';


function AddPlacePopup ({isOpen, onClose, onAddPlace}) {
    const [cardName, setCardName] = React.useState("");
    const [cardLink, setCardLink] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
          name: cardName,
          link: cardLink,
        });
        setCardName("");
        setCardLink("")
      }
      function handleChangeCardName(e) {
        setCardName(e.target.value);
      }
      function handleChangeCardLink(e) {
        setCardLink(e.target.value);
      }
    return(
        <PopupWithForm
            name='add-place'
            title='Новое место'
            nameButton='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
                <input type="text"
                    className="popup__data popup__data_type_name-place"
                    name="name"
                    placeholder="Название"
                    id="place-name"
                    minLength="2"
                    maxLength="30"
                    value={cardName}
                    onChange={handleChangeCardName}
                    required
                />
                    <span className="error" id="place-name-error"></span>

                <input
                    type="url"
                    className="popup__data popup__data_type_pic-link"
                    name="link"
                    id="pic-link"
                    placeholder="Ссылка на картинку"
                    value={cardLink}
                    onChange={handleChangeCardLink}
                    required
                />
                    <span className="error" id="pic-link-error"></span>
          </PopupWithForm>
    )
}

export default AddPlacePopup;