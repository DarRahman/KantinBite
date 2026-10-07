# KantinBite

Aplikasi mobile Android operasional dapur produksi, kalkulasi Harga Pokok Penjualan (HPP) otomatis, kasir eceran mandiri (POS), dan rekonsiliasi konsinyasi titip jajanan kantin berbasis luring mandiri (offline-first).

Dibuat untuk memenuhi ketentuan tugas akhir mata kuliah Pemrograman Visual (Semester 5 - Teknik Informatika) oleh **Kelompok C**.

---

## 1. Latar Belakang Masalah

Pelaku usaha mikro kuliner rumahan (pembuat kue basah, risoles, pastel, lemper, dan gorengan) beroperasi dengan perputaran uang harian yang cepat namun rentan mengalami kebocoran pendapatan akibat:
1. **Blind Costing:** Menjual jajanan tanpa mengetahui biaya pokok produksi riil per butir kue karena pembelian bahan baku dilakukan secara grosir dan biaya penolong (gas LPG, kemasan plastik mika) sering diabaikan.
2. **Kebocoran Konsinyasi:** Mengandalkan catatan nota kertas yang sering robek atau hilang saat menitipkan barang ke kantin sekolah dan kampus, sehingga timbul selisih antara kue laku, retur sisa, dan setoran uang fisik.
3. **Pencampuran Kas:** Uang hasil setoran kantin dan penjualan kasir langsung tercampur di dompet pribadi sebelum sempat disisihkan untuk belanja modal esok subuh.
4. **Kendala Sinyal di Lokasi Usaha:** Di lorong kantin bawah tanah atau pasar tradisional, sinyal internet sering tidak stabil. Aplikasi berbasis peladen awan murni sering gagal memproses transaksi pada jam sibuk.

---

## 2. Fitur Utama Aplikasi

KantinBite mengintegrasikan seluruh rantai operasional harian ke dalam lima modul utama:

### A. Dashboard Analitik & Arus Kas
- **Hero Metric Uang Kas:** Menampilkan saldo uang fisik di dompet secara transparan dengan pemisahan total kas masuk dan belanja modal.
- **Grafik Tren Penjualan 7 Hari:** Visualisasi diagram batang harian (Senin sampai Minggu) untuk memantau performa omzet usaha.
- **Log Aktivitas Transaksi:** Riwayat pemasukan dan pengeluaran harian dilengkapi lencana kategori visual.

### B. Dapur & Kalkulator HPP Deterministik
- **Formulasi Takaran Resep:** Pencatatan komposisi bahan baku per batch produksi.
- **Alokasi Biaya Penolong:** Menghitung biaya bahan bakar gas LPG, minyak goreng, dan kemasan plastik mika.
- **Kalkulasi Biaya Pokok per Butir:** Menghitung HPP bersih tanpa pembulatan desimal yang membingungkan.
- **Simulator Margin Laba Dinamis:** Simulasi persentase margin laba (50%, 40%, 30%) yang menghasilkan rekomendasi harga titip ke kantin rekanan dan harga jual langsung eceran.

### C. Kasir Kilat Penjualan Eceran (Point of Sales)
- **Katalog Menu Jajanan Visual:** Dilengkapi aset ilustrasi vektor makanan nyata (Risoles Rogout, Pastel Telur, Dadar Gulung, Lemper Ayam).
- **Perhitungan Keranjang Otomatis:** Memilih menu langsung menjumlahkan total tagihan belanjaan secara instan.
- **Kalkulator Kembalian Kasir:** Menghitung nilai uang kembalian secara otomatis saat memasukkan nominal uang tunai yang diterima dari pembeli.

### D. Konsinyasi & Rekonsiliasi Sore
- **Manajemen Mitra Kantin:** Menyimpan kontak penanggung jawab kantin dan catatan buku piutang berjalan.
- **Nota Titip Pagi:** Pencatatan kuantitas kue yang dititipkan pagi hari dengan status nota aktif.
- **Rekonsiliasi Retur Sore:** Input sisa retur fisik dan kue rusak. Sistem otomatis menghitung kue yang laku dan kewajiban setoran bersih.
- **Status Pembayaran:** Mendukung status lunas tunai maupun pencatatan ke buku piutang jika kantin menunda setoran.

### E. Pengaturan & Pencadangan Data Mandiri
- **Profil Usaha Lokal:** Informasi identitas gerai dan nama pemilik usaha.
- **Pencadangan Data (Backup JSON):** Mengekspor seluruh database resep, transaksi kas, dan konsinyasi ke papan klip ponsel dalam format JSON terstruktur.
- **Pemulihan Data (Restore JSON):** Mengembalikan seluruh data cadangan ke perangkat baru tanpa takut data hilang saat berganti ponsel.
- **Keamanan PIN Lokal:** Kunci akses 6 digit untuk melindungi privasi pencatatan keuangan dari pihak luar.

---

## 3. Teknologi yang Digunakan (Tech Stack)

- **Framework:** React Native (Expo Managed Workflow SDK 57)
- **Bahasa:** JavaScript (React 19 / ES6+)
- **Komponen Inti:** React Navigation (Stack Navigator & Bottom Tabs), React Native SVG
- **Penyimpanan Lokal:** AsyncStorage (Offline-First Mandiri)
- **Integrasi Eksternal:** React Native Linking API (Protokol URL WhatsApp)

---

## 4. Struktur Proyek

```
kantinbite/
├── assets/                 # Aset ikon aplikasi (1024x1024) dan splash screen
├── src/
│   ├── components/         # Komponen UI (Mascot SVG, FoodIcon SVG, BottomNav, WeeklyBarChart)
│   ├── db/
│   │   └── storage.js      # Driver penyimpanan lokal AsyncStorage & fungsi Backup/Restore
│   ├── screens/
│   │   ├── AuthScreen.js         # Layar 1: Masuk akun & PIN 6 digit
│   │   ├── DashboardScreen.js    # Layar 2: Saldo kas, grafik mingguan, aktivitas harian
│   │   ├── HppScreen.js          # Layar 3: Formulasi resep & simulator margin HPP
│   │   ├── PosScreen.js          # Layar 4: Kasir cepat katalog jajanan & hitung kembalian
│   │   ├── ConsignmentScreen.js  # Layar 5: Tab titip pagi & rekonsiliasi retur sore
│   │   ├── ReceiptScreen.js      # Layar 6: Bukti nota digital konsinyasi siap kirim WhatsApp
│   │   └── SettingsScreen.js     # Layar 7: Profil usaha & pencadangan data ke papan klip
│   ├── theme/
│   │   └── tokens.js       # Token palet warna resmi & tipografi
│   └── utils/
│       ├── calculations.js # Rumus matematika HPP, komisi kantin, dan kembalian
│       └── formatters.js   # Pemformat rupiah dan tanggal Indonesia
├── App.js                  # Alur navigasi utama aplikasi
├── app.json                # Konfigurasi metadata aplikasi Expo
└── package.json            # Daftar dependensi modul
```

---

## 5. Cara Menjalankan Aplikasi

Pastikan Node.js dan npm telah terpasang di komputer Anda.

1. Buka terminal dan masuk ke direktori proyek:
   ```bash
   cd kantinbite
   ```
2. Jalankan instalasi dependensi jika belum terpasang:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Jalankan server pengembangan Metro Bundler:
   ```bash
   npx expo start
   ```
4. Buka aplikasi **Expo Go** pada ponsel Android (pastikan berada di jaringan Wi-Fi yang sama), lalu pindai kode QR yang muncul pada terminal untuk membuka aplikasi.
