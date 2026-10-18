# KantinBite — Rombak Total UI/UX Mobile, Scenic Illustrations & Animasi Taktil

Perombakan menyeluruh antarmuka **KantinBite** menjadi aplikasi mobile operasional dapur dan konsinyasi kantin yang kaya ilustrasi pemandangan (*scenic headers*), variasi pose maskot Chef Bitey, visual jajanan Nusantara yang menggugah selera, animasi sentuhan membal (*spring micro-interactions*), serta bingkai tampilan mobile proporsional yang nyaman dipandang di segala layar.

### User Review & Critical Decisions

> [!IMPORTANT]
> Berikut adalah keputusan arah desain dan cakupan fitur yang telah dikonfirmasi untuk dieksekusi secara menyeluruh dengan tetap mematuhi aturan ketat `DESIGN.md` dan `RULES.md` (Zero Emoji, Zero Box-in-Box, Zero Dev Jargon, dan Matematika Rupiah Bulat):

- **Confirmed Decision 1 — Gaya Visual & Scenic Header**: Mengadopsi *scenic illustrated headers* bertema suasana dapur pagi, etalase kantin, dan kafe bakery hangat dengan maskot Chef Bitey ekspresif (terinspirasi dari referensi aplikasi *outdoor/scenic banner*, *Jujuly Cafe*, dan *playful bento mobile UI*).
- **Confirmed Decision 2 — Kekayaan Aset Visual & Ilustrasi**: Menambahkan sistem ilustrasi berlapis (*layered SVG illustrations*) mencakup:
  - **Multi-pose Maskot Chef Bitey**: Bitey membawa boks kue pagi, Bitey menjaga mesin kasir, Bitey memeriksa gudang tepung/telur, Bitey mencatat buku kas, dan Bitey merayakan target laku keras.
  - **Ilustrasi Jajanan Nusantara Detail**: Risoles Rogout keemasan berlapis tepung panir renyah dengan saus cabai/mayo, Pastel Telur berlipat gerigi dengan isian wortel-telur, Dadar Gulung Pandan berpori alami dengan unti kelapa gula merah, Lemper Ayam berbalut daun pisang segar, serta tambahan variasi jajanan pasar (Kue Lumpur, Tahu Isi, Klepon, Bolu Kukus, Onde-Onde).
  - **Banner Suasana Tiap Layar**: Pemandangan langit pagi dapur mengepul, tenda/etalase kantin sekolah & kampus, rak gudang bahan baku, dan suasana pasar subuh.
- **Confirmed Decision 3 — Animasi & Interaksi Mobile**: Menerapkan animasi komprehensif berbasis `Animated` native: efek tekan membal (*spring scale bounce*) pada seluruh tombol/kartu/ikon squircle, animasi mengambang/bernapas halus pada maskot Bitey, transisi grafik dan progress bar yang tumbuh mulus, serta umpan balik keranjang kasir real-time.
- **Confirmed Decision 4 — Cakupan 12 Layar & Mobile Frame**: Merombak seluruh 12 layar utama & sub-layar operasional serta membungkus aplikasi dalam *Responsive Mobile Viewport Frame* (rasio layar HP 412px–430px terpusat dengan *ambient backdrop* hangat pada layar lebar/web, dan *full-bleed* otomatis pada perangkat mobile asli).

---

### 1. Overview & Core Concept

