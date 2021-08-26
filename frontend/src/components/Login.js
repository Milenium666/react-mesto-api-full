
import Authorization from './Authorization';
import React from 'react';

function Login({onLogin}) {
    const [data, setData] = React.useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!data.email || !data.password) {
            return
        }
        const {email, password} = data
        onLogin(email, password)
        
    }
    
    return(
        <Authorization
            title='Вход'
            buttonText='Войти'
            onSubmit={handleSubmit}
            onChange={handleChange}
        />
    )
}
export default Login;