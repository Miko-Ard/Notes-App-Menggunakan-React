import React, { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from "../contexts/LanguageContext";

export default function LoginPage() {
  const { language } = useContext(LanguageContext);
  const email = useInput('');
  const password = useInput('');
  const { onLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const texts = {
    id: {
      title1: "Jelajahi",
      title2: "Lebih dalam.",
      subtitle: "Buat harimu lebih mudah dengan kami",
      subtitle2: "Login",
      email: "Alamat Email",
      password: "Kata Sandi",
      button: "Masuk",
      subtitle3: "Belum punya akun?",
    },
    en: {
      title1: "Explore",
      title2: "Deeper.",
      subtitle: "Make your day easier with us",
      subtitle2: "Login",
      email: "Email Address",
      password: "Password",
      button: "Login",
      subtitle3: "Don't have an account?",
    },

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await onLogin({ email: email.value, password: password.value });
    setLoading(false);
    if (!res.error) {
      navigate('/');
    } else {
      alert('Login gagal');
    }
  };

  return (
    <div className="page-center">
      <div className="login-layout">
        <div className="login-left">
          <h1 className="hero">{texts[language].title1}<br />{texts[language].title2}</h1>
          <p className="sub">{texts[language].subtitle}</p>
          <form onSubmit={handleSubmit} className="form">
            <div className="divider">{texts[language].subtitle2}</div>
            <input className="input" type="email" placeholder={texts[language].email} value={email.value} onChange={email.onChange} required />
            <input className="input" type="password" placeholder={texts[language].password} value={password.value} onChange={password.onChange} required />
            <button
              className="btn primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : texts[language].button}
            </button>

            <p className="muted">{texts[language].subtitle3}<Link to="/register">Register</Link></p>
          </form>
        </div>
        <div className="login-right" aria-hidden>
        </div>

      </div>
    </div>
  );
}
