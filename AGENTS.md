# AGENTS.md - KantinBite Project Agent Guide

Dokumen panduan arsitektur, standar coding, dan instruksi operasional untuk AI agent dan developer dalam repositori **KantinBite**.

---

## 1. Ikhtisar Proyek & Arsitektur

- **Nama Aplikasi:** **KantinBite**
- **Deskripsi:** Aplikasi mobile Android operasional dapur produksi, kalkulasi Harga Pokok Penjualan (HPP), kasir eceran cepat (POS), dan rekonsiliasi konsinyasi titip jajanan kantin.
- **Platform Target:** Android Mobile (Expo SDK 54 / React Native).
- **Filosofi Arsitektur:** **Offline-First Mandiri**. Semua data tersimpan pada penyimpanan persisten lokal (`@react-native-async-storage/async-storage`). Tidak ada ketergantungan pada backend cloud eksternal atau auth server.

---

## 2. Tech Stack Terkunci

| Layer | Pustaka / Framework | Catatan Implementasi |
| :--- | :--- | :--- |
| **Core Framework** | React Native (Expo) | Managed workflow, zero complex native gradle setup |
| **Bahasa** | JavaScript (ES6+) / React 19 | Komponen fungsional & Hooks (`useState`, `useEffect`, `useMemo`) |
| **Styling** | NativeWind / Tailwind CSS | Mengacu pada token `DESIGN.md`, utilitas kelas tailwind |
| **Navigasi** | `@react-navigation/native` | `@react-navigation/native-stack` untuk alur antar-layar |
| **Penyimpanan Lokal** | `@react-native-async-storage/async-storage` | JSON-based storage engine terisolasi pada `src/db/storage.js` |
| **Vektor & Ikon** | `react-native-svg` | Render maskot Bitey SVG & ilustrasi makanan nyata tanpa font-icon |
| **Integrasi Eksternal** | React Native `Linking` API | URL scheme WhatsApp (`whatsapp://send?phone=...&text=...`) |

---

## 3. Struktur Direktori Proyek

```
kantinbite/
├── AGENTS.md               # Panduan operasional agent & developer
├── DESIGN.md               # Spesifikasi token desain & aturan antarmuka
├── RULES.md                # Aturan keras anti-slop, validasi logika, dan konvensi kode
├── package.json            # Manifest dependensi & script build
├── app.json                # Konfigurasi metadata aplikasi Expo
├── App.js                  # Entry point navigasi aplikasi
├── assets/                 # Aset statis & ikon aplikasi
└── src/
    ├── components/         # Komponen UI modular (Mascot, FoodIcon, MetricChip)
    ├── db/
    │   └── storage.js      # Driver CRUD AsyncStorage (Resep, Transaksi, Konsinyasi)
    ├── screens/
    │   ├── AuthScreen.js         # Layar 1: Masuk akun & kunci PIN 6 digit
    │   ├── DashboardScreen.js    # Layar 2: Hero metric saldo kas & riwayat transaksi
    │   ├── HppScreen.js          # Layar 3: Formulasi resep & segmented margin dock
    │   ├── PosScreen.js          # Layar 4: Kasir cepat katalog jajanan & hitung kembalian
    │   ├── ConsignmentScreen.js  # Layar 5: Tab titip pagi & rekonsiliasi retur sore
    │   └── ReceiptScreen.js      # Layar 6: Pratinjau nota digital & tombol kirim WhatsApp
    └── utils/
        ├── calculations.js # Rumus matematika HPP, komisi kantin, kembalian
        └── formatters.js   # Format mata uang rupiah (IDR) & tanggal lokal
```

---

## 4. Protokol Kerja Agent

1. **Strict Mockup Parity:** Setiap perubahan antarmuka wajib mencerminkan tata letak pada `mockup_kantinbite.png` secara presisi.
2. **Deterministik Finansial:** Seluruh perhitungan uang kas, HPP, dan nota konsinyasi wajib menggunakan pembulatan bulat (`Math.round`) tanpa desimal pecahan yang membingungkan pedagang.
3. **Validasi Sebelum Commit:** Sebelum perubahan kode dicatat, pastikan sintaksis JavaScript valid dan tidak ada pemanggilan dependensi fiktif.
