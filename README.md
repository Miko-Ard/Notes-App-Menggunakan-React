# 📝 Notes App - Dicoding Submission

Sebuah aplikasi catatan pribadi yang dibangun dengan **React + RESTful API**.  
Dikembangkan untuk memenuhi submission kelas **Belajar Fundamental React** di Dicoding.  

## ✨ Features
- 🔐 **Authentication**
  - Registrasi & Login via API Dicoding
  - Access token tersimpan di LocalStorage
  - Logout dengan 1 klik
- 📒 **Notes Management**
  - Tambah catatan baru
  - Lihat daftar catatan aktif
  - Detail catatan
  - Arsipkan / Batalkan arsip
  - Hapus catatan
- 🎨 **UI & Theme**
  - Dark / Light mode (persisten)
  - Clean & modern design (inspired by Claude AI)
- 🌐 **Multi Language**
  - Bahasa Indonesia 🇮🇩 / English 🇬🇧
  - Persisten dengan LocalStorage
- ⏳ **Loading Indicator**
  - Indikasi saat fetch data berlangsung

## 📂 Project Structure
src/

├─ components/ # Reusable components (Header, NoteItem, etc.)

├─ pages/ # Pages (Login, Register, Home, Detail, AddNote)

├─ contexts/ # Theme & Language Context

├─ styles/ # Global styles (styles.css)

├─ utils/ # API utilities

├─ App.jsx

└─ main.jsx

## 🚀 Getting Started

1. Clone repo ini
   ```bash
   git clone https://github.com/username/notes-app.git
   cd notes-app
2. Install dependencies
   ```bash
   npm install
3. Jalankan development server
   ```bash
   npm run dev
4. Build untuk production
   ```bash
   npm run build