- **What It Does**: **KantinBite** membantu produsen jajanan rumahan mengelola seluruh siklus bisnis harian dari subuh hingga sore: perencanaan belanja pasar subuh, pencatatan stok gudang bahan baku, formulasi resep & perhitungan Harga Pokok Penjualan (HPP), titip jual konsinyasi ke berbagai mitra kantin pagi hari, kasir eceran cepat (POS), rekonsiliasi retur sore, buku piutang mitra, hingga penerbitan nota digital WhatsApp dan laporan laba-rugi.
- **Target Audience / Persona**: Ibu rumah tangga dan pengusaha kuliner jajanan pasar/kantin (usia 35–55 tahun) yang membutuhkan antarmuka visual yang hangat, penuh gambar penjelas yang intuitif, teks angka rupiah besar yang terbaca dalam 1 detik, serta tombol sentuh empuk berukuran minimal 48px.
- **Key Value**: Mengubah antarmuka tabel/kartu kaku menjadi pengalaman aplikasi mobile kelas konsumen (*consumer-grade playful mobile app*) yang hidup, kaya ilustrasi kontekstual, bebas istilah teknis rumit, dan 100% akurat secara finansial.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Masuk & Sapaan Dapur (`Auth` -> `Dashboard`)**: Pengguna disambut ilustrasi kanvas kafe/dapur pagi dengan Chef Bitey membawa boks jajanan hangat, tombol angka PIN taktil yang membal saat disentuh, lalu masuk ke Beranda dengan *Scenic Morning Kitchen Banner*, kartu dompet kas berlapis ilustrasi koin & dompet, 4 tombol aksi squircle 3D bervolume, karusel jajanan bergambar detail, dan grafik analitik beranimasi.
  2. **Siklus Pagi — Gudang, Belanja Subuh & Resep HPP (`Stock` -> `MarketShopping` -> `Hpp` -> `RecipeEditor`)**: Ilustrasi rak dapur dan pasar pagi memandu pengecekan bahan kritis, daftar ceklis belanja subuh interaktif dengan progress bar beranimasi, serta kartu resep HPP visual dengan simulasi laba bersih per butir secara langsung.
  3. **Siklus Siang — Kasir Kilat Eceran (`Pos` -> `Receipt`)**: Grid katalog jajanan bergaya etalase bakery (seperti referensi *Jujuly Cafe*) dengan ilustrasi kue besar di atas piring saji, tombol stepper `[-]` `[+]` yang membal, *floating checkout dock* dengan pecahan uang cepat, dan pratinjau struk digital bergerigi (*perforated paper ticket*) siap kirim ke WhatsApp.
  4. **Siklus Sore — Titip Kantin, Piutang & Laporan (`Consignment` -> `PartnerDirectory` -> `DebtLedger` -> `FinanceReport` -> `Settings`)**: Banner ilustrasi kanopi kantin dengan pergantian suasana langit Pagi (Nitip) vs Sore (Rekap), kartu mitra bergambar avatar karakter PIC, kalkulator retur fisik anti-minus, podium kantin terlaris (mengadaptasi visual podium dari referensi), dan laporan keuangan visual.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: **Warm Culinary Scenic & Tactile Bento** — perpaduan header berilustrasi pemandangan hangat (seperti referensi aplikasi *Camp/Park* & *Jujuly Cafe*) dengan kartu konten putih bersih berbatas ruang kosong proporsional (*whitespace-driven*) dan tombol berdimensi taktil (`borderBottomWidth` tebal).
  - *Color Palette & Mood*:
    - `--canvas`: `#FFFFFF` (Latar utama kartu & konten bersih) dan `#FFFBEB` / `#FFF7ED` (Latar suasana langit pagi hangat pada *scenic banner*).
    - `--primary`: `#EA580C` (Deep Culinary Orange) dengan aksen tekan `#C2410C` (Roasted Orange) dan sorotan lembut `#FFF7ED`.
    - `--secondary`: `#F59E0B` (Warm Honey Amber) & `#FEF3C7` (Butter Cream).
    - `--status-success`: `#059669` (Emerald Green) pada latar `#ECFDF5` untuk kas masuk, setoran lunas, dan daun pandan/pisang.
    - `--status-danger`: `#DC2626` (Crimson Red) pada latar `#FEF2F2` untuk stok kritis, pengeluaran pasar, dan piutang kantin.
    - `--text`: `#18181B` (Zinc-900 untuk angka utama & judul), `#52525B` (Zinc-600 untuk keterangan), `#A1A1AA` (Zinc-400 untuk teks bantu).
  - *Typography & Hierarchy*:
    - Angka Saldo & Hero Metric: `32px–34px` (`fontWeight: 900`, tabular numerals).
    - Judul Layar & Sub-total Kasir: `20px–24px` (`fontWeight: 800`, `letterSpacing: -0.5`).
    - Nama Jajanan & Mitra Kantin: `15px–16px` (`fontWeight: 800`).
    - Keterangan Bahan & Waktu: `12px–13px` (`fontWeight: 600`).
  - *Component Styling & Layout*:
    - **Responsive Mobile Frame**: Pada tampilan browser/desktop, aplikasi dibingkai dalam kanvas mobile proporsional (`maxWidth: 430px`, sudut membulat `36px`, bayangan lembut, dan bar status/indikator atas) dengan latar belakang suasana dapur pastel lembut di sekelilingnya sehingga benar-benar terasa seperti memegang APK mobile asli.
    - **Zero Box-in-Box & Zero Emoji**: Murni menggunakan komponen SVG berlapis, pemisah baris halus (`#F4F4F5`), dan chip permukaan satu lapis tanpa tumpukan kotak bergaris ganda dan tanpa satu pun karakter emoji mentah.

