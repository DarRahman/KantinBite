# KantinBite — Harmonisasi Palet Kuliner, Ikon Seragam & Galeri Pop-Up 26+ Jajanan + Upload Foto

Perbaikan menyeluruh atas ketidakselarasan visual, penghapusan ornamen *tech/online indicator* (titik bulat status & *Dynamic Island*), pembaruan aturan keras di `RULES.md` dan `DESIGN.md`, penggantian ikon operasional lama agar seragam dengan tema **Warm Cream & Terracotta**, serta penambahan **Pop-Up Katalog Galeri 26+ Jajanan Kantin + Gambar Universal Netral + Fitur Upload Foto Sendiri**.

### User Review & Critical Decisions

> [!IMPORTANT]
> Seluruh perubahan ini dirancang untuk langsung mengatasi ke-4 tangkapan layar yang Anda tandai serta mengunci aturan desain baru di dalam dokumen `RULES.md` dan `DESIGN.md`:

- **Confirmed Decision 1 — Zero Tech/Online Dots & Zero Faded Design (`RULES.md` & `DESIGN.md`)**:
  - Menghapus total *Dynamic Island* hitam bertitik di bagian atas frame, menghapus seluruh kapsul bertitik (`• DAPUR PRODUKSI PAGI`, `• SIMULATOR MODAL & MARGIN`), serta menghapus titik bulat hijau/oranye (`statDotGreen`, `statDotOrange`, `profileMiniDot`) di seluruh layar.
  - Menghapus penggunaan *opacity* transparan/pudar pada kanopi, matahari, dan latar header sehingga seluruh warna tampil **100% tegas, hangat, dan tajam** tanpa kesan pudar.
  - Memperbaiki teks kapitalisasi yang salah ketik seperti `"TAKaran"` menjadi `"TAKARAN BAHAN 1 ADONAN"` dan menghapus istilah teknis `"SIMULATOR"`.
- **Confirmed Decision 2 — Penggantian Total Ikon Operasional Lama (`PastelReferenceIcon.js`)**:
  - Mengganti 4 ikon lama (*Kasir Lapak, Titip Kantin, Gudang Stok, Belanja Subuh*) yang sebelumnya berwarna cokelat gelap kaku dengan kotak ungu/hijau/kuning belang-belang menjadi **Ilustrasi Alat Dapur & Kantin Bernuansa Krem, Madu, dan Oranye Terakota Seragam** (`#FFF7ED`, `#FEF3C7`, `#FDBA74`, `#EA580C`, `#9A3412`) sehingga menyatu hangat dengan keseluruhan aplikasi.
- **Confirmed Decision 3 — Harmonisasi Kartu Kas "Masuk Hari Ini & Belanja Subuh" (`DashboardScreen.js`)**:
  - Mengganti strip putih kontras bertitik hijau/oranye yang tidak nyaman dilihat menjadi **2 Kartu Mini Berdampingan Bernuansa Krem Madu & Terakota Lembut** dengan ikon visual koin/keranjang mini, kontras teks cokelat tua (`#431407`) dan oranye terakota (`#C2410C`), serta pemisah yang menyatu lembut dengan kartu dompet utama.
- **Confirmed Decision 4 — Pop-Up Katalog Galeri 26+ Jajanan + Ikon Netral + Upload Foto Sendiri (`RecipeEditorScreen.js` & `AssetVisual.js`)**:
  - Mengganti deretan 4 gambar di halaman Tambah/Edit Resep menjadi **Kartu Pratinjau Gambar Jajanan Aktif** dengan tombol **"Pilih Gambar Jajanan / Upload Foto"** yang membuka **Pop-Up Galeri Katalog Penuh**.
  - Menyediakan **26+ Ilustrasi Jajanan Kantin & Pasar** yang dikelompokkan per kategori (*Gorengan, Kue Basah, Roti & Bolu, Minuman & Puding*), ditambah **3 Gambar Universal Netral** (*Piring Saji Jajanan, Boks Mika Kue, Bungkus Daun Pisang*), serta tombol **Unggah Foto Sendiri dari HP/Perangkat** untuk jajanan unik buatan sendiri.

---

### 1. Daftar Pembaruan Spesifik Berdasarkan 4 Tangkapan Layar Anda

1. **Perbaikan Tangkapan Layar 1 (4 Ikon Operasional: Kasir Lapak, Titip Kantin, Gudang Stok, Belanja Subuh)**:
   - Menghapus warna latar ungu (`#DDD6FE`), hijau mint (`#A7F3D0`), hijau stabilo (`#D9F99D`), dan siluet hitam-cokelat tua (`#3D312A`) pada `PastelReferenceIcon.js`.
   - Menggantinya dengan **8 Ilustrasi Kuliner Terakota & Krem Madu Seragam** (Mesin Kasir Toko Roti, Tenda Etalase Kantin Hangat, Stoples & Karung Tepung Dapur, Keranjang Anyaman Pasar Pagi, Buku Resep & Kalkulator, Buku Catatan Setoran, Gerai Mitra Kantin, dan Grafik Laba Emas) dengan bingkai squircle krem-oranye yang selaras satu tema.

