import React, { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import { register } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from "../contexts/LanguageContext";

export default function RegisterPage() {
  const { language } = useContext(LanguageContext);
  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const confirm = useInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const texts = {
    id: {
      title: "Buat akun Anda",
      name: "Nama Lengkap",
      email: "Alamat Email",
      password: "Kata Sandi",
      confirmPassword: "Konfirmasi Kata Sandi",
      button: "Daftar",
      subtitle: "Sudah punya akun?",
      alert_password_mismatch: "Password dan konfirmasi tidak sama",
      alert_register_success: "Registrasi sukses. Silakan login.",
    },
    en: {
      title: "Create your account",
      name: "Full name",
      email: "Email address",
      password: "Password",
      confirmPassword: "Confirm Password",
      button: "Register",
      subtitle: "Already have an account?",
      alert_password_mismatch: "Password and confirmation do not match",
      alert_register_success: "Registration successful. Please login.",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.value !== confirm.value) {
      alert(texts[language].alert_password_mismatch);
      return;
    }
    setLoading(true);
    const res = await register({ name: name.value, email: email.value, password: password.value });
    setLoading(false);
    if (!res.error) {
      alert(texts[language].alert_register_success);
      navigate('/login');
    }
  };

  return (
    <div className="page-center">
      <div className="card narrow">
        <h2>{texts[language].title}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input className="input" value={name.value} onChange={name.onChange} placeholder={texts[language].name} required />
          <input className="input" type="email" value={email.value} onChange={email.onChange} placeholder={texts[language].email} required />
          <input className="input" type="password" value={password.value} onChange={password.onChange} placeholder={texts[language].password} required />
          <input className="input" type="password" value={confirm.value} onChange={confirm.onChange} placeholder={texts[language].confirmPassword} required />
          <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Loading...' : texts[language].button}</button>
          <p className="muted">{texts[language].subtitle} <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
