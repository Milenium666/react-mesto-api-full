import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext';
import React from 'react'


function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescrition] = React.useState('');

    React.useEffect(() => {
        setUserName(currentUser.name);
        setUserDescrition(currentUser.about);
    }, [currentUser, isOpen])

    function handleSubmit(e) {
        e.preventDefault();
            onUpdateUser({
                name: userName,
                about: userDescription
            })
            setUserName()
            setUserDescrition()
}
    function handleChangeUserName(e) {
        setUserName(e.target.value);
    }
    function handleChangeUserDescription(e) {
        setUserDescrition(e.target.value)
    }

    return(
        <PopupWithForm
            name='profile-popup'
            title='Редактировать профиль'
            nameButton='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                type="text"
                className="popup__data popup__data_type_name"
                name="name"
                id="user-name"
                minLength="2"
                maxLength="40"
                placeholder="Имя Пользователя"
                value={userName || ''}
                onChange={handleChangeUserName}
                required/>
            <span className="error" id="user-name-error"></span>
            <input
                type="text"
                className="popup__data popup__data_type_job"
                name="job"
                id="job"
                minLength="2"
                maxLength="200"
                placeholder="Род Деятельности"
                value={userDescription || ''}
                onChange={handleChangeUserDescription}
                required/>
            <span className="error" id="job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;

