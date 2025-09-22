import React, { useContext, useEffect, useState } from 'react';
import { getNote, archiveNote, unarchiveNote } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { LanguageContext } from '../contexts/LanguageContext';

export default function NoteDetailPage() {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const texts = {
    id: {
      not_found: "Catatan tidak ditemukan",
      back: "Kembali",
      unarchive: "Batal Arsip",
      archive: "Arsipkan",
    },
    en: {
      not_found: "Note not found",
      back: "Back",
      unarchive: "Unarchive",
      archive: "Archive",
    },
  };

  const fetch = async () => {
    setLoading(true);
    const { error, data } = await getNote(id);
    if (!error) setNote(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, [id]);

  if (loading) return <Loading />;
  if (!note) return <div className="container"><p>{texts[language].not_found}</p></div>;

  const toggleArchive = async () => {
    if (note.archived) await unarchiveNote(id);
    else await archiveNote(id);
    fetch();
  };

  return (
    <div className="container app-content">
      <div className="page-header">
        <h2>{note.title}</h2>
        <div className="header-actions">
          <button className="btn secondary" onClick={() => navigate(-1)}>{texts[language].back}</button>
          <button className="btn" onClick={toggleArchive}>{note.archived ? texts[language].unarchive : texts[language].archive}</button>
        </div>
      </div>
      <p className="muted">{note.createdAt}</p>
      <div style={{ marginTop: 12 }}>{note.body}</div>
    </div>
  );
}
