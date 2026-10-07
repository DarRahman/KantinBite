# RULES.md - Aturan Keras Kode & Integritas Produk

Dokumen ini memuat batasan mutlak (*hard constraints*), kebijakan anti-slop, aturan matematis, dan standar arsitektur untuk seluruh pengembangan aplikasi **KantinBite**.

---

## 1. Aturan Anti-Slop Visual & UI (Zero AI-Slop)

1. **Dilarang Menggunakan Box-in-Box Berlapis:**
   - Dilarang membungkus data ke dalam kartu di dalam kartu yang memiliki garis tepi dobel. Gunakan pembatas baris satu lapis (`border-b border-zinc-100`) atau ruang kosong (*whitespace*).
2. **Dilarang Menggunakan Emoji dalam Kode & Antarmuka:**
   - Seluruh elemen visual wajib menggunakan ikon SVG murni (`react-native-svg`), bukan karakter emoji mentah.
3. **Dilarang Menggunakan Kata-Kata Teknis Developer:**
   - Dilarang menampilkan istilah *"Offline Mode"*, *"Local DB"*, *"Syncing"*, atau *"Tanpa Kuota"* pada antarmuka pengguna. Gunakan istilah bisnis operasional langsung: *"Kas Harian"*, *"Kasir Eceran"*, *"Rekap Sore"*.
4. **Dilarang Menggunakan Gradien Ungu-Biru AI Klise:**
   - Seluruh warna komponen wajib merujuk secara ketat pada token warna di `DESIGN.md` (Deep Culinary Orange `#EA580C`, Warm Honey `#F59E0B`, dan Zinc Neutrals).

---

## 2. Aturan Integritas Finansial & Matematika Deterministik

1. **Aritmatika Bilangan Bulat (Integer / Rounding):**
   - Seluruh perhitungan rupiah wajib dibulatkan penuh (`Math.round`) tanpa menghasilkan pecahan desimal sen (contoh: `Rp600`, bukan `Rp600.33`).
2. **Pencegahan Pembagian dengan Nol (Zero Division):**
   - Pada kalkulasi resep HPP, kuantitas porsi output wajib divalidasi `porsi > 0`. Jika kosong atau nol, sistem tidak mengeksekusi perhitungan dan mengembalikan nilai aman `0`.
3. **Validasi Retur Konsinyasi:**
   - Nilai retur sisa fisik tidak boleh melebihi jumlah titip pagi:
     $$\text{Retur} \le \text{Titip Awal}$$
   - Jika `retur > titip`, sistem menolak penyimpanan dan menandai kolom masukan tidak valid.
4. **Pencegahan Nilai Negatif:**
   - Seluruh kolom input harga, jumlah barang, gramasi, dan uang tunai wajib memfilter tanda minus (`-`) dan karakter non-angka.

---

## 3. Konvensi Kode React Native (Expo)

1. **Dependency Verification:**
   - Dilarang mengimpor pustaka pihak ketiga di luar yang terpasang pada `package.json`.
2. **Komponen Fungsional & Hooks:**
   - Gunakan React Functional Components dengan hooks standar (`useState`, `useEffect`, `useCallback`, `useMemo`).
3. **Isolasi Logika Penyimpanan:**
   - Seluruh interaksi baca/tulis `AsyncStorage` wajib melalui modul tunggal di `src/db/storage.js`. Tidak boleh memanggil `AsyncStorage.getItem/setItem` secara liar di dalam berkas layar.
4. **Ketepatan Layout Mockup (Pixel-Presisi):**
   - Komposisi 6 layar aplikasi wajib mengacu 100% pada struktur visual berkas `mockup_kantinbite.png`:
     - Layar 1: Masuk Akun & Maskot Bitey
     - Layar 2: Hero Metric Saldo Kas & Riwayat Native List
     - Layar 3: HPP Resep & Segmented Margin Dock
     - Layar 4: Kasir Grid Jajanan Bervektor & Hitung Kembalian
     - Layar 5: Tab Rekonsiliasi Sore Konsinyasi
     - Layar 6: Struk Bukti Digital WhatsApp
