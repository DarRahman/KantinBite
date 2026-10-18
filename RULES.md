# RULES.md - Aturan Keras & Standar Kualitas KantinBite

Dokumen ini menetapkan aturan mutlak (*hard constraints*) yang wajib dipatuhi pada seluruh kode antarmuka dan logika aplikasi **KantinBite**.

---

## 1. Aturan Visual & Anti-Slop (UI/UX Constraints)

### 1.1 Zero Raw Emoji
- **Dilarang keras** menggunakan karakter emoji Unicode mentah di dalam teks maupun komponen UI.
- Seluruh ikon, maskot Chef Bitey, bahan baku, dan jajanan wajib dirender menggunakan komponen vektor `react-native-svg` melalui `AssetVisual`, `Mascot`, dan `PastelReferenceIcon` atau foto produk yang diunggah pengguna.

### 1.2 Zero Tech/Online Dots & Zero Notch Clutter
- **Dilarang keras** merender titik-titik indikator bulat (`•`, dot hijau, dot oranye, atau dot merah) yang menyerupai status *online/server/tech dashboard* pada header, tombol profil, maupun kartu ringkasan kas.
- **Dilarang keras** menampilkan *Dynamic Island* hitam bertitik kamera atau bar sinyal palsu yang mengganggu kebersihan kanvas aplikasi.
- **Dilarang keras** menampilkan kapsul status berlabel teknis seperti `• SIMULATOR MODAL & MARGIN` atau `• DAPUR PRODUKSI PAGI`.

### 1.3 Zero Washed-Out / Faded Design
- **Dilarang keras** menggunakan efek pudar (*washed-out low opacity*) pada kanopi header, bukit latar, maupun kartu utama yang membuat tampilan terlihat kusam atau berbayang menabrak teks.
- Seluruh warna latar, border, dan ilustrasi wajib tampil **tegas, solid, bersih, dan kontras tinggi** sehingga nyaman dibaca oleh pengguna dewasa (ibu-ibu produsen kue & pedagang kantin).

### 1.4 Harmonisasi Warna Kuliner (Unified Warm Culinary Palette)
- **Dilarang keras** mencampur warna kotak ikon belang-belang yang bertabrakan (seperti ungu neon, hijau stabilo, dan siluet hitam-cokelat tua kaku dalam satu baris).
- Seluruh ikon pintasan operasional (*Kasir Lapak, Titip Kantin, Gudang Stok, Belanja Subuh*, dll.) serta kartu ringkasan kas (*Masuk Hari Ini & Belanja Subuh*) wajib menggunakan palet hangat yang menyatu:
  - **Warm Cream & Butter:** `#FFFBEB`, `#FEF3C7`
  - **Soft Culinary Peach:** `#FFF7ED`, `#FFEDD5`
  - **Honey Gold & Terracotta:** `#F59E0B`, `#EA580C`, `#C2410C`
  - **Deep Espresso Ink:** `#431407`, `#78350F`, `#18181B`

### 1.5 Zero Dev/SaaS Jargon
- **Dilarang keras** menampilkan istilah teknis developer seperti `SaaS`, `Simulator`, `Layar 10`, `Sync`, `Database`, atau `API`. Gunakan bahasa sehari-hari dapur & warung kantin (*Hitung Modal, Buku Piutang, Simpan Resep, Setoran Sore*).

---

## 2. Katalog Galeri Jajanan & Fleksibilitas Gambar Produk

1. **Galeri 26+ Jajanan Kantin & Pasar:** Halaman pembuatan/pengeditan menu wajib menyediakan **Pop-Up Galeri Katalog Lengkap** berisi puluhan jajanan umum kantin (Gorengan, Kue Basah Tradisional, Roti & Bolu, Minuman & Puding).
2. **Gambar Universal Netral:** Wajib menyediakan opsi gambar netral (*Piring Saji Jajanan, Boks Mika Kue, Bungkus Daun Pisang*) untuk kue unik yang belum memiliki ilustrasi khusus.
3. **Unggah Foto Sendiri:** Pengguna wajib dapat mengunggah foto makanan sendiri dari galeri HP/perangkat dan foto tersebut langsung tampil di seluruh layar (Beranda, Kasir POS, dan Katalog HPP).

---

## 3. Integritas Matematika Finansial

1. **Rupiah Bulat Deterministik:** Seluruh perhitungan HPP (`Math.round(totalBatchCost / batchPortions)`), laba bersih, kembalian kasir, dan setoran konsinyasi wajib menghasilkan bilangan bulat tanpa pecahan desimal.
2. **Validasi Retur Fisik:** Jumlah sisa retur sore tidak boleh melebihi jumlah titip pagi (`0 <= returnQty <= initialQty`).
