import os
import subprocess

BASE_DIR = r"C:\Users\Pongo\Documents\Codingan\kantinbite"
HTML_PATH = os.path.join(BASE_DIR, "preview_consignment_perfect.html")
PNG_PATH = os.path.join(BASE_DIR, "preview_consignment_perfect.png")

html_content = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KantinBite Titip Kantin Perfect</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  body { background: #0F172A; display: flex; justify-content: center; padding: 24px 0; }
  
  .phone-frame {
    width: 390px;
    height: 1250px;
    background: #FFFFFF;
    border-radius: 44px;
    border: 12px solid #1E293B;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .status-bar {
    height: 44px;
    padding: 12px 24px 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    color: #18181B;
    background: #FFFFFF;
  }

  .scroll-container {
    flex: 1;
    overflow-y: auto;
    padding: 6px 18px 100px 18px;
  }
  .scroll-container::-webkit-scrollbar { display: none; }

  /* 1. TOP HEADER KONSISTEN (SCREENHEADER) */
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 12px 0;
  }
  .page-sub { font-size: 11px; font-weight: 600; color: #64748B; margin-bottom: 2px; }
  .page-title { font-size: 21px; font-weight: 900; color: #0F172A; letter-spacing: -0.4px; }

  .add-canteen-btn {
    background: #EA580C;
    border-radius: 12px;
    padding: 7px 13px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    white-space: nowrap;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(234, 88, 12, 0.25);
  }

  /* 2. DATE STRIP PILL */
  .date-strip {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 14px;
  }
  .date-pill {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .date-pill b { color: #0F172A; }

  /* 3. MITRA KANTIN HORIZONTAL CAROUSEL (BERSIH TANPA KAPSUL SLOP) */
  .section-lbl {
    font-size: 11.5px;
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .canteen-carousel {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    margin-bottom: 16px;
    padding-bottom: 4px;
  }
  .canteen-carousel::-webkit-scrollbar { display: none; }

  .canteen-card {
    min-width: 175px;
    background: #FFFFFF;
    border-radius: 18px;
    padding: 12px 14px;
    border: 1.5px solid #E2E8F0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }
  .canteen-card.active {
    border-color: #EA580C;
    border-width: 2px;
    background: #FFFDF9;
  }
  .canteen-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .canteen-name { font-size: 13.5px; font-weight: 800; color: #0F172A; }
  .canteen-pic { font-size: 11px; font-weight: 600; color: #64748B; }

  /* STATUS BERSIH ELEGAN MENYATU (BUKAN KAPSUL SLOP BERTUMPUK) */
  .status-text-paid {
    font-size: 10.5px;
    font-weight: 800;
    color: #059669;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .status-text-debt {
    font-size: 10.5px;
    font-weight: 800;
    color: #DC2626;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* 4. ACTIVE CANTEEN BAR WITH WA BUTTON */
  .active-canteen-bar {
    background: #F8FAFC;
    border-radius: 16px;
    padding: 12px 14px;
    border: 1px solid #E2E8F0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .active-canteen-info { display: flex; flex-direction: column; gap: 2px; }
  .active-canteen-title { font-size: 14px; font-weight: 900; color: #0F172A; }
  .active-canteen-contact { font-size: 11px; color: #64748B; font-weight: 600; }
  
  .chat-wa-btn {
    background: #22C55E;
    border-radius: 12px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(34, 197, 94, 0.25);
  }

  /* 5. SEGMENTED TAB SESI WAKTU (PAGI / SORE) */
  .session-tab-bar {
    background: #F1F5F9;
    border-radius: 14px;
    padding: 4px;
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }
  .session-tab {
    flex: 1;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #64748B;
    text-align: center;
    cursor: pointer;
  }
  .session-tab.active {
    background: #FFFFFF;
    color: #EA580C;
    font-weight: 900;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  /* 6. KARTU REKAP SESI SORE (RECEIPT LEDGER ASLI HP BERSIH) */
  .recap-product-card {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 16px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .recap-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .food-thumb-box {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: #FFFBEB;
    border: 1.5px solid #FDE68A;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .recap-header-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .recap-food-name { font-size: 16px; font-weight: 900; color: #0F172A; }
  .recap-unit-price { font-size: 11.5px; font-weight: 600; color: #64748B; }
  .recap-unit-price b { color: #EA580C; font-weight: 800; }

  /* RINCIAN MATEMATIS REKONSILIASI KONSINYASI */
  .recap-calc-box {
    background: #F8FAFC;
    border-radius: 14px;
    padding: 12px 14px;
    border: 1px solid #E2E8F0;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .recap-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12.5px;
  }
  .recap-row-lbl { color: #334155; font-weight: 600; }
  .recap-val-dark { font-weight: 800; color: #0F172A; font-size: 12.5px; }

  /* INPUT RETUR FISIK BERSIH SELARAS DENGAN TEKS LAIN (BUKAN KOTAK PINK RAKSASA) */
  .retur-clean-wrap {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .retur-clean-input {
    width: 38px;
    height: 26px;
    border-radius: 6px;
    background: #FFFFFF;
    border: 1.2px solid #CBD5E1;
    color: #DC2626;
    font-size: 12.5px;
    font-weight: 800;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .retur-clean-lbl { font-size: 12.5px; font-weight: 700; color: #64748B; }

  .recap-val-green { font-weight: 900; color: #059669; font-size: 12.5px; }

  .recap-divider { height: 1px; background: #E2E8F0; margin: 2px 0; }

  /* TOTAL WAJIB SETOR TUNAI BERSIH TANPA SIMBOL @ REDUNDAN */
  .due-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 4px;
  }
  .due-total-lbl { font-size: 13px; font-weight: 800; color: #0F172A; }
  .due-total-val { font-size: 18px; font-weight: 900; color: #059669; }

  /* CTA SIMPAN REKAP ORANYE SOLID BESAR */
  .save-recap-btn {
    background: #EA580C;
    border-radius: 16px;
    padding: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #FFFFFF;
    font-size: 13.5px;
    font-weight: 900;
    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
    cursor: pointer;
  }

  /* 7. BOTTOM DOCK DANA-STYLE */
  .bottom-dock {
    height: 72px;
    background: #FFFFFF;
    border-top: 1.5px solid #F1EFEA;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 0 10px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
  }
  .dock-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #71717A;
  }
  .dock-btn.active { color: #EA580C; font-weight: 900; }
  .fab-center {
    width: 58px; height: 58px;
    background: #EA580C;
    border-radius: 29px;
    margin-top: -28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 4px solid #FFFFFF;
    box-shadow: 0 6px 18px rgba(234, 88, 12, 0.38);
    color: #FFFFFF;
  }
  .fab-text { font-size: 9px; font-weight: 900; color: #FFFFFF; margin-top: 2px; }
</style>
</head>
<body>

<div class="phone-frame">
  <!-- Status Bar -->
  <div class="status-bar">
    <span>07:30</span>
    <span>4G • 98%</span>
  </div>

  <div class="scroll-container">
    <!-- 1. Top Header Terstandarisasi 1:1 -->
    <div class="top-header">
      <div>
        <div class="page-sub">Pagi Nitip, Sore Ambil Uang</div>
        <div class="page-title">Titip Kantin</div>
      </div>
      <div class="add-canteen-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Kantin Baru
      </div>
    </div>

    <!-- 2. Date Strip -->
    <div class="date-strip">
      <div class="date-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>HARI INI: <b>Kamis, 8 Okt 2026</b></span>
      </div>
    </div>

    <!-- 3. Pilih Kantin Rekanan (Horizontal Carousel Bersih Tanpa Kapsul Slop) -->
    <div class="section-lbl">PILIH KANTIN REKANAN</div>
    <div class="canteen-carousel">
      <!-- Kantin 1: Fakultas Teknik (Terpilih) -->
      <div class="canteen-card active">
        <div class="canteen-card-top">
          <!-- Ikon Gerai Kantin Vektor Asli -->
          <svg width="22" height="22" viewBox="0 0 64 64">
            <path d="M8 24 L14 12 L50 12 L56 24 Z" fill="#EA580C" stroke="#9A3412" stroke-width="2"/>
            <rect x="12" y="26" width="40" height="26" rx="4" fill="#FFFFFF" stroke="#18181B" stroke-width="2"/>
            <rect x="16" y="30" width="32" height="13" rx="3" fill="#FFF7ED" stroke="#FED7AA" stroke-width="1.5"/>
          </svg>
          <!-- Status Teks Menyatu Elegan -->
          <div class="status-text-paid">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Lunas
          </div>
        </div>
        <div class="canteen-name">Kantin Fak. Teknik</div>
        <div class="canteen-pic">PIC: Pak Joko</div>
      </div>

      <!-- Kantin 2: Gedung Utama -->
      <div class="canteen-card">
        <div class="canteen-card-top">
          <svg width="22" height="22" viewBox="0 0 64 64">
            <path d="M8 24 L14 12 L50 12 L56 24 Z" fill="#64748B" stroke="#334155" stroke-width="2"/>
            <rect x="12" y="26" width="40" height="26" rx="4" fill="#FFFFFF" stroke="#18181B" stroke-width="2"/>
            <rect x="16" y="30" width="32" height="13" rx="3" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
          </svg>
          <div class="status-text-debt">
            Piutang Rp 35k
          </div>
        </div>
        <div class="canteen-name">Kantin Gd. Utama</div>
        <div class="canteen-pic">PIC: Bu Siti</div>
      </div>

      <!-- Kantin 3: Warung Kopi Kampus -->
      <div class="canteen-card">
        <div class="canteen-card-top">
          <svg width="22" height="22" viewBox="0 0 64 64">
            <path d="M8 24 L14 12 L50 12 L56 24 Z" fill="#64748B" stroke="#334155" stroke-width="2"/>
            <rect x="12" y="26" width="40" height="26" rx="4" fill="#FFFFFF" stroke="#18181B" stroke-width="2"/>
            <rect x="16" y="30" width="32" height="13" rx="3" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>
          </svg>
          <div class="status-text-debt">
            Piutang Rp 15k
          </div>
        </div>
        <div class="canteen-name">Warung Kopi</div>
        <div class="canteen-pic">PIC: Bang Hendra</div>
      </div>
    </div>

    <!-- 4. Active Canteen Bar with WA Button -->
    <div class="active-canteen-bar">
      <div class="active-canteen-info">
        <div class="active-canteen-title">Kantin Fakultas Teknik</div>
        <div class="active-canteen-contact">PIC: Pak Joko • 081298765432</div>
      </div>
      <div class="chat-wa-btn">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        Chat WA
      </div>
    </div>

    <!-- 5. Segmented Sesi Waktu (Pagi / Sore) -->
    <div class="session-tab-bar">
      <div class="session-tab">Sesi Pagi (Nitip)</div>
      <div class="session-tab active">Sesi Sore (Rekap)</div>
    </div>

    <!-- 6. Rekapitulasi Produk (Receipt Ledger Bersih) -->
    <div class="recap-product-card">
      <div class="recap-card-header">
        <div class="food-thumb-box">
          <svg width="48" height="48" viewBox="0 0 64 64">
            <ellipse cx="32" cy="54" rx="24" ry="5" fill="#E2E8F0"/>
            <rect x="8" y="18" width="48" height="28" rx="14" fill="#F59E0B" stroke="#78350F" stroke-width="2.5"/>
            <line x1="18" y1="26" x2="22" y2="38" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="30" y1="24" x2="34" y2="40" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="42" y1="26" x2="46" y2="38" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="recap-header-info">
          <div class="recap-food-name">Risoles Rogout</div>
          <div class="recap-unit-price">Harga Titip: <b>Rp 1.000 / pcs</b></div>
        </div>
      </div>

      <!-- Rincian Hitungan Bersih & Selaras -->
      <div class="recap-calc-box">
        <div class="recap-row">
          <span class="recap-row-lbl">Titip Pagi:</span>
          <span class="recap-val-dark">30 pcs</span>
        </div>
        
        <!-- Sisa Retur Fisik: Font Selaras 12.5px & Box Sederhana Rapi -->
        <div class="recap-row">
          <span class="recap-row-lbl">Sisa Retur Fisik:</span>
          <div class="retur-clean-wrap">
            <div class="retur-clean-input">5</div>
            <span class="retur-clean-lbl">pcs</span>
          </div>
        </div>

        <div class="recap-row">
          <span class="recap-row-lbl">Kue Terjual Laku:</span>
          <span class="recap-val-green">25 pcs</span>
        </div>

        <div class="recap-divider"></div>

        <!-- Total Wajib Setor: Bersih Tanpa Karakter @ Redundan -->
        <div class="due-total-row">
          <span class="due-total-lbl">Wajib Setor Tunai:</span>
          <span class="due-total-val">Rp 25.000</span>
        </div>
      </div>

      <!-- Tombol Simpan Rekap Oranye Solid -->
      <div class="save-recap-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
        Simpan Rekap ke Buku Kas
      </div>
    </div>

  </div>

  <!-- 7. Bottom Dock DANA Style -->
  <div class="bottom-dock">
    <div class="dock-btn">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
      <span>Beranda</span>
    </div>

    <div class="dock-btn active">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l2-5h14l2 5"/>
        <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"/>
        <path d="M9 22V12h6v10"/>
      </svg>
      <span>Titip Kantin</span>
    </div>

    <div class="fab-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M6 3h12v4H6z"/>
        <path d="M6 12h4 M14 12h4 M6 16h4 M14 16h4"/>
      </svg>
      <span class="fab-text">KASIR</span>
    </div>

    <div class="dock-btn">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
        <circle cx="16" cy="14" r="1.5"/>
      </svg>
      <span>Katalog HPP</span>
    </div>

    <div class="dock-btn">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>Saya</span>
    </div>
  </div>
</div>

</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_content)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
subprocess.run([
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=500,1400",
    f"--screenshot={PNG_PATH}",
    HTML_PATH
], check=True)

print(f"Consignment perfect screenshot rendered to {PNG_PATH}")
