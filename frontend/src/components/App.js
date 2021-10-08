/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api'
import * as auth from '../utils/auth'
import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip'

import ProtectedRoute from './ProtectedRoute';






function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  // Пользовательские данные которые передаются в Header при входе на строаницу с карточками
  const [userData, setUserData] = React.useState({
    email: '',
    id: ''
  });
  const history = useHistory()
  const [popupIsCorrect, setPopupIsCorrect] = React.useState();
  const [isCorrectPopupOpen, setIsCorrectPopupOpen] = React.useState(false);


  React.useEffect(()=>{
    getUserInfo();


  }, [loggedIn]);



  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(loggedIn)
{    api.getUserData(jwt)
      .then((res) => {
        setCurrentUser(res.user)
      })
      .catch(err => console.log(err))}
  }, [loggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if(loggedIn)
{    api.getCards(jwt)
      .then((data) => {
        setCards(
          data.cards.map((item) => ({
            name: item.name,
            link: item.link,
            _id: item._id,
            owner: item.owner,
            likes: item.likes,
          }))
        )
      })
      .catch(err => console.log(err))
}  }, [loggedIn]);


  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map(
          (c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem("jwt");
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }
  function handleUpdateUser({name, about}) {
    const jwt = localStorage.getItem("jwt");
    api
      .editProfile({name, about}, jwt)
      .then((res) => {
        

        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAavatar({avatar}) {
    const jwt = localStorage.getItem("jwt");
    api
      .updateAvatar({avatar}, jwt)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(data) {
    const jwt = localStorage.getItem("jwt");
    api.addNewCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      }).catch((err) => console.log(err));
  }


  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const handleCorrectPopup = () => {
    setIsCorrectPopupOpen(true)
  }
  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsCorrectPopupOpen(false)

  }

  const closeRegPopup = () => {
    closeAllPopups();
    if (popupIsCorrect) {
      history.push('/signin');
    }
  }


  const handleError = () => {
    setPopupIsCorrect(false)
    handleCorrectPopup()
  }




  const handleRegister = ({email, password}) => {
    console.log(email, password);
    auth.register({email, password})
      .then(() => {
        //меняет содержимое попапа
        setPopupIsCorrect(true)
        //открывает попап с успешной регистрацией
        handleCorrectPopup()
      })
      .catch(handleError)
  }
  const handleLogin = ({email, password}) => {
    console.log(email, password);
    auth.authorize({email, password})
    .then(data => {
      const { token } = data
      localStorage.setItem('jwt', token)
        console.log('jwt')
        setLoggedIn(true)
        history.push('/')

      })
      .catch(handleError)
  }

  const getUserInfo = () => {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          const { email, _id } = data.user
          setUserData({
            email, _id
          })
          setLoggedIn(true)
         
          history.push('/')
        })
        .catch(err => console.log(err))
    }
  }


  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

 
  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div>

        <Header userData={userData} loggedIn={loggedIn} onSignOut={onSignOut}/>

        <Switch>
          <Route exact path='/signup'>
            <Register
              onRegister={handleRegister}/>
            </Route>
          <Route exact path='/signin' >
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute exact path='/' loggedIn={loggedIn} component={Main} onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
        </Switch>
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAavatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip
              img={popupIsCorrect ? 'popup__approved' : 'popup__false'}
              subTitle={popupIsCorrect ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
              isOpen={isCorrectPopupOpen}
              onClose={closeRegPopup}
            />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