- **Interactive Feedback & Motion**:
  - **Spring Press Wrapper (`AnimatedPressable`)**: Setiap kartu jajanan, tombol aksi cepat, chip kategori, dan tombol kasir mengecil halus (`scale: 0.96`) saat disentuh dan membal kembali (`spring friction: 5`) saat dilepas.
  - **Living Mascot & Scenic Elements**: Maskot Chef Bitey memiliki animasi mengayun/bernapas lembut (`translateY` periodik) dan kepulan uap hangat pada ilustrasi jajanan baru matang.
  - **Animated Charts & Progress Bars**: Grafik batang 7 hari, rasio donat pemasukan, dan bar kapasitas stok gudang bergerak tumbuh secara mulus saat layar dibuka atau periode diganti.
  - **Floating Pill Bottom Navigation**: Dock navigasi bawah bergaya kapsul mengambang modern (seperti referensi ke-1 dan ke-5) dengan indikator aktif beranimasi dan tombol tengah **KASIR** bervolume yang menonjol.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Sistem Ilustrasi SVG Modular & Pemandangan Kontekstual (`ScenicHeader` & `RichFoodVisual`)**
  - *Chosen Approach*: Membangun mesin komponen ilustrasi SVG multi-layer langsung di dalam kode React Native (`react-native-svg`) untuk seluruh pemandangan header, 6 pose maskot Chef Bitey, avatar karakter pengurus kantin, dan 10+ ilustrasi jajanan/bahan baku bertekstur lengkap dengan piring saji dan bayangan.
  - *Why*: Menjamin ketajaman visual 100% di semua resolusi layar, waktu muat instan (0 ms *network latency*), mendukung animasi per bagian elemen (seperti awan bergerak, uap kue, atau tangan maskot melambai), serta mematuhi aturan keras bebas emoji dan *offline-first*.
  - *Alternatives Considered*: Memuat gambar statis eksternal via URL internet (ditolak karena melanggar prinsip *Offline-First Mandiri* dan rawan gagal muat saat tanpa kuota).

- **Decision 2: Bingkai Simulasi Mobile (*Mobile App Shell*) untuk Web & Layar Lebar**
  - *Chosen Approach*: Membungkus `NavigationContainer` di dalam *Mobile Viewport Shell* yang secara otomatis menampilkan bingkai smartphone proporsional (420px x tinggi penuh) saat dibuka di layar lebar/web, lengkap dengan dock navigasi bawah yang terkunci presisi di dasar bingkai HP.
  - *Why*: Menjawab keluhan utama bahwa tampilan saat ini terasa melebar dan kaku seperti halaman web biasa, bukan seperti APK mobile yang padat, rapi, dan ergonomis.
  - *Alternatives Considered*: Membiarkan layout melebar 100% mengikuti layar monitor (ditolak karena merusak proporsi kartu bento, ilustrasi header, dan jangkauan jempol).

