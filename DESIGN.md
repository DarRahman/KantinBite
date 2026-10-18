# DESIGN.md - Spesifikasi Sistem Desain KantinBite

Panduan visual, token warna, tipografi, dan tata letak antarmuka **KantinBite**.

---

## 1. Palet Warna Harmonis (Warm Culinary Terracotta & Honey Cream)

Seluruh layar menggunakan gradasi warna hangat yang saling menyambung dan teduh di mata:

| Token | Hex | Penggunaan Utama |
| :--- | :--- | :--- |
| **Canvas Pure** | `#FFFFFF` | Latar dasar halaman & kartu konten utama |
| **Warm Cream** | `#FFFBEB` | Permukaan kartu kas, kartu resep, & latar galeri |
| **Soft Peach** | `#FFF7ED` | Latar kartu aksi cepat, strip kas, & sorotan aktif |
| **Honey Border** | `#FDE68A` / `#FDBA74` | Garis tepi kartu & pemisah blok hangat |
| **Primary Terracotta** | `#EA580C` | Tombol utama, harga produk, & aksen aktif |
| **Roasted Terracotta** | `#C2410C` / `#9A3412` | Bayangan bawah tombol taktil (`borderBottomColor`) |
| **Espresso Ink** | `#18181B` / `#431407` | Judul utama, nama kue, & nominal saldo |
| **Warm Brown Muted** | `#78350F` / `#92400E` | Subjudul, keterangan takaran, & label kartu |
| **Emerald Leaf** | `#15803D` / `#DCFCE7` | Penanda uang masuk / lunas yang lembut & menyatu |

---

## 2. Standar Komponen Utama

1. **Scenic Header Bersih (Tanpa Kapsul Titik & Tanpa Efek Pudar)**:
   - Menampilkan ilustrasi langit hangat, kanopi toko kue solid, dan maskot Chef Bitey di sisi kanan tanpa menabrak teks judul/subjudul.
   - Tidak menggunakan badge kapsul bertitik (`•`) di atas judul.
2. **Ikon Operasional Seragam (`PastelReferenceIcon`)**:
   - Seluruh 8 ikon pintasan menggunakan bingkai squircle krem-oranye hangat (`#FFF7ED` & `#FEF3C7`) dengan garis tepi terakota (`#FDBA74` / `#F59E0B`) dan ilustrasi alat dapur/kantin berwarna oranye-emas-cokelat yang seragam satu tema.
3. **Kartu Kas Dompet & Ringkasan Harian**:
   - Bagian *Masuk Hari Ini* dan *Belanja Subuh* menggunakan dua kartu mini krem-persik berdampingan dengan ikon visual koin/keranjang tanpa titik indikator bulat.
4. **Pop-Up Galeri 26+ Jajanan & Upload Foto**:
   - Pemilih gambar di halaman resep menggunakan tombol pembuka **Modal Galeri Katalog Penuh** dengan filter kategori (*Universal Netral, Gorengan, Kue Basah, Roti & Bolu, Minuman*) serta tombol **Upload Foto dari HP**.
