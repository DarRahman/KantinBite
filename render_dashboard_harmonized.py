import os
import subprocess

BASE_DIR = r"C:\Users\Pongo\Documents\Codingan\kantinbite"
HTML_PATH = os.path.join(BASE_DIR, "preview_dashboard_harmonized.html")
PNG_PATH = os.path.join(BASE_DIR, "preview_dashboard_harmonized.png")

html_content = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KantinBite Harmonized Dashboard</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  body { background: #0F172A; display: flex; justify-content: center; padding: 24px 0; }
  
  /* PHONE CONTAINER */
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

  /* STATUS BAR */
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

  /* SCROLL CONTENT */
  .scroll-container {
    flex: 1;
    overflow-y: auto;
    padding: 6px 20px 100px 20px;
  }
  .scroll-container::-webkit-scrollbar { display: none; }

  /* 1. TOP HEADER YANG SELARAS & BERNAFAS */
  .top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0 14px 0;
  }
  .greeting-text { font-size: 12px; font-weight: 600; color: #71717A; }
  .biz-title { font-size: 19px; font-weight: 900; color: #18181B; margin-top: 1px; }
  .avatar-box {
    width: 44px; height: 44px; border-radius: 22px;
    background: #FFF7ED; border: 2px solid #EA580C;
    display: flex; align-items: center; justify-content: center;
  }

  /* 2. SEARCH BAR BERSIH */
  .search-bar {
    background: #F4F4F5;
    border-radius: 20px;
    padding: 11px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }
  .search-text { font-size: 12px; color: #71717A; font-weight: 500; flex: 1; }

  /* 3. HERO KARTU KAS ASLI (BERSIH, PUTIH BERGARIS KAS TEGAS) */
  .hero-wallet-card {
    background: #FFFFFF;
    border-radius: 24px;
    padding: 18px;
    border: 1.5px solid #E4E4E7;
    border-bottom: 3.5px solid #D4D4D8;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    margin-bottom: 18px;
  }
  .wallet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wallet-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11.5px;
    font-weight: 800;
    color: #71717A;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
  .wallet-main-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 14px 0;
  }
  .wallet-balance-big {
    font-size: 28px;
    font-weight: 900;
    color: #18181B;
    letter-spacing: -0.5px;
  }

  /* ARUS KAS MENYATU (KONTRAS TINGGI, BUKAN PILLS AI SLOP) */
  .cash-flow-ledger {
    background: #F8FAFC;
    border-radius: 14px;
    padding: 12px 14px;
    border: 1px solid #E2E8F0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .flow-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
  .flow-left { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #334155; }
  .dot-in { width: 8px; height: 8px; border-radius: 4px; background: #059669; }
  .dot-out { width: 8px; height: 8px; border-radius: 4px; background: #DC2626; }
  .val-in { font-weight: 900; color: #059669; font-size: 13px; }
  .val-out { font-weight: 900; color: #DC2626; font-size: 13px; }

  /* 4. 4 TOMBOL AKSI 1:1 REFERENSI (IKON BESAR 75% MEMENUHI SQUIRCLE) */
  .section-heading {
    font-size: 14px;
    font-weight: 900;
    color: #18181B;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .action-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 22px;
  }
  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .action-squircle {
    width: 68px;
    height: 68px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  .action-lbl {
    font-size: 11px;
    font-weight: 700;
    color: #18181B;
    text-align: center;
  }

  /* 5. KATALOG JAJANAN (CUSTOM SCROLLBAR BERSIH TANPA CLIPPING) */
  .carousel-wrapper {
    position: relative;
    margin-bottom: 20px;
  }
  .food-scroll-row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 12px;
  }
  /* HILANGKAN DEFAULT BROWSER SCROLLBAR */
  .food-scroll-row::-webkit-scrollbar { display: none; }

  .food-card-butter {
    min-width: 154px;
    background: #FFF9D6;
    border-radius: 22px;
    padding: 14px 12px 14px 12px;
    border: 1.5px solid #FEF08A;
    border-bottom: 3.5px solid #FDE047;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  }
  .food-img-center {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .food-title {
    font-size: 13.5px;
    font-weight: 900;
    color: #0F172A;
    margin-bottom: 6px;
  }
  .food-bottom-meta {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 2px;
  }
  .food-price-text {
    font-size: 13.5px;
    font-weight: 900;
    color: #EA580C;
  }
  .food-laku-badge {
    font-size: 11px;
    font-weight: 700;
    color: #475569;
  }

  /* INDIKATOR SCROLL KHUSUS APLIKASI (DOTS HALUS) */
  .scroll-indicator-bar {
    width: 60px;
    height: 4px;
    background: #E4E4E7;
    border-radius: 2px;
    margin: 4px auto 0 auto;
    position: relative;
    overflow: hidden;
  }
  .scroll-indicator-thumb {
    width: 24px;
    height: 100%;
    background: #EA580C;
    border-radius: 2px;
  }

  /* 6. DUA GRAFIK ANALITIK ASLI (SEPERTI DI HP FISIK USER) */
  .analytics-card {
    background: #FAFAFA;
    border-radius: 20px;
    padding: 16px;
    border: 1.5px solid #F4F4F5;
    margin-bottom: 14px;
  }
  .chart-head-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 12px;
  }
  .chart-title { font-size: 13px; font-weight: 900; color: #18181B; }
  .chart-avg { font-size: 10.5px; font-weight: 600; color: #71717A; }

  .bar-chart-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 94px;
    border-bottom: 1px solid #E4E4E7;
    padding-bottom: 6px;
  }
  .bar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
  }
  .bar-rect {
    width: 24px;
    border-radius: 6px 6px 3px 3px;
    background: #FED7AA;
  }
  .bar-rect.active { background: #EA580C; }
  .bar-lbl { font-size: 10.5px; font-weight: 700; color: #71717A; }
  .bar-lbl.active { color: #EA580C; font-weight: 900; }

  /* DONUT CARD */
  .donut-card {
    background: #FAFAFA;
    border-radius: 20px;
    padding: 16px;
    border: 1.5px solid #F4F4F5;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }
  .donut-box {
    width: 80px; height: 80px; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .donut-inner-val {
    position: absolute;
    text-align: center;
    font-size: 13px;
    font-weight: 900;
    color: #18181B;
  }
  .donut-inner-lbl { font-size: 8.5px; font-weight: 700; color: #71717A; display: block; }
  .donut-data-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .donut-data-row { display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; }
  .data-legend { display: flex; align-items: center; gap: 6px; font-weight: 600; color: #475569; }

  /* 7. AKTIVITAS HARI INI */
  .activity-card {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 12px 14px;
    border: 1.5px solid #F4F4F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  }
  .act-title { font-size: 12.5px; font-weight: 800; color: #18181B; }
  .act-desc { font-size: 11px; color: #71717A; margin-top: 2px; }
  .act-val-in { font-size: 13px; font-weight: 900; color: #059669; }
  .act-val-out { font-size: 13px; font-weight: 900; color: #DC2626; }

  /* 8. DOCK NAVIGASI BAWAH ELEVATED FAB */
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
    <!-- 1. Header Bersih & Bernafas -->
    <div class="top-header">
      <div>
        <div class="greeting-text">Selamat Pagi,</div>
        <div class="biz-title">Dapur Berkah Bunda</div>
      </div>
      <div class="avatar-box">
        <!-- Maskot Chef Bitey Resmi -->
        <svg width="28" height="28" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="#F97316"/>
          <circle cx="18" cy="18" r="11" fill="#FEF3C7"/>
          <circle cx="14" cy="17" r="1.5" fill="#78350F"/>
          <circle cx="22" cy="17" r="1.5" fill="#78350F"/>
          <path d="M15 22 Q18 25 21 22" stroke="#78350F" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <!-- 2. Search Bar -->
    <div class="search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <span class="search-text">Cari jajanan, resep HPP, atau mitra kantin...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
      </svg>
    </div>

    <!-- 3. Hero Uang Kas Di Dompet (Putih Solid Ramping & Elegan) -->
    <div class="hero-wallet-card">
      <div class="wallet-header">
        <div class="wallet-tag">
          <svg width="20" height="20" viewBox="0 0 48 48">
            <rect x="6" y="12" width="36" height="26" rx="6" fill="#D97706" stroke="#78350F" stroke-width="2.5"/>
            <path d="M6 18 h36" stroke="#B45309" stroke-width="2"/>
            <rect x="28" y="21" width="14" height="10" rx="3" fill="#B45309" stroke="#78350F" stroke-width="2"/>
            <circle cx="34" cy="26" r="2" fill="#FEF3C7"/>
          </svg>
          Uang Kas di Dompet
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>

      <div class="wallet-main-row">
        <div class="wallet-balance-big">Rp 850.000</div>
        <!-- Koin Emas Asli yang Pernah Dibuat -->
        <svg width="36" height="36" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="#F59E0B" stroke="#B45309" stroke-width="2.5"/>
          <circle cx="24" cy="24" r="16" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
          <text x="24" y="29" font-size="14" font-weight="900" fill="#78350F" text-anchor="middle">Rp</text>
        </svg>
      </div>
    </div>

    <!-- 4. 4 Aksi Operasional (Aset Gambar 75% Memenuhi Squircle) -->
    <div class="section-heading">Aksi Operasional Harian</div>
    <div class="action-grid">
      <!-- Kasir Lapak -->
      <div class="action-item">
        <div class="action-squircle" style="background: #FFC87C;">
          <!-- Ikon 50px memenuhi box 68px -->
          <svg width="50" height="50" viewBox="0 0 48 48">
            <path d="M16 6 h16 v12 h-16 Z" fill="#FFFFFF"/>
            <path d="M20 11 h8 M20 14 h5" stroke="#3D312A" stroke-width="1.8" stroke-linecap="round"/>
            <rect x="8" y="15" width="32" height="25" rx="7" fill="#3D312A"/>
            <rect x="13" y="19" width="22" height="10" rx="3" fill="#FFFFFF"/>
            <circle cx="16" cy="33" r="2.4" fill="#FFFFFF"/>
            <circle cx="24" cy="33" r="2.4" fill="#FFFFFF"/>
            <circle cx="32" cy="33" r="2.4" fill="#FFFFFF"/>
            <rect x="11" y="40" width="26" height="4" rx="2" fill="#FFE8C2"/>
          </svg>
        </div>
        <div class="action-lbl">Kasir Lapak</div>
      </div>

      <!-- Titip Kantin -->
      <div class="action-item">
        <div class="action-squircle" style="background: #98D7C2;">
          <svg width="50" height="50" viewBox="0 0 48 48">
            <path d="M6 18 L24 6 L42 18 L38 25 L10 25 Z" fill="#FFFFFF"/>
            <circle cx="15" cy="25" r="3.2" fill="#3D312A"/>
            <circle cx="24" cy="25" r="3.2" fill="#3D312A"/>
            <circle cx="33" cy="25" r="3.2" fill="#3D312A"/>
            <rect x="9" y="25" width="30" height="20" rx="5" fill="#3D312A"/>
            <rect x="14" y="29" width="11" height="11" rx="2.5" fill="#FFFFFF"/>
            <rect x="29" y="29" width="7" height="16" rx="2" fill="#C5ECE4"/>
          </svg>
        </div>
        <div class="action-lbl">Titip Kantin</div>
      </div>

      <!-- Gudang Stok -->
      <div class="action-item">
        <div class="action-squircle" style="background: #C3B1E1;">
          <svg width="50" height="50" viewBox="0 0 48 48">
            <path d="M21 11 C21 5 27 5 27 11 Z" fill="#FFFFFF"/>
            <circle cx="24" cy="12" r="5" fill="#FFFFFF"/>
            <path d="M13 14 C12 8 36 8 35 14 L39 38 C39 45 9 45 9 38 Z" fill="#3D312A"/>
            <circle cx="24" cy="28" r="7.5" fill="#FFFFFF"/>
            <circle cx="24" cy="28" r="3.5" fill="#C3B1E1"/>
          </svg>
        </div>
        <div class="action-lbl">Gudang Stok</div>
      </div>

      <!-- Belanja Pasar -->
      <div class="action-item">
        <div class="action-squircle" style="background: #D6EC83;">
          <svg width="50" height="50" viewBox="0 0 48 48">
            <circle cx="20" cy="14" r="5.5" fill="#FFFFFF"/>
            <circle cx="29" cy="13" r="6" fill="#FFC87C"/>
            <path d="M7 11 h7 l4.5 18 h20 l4.5-14 h-26" fill="none" stroke="#3D312A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="20" cy="37" r="4" fill="#3D312A"/>
            <circle cx="20" cy="37" r="1.8" fill="#FFFFFF"/>
            <circle cx="34" cy="37" r="4" fill="#3D312A"/>
            <circle cx="34" cy="37" r="1.8" fill="#FFFFFF"/>
          </svg>
        </div>
        <div class="action-lbl">Belanja Pasar</div>
      </div>
    </div>

    <!-- 5. Katalog Jajanan Krem Mentega (Scrollbar Custom Bersih) -->
    <div class="section-heading">
      <span>Katalog Jajanan Unggulan</span>
      <span style="font-size:11.5px; color:#EA580C; font-weight:800; cursor:pointer;">Lihat Semua</span>
    </div>

    <div class="carousel-wrapper">
      <div class="food-scroll-row">
        <!-- Risoles Rogout -->
        <div class="food-card-butter">
          <div class="food-img-center">
            <svg width="68" height="68" viewBox="0 0 64 64">
              <ellipse cx="32" cy="54" rx="24" ry="5" fill="#E2E8F0"/>
              <rect x="8" y="18" width="48" height="28" rx="14" fill="#F59E0B" stroke="#78350F" stroke-width="2.5"/>
              <line x1="18" y1="26" x2="22" y2="38" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="30" y1="24" x2="34" y2="40" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="42" y1="26" x2="46" y2="38" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="food-title">Risoles Rogout</div>
          <div class="food-bottom-meta">
            <span class="food-price-text">Rp 1.200</span>
            <span class="food-laku-badge">25 laku</span>
          </div>
        </div>

        <!-- Pastel Sayur -->
        <div class="food-card-butter">
          <div class="food-img-center">
            <svg width="68" height="68" viewBox="0 0 64 64">
              <ellipse cx="32" cy="54" rx="24" ry="5" fill="#E2E8F0"/>
              <path d="M10 42 C10 20, 54 20, 54 42 Z" fill="#FBBF24" stroke="#78350F" stroke-width="2.5"/>
              <path d="M10 42 Q15 45 20 42 Q25 45 30 42 Q35 45 40 42 Q45 45 50 42 Q53 44 54 42" stroke="#78350F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <circle cx="26" cy="30" r="2" fill="#D97706"/>
              <circle cx="36" cy="28" r="2.5" fill="#D97706"/>
            </svg>
          </div>
          <div class="food-title">Pastel Sayur</div>
          <div class="food-bottom-meta">
            <span class="food-price-text">Rp 1.500</span>
            <span class="food-laku-badge">18 laku</span>
          </div>
        </div>

        <!-- Dadar Gulung -->
        <div class="food-card-butter">
          <div class="food-img-center">
            <svg width="68" height="68" viewBox="0 0 64 64">
              <ellipse cx="32" cy="54" rx="24" ry="5" fill="#E2E8F0"/>
              <rect x="10" y="20" width="44" height="25" rx="12" fill="#10B981" stroke="#065F46" stroke-width="2.5"/>
              <ellipse cx="50" cy="32.5" rx="2.5" ry="9" fill="#064E3B"/>
              <circle cx="24" cy="25" r="1.5" fill="#ECFDF5"/>
              <circle cx="34" cy="38" r="1.5" fill="#ECFDF5"/>
            </svg>
          </div>
          <div class="food-title">Dadar Gulung</div>
          <div class="food-bottom-meta">
            <span class="food-price-text">Rp 1.000</span>
            <span class="food-laku-badge">30 laku</span>
          </div>
        </div>
      </div>
      <!-- Indikator Geser Khusus Aplikasi -->
      <div class="scroll-indicator-bar">
        <div class="scroll-indicator-thumb"></div>
      </div>
    </div>

    <!-- 6. Dua Grafik Analitik Asli (Tren 7 Hari + Donut Ratio) -->
    <div class="analytics-card">
      <div class="chart-head-row">
        <span class="chart-title">Tren Penjualan 7 Hari</span>
        <span class="chart-avg">Rata-rata: Rp 330.000 / hari</span>
      </div>
      <div class="bar-chart-wrap">
        <div class="bar-col">
          <div class="bar-rect" style="height: 55px;"></div>
          <span class="bar-lbl">Sen</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect" style="height: 65px;"></div>
          <span class="bar-lbl">Sel</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect" style="height: 60px;"></div>
          <span class="bar-lbl">Rab</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect" style="height: 75px;"></div>
          <span class="bar-lbl">Kam</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect" style="height: 70px;"></div>
          <span class="bar-lbl">Jum</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect" style="height: 85px;"></div>
          <span class="bar-lbl">Sab</span>
        </div>
        <div class="bar-col">
          <div class="bar-rect active" style="height: 72px;"></div>
          <span class="bar-lbl active">Min</span>
        </div>
      </div>
    </div>

    <!-- Donut Ratio -->
    <div class="donut-card">
      <div class="donut-box">
        <svg width="76" height="76" viewBox="0 0 76 76">
          <circle cx="38" cy="38" r="30" stroke="#EA580C" stroke-width="9" fill="none"/>
          <circle cx="38" cy="38" r="30" stroke="#10B981" stroke-width="9" fill="none"
            stroke-dasharray="188.5" stroke-dashoffset="103.6" stroke-linecap="round"
            transform="rotate(-90 38 38)"/>
        </svg>
        <div class="donut-inner-val">
          45%
          <span class="donut-inner-lbl">Kasir</span>
        </div>
      </div>

      <div class="donut-data-col">
        <div class="donut-data-row">
          <div class="data-legend">
            <span style="width:8px; height:8px; border-radius:4px; background:#10B981;"></span>
            <span>Kasir Langsung:</span>
          </div>
          <span style="font-weight:900; color:#18181B;">Rp 145.000 (45%)</span>
        </div>
        <div class="donut-data-row">
          <div class="data-legend">
            <span style="width:8px; height:8px; border-radius:4px; background:#EA580C;"></span>
            <span>Setoran Kantin:</span>
          </div>
          <span style="font-weight:900; color:#18181B;">Rp 175.000 (55%)</span>
        </div>
      </div>
    </div>

    <!-- 7. Aktivitas Riil Lapangan -->
    <div class="section-heading">Aktivitas Hari Ini</div>
    
    <div class="activity-card">
      <div>
        <div class="act-title">Kantin Teknik Mesin</div>
        <div class="act-desc">Lunas Tunai • Setoran 25 Risoles Mayo</div>
      </div>
      <div class="act-val-in">+Rp 50.000</div>
    </div>

    <div class="activity-card">
      <div>
        <div class="act-title">Belanja Pasar Subuh</div>
        <div class="act-desc">Bahan Baku • Tepung Segitiga & Minyak</div>
      </div>
      <div class="act-val-out">-Rp 150.000</div>
    </div>

  </div>

  <!-- 8. Dock Navigasi Bawah Elevated FAB -->
  <div class="bottom-dock">
    <div class="dock-btn active">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <path d="M9 22V12h6v10"/>
      </svg>
      <span>Beranda</span>
    </div>

    <div class="dock-btn">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l2-5h14l2 5"/>
        <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9"/>
        <path d="M9 22V12h6v10"/>
      </svg>
      <span>Titip Kantin</span>
    </div>

    <!-- Elevated KASIR FAB -->
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
      <span>Katalog</span>
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

print(f"Harmonized dashboard screenshot rendered to {PNG_PATH}")