- **Decision 3: Pertahanan Integritas Finansial & Penyimpanan Lokal Terisolasi**
  - *Chosen Approach*: Mempertahankan seluruh rumus pembulatan bulat (`Math.round`), validasi `retur <= titip`, pencegahan pembagian nol pada HPP, dan pemusatan CRUD pada modul penyimpanan lokal sambil memperkaya struktur data default dengan atribut visual (jenis ilustrasi, warna tema produk, avatar mitra).
  - *Why*: Memastikan perombakan visual tidak merusak sedikit pun logika bisnis dan keandalan data pengguna yang sudah tersimpan.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                   MOBILE VIEWPORT SHELL (App Frame)                       │
│   Responsive Phone Container (420px Mobile Canvas + Ambient Backdrop)     │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│                 SHARED VISUAL, ILLUSTRATION & MOTION ENGINE               │
│  ┌─────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │ ScenicBannerEngine  │  │  BiteyMascotPoses    │  │ AnimatedTactile  │  │
│  │ • Dapur Pagi Scene  │  │  • Baker Box Pose    │  │ • SpringBounce   │  │
│  │ • Etalase Kantin    │  │  • Cashier POS Pose  │  │ • BreathingFloat │  │
│  │ • Pasar Subuh Scene │  │  • Stock Chef Pose   │  │ • AnimatedBar    │  │
│  │ • Gudang Rak Scene  │  │  • Celebrate Pose    │  │ • StaggerReveal  │  │
│  └─────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│  ┌────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ PlatedFood & Ingredient Visuals    │  │ FloatingPillBottomNav       │  │
│  │ • 10+ Kue Nusantara & Bahan Baku   │  │ • 5 Tab + Center Kasir FAB  │  │
│  └────────────────────────────────────┘  └─────────────────────────────┘  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
        ┌─────────────────────────────┼─────────────────────────────┐
        ▼                             ▼                             ▼
┌───────────────────┐       ┌───────────────────┐         ┌───────────────────┐
│  CORE 5 SCREENS   │       │  OPERATIONAL SUB  │         │  FINANCE & DOCS   │
│ • DashboardScreen │       │ • StockScreen     │         │ • ReceiptScreen   │
│ • ConsignmentScr  │       │ • MarketShopping  │         │ • DebtLedgerScr   │
│ • PosScreen       │       │ • RecipeEditorScr │         │ • FinanceReport   │
│ • HppScreen       │       │ • PartnerDirScr   │         │ • AuthScreen      │
│ • SettingsScreen  │       └─────────┬─────────┘         └─────────┬─────────┘
└─────────┬─────────┘                 │                             │
          └───────────────────────────┼─────────────────────────────┘
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│               ISOLATED ASYNC STORAGE DRIVER (Data & Math Layer)           │
│  • Profile & PIN   • Products & Recipes HPP   • Canteens & Consignment    │
│  • Cashflow Log    • Market Shopping Items    • Backup / Restore JSON     │
└───────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & State**:
  - **Produk & Resep HPP**: Menyimpan identitas jajanan (`id`, `name`, `category`, `icon`, `price`, `cost`, `canteenCut`, `batchPortions`, `ingredients[]`, `totalBatchCost`, `stock`) dengan perhitungan deterministik `unitHpp = Math.round(totalBatchCost / batchPortions)` dan `netProfit = price - unitHpp - canteenCut`.
  - **Mitra Kantin & Sesi Konsinyasi**: Menyimpan daftar mitra (`id`, `name`, `pic`, `phone`, `address`, `dropSchedule`, `fee`, `debt`, `avatarType`) beserta rekap titip pagi & retur sore per mitra (`initialQty`, `returnQty`, `soldQty`, `totalDue`, `isPaid`).
  - **Arus Kas & Laporan (`Cashflow`)**: Menyimpan `walletBalance`, `totalIncomeToday`, `totalExpenseToday`, `weeklyTrend[]`, dan `activities[]` yang otomatis diperbarui saat transaksi Kasir POS, rekap konsinyasi, atau belanja pasar disimpan.

