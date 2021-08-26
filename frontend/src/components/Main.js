import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Card from './Card'


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  

    return (
      <main className="content">
        <section className="profile indent">
          <div className="profile__container">
            <div className="profile__data">
              <div
                className="profile__avatar"
                onClick={onEditAvatar}
                style={{ backgroundImage: `url(${currentUser.avatar})` }}
              ></div>
              <div className="profile__data profile-info">
                <div className="profile__data info">
                  <h1 className="info__user-name">{currentUser.name}</h1>
                  <button
                    className="info__button-pen"
                    type="button"
                    onClick={onEditProfile}
                  ></button>
                </div>
                <p className="profile-info__occupation">{currentUser.about}</p>
              </div>
            </div>
            <button
              className="profile__button-plus"
              type="button"
              onClick={onAddPlace}
            ></button>
          </div>
        </section>
        <section className="elements indent">
          <ul className="photo-grid">
            {cards.map((card) => (
                < Card card = {
                    card
                }
                key = {
                    card._id
                }
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}

                />
            ))}
          </ul>
        </section>
      </main>
    );
}

export default Main;
