# Portfolio App — Rahmat Hidayat Ramadhan

Personal portfolio website built with **React + Vite**, styled using **Tailwind CSS**, and tested with **Vitest**.

## 🚀 Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3 + manual CSS-in-JS |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |

## 📄 Halaman

- **Home** — Hero section dengan highlight skill (Clean Code, Modern Design, Performance)
- **About** — Cerita singkat, pendidikan (Universitas Bina Sarana Informatika, 2024–2028), technical skills, dan interests
- **Projects** — Grid project cards dengan lazy loading (`React.lazy` + `Suspense`)
- **Contact** — Form kontak dengan validasi, info email (`rahmathr.king@gmail.com`), dan link sosial

## ✨ Fitur

- **Dark mode** — toggle via tombol di navbar, diterapkan ke seluruh halaman
- **Responsive** — layout mobile-friendly dengan hamburger menu
- **Lazy loading** — ProjectCard di-load secara lazy untuk performa lebih baik
- **Form validation** — validasi nama (min 2 karakter), email (format regex), dan pesan (min 10 karakter)
- **SPA routing** — navigasi antar halaman tanpa reload (state-based routing)

## 🛠️ Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

## 🧪 Testing

```bash
# Jalankan semua test
npm test

# Jalankan test dengan UI
npm run test:ui
```

Test ditulis menggunakan **Vitest** dan **@testing-library/react**. Test case yang ada:

- Render halaman home dengan nama yang benar
- Validasi format email
- Validasi panjang nama
- Toggle dark mode bekerja dengan benar
- Navigasi antar halaman berfungsi

## 📁 Struktur Project

```
portfolio-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Komponen utama (semua halaman & logika)
│   ├── App.test.jsx     # Unit tests
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── setupTests.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔗 Kontak

- **GitHub**: [@rahmathr](https://github.com/rahmathr)
- **LinkedIn**: [linkedin.com/in/rahmathr](https://www.linkedin.com/in/rahmathr/)
- **Email**: rahmathr.king@gmail.com