- **Interactive Component & State Mapping**:
  - **Beranda (`DashboardScreen`)**:
    - *Scenic Morning Kitchen Header* dengan sapaan waktu dinamis, karakter Chef Bitey melambai, dan bar pencarian kapsul yang menumpuk manis di batas bawah ilustrasi (mengadaptasi layout referensi ke-4).
    - *Kartu Dompet Kas Interaktif*: Tombol sembunyikan/tampilkan saldo dengan animasi transisi, ilustrasi tumpukan koin emas & dompet kulit, serta ringkasan Pemasukan vs Pengeluaran hari ini.
    - *4 Tombol Aksi Squircle 3D*: Tombol *Gudang Bahan*, *Belanja Subuh*, *Buku Piutang*, dan *Mitra Kantin* dengan efek tekan membal (`AnimatedPressable`) dan ilustrasi penuh warna.
    - *Etalase Jajanan & Grafik Hidup*: Kartu jajanan horizontal dengan gambar piring kue berlapis serta grafik batang 7 hari & rasio donat yang bisa diklik untuk melihat detail harian.
  - **Kasir Kilat (`PosScreen`) & Nota Digital (`ReceiptScreen`)**:
    - *Sidebar / Pill Kategori & Katalog 2 Kolom* (mengadaptasi *Jujuly Cafe*): Kartu jajanan menampilkan ilustrasi makanan besar di atas alas saji, stok tersisa, dan tombol stepper `[-]` `[qty]` `[+]` beranimasi membal.
    - *Interactive Checkout Dock*: Pemilihan nominal uang tunai cepat (`Uang Pas`, `10rb`, `20rb`, `50rb`, `100rb`), hitung kembalian otomatis, dan navigasi ke `ReceiptScreen` yang menampilkan struk kertas bergerigi dengan cap lunas Chef Bitey serta tombol kirim WhatsApp.
  - **Titip Kantin (`ConsignmentScreen`), Mitra (`PartnerDirectoryScreen`) & Piutang (`DebtLedgerScreen`)**:
    - *Scenic Canteen Awning Header* yang berubah warna suasana antara tab **Sesi Pagi (Nitip Kue)** dan **Sesi Sore (Rekap & Setoran)**.
    - *Karusel Mitra dengan Avatar Karakter PIC* (Pak Joko, Bu Siti, Bang Hendra, dll.), input titip & retur dengan tombol stepper cepat dan validasi `retur <= titip`, serta penyimpanan langsung ke buku kas atau buku piutang.
    - *Podium Mitra Kantin Terlaris* pada halaman Direktori Mitra & Laporan Keuangan (mengadaptasi visual podium kayu/emas dari referensi ke-2 dan ke-5) untuk menampilkan 3 kantin dengan serapan kue tertinggi.
  - **Katalog HPP (`HppScreen`) & Editor Resep (`RecipeEditorScreen`)**:
    - *Kartu Resep Visual*: Menampilkan ilustrasi jajanan besar, rincian takaran bahan baku dengan ikon masing-masing bahan (tepung, telur, ayam, minyak, gas, daun pandan), serta bar perbandingan visual antara Modal HPP, Komisi Kantin, dan Untung Bersih.
    - *Live Simulator di Editor Resep*: Setiap perubahan harga bahan atau porsi batch langsung memperbarui kartu proyeksi laba bersih per butir secara real-time dengan tombol pilih ikon jajanan visual.
  - **Gudang Stok (`StockScreen`) & Belanja Subuh (`MarketShoppingScreen`)**:
    - *Scenic Pantry & Market Header* dengan Chef Bitey membawa keranjang belanja, indikator bar kapasitas stok beranimasi, filter bahan kritis, tombol tambah/update stok langsung di kartu, dan ceklis belanja pasar interaktif yang langsung memotong/mencatat kas pengeluaran.
  - **Pengaturan (`SettingsScreen`) & Masuk Akun (`AuthScreen`)**:
    - *Kartu Profil Toko Bergambar Banner Gerai*, modal edit profil usaha langsung di tempat, layar kunci PIN 6 digit dengan *numpad* kustom yang empuk, serta fitur cadangkan/pulihkan data JSON.
