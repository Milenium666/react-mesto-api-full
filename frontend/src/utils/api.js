 class Api {
    constructor({address, token, groupId}) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    
    }

    getUserData() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse)
    }

    editProfile({name, about}) {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkResponse)
    }

    addNewCard({name, link}) {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            method: 'POST',
            headers: {
            authorization: this._token,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })

        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/${this._groupId}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
            authorization: this._token
            }


        })
        .then(this._checkResponse)
    }

    likeCardStatus(cardId, like) {
        return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
        method: like ? 'PUT' : 'DELETE',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        }


        })
        .then(this._checkResponse)
    }



    updateAvatar({avatar}) {
        return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._checkResponse)

    }

}


  const api = new Api( {
    address: 'https://mesto.nomoreparties.co/v1',
    token: 'b8a7f358-f68b-475f-b42b-36d24756e626',
    groupId: 'cohort-22'

});

export default api;
