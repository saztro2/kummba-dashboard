// Este es el componente de la página de inicio de sesión.
import React, { useState } from 'react';
import './LoginPage.css';

// 1. Ahora el componente recibe una "prop" llamada onLoginSuccess
const LoginPage = ({ onLoginSuccess }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Intentando iniciar sesión con:', { email, password });

        if (email === 'admin@kummba.com' && password === 'password123') {
            setError('');
            
            // 2. En lugar del alert, llamamos a la función que nos pasó App.js
            onLoginSuccess(); 

        } else {
            setError('El correo electrónico o la contraseña son incorrectos.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Panel de Socios</h2>
                <p>Bienvenido. Ingresa tus credenciales.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;