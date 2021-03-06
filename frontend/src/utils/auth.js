
export const BASE_URL = 'https://milenium666.nomoredomains.rocks';
const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

export const register = ({email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})

    })
    .then(checkResponse)
  };

  export const authorize = ({email, password}) => {
    
    return fetch(`${BASE_URL}/signin`, {
      // credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      // credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
    
  };
