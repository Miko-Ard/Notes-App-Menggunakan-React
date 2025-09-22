import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { user, onLogout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <div className="brand"><Link to="/">MyNotes</Link></div>
      <div className="header-controls">
        <button className="btn small" onClick={toggleTheme}>Theme: {theme}</button>

        <button onClick={toggleLanguage} className="btn btn-secondary">
          {language === "id" ? "EN" : "ID"}
        </button>

        {user ? (
          <>
            <span className="user muted">Hi, {user.name}</span>
            <button className="btn small" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="link muted">Login</Link>
            <Link to="/register" className="link muted">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
