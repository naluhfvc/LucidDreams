import React from 'react';

const LoginPage = () => {
    return (
        <>
            <label> Usuario: </label>
            <input type="text" name='user'></input>
            <label> Senha: </label>
            <input type="text" name="password"></input>
        </>
    )
}

export default LoginPage;