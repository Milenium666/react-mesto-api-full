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

    getUserData(token) {
        return fetch(`${this._address}/users/me`, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(this._checkResponse)
    }

    getCards(token) {
        return fetch(`${this._address}/cards`, {
            // credentials: 'include'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(this._checkResponse)
    }

    editProfile({name, about}, token) {
        return fetch(`${this._address}/users/me`, {
            // credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkResponse)
    }

    addNewCard({name, link}, token) {
        return fetch(`${this._address}/cards`, {
            // credentials: 'include',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                link
            })

        })
        .then(this._checkResponse)
    }

    deleteCard(cardId, token) {
        return fetch(`${this._address}/cards/${cardId}`, {
            // credentials: 'include',
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
              }
        })
        .then(this._checkResponse)
    }

    likeCardStatus(cardId, like, token) {
        return fetch(`${this._address}/cards/${cardId}/likes`, {
        // credentials: 'include',
        method: like ? 'PUT' : 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
    })
        .then(this._checkResponse)
    }



    updateAvatar({avatar}, token) {
        return fetch(`${this._address}/users/me/avatar`, {
            // credentials: 'include',
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._checkResponse)

    }

}

    const api = new Api( {
        address: 'https://milenium666.nomoredomains.rocks',
    });

export default api;
