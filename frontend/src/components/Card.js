import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
const handleClick = () => {
    onCardClick(card)
}
const handleLikeClick = () => {
    onCardLike(card)
}
const handleDeleteClick = () => {
    onCardDelete(card)
}

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner.id === currentUser.id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `photo-grid__detete ${isOwn ? 'photo-grid__detete_visible' : 'photo-grid__detete_hidden'}`
);
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i.id === currentUser.id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = `photo-grid__like ${
    isLiked && "photo-grid__like_active"
  }`;


    return(
        <li className="photo-grid__card" >
            <img
            src={card.link}
            alt={card.name}
            onClick={handleClick}
            className="photo-grid__image"/>
            <button 
            className={cardDeleteButtonClassName} 
            onClick={handleDeleteClick}
            type="button"></button>
            <div className="photo-grid__discription">
                <p className="photo-grid__place">{card.name}</p>
                <div className="photo-grid__likes">
                    <button
                    type="button"
                    className={cardLikeButtonClassName}
                    onClick={handleLikeClick}
                    ></button>
                    <p className="photo-grid__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )

}

export default Card;