import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_HOST } from "../../auth";


const Login = ({choseView, setChoseView}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const clearErrors = () => {
    setLoginError(() => '');
    setPasswordError(() => '');
  }

  const handleButtonClick = () => {
    setChoseView((prev) => !prev);
    setLogin(() => "");
    setPassword(() => "");
    clearErrors();
  }

  const handleEmptyImputs = () => {
    if (login === "") setLoginError(() => "Prosze wprowadzić nazwę użytkownika");
    if (password === "") setPasswordError(() => "Prosze wprowadzić hasło");
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    handleEmptyImputs();

    const uploadData = {
      "username": login,
      "password": password,
    }

    fetch(`${API_HOST}/auth/login/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if ( res.status === 403 ) {
          setPassword("");
          setPasswordError("Wystąpił problem spróbuj później.")
        } else if ( res.status === 401 ) {
          setPassword("");
          setPasswordError("Podane dane są niepoprawne.")
        }
      })
      .then(data => {
        if ( data.user.is_active ) {
          window.localStorage.setItem('access', JSON.stringify(data.access));
          window.localStorage.setItem('refresh', JSON.stringify(data.refresh));
          window.localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/main');
        }
      })
    }

  return(
    <div className={`fullScreen ${choseView ? "" : "setLoginUp"}`}>
      <div className="positionCenter">
        <form onSubmit={handleLoginSubmit}>
          <input
            name="login"
            type="text" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Nazwa użytkownika"
          />
          { loginError && !login ? <span className="inputError">{loginError}</span> : null}

          <input
            name="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
          />
          { passwordError && !password ? <span className="inputError">{passwordError}</span> : null}

          <input
            className="submit"
            type="submit"
            value="Logowanie"
          />

        </form>
      </div>
      <button 
        className="positionCenter goToRegisterButton"
        onClick={handleButtonClick}
        >Rejestracja
      </button>
    </div>
  )
}

export default Login;