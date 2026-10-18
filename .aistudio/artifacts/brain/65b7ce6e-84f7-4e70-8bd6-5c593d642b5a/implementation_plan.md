# KantinBite — Perbaikan Arsitektur Native Mobile Android (Expo Go & APK) & Tata Letak Responsif

Perbaikan menyeluruh atas bug *runtime* dan tata letak Flexbox/SVG pada perangkat Android fisik (**Expo Go** & **APK**), mencakup perbaikan pemanggilan `initStorage` di `App.js`, perbaikan bug `AnimatedPressable` yang membuat kartu **"Masuk Hari Ini & Belanja Subuh"** tergencet vertikal (gepeng), penghapusan kapsul teks `"Dapur & Konsinyasi Kantin"` di bagian atas header, serta penyempurnaan ilustrasi latar **Pemandangan Dapur & Kantin Hangat** agar tampil utuh dan responsif di semua ukuran layar HP Android.

### User Review & Critical Decisions

> [!IMPORTANT]
> Seluruh perbaikan di bawah ini difokuskan 100% untuk **Native Mobile Android (Expo Go & APK)** berdasarkan tangkapan layar HP Android Anda:

- **Confirmed Decision 1 — Perbaikan Dua Kartu "Masuk Hari Ini & Belanja Subuh" Sejajar 50-50 Proporsional**:
  - **Akar Masalah di Tangkapan Layar**: Komponen `AnimatedPressable` membungkus `<Pressable>` (tanpa `style`) lalu menaruh `style={{ flex: 1 }}` di dalam `<Animated.View>`. Di mesin **Yoga Flexbox Android Native**, `<Pressable>` tanpa `flex: 1` di dalam `flexDirection: 'row'` menyusut menjadi selebar ikon (`~54px`), sementara `flex: 1` di dalamnya malah merentangkan kartu secara vertikal menjadi panjang dan memotong teks nominal!
  - **Solusi**: Memisahkan *outer layout styles* (`flex`, `width`, `margin`, `alignSelf`) ke `<Pressable>` (atau menggunakan `Animated.createAnimatedComponent(Pressable)`) serta menata kartu **Masuk Hari Ini** dan **Belanja Subuh** secara **50-50 proporsional** dengan ikon + label di baris atas dan nominal Rupiah (`+Rp 320.000` & `-Rp 150.000`) tampil utuh dan jelas di bawahnya.
- **Confirmed Decision 2 — Penghapusan Teks `"Dapur & Konsinyasi Kantin"` & Ilustrasi Dapur/Kantin Hangat di Header Atas**:
  - Menghapus total kapsul `"Dapur & Konsinyasi Kantin"` dari bagian kiri atas `ScenicBanner`.
  - Memperbaiki *rendering* `react-native-svg` pada Android (mengganti path kurva `T` yang tidak stabil di SVG Android menjadi kurva Bezier `C` eksplisit dan memperbaiki `LinearGradient` & kanopi) serta menghadirkan **Ilustrasi Suasana Dapur & Kantin Hangat** (kanopi toko kue utuh, jendela dapur bercahaya hangat, rak siluet stoples/panci, kepulan uap kue hangat, dan maskot Chef Bitey).
- **Confirmed Decision 3 — Perbaikan Bug Fatal `initStorage` vs `seedInitialData`**:
  - Di `App.js` sebelumnya tertulis `import { seedInitialData } from './src/db/storage'`, padahal fungsi yang diekspor di `src/db/storage.js` adalah `initStorage`. Kita akan menyelaraskan `initStorage` di `App.js` dan mengekspor alias `seedInitialData = initStorage` di `src/db/storage.js` agar tidak pernah terjadi *TypeError: seedInitialData is not a function* di Expo Go.

---

### 1. Overview & Core Concept

- **What It Does**: Memastikan aplikasi **KantinBite** berjalan 100% mulus di **Expo Go Android** dan saat di-build menjadi **APK**, tanpa kartu yang tergencet, tanpa teks terpotong, tanpa grafik SVG yang hilang/terpotong di bagian atas, dan tanpa *crash* saat inisialisasi penyimpanan lokal.
- **Target Audience / Persona**: Pedagang jajanan pasar & pengelola dapur konsinyasi kantin yang menggunakan berbagai ukuran layar HP Android (mulai dari layar ringkas `360dp` hingga layar lebar `430dp+`).
- **Key Value**: Tata letak yang proporsional, responsif terhadap sistem *status bar* & *navigation bar* Android, serta visual ilustrasi dapur-kantin yang tajam di perangkat nyata.

---

### 2. User Experience & Visual Design

- **Header Atas (`ScenicBanner`) Tanpa Kapsul Teks Kiri**:
  - Teks `"Dapur & Konsinyasi Kantin"` dihapus sepenuhnya sehingga area atas Beranda bersih, hanya menyisakan judul **"Dapur Berkah Bunda"**, sapaan hangat, tombol **"Profil Toko ›"** di kanan atas, dan **Maskot Chef Bitey**.
  - Latar belakang SVG pada `ScenicBanner` menggunakan koordinat eksplisit yang kompatibel penuh dengan **Android Native `react-native-svg`**:
    - Kanopi bergelombang (*scalloped bakery awning*) oranye terakota & krem yang rapi dari ujung kiri ke kanan tanpa terpotong ganjil.
    - Ilustrasi jendela dapur hangat (*warm bakery window*), siluet etalase kue, kepulan uap aroma jajanan, dan meja kayu hangat di bagian bawah.
