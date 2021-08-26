import React from 'react'
import { Link } from 'react-router-dom';
import Authorization from './Authorization'


function Register({onRegister}) {
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
        const {email, password} = data;
        onRegister({email, password})

        
    }
    return(
        <Authorization
        title='Регистрация'
        buttonText='Зарегистрироваться'
        onSubmit={handleSubmit}
        onChange={handleChange}
        >
            <div className='register__login'>
                <p className='register__subtitle'>Уже зарегистрированы?</p>
                    <Link className='register__link' to="signin">Войти</Link>
            </div>
        </Authorization>
    )
}

export default Register;