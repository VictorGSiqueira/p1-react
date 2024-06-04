import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import senai from './senai.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(3);
  const [loginDisabled, setLoginDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  useEffect(() => {
    const rememberMeStorage = localStorage.getItem('rememberMe');
    if (rememberMeStorage) {
      setRememberMe(JSON.parse(rememberMeStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
  }, [rememberMe]);

  useEffect(() => {
    if (loginAttempts === 0) {
      setLoginDisabled(true);
    }
  }, [loginAttempts]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //conta válida para exemplo
    const validEmail = "vg_siqueira@hotmail.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
        console.log('Login bem-sucedido');
        setErrorMessage('');
        //irá ser encaminhado para a página da conta
    } else {
        setLoginAttempts(loginAttempts - 1);
        setErrorMessage('Email ou senha incorretos. Tente novamente. Você tem mais ' + loginAttempts + ' tentativa(s).');
        setIsEmailInvalid(email !== validEmail);
        setIsPasswordInvalid(password !== validPassword);
        console.log('Login falhou. Tentativas restantes:', loginAttempts - 1);

      if (loginAttempts <= 1) {
        console.log('Você atingiu o limite máximo de tentativas de login.');
        setLoginDisabled(true);
      }
    }
  };

  return (
    <div className='container'>
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            type="email"
            placeholder='CPF or E-mail'
            id="email"
            className={isEmailInvalid ? 'input-error' : ''}
            value={email}
            onChange={handleEmailChange}
            required
            disabled={loginDisabled}
          />
          <div className="cpf">Use CPF without punctuation or a registered email.</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder='Enter your password here'
            id="password"
            className={isPasswordInvalid ? 'input-error' : ''}
            value={password}
            onChange={handlePasswordChange}
            required
            disabled={loginDisabled}
          />
          <div className="forgot">First access or Forgot my Password</div>
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
            disabled={loginDisabled}
          />
          <label htmlFor="rememberMe">Remember me on this computer</label>
        </div>
        <div className="agree">By signing in, you agree to our <div className='privacy'>Privacy Policy</div></div>
        <button type="submit" disabled={loginDisabled}>Sign in</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {''}
        <div className='agree'>Don't have an account? <div className='privacy'>Click here</div></div>
      </form>
      <div className='foto'>
        <img src={senai} alt="Imagem do Senai" />
        </div>
    </div>
    </div>
  );
};

export default Login;
