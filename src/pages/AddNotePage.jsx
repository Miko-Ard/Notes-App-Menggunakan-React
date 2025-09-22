import React, { useContext, useState } from 'react';
import useInput from '../hooks/useInput';
import { addNote } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

export default function AddNotePage() {
  const { language } = useContext(LanguageContext);
  const title = useInput('');
  const body = useInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const texts = {
    id: {
      title: "Tambah Catatan",
      placeholder_title: "Judul",
      placeholder_body: "Isi",
      saving: "Menyimpan...",
      save: "Simpan",
      add_fail: "gagal tambah catatan",
    },
    en: {
      title: "Add Note",
      placeholder_title: "Title",
      placeholder_body: "Body",
      saving: "Saving...",
      save: "Save",
      add_fail: "failed to add note",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await addNote({ title: title.value, body: body.value });
    setLoading(false);
    if (!error) {
      navigate('/');
    } else {
      alert(texts[language].add_fail);
    }
  };

  return (
    <div className="page-center">
      <div className="card narrow">
        <h2>{texts[language].title}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input className="input" placeholder={texts[language].placeholder_title} value={title.value} onChange={title.onChange} required />
          <textarea className="input" rows="8" placeholder={texts[language].placeholder_body} value={body.value} onChange={body.onChange} required />
          <button className="btn primary" type="submit" disabled={loading}>{loading ? texts[language].saving : texts[language].save}</button>
        </form>
      </div>
    </div>
  );
}
