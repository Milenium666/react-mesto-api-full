 class Api {
    constructor({address}) {
        this._address = address;
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    
    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            credentials: 'include'
        })
        .then(this._checkResponse)
    }

    editProfile({name, about}) {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
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
        return fetch(`${this._address}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: {
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
        return fetch(`${this._address}/cards/${cardId}`, {
            credentials: 'include',
            method: 'DELETE',
        })
        .then(this._checkResponse)
    }

    likeCardStatus(cardId, like) {
        return fetch(`${this._address}/cards/${cardId}/likes`, {
        credentials: 'include',
        method: like ? 'PUT' : 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    })
        .then(this._checkResponse)
    }



    updateAvatar({avatar}) {
        return fetch(`${this._address}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: {
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
        address: 'http://milenium666.nomoredomains.rocks',
    });

export default api;