2. **Perbaikan Tangkapan Layar 2 (Strip "Masuk Hari Ini +Rp 320.000 | Belanja Subuh -Rp 150.000")**:
   - Menghapus titik bulat hijau (`statDotGreen`) dan titik bulat oranye (`statDotOrange`) yang terlihat seperti indikator status online.
   - Mengubah tata letaknya menjadi dua panel permukaan hangat (`#FFF7ED` dan `#FEF3C7`) dengan ikon mini `coin_gold` dan `market_cart`, warna teks yang harmonis (`#7C2D12`, `#065F46`, `#9A3412`), dan garis batas hangat yang nyaman dipandang mata.

3. **Perbaikan Tangkapan Layar 3 (Badge `• DAPUR PRODUKSI PAGI` & Warna Pudar)**:
   - Menghapus komponen `sceneBadge` dan `sceneDot` dari seluruh `ScenicBanner`.
   - Menghilangkan efek *opacity* pudar pada kanopi toko roti, bukit latar, dan elemen dekoratif; serta mengatur ulang posisi ilustrasi latar agar tidak pernah bertabrakan dengan teks judul/subjudul.

4. **Perbaikan Tangkapan Layar 4 (Layar `Racik Resep & HPP` & Pemilih Gambar Menu)**:
   - Menghapus *Dynamic Island* hitam bertitik biru di bagian atas bingkai layar HP pada `App.js`.
   - Memperbaiki typo `"TAKaran"` menjadi `"TAKARAN BAHAN 1 ADONAN"`.
   - Mengganti pemilih 4 ikon menjadi **Kartu Pemilih Gambar Menu Interaktif** yang saat diklik membuka **Modal Pop-Up Galeri Jajanan Lengkap (26+ Ilustrasi + Ikon Universal Netral + Upload Foto Sendiri)**.

---

### 2. Arsitektur Katalog 26+ Jajanan, Ikon Universal & Foto Kustom (`AssetVisual.js`)

Komponen `AssetVisual` akan diperluas agar mampu merender:
1. **Foto Kustom Pengguna (`customPhotoUri` / `data:image/...` / `file://...`)**: Jika produk memiliki foto unggahan pengguna, `AssetVisual` otomatis menampilkan `<Image source={{ uri }} />` di dalam bingkai piring/kartu yang rapi di seluruh layar (Beranda, Kasir POS, Katalog HPP, dan Nota).
2. **3 Ilustrasi Universal Netral (Untuk Jajanan Unik Apa Saja)**:
   - `universal_plate`: Piring saji keramik hangat dengan tudung/hiasan daun pandan netral.
   - `universal_box`: Boks mika kemasan jajanan kantin berpita hangat.
   - `universal_leaf`: Bungkusan daun pisang segar tradisional dengan semat lidi.
3. **23+ Ilustrasi Spesifik Jajanan Kantin & Pasar Nusantara**:
   - **Gorengan Gurih**: `risoles_rogout` (Risoles Rogout), `pastel_telur` (Pastel Telur), `tahu_isi` (Tahu Isi Sayur), `bakwan_jagung` (Bakwan Sayur/Jagung), `tempe_mendoan` (Tempe Mendoan), `pisang_goreng` (Pisang Goreng Crispy), `martabak_telur` (Martabak Mini Telur).
   - **Kue Basah Tradisional**: `dadar_gulung` (Dadar Gulung Pandan), `lemper_ayam` (Lemper Ayam), `kue_lumpur` (Kue Lumpur Kentang), `klepon_pandan` (Klepon Gula Aren), `onde_onde` (Onde-Onde Wijen), `kue_lapis` (Kue Lapis Pelangi/Beras), `putu_ayu` (Putu Ayu Kelapa), `nagasari` (Nagasari Pisang).
   - **Roti, Bolu & Pastry**: `bolu_kukus` (Bolu Kukus Mekar), `donat_gula` (Donat Gula Salju/Meses), `brownies_coklat` (Brownies Cokelat Keju), `sosis_solo` (Sosis Solo Ayam), `pie_susu` (Pie Susu Lumer).
   - **Minuman & Dessert Kantin**: `puding_cup` (Puding Cup Vla), `es_teh_cup` (Es Teh / Minuman Cup), `salad_buah` (Salad Buah / Jelly Cup).

---

### 3. Pembaruan Dokumen Standar (`RULES.md` & `DESIGN.md`)

- Menambahkan pasal eksplisit pada `RULES.md` dan `DESIGN.md`:
  - **Aturan Anti-Pudar (Zero Washed-Out / Faded Colors)**: Dilarang menggunakan *opacity* rendah pada elemen ilustrasi utama, kanopi, atau kartu yang membuat tampilan tampak kusam/pudar.
  - **Aturan Anti-Indikator Online/Tech (Zero Tech Dots & Notch Clutter)**: Dilarang menampilkan titik bulat indikator status (`•`), lampu hijau/oranye ala aplikasi server, atau *Dynamic Island* kamera palsu.
  - **Aturan Kohesi Warna Kuliner (Unified Warm Culinary Palette)**: Seluruh ikon pintasan, kartu ringkasan kas, dan permukaan kartu wajib berada dalam harmoni warna **Warm Cream (`#FFFBEB`), Soft Peach (`#FFF7ED`), Honey Gold (`#F59E0B`), Roasted Terracotta (`#EA580C`), dan Deep Espresso (`#431407`)** tanpa warna pelangi yang saling bertabrakan.
