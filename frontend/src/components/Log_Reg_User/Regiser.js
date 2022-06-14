import React, { useState } from "react";
import { API_HOST } from "../../auth";


const Register = ({navigate, choseView, setChoseView}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');

  const [succesMessage ,setSuccesMessage] = useState('')

  const clearErrors = () => {
    setLoginError(() => '');
    setPasswordError(() => '');
    setPasswordRepeatError(() => '');
  }

  const handleButtonClick = () => {
    setChoseView((prev) => !prev);
    setLogin(() => "");
    setPassword(() => "");
    setPasswordRepeat(() => "");
    clearErrors();
  }

  const handleEmptyImputs = () => {
    if (login === "") setLoginError(() => "Prosze wprowadzić nazwę użytkownika");
    if (password === "") setPasswordError(() => "Prosze wprowadzić hasło");
    if (passwordRepeat === "") setPasswordRepeatError(() => "Prosze ponownie wprowadzić hasło");
    if (!login || !password || !passwordRepeat) return 0;
    else return 1;
  }

  const handlePasswordRepeat = () => {
    if (passwordRepeat === "") {
      setPasswordRepeatError(() => "Prosze ponownie wprowadzić hasło");
      return 0;
    }
    if ( password !== passwordRepeat) {
      setPasswordRepeatError("Hasła się nie zgadzają");
      setPasswordRepeat("");
      return 0;
    }
    return 1;
  }

  const handlePassword = () => {
    if (password === "") {
      setPasswordError(() => "Prosze wprowadzić hasło");
      return 0;
    }
    if ( password.length < 8 || password.length > 128) {
      setPasswordError("Hasło jest za krótkie")
      return 0;
    }
    return 1;
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    if ( !handleEmptyImputs() || !handlePasswordRepeat() || !handlePassword() ) {
      return 0;
    }

    const uploadData = {
      "username": login,
      "password": password,
    }

    fetch(`${API_HOST}/auth/register/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(uploadData),
    })
    .then(res => {
      if (res.status === 201) {
        setSuccesMessage("Poprawnie stworzono urzytkownika.")
        return res.json();
      } else if ( res.status === 400 ) {
        setLoginError("Podana nazwa użytkownika już istnieje.")
        setLogin('')
      } 
    })
    .then(data => {
    })
    }

  return(
    <div className={`fullScreen ${choseView ? "register" : ""}`}>
      <div className="positionCenter">
        <form onSubmit={handleRegisterSubmit}>
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
          { passwordError || !password ? <span className="inputError">{passwordError}</span> : null}
          <input 
            name="passwordRepeat"
            type="password" 
            value={passwordRepeat}
            placeholder="Powtórz hasło"
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          { passwordRepeatError && !passwordRepeat ? <span className="inputError">{passwordRepeatError}</span> : null}
          <input
            className="submit"
            type="submit"
            value="Rejestracja"
          />
          { succesMessage ? succesMessage : null}
        </form>
      </div>
      <button 
        className="positionCenter goToLoginButton"
        onClick={handleButtonClick}
        >Logowanie
      </button>
    </div>
  )
}

export default Register;