# Checklist Roadmap & Task Eksekusi KantinBite

Panduan status pengerjaan seluruh modul, layar, dan fitur proyek KantinBite sesuai dokumen arsitektur dan standar desain mobile (*anti-slop, clean layout, white-first*).

---

## 1. Status Halaman Utama (5 Tab Navigasi)

- [x] **Layar 1: Dashboard Utama (`DashboardScreen.js`)**
  - [x] Top header aman bernafas, avatar Chef Bitey proporsional.
  - [x] Search bar kapsul dengan filter icon.
  - [x] Kartu kas putih solid ramping, koin emas identitas di kiri label, nominal Rp 850.000 sejajar dompet kulit.
  - [x] 4 Aksi operasional 1:1 referensi pastel 8-icon (ikon 75% tebal memenuhi squircle).
  - [x] Katalog jajanan berlatar krem mentega (`#FFF9D6`) dengan indikator scrollbar khusus tanpa clipping.
  - [x] Dua grafik analitik aktif: Tren Penjualan 7 Hari + Donut Ratio Kasir vs Kantin.
  - [x] Log transaksi riil lapangan.
  - [x] Dock navigasi bawah dengan tombol elevated **KASIR** menonjol di tengah.

- [x] **Layar 2: Katalog Jajanan & Kalkulator Modal HPP (`HppScreen.js`)**
  - [x] Header bersih 1 baris: `Katalog Jajanan & HPP` + tombol `+ Resep Baru` oranye solid.
  - [x] Filter kategori horizontal presisi.
  - [x] Kartu resep receipt ledger asli HP: thumbnail jajanan bervolume di kiri, tombol edit resep, badge porsi pill slate (#F1F5F9).
  - [x] Daftar bahan baku 2 kolom rata kanan sempurna dengan total modal batch bergaris tipis.
  - [x] Strip finansial 3 kolom transparan bebas nested background (Jatah Kantin merah, Modal/Pcs hitam, Untung Bersih hijau).
  - [x] Integrasi navigasi bawah elevated KASIR FAB.

- [x] **Layar 3: Kasir Kilat Eceran (`PosScreen.js`)**
  - [x] Grid jajanan 2 kolom hidup dengan thumbnail visual bervolume & border oranye seleksi aktif.
  - [x] Kontrol stepper `[-]` `[qty]` `[+]` empuk ramah jempol di tiap kartu.
  - [x] Floating checkout dock di atas nav bar dengan total belanja & kalkulasi kembalian otomatis.
  - [x] Tombol pecahan uang cepat (`Uang Pas`, `10k`, `20k`, `50k`, `100k`) dengan feedback active.
  - [x] Tombol CTA utama `Bayar & Terbitkan Struk WA`.
  - [x] Bebas 100% dari emoji mentah & navigasi elevated KASIR aktif.

- [x] **Layar 4: Titip Konsinyasi Kantin (`ConsignmentScreen.js`)**
  - [x] Header terstandarisasi 1:1 (`ScreenHeader`): `Titip Kantin` + `+ Kantin Baru`.
  - [x] Date strip pill penanda sesi hari operasional.
  - [x] Carousel pemilihan mitra kantin: status `✓ Lunas` (hijau) & `Piutang` (merah) teks elegan menyatu bebas badge kapsul slop.
  - [x] Bar kontak PIC aktif lengkap dengan tombol integrasi WhatsApp (`Chat WA`).
  - [x] Segmented tab sesi waktu: `Sesi Pagi (Nitip)` vs `Sesi Sore (Rekap)`.
  - [x] Kartu rekap produk receipt ledger: angka retur fisik font 12.5px selaras dalam kotak border halus rapi, kue laku hijau, dan total `Wajib Setor Tunai` tanpa karakter `@` redundan.
  - [x] Tombol CTA oranye solid `Simpan Rekap ke Buku Kas`.
  - [x] Navigasi bawah dock terpadu dengan tab Titip Kantin aktif.

- [x] **Layar 5: Pengaturan Usaha & Arsip Data (`SettingsScreen.js`)**
  - [x] Header standar `ScreenHeader`: `Pengaturan & Akun` + tombol aksi `Bantuan`.
  - [x] Kartu profil usaha publik (nama gerai, pemilik, WhatsApp, tombol ubah profil).
  - [x] Seksi keamanan kasir: kunci PIN transaksi 6 digit aktif & pengaturan hak akses staf.
  - [x] Seksi kemitraan & rekapitulasi: direktori kantin & laporan analitik pembukuan.
  - [x] Seksi pencadangan data mandiri: tombol ekspor cadangan ke memori & pemulihan data.
  - [x] Footer publik komersial bersih: KantinBite v1.0.0 (Zero kata kelompok, zero pemvis, zero NIM).
  - [x] Dock navigasi bawah dengan tab `Saya` aktif.

---

## 2. Status Halaman Ekspansi Fungsional (Sub-Layar Operasional)

- [x] **Layar 6: Form Tambah/Ubah Resep Dinamis (`RecipeEditorScreen.js`)**
  - [x] Top header sub-halaman dengan tombol Back `←` dan tombol Reset.
  - [x] Live simulation result card deterministik bersih: `PROYEKSI LABA BERSIH PER BUTIR` (+Rp 200/butir), Modal HPP (Rp 600), Jatah Kantin (-Rp 400), Harga Jual (Rp 1.200) — **Bebas total dari badge kapsul slop `+40% Sehat`**.
  - [x] Form input identitas jajanan: nama kue, target porsi batch, harga jual eceran, dan komisi kantin.
  - [x] Daftar bahan racikan dinamis dengan ikon bahan mentah, takaran, biaya rata kanan, dan tombol hapus `✕`.
  - [x] Form input tambah bahan cepat dan tombol simpan oranye solid `Simpan Resep ke Katalog HPP`.
  - [x] Dock navigasi bawah `ModernBottomNav` terintegrasi di posisi bawah.

- [x] **Layar 7: Gudang Stok Bahan Baku (`StockScreen.js`)**
  - [x] Top header sub-halaman dengan tombol Back `←` (jelas anak dari tombol Beranda).
  - [x] Kartu notifikasi restok hangat & modern (`toast-restock-card` oranye lembut dengan tombol langsung `Belanja Subuh`).
  - [x] Segmented control filter tabs (`Semua`, `Stok Kritis`, `Bahan Kering`).
  - [x] Grid kartu bahan memakai aset SVG asli (terigu, telur, minyak, gas LPG, gula, ayam, sayur, mika).
  - [x] Status teks bersih menyatu dengan dot indikator warna (hijau `● Aman`, merah `● Kritis`) tanpa badge kapsul slop.
  - [x] Progress bar kapasitas sisa stok.

- [x] **Layar 8: Daftar Belanja Pasar Subuh Otomatis (`MarketShoppingScreen.js`)**
  - [x] Top header sub-halaman dengan tombol Back `←` dan tombol bagikan WhatsApp `Kirim WA` (hijau).
  - [x] Hero kartu estimasi anggaran pasar: total `Rp 271.000`, status `2 dari 6 Terbeli`, rincian terbeli vs sisa belanja terstruktur.
  - [x] Checklist interaktif round checkbox empuk dengan efek coret teks (*strikethrough*) saat barang sudah dibeli di pasar.
  - [x] Thumbnail bahan mentah SVG asli (telur, minyak, ayam, wortel, mika, gula).
  - [x] Integrasi dock navigasi bawah `ModernBottomNav`.

- [x] **Layar 9: Buku Piutang Kantin (`DebtLedgerScreen.js`)**
  - [x] Top header sub-halaman dengan tombol Back `←` dan tombol `+ Catat Piutang` oranye solid 1 baris di kanan.
  - [x] Hero kartu total piutang putih solid: total `Rp 130.000` (merah), `3 Mitra Menunggak`, ikon uang kas resmi.
  - [x] Kartu tagihan per kantin dengan status keterlambatan teks dot bersih (`● Telat 1 Hari`, `● Hari Ini`) bebas badge kapsul slop.
  - [x] Dua tombol aksi ramah jempol di tiap kartu: hijau `Tagih via WA` dengan logo WA resmi dan putih border `Tandai Lunas`.
  - [x] Integrasi dock navigasi bawah `ModernBottomNav` dengan tab Titip Kantin aktif.

- [ ] **Layar 10: Pratinjau Nota Digital & WhatsApp (`ReceiptScreen.js`)**
  - [ ] Format struk belanja rapi.
  - [ ] Tombol kirim langsung ke WhatsApp tanpa printer fisik.

- [ ] **Layar 11: Direktori Mitra Kantin (`PartnerDirectoryScreen.js`)**
  - [ ] Manajemen kontak pengelola kantin (PIC Pak Joko, Bu Siti, dll).
  - [ ] Persentase bagi hasil dan lokasi kantin.

- [ ] **Layar 12: Laporan Rekapitulasi Keuangan (`FinanceReportScreen.js`)**
  - [ ] Rekap laba-rugi periodik (omzet vs HPP vs komisi vs laba bersih riil).

---

## 3. Infrastruktur & Standar Kualitas

- [x] Konfigurasi identitas Git: `DarRahman <badarrahman1905@gmail.com>`
- [ ] Migrasi penuh driver penyimpanan lokal ke SQLite (`expo-sqlite`)
- [ ] Verifikasi audit visual anti-slop pada setiap layar
- [ ] Pengujian build Android APK
