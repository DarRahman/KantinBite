import os
import subprocess

BASE_DIR = r"C:\Users\Pongo\Documents\Codingan\kantinbite"
HTML_PATH = os.path.join(BASE_DIR, "preview_dashboard_antislop.html")
PNG_PATH = os.path.join(BASE_DIR, "preview_dashboard_antislop.png")

HTML_CONTENT = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KantinBite Dashboard Anti-Slop</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  body {
    background-color: #0F172A;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 30px 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", Roboto, sans-serif;
  }
  .phone-frame {
    width: 390px;
    height: 844px;
    background: #F8FAFC;
    border-radius: 46px;
    border: 10px solid #1E293B;
    box-shadow: 0 25px 60px rgba(0,0,0,0.45);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .status-bar {
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 28px 0;
    font-size: 14px;
    font-weight: 700;
    color: #0F172A;
  }
  .scroll-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px 20px 100px;
  }
  .scroll-body::-webkit-scrollbar { display: none; }

  /* Header */
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .greeting-title {
    font-size: 20px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: -0.4px;
  }
  .session-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 3px;
  }
  .session-text {
    font-size: 12px;
    font-weight: 600;
    color: #64748B;
  }
  .avatar-box {
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background: #FFEDD5;
    border: 2px solid #EA580C;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 800;
    color: #EA580C;
  }

  /* Search Bar */
  .search-bar {
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 18px;
    padding: 10px 14px;
    margin-bottom: 18px;
    gap: 10px;
  }
  .search-input {
    border: none;
    outline: none;
    font-size: 13px;
    color: #334155;
    font-weight: 600;
    flex: 1;
    background: transparent;
  }

  /* Hero Card Saldo */
  .wallet-card {
    background: #FFFBEB;
    border: 1.5px solid #FDE68A;
    border-bottom: 4px solid #F59E0B;
    border-radius: 24px;
    padding: 18px;
    margin-bottom: 22px;
  }
  .wallet-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wallet-label-group {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 800;
    color: #92400E;
    letter-spacing: 0.3px;
  }
  .luring-pill {
    background: #DCFCE7;
    border: 1px solid #BBF7D0;
    border-radius: 8px;
    padding: 3px 8px;
    font-size: 11px;
    font-weight: 800;
    color: #15803D;
  }
  .wallet-amt {
    font-size: 30px;
    font-weight: 900;
    color: #78350F;
    letter-spacing: -0.8px;
    margin: 8px 0 12px;
  }
  .cashflow-row {
    display: flex;
    gap: 10px;
  }
  .cash-pill-green {
    flex: 1;
    background: #DCFCE7;
    border: 1.2px solid #BBF7D0;
    border-radius: 14px;
    padding: 10px 12px;
  }
  .cash-pill-red {
    flex: 1;
    background: #FEE2E2;
    border: 1.2px solid #FECACA;
    border-radius: 14px;
    padding: 10px 12px;
  }
  .pill-lbl {
    font-size: 10px;
    font-weight: 700;
    margin-bottom: 3px;
  }
  .pill-green-lbl { color: #15803D; }
  .pill-red-lbl { color: #B91C1C; }
  .pill-val {
    font-size: 14px;
    font-weight: 900;
  }
  .pill-green-val { color: #166534; }
  .pill-red-val { color: #991B1B; }

  /* 4 Aksi Operasional */
  .section-title {
    font-size: 15px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 12px;
  }
  .action-grid {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    gap: 8px;
  }
  .action-tile {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .action-box {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    border: 1.5px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  }
  .action-name {
    font-size: 11px;
    font-weight: 800;
    color: #334155;
  }

  /* Carousel */
  .carousel-title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .see-all {
    font-size: 12px;
    font-weight: 700;
    color: #EA580C;
    cursor: pointer;
  }
  .food-scroll {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    margin: 0 -20px 22px;
    padding: 0 20px;
  }
  .food-card {
    min-width: 148px;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-bottom: 3.5px solid #CBD5E1;
    border-radius: 20px;
    padding: 12px;
    flex-shrink: 0;
  }
  .profit-badge {
    display: inline-block;
    background: #DCFCE7;
    border-radius: 6px;
    padding: 2px 6px;
    font-size: 10px;
    font-weight: 800;
    color: #15803D;
    margin-bottom: 6px;
  }
  .food-img-circle {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    margin: 4px auto 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .food-card-name {
    font-size: 13px;
    font-weight: 800;
    color: #1E293B;
  }
  .food-card-price {
    font-size: 12px;
    font-weight: 900;
    color: #EA580C;
    margin-top: 3px;
  }
  .food-card-sub {
    font-size: 10px;
    font-weight: 600;
    color: #64748B;
  }

  /* Target Operasional */
  .target-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-bottom: 3.5px solid #CBD5E1;
    border-radius: 20px;
    padding: 16px;
  }
  .target-grid {
    display: flex;
    gap: 8px;
    margin-top: 10px;
  }
  .target-metric-box {
    flex: 1;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 8px;
    text-align: center;
  }
  .target-metric-lbl { font-size: 10px; font-weight: 700; color: #64748B; }
  .target-metric-num { font-size: 14px; font-weight: 900; color: #0F172A; margin: 2px 0; }
  .target-metric-sub { font-size: 9px; font-weight: 800; color: #16A34A; }

  /* Bottom Navigation Murni Vektor Garis */
  .bottom-nav {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 76px;
    background: #FFFFFF;
    border-top: 1.5px solid #E2E8F0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 6px 10px;
    z-index: 50;
  }
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
  }
  .nav-label {
    font-size: 10px;
    font-weight: 700;
    color: #94A3B8;
    margin-top: 4px;
  }
  .nav-label-active {
    color: #EA580C;
  }
  .fab-center-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: -16px;
  }
  .fab-circle {
    width: 58px;
    height: 58px;
    border-radius: 29px;
    background: #EA580C;
    border: 3.5px solid #FFFFFF;
    box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .fab-label {
    font-size: 10px;
    font-weight: 900;
    color: #EA580C;
    margin-top: 3px;
  }
</style>
</head>
<body>

<div class="phone-frame">
  <!-- Status Bar -->
  <div class="status-bar">
    <span>07:30</span>
    <div style="display:flex; gap:6px; align-items:center;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.5"><rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/></svg>
    </div>
  </div>

  <div class="scroll-body">
    <!-- Top Header -->
    <div class="top-header">
      <div>
        <div class="greeting-title">Selamat Pagi, Bunda</div>
        <div class="session-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span class="session-text">Sesi Pagi: Drop Kantin & Lapak</span>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <div class="luring-pill">Luring Aktif</div>
        <div class="avatar-box">DB</div>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input class="search-input" type="text" placeholder="Cari jajanan, titipan, atau resep HPP...">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
    </div>

    <!-- Hero Card Dompet Kas Operasional -->
    <div class="wallet-card">
      <div class="wallet-top">
        <div class="wallet-label-group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400E" stroke-width="2.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 10h12"/></svg>
          <span>Kas Operasional Lapak</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78350F" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </div>

      <div class="wallet-amt">Rp 850.000</div>

      <div class="cashflow-row">
        <div class="cash-pill-green">
          <div class="pill-lbl pill-green-lbl">Pemasukan Hari Ini</div>
          <div class="pill-val pill-green-val">+Rp 320.000</div>
        </div>
        <div class="cash-pill-red">
          <div class="pill-lbl pill-red-lbl">Belanja Pasar Subuh</div>
          <div class="pill-val pill-red-val">-Rp 150.000</div>
        </div>
      </div>
    </div>

    <!-- 4 Aksi Cepat Operasional -->
    <div class="section-title">Aksi Operasional Harian</div>
    <div class="action-grid">
      <!-- Kasir -->
      <div class="action-tile">
        <div class="action-box" style="background:#FFEDD5; border-color:#FED7AA;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h10"/>
          </svg>
        </div>
        <span class="action-name">Kasir Lapak</span>
      </div>

      <!-- Titip Kantin -->
      <div class="action-tile">
        <div class="action-box" style="background:#FEF08A; border-color:#FDE047;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
          </svg>
        </div>
        <span class="action-name">Titip Kantin</span>
      </div>

      <!-- Gudang Stok -->
      <div class="action-tile">
        <div class="action-box" style="background:#E0E7FF; border-color:#C7D2FE;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4338CA" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
            <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
          </svg>
        </div>
        <span class="action-name">Gudang Stok</span>
      </div>

      <!-- Belanja Pasar -->
      <div class="action-tile">
        <div class="action-box" style="background:#DCFCE7; border-color:#BBF7D0;">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <span class="action-name">Belanja Pasar</span>
      </div>
    </div>

    <!-- Jajanan Unggulan -->
    <div class="carousel-title-row">
      <div class="section-title" style="margin-bottom:0;">Katalog Jajanan Unggulan</div>
      <div class="see-all">Lihat Semua</div>
    </div>

    <div class="food-scroll">
      <!-- Risoles -->
      <div class="food-card">
        <div class="profit-badge">+Untung Rp 500</div>
        <div class="food-img-circle" style="background:#FFF7ED;">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="4"/><path d="M7 10h10"/><path d="M9 14h6"/></svg>
        </div>
        <div class="food-card-name">Risoles Rogout</div>
        <div class="food-card-price">Rp 2.500</div>
        <div class="food-card-sub">Titip: 40 pcs</div>
      </div>

      <!-- Pastel -->
      <div class="food-card">
        <div class="profit-badge">+Untung Rp 600</div>
        <div class="food-img-circle" style="background:#FEF3C7;">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z"/><path d="M3 12c0 4.97 4.03 9 9 9s9-4.03 9-9"/></svg>
        </div>
        <div class="food-card-name">Pastel Sayur Telur</div>
        <div class="food-card-price">Rp 2.500</div>
        <div class="food-card-sub">Titip: 35 pcs</div>
      </div>

      <!-- Dadar Gulung -->
      <div class="food-card">
        <div class="profit-badge">+Untung Rp 450</div>
        <div class="food-img-circle" style="background:#DCFCE7;">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2"><rect x="4" y="5" width="16" height="14" rx="3"/><path d="M8 9h8"/><path d="M8 13h8"/></svg>
        </div>
        <div class="food-card-name">Dadar Gulung</div>
        <div class="food-card-price">Rp 2.000</div>
        <div class="food-card-sub">Titip: 30 pcs</div>
      </div>
    </div>

    <!-- Target Operasional -->
    <div class="target-card">
      <div style="font-size:11px; font-weight:800; color:#EA580C; letter-spacing:0.5px;">TARGET OPERASIONAL HARIAN</div>
      <div style="font-size:14px; font-weight:900; color:#1E293B; margin-top:2px;">Produksi & Serapan Lapak</div>
      <div class="target-grid">
        <div class="target-metric-box">
          <div class="target-metric-lbl">Kue Terjual</div>
          <div class="target-metric-num">93 / 110</div>
          <div class="target-metric-sub">84.5% Sukses</div>
        </div>
        <div class="target-metric-box">
          <div class="target-metric-lbl">Sisa Retur</div>
          <div class="target-metric-num" style="color:#DC2626;">5 Pcs</div>
          <div class="target-metric-sub" style="color:#64748B;">Terkendali</div>
        </div>
        <div class="target-metric-box">
          <div class="target-metric-lbl">Setoran Bersih</div>
          <div class="target-metric-num" style="color:#15803D;">Rp 175k</div>
          <div class="target-metric-sub">Lunas Sore</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom Navigation Vektor Murni Standar Mobile -->
  <div class="bottom-nav">
    <div class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
      </svg>
      <span class="nav-label nav-label-active">Beranda</span>
    </div>

    <div class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
      </svg>
      <span class="nav-label">Titip Kantin</span>
    </div>

    <div class="fab-center-box">
      <div class="fab-circle">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      </div>
      <span class="fab-label">KASIR</span>
    </div>

    <div class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6v6"/><path d="M9 9h6"/>
      </svg>
      <span class="nav-label">Resep HPP</span>
    </div>

    <div class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
      <span class="nav-label">Saya</span>
    </div>
  </div>
</div>

</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(HTML_CONTENT)

cmd = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "--headless",
    "--disable-gpu",
    "--window-size=500,980",
    f"--screenshot={PNG_PATH}",
    HTML_PATH
]

subprocess.run(cmd, check=True)
print(f"Anti-Slop screenshot rendered to {PNG_PATH}")
