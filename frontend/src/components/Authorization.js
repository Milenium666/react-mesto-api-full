import React from "react";

function Authorization ({title, buttonText, children, onSubmit, onChange}) {
    return (
        <section className='register indent'>
            <div className='register__container'>
                <form className='register__form' onSubmit={onSubmit}>
                        <h1 className='register__title'>{title}</h1>
                        <input placeholder='Email' className='register__input' type='email' name='email' required onChange={onChange} autoComplete="email"/>
                        <input placeholder='Пароль'className='register__input' type='password' name='password' required onChange={onChange} autoComplete="current-password"/>
                        <button className='register__button-save'>{buttonText}</button>
                        {children}
                </form>
            </div>
        </section>
    )
}

export default Authorization;