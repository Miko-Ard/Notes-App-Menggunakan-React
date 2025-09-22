import React, { useContext, useEffect, useState } from 'react';
import { getActiveNotes, deleteNote } from '../utils/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import { LanguageContext } from '../contexts/LanguageContext';

export default function NotesPage() {
  const { user } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const texts = {
    id: {
      title: "Daftar Catatan",
      add: "Tambah",
      archive: "Arsip",
      delete: "Hapus",
      confirm_delete: "Hapus catatan ini?",
      delete_fail: "gagal hapus",
    },
    en: {
      title: "Notes List",
      add: "Add",
      archive: "Archived",
      delete: "Delete",
      confirm_delete: "Delete this note?",
      delete_fail: "failed to delete",
    },
  };

  const fetchNotes = async () => {
    setLoading(true);
    const { error, data } = await getActiveNotes();
    if (!error) setNotes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm(texts[language].confirm_delete)) return;
    const { error } = await deleteNote(id);
    if (!error) {
      fetchNotes();
    } else alert(texts[language].delete_fail);
  };

  return (
    <div className="container app-content">
      <div className="page-header">
        <h1>{texts[language].title}</h1>
        <div className="header-actions">
          <Link to="/add" className="btn small">{texts[language].add}</Link>
          <Link to="/archived" className="btn small secondary">{texts[language].archive}</Link>
        </div>
      </div>

      {loading ? <Loading /> : (
        <div className="notes-grid">
          {notes.map(n => (
            <div className="note-card" key={n.id}>
              <Link to={`/notes/${n.id}`} className="note-title">{n.title}</Link>
              <p className="muted">{n.createdAt}</p>
              <div style={{ marginTop: 8 }}>
                <button className="btn small secondary" onClick={() => handleDelete(n.id)}>{texts[language].delete}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