- **Kartu Dompet & Dua Kartu Sejajar 50-50 (`DashboardScreen`)**:
  - Kartu utama menampilkan **Uang Kas Tunai di Laci (`Rp 850.000`)**.
  - Di bawahnya terdapat **2 Kartu Sejajar 50-50 Proporsional** (`flex: 1` pada container `Pressable`):
    - **Kartu Kiri (Masuk Hari Ini)**: Latar krem madu (`#FEF3C7`), ikon koin emas + label `"Masuk Hari Ini"`, dan nominal tegas **`+Rp 320.000`** (`numberOfLines={1}`, `adjustsFontSizeToFit`).
    - **Kartu Kanan (Belanja Subuh)**: Latar krem persik (`#FFF7ED`), ikon keranjang pasar + label `"Belanja Subuh"`, dan nominal tegas **`-Rp 150.000`** (`numberOfLines={1}`, `adjustsFontSizeToFit`).
- **Grid 8 Ikon Operasional & Navigasi Bawah (`ModernBottomNav`)**:
  - Memastikan ke-8 tombol di `quickActionGrid` (`Kasir Lapak, Titip Kantin, Gudang Stok, Belanja Subuh, Hitung HPP, Buku Piutang, Mitra Kantin, Laba Bersih`) memiliki lebar `23%` yang presisi di Android dengan `AnimatedPressable` yang meneruskan properti layout secara benar.
  - Memastikan `ModernBottomNav` menghormati *safe area bottom inset* Android (`useSafeAreaInsets().bottom`) sehingga tidak tertutup *gesture bar* atau tombol navigasi HP.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Pemisahan Layout Style vs Inner Card Style pada `AnimatedPressable`**:
  - *Chosen Approach*: Mengekstrak properti tata letak Flexbox (`flex`, `flexGrow`, `flexBasis`, `width`, `minWidth`, `maxWidth`, `margin*`, `alignSelf`) agar dipasang langsung pada elemen `<Pressable>`, sementara properti visual kartu (`backgroundColor`, `padding`, `borderRadius`, `border*`, `flexDirection`, `alignItems`, `justifyContent`) tetap berada di `<Animated.View>` bersama `transform: [{ scale }]`.
  - *Why*: Pada React Native Android (mesin Yoga), jika `flex: 1` ditaruh pada anak di dalam `<Pressable>` yang tidak memiliki lebar/flex, maka `<Pressable>` gagal membagi ruang horizontal `flexDirection: 'row'` dan justru merentangkan anak secara vertikal (seperti terlihat pada kartu Masuk Hari Ini di screenshot Anda). Perbaikan di satu titik `PlayfulComponents.js` ini otomatis memperbaiki puluhan tombol dan kartu di seluruh 12 layar sekaligus!
- **Decision 2 — Kompatibilitas SVG Android pada `ScenicBanner`**:
  - *Chosen Approach*: Mengganti perintah path `T` (*smooth quadratic bezier shorthand*) dan perhitungan loop kanopi yang terpotong dengan path SVG eksplisit (`M`, `L`, `Q`, `C`, `Z`) serta ilustrasi jendela dapur & uap kue hangat.
  - *Why*: Renderer `react-native-svg` di Android Native menangani `preserveAspectRatio` dan kurva `T` secara berbeda dibanding browser web, yang menyebabkan pita kanopi atas tampak putus-putus di screenshot HP Anda.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌─────────────────────────────────────────────────────────────────────────┐
│                   App.js (100% Native Mobile Root)                      │
│  SafeAreaProvider ──► StatusBar ──► NavigationContainer                 │
│  useEffect(() => initStorage())  [+ alias seedInitialData in storage]   │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌──────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────┐
│  ScenicBanner.js     │  │  PlayfulComponents.js    │  │  ModernBottomNav.js  │
│ • Hapus pill "Dapur  │  │ • AnimatedPressable:     │  │ • SafeArea bottom    │
│   & Konsinyasi"      │  │   Pisahkan outer flex/   │  │   inset otomatis     │
│ • Ilustrasi Jendela  │  │   width style ke         │  │   untuk HP Android   │
│   Dapur & Uap Kue    │  │   Pressable agar 50-50   │  │ • 5 Tab + Tombol     │
│ • SVG Android-safe   │  │   row bekerja di Android │  │   Tengah KASIR       │
└──────────────────────┘  └──────────────────────────┘  └──────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         12 Layar Responsif Android (Dashboard, POS, Consignment,        │
│         Hpp, RecipeEditor + 26 Snack Gallery, Stock, Market, dll.)      │
└─────────────────────────────────────────────────────────────────────────┘
```

- **Data Model & Storage Initialization (`src/db/storage.js` & `App.js`)**:
  - `initStorage()` tetap menjadi fungsi utama pengisian data awal (`DEFAULT_PROFILE`, `DEFAULT_PRODUCTS`, `DEFAULT_CANTEENS`, `DEFAULT_CASHFLOW`, `DEFAULT_CONSIGNMENT`, `DEFAULT_STOCK_ITEMS`, `DEFAULT_MARKET_ITEMS`, `DEFAULT_DEBTS`).
  - Menambahkan `export const seedInitialData = initStorage;` di `src/db/storage.js` dan memanggil `initStorage()` di `App.js` agar 100% bebas error.
- **Interactive Component & State Mapping**:
  - Seluruh kartu `walletSubCardWarm` & `walletSubCardPeach` di `DashboardScreen`, tombol pintasan 2x4, pill filter, stepper di `PosScreen` & `ConsignmentScreen`, serta galeri pop-up 26+ jajanan di `RecipeEditorScreen` diuji agar proporsional di layar sempit maupun lebar pada Expo Go Android.
