import React, { useContext, useEffect, useState } from 'react';
import { getArchivedNotes } from '../utils/api';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { LanguageContext } from '../contexts/LanguageContext';

export default function ArchivedNotesPage() {
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const texts = {
    id: {
      title: "Arsip",
      noArchivedNotes: "Tidak ada catatan terarsip.",
      back: "Kembali",
    },
    en: {
      title: "Archived",
      noArchivedNotes: "No archived notes.",
      back: "Back",
    },
  };

  const fetch = async () => {
    setLoading(true);
    const { error, data } = await getArchivedNotes();
    if (!error) setNotes(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="container app-content">
      <div className="page-header">
        <h2>{texts[language].title}</h2>
        <div className="header-actions">
          <Link to="/" className="btn secondary">{texts[language].back}</Link>
        </div>
      </div>
      {loading ? <Loading /> : (
        notes.length > 0 ? (
          <div className="notes-grid">
            {notes.map(n => (
              <div className="note-card" key={n.id}><Link to={`/notes/${n.id}`}>{n.title}</Link></div>
            ))}
          </div>
        ) : <p>{texts[language].noArchivedNotes}</p>
      )}
    </div>
  );
}
