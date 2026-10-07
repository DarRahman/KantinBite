# DESIGN.md - Design Token & System Specification
# Proyek: KantinBite (Aplikasi Operasional Dapur & Konsinyasi Kantin)

Dokumen spesifikasi token desain antarmuka mengacu pada standar Mobbin UI, token A2UI, dan mockup final yang telah diverifikasi (`mockup_kantinbite.png`).

---

## 1. Filosofi Desain (Mobbin Native & Anti-Slop)

- **Brand Name:** **KantinBite**
- **Target Persona:** Ibu rumah tangga / produsen jajanan usia 35-55 tahun.
- **Prinsip Utama:**
  - *Whitespace-Driven:* Ruang napas proporsional antar-elemen tanpa mengurung teks ke dalam kotak-kotak kaku berlapis (*zero box-nesting*).
  - *Zero Border Noise:* Menghilangkan garis tepi abu-abu tipis berlebihan. Memanfaatkan perbedaan latar belakang permukaan halus (*surface tint*) untuk memisahkan hierarki informasi.
  - *Zero Technical Slop:* Menghilangkan kata-kata teknis developer seperti "Offline Mode", "Local Database", atau "Tanpa Kuota". Antarmuka murni mencerminkan aktivitas nyata pengguna (*Kas Harian*, *Kasir Eceran*, *Konsinyasi Sore*).
  - *Tipografi Bernapas:* Angka kasir dan saldo kas menggunakan tipografi tebal berskala besar (28px - 34px tabular) agar mudah dipindai dalam 1 detik di bawah sinar matahari.

---

## 2. Palet Warna Resmi (Fresh Culinary Orange & Warm Honey)

```json
{
  "colors": {
    "primary": {
      "base": "#EA580C",       // Deep Culinary Orange (Warna Aksi Utama, Tombol, Sorotan Aktif)
      "dark": "#C2410C",       // Roasted Orange (Status Tombol Ditekan / Outline Halus)
      "subtle": "#FFF7ED"      // Soft Orange Wash (Latar Menu Terpilih / Badge Avatar)
    },
    "secondary": {
      "base": "#F59E0B",       // Warm Honey / Amber (Aksen Risoles & Sorotan Kategori)
      "light": "#FEF3C7"
    },
    "canvas": "#FFFFFF",       // Pure Clean Canvas (Latar Belakang Layar)
    "surface": {
      "subtle": "#FAFAFA",     // Soft Card Surface (Kartu Makanan & Dock Kasir)
      "muted": "#F4F4F5"       // Gray-100 (Kolom Input Form & Latar Tagihan WhatsApp)
    },
    "text": {
      "primary": "#18181B",    // Zinc-900 (Keterbacaan Tertinggi, Hitam Lembut Bebas Silau)
      "secondary": "#52525B",  // Zinc-600 (Label Formulir & Penjelasan Subtitle)
      "muted": "#A1A1AA"       // Zinc-400 (Placeholder & Ikon Navigasi Nonaktif)
    },
    "border": {
      "hairline": "#F4F4F5",   // Pemisah Baris Halus (Divider Native)
      "subtle": "#E4E4E7"      // Garis Pembatas Segmented Control
    },
    "status": {
      "success": {
        "text": "#059669",     // Emerald-600 (Lunas Tunai / Kas Masuk)
        "bg": "#ECFDF5"        // Emerald-50 (Chip Latar Pemasukan)
      },
      "danger": {
        "text": "#DC2626",     // Red-600 (Retur Rusak / Pengeluaran Belanja)
        "bg": "#FEF2F2"        // Red-50 (Chip Latar Belanja Modal)
      }
    }
  }
}
```

---

## 3. Sistem Tipografi & Ukuran Teks (Skala Keterbacaan Senior)

- **Display / Hero Metric Number:** 34px (Font-weight: 800, Tabular Numerals) -> Saldo kas dompet.
- **Cash Sub-Total:** 20px (Font-weight: 800) -> Total belanja kasir & HPP per butir.
- **Header 1 (Judul Layar):** 24px (Font-weight: 800, letter-spacing -0.5px) -> Judul aplikasi & modul.
- **Header 2 (Sub-modul):** 16px (Font-weight: 800) -> Nama resep & judul katalog jajanan.
- **Body Text:** 14px (Font-weight: 500, line-height 1.5) -> Label input formulir.
- **Caption / Badge:** 11px - 12px (Font-weight: 700) -> Keterangan porsi batch & badge kuantitas pesanan.

---

## 4. Spesifikasi Komponen & Tombol (Touch Target Ergonomis)

- **Minimum Touch Target:** Minimal 48px x 48px pada setiap tombol aksi utama untuk menjamin kenyamanan pengoperasian satu tangan.
- **Corner Radius:**
  - `Pills / Badges`: 6px - 8px
  - `Input Fields`: 12px
  - `Cards / Docks`: 16px
  - `Primary Buttons`: 14px
- **Elevasi & Bayangan:** Menggunakan bayangan lembut alami (`shadow-sm` / `elevation: 2`) tanpa neon blur glow sintetis.

---

## 5. Maskot & Aset Visual Makanan

- **Maskot Resmi (Bitey):** Karakter adonan roti bulat kuning (`#FDE68A`) memakai topi koki putih bersih dengan pipi merah muda (`#FCA5A5`) dan senyum ramah melengkung.
- **Aset Vektor Makanan Asli:**
  - *Risoles Rogout:* Gulungan silinder keemasan (`#F59E0B`) dengan motif garis renyah.
  - *Pastel Telur:* Siluet pastel kuning telur (`#FBBF24`) dengan lipatan gerigi tepi khas.
  - *Dadar Gulung:* Gulungan hijau pandan (`#10B981`) dengan motif kelapa.
  - *Lemper Ayam:* Bentuk trapesium daun pisang hijau tua (`#059669`) dengan sematan lidi.
