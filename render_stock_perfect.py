import os
import subprocess

BASE_DIR = r"C:\Users\Pongo\Documents\Codingan\kantinbite"
HTML_PATH = os.path.join(BASE_DIR, "preview_stock_perfect.html")
PNG_PATH = os.path.join(BASE_DIR, "preview_stock_perfect.png")

html_content = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>KantinBite Gudang Stok Perfect</title>
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
    padding: 6px 18px 40px 18px; /* Sub-halaman: tanpa tab dock bawah */
  }
  .scroll-container::-webkit-scrollbar { display: none; }

  /* 1. TOP HEADER SUB-LAYAR DENGAN TOMBOL BACK */
  .subpage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0 14px 0;
    border-bottom: 1px solid #F1EFEA;
    margin-bottom: 14px;
  }
  .back-btn-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .back-btn {
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .header-text-col { display: flex; flex-direction: column; gap: 1px; }
  .page-sub { font-size: 11px; font-weight: 600; color: #64748B; }
  .page-title { font-size: 20px; font-weight: 900; color: #0F172A; letter-spacing: -0.4px; }

  .add-stock-btn {
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

  /* 2. KARTU NOTIFIKASI RESTOK HANGAT & MENARIK (BUKAN WEB ALERT JADUL) */
  .toast-restock-card {
    background: #FFF7ED;
    border-radius: 18px;
    padding: 14px 16px;
    border: 1.5px solid #FED7AA;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    box-shadow: 0 3px 10px rgba(234, 88, 12, 0.06);
  }
  .toast-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .toast-icon-wrap {
    width: 40px; height: 40px; border-radius: 12px;
    background: #FFEDD5;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .toast-text-col { display: flex; flex-direction: column; gap: 2px; }
  .toast-headline { font-size: 13.5px; font-weight: 900; color: #9A3412; }
  .toast-desc { font-size: 11px; font-weight: 600; color: #C2410C; }

  .toast-cta-btn {
    background: #EA580C;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 800;
    padding: 6px 12px;
    border-radius: 10px;
    white-space: nowrap;
    cursor: pointer;
  }

  /* 3. SEGMENTED FILTER TABS (1 BARIS PRESISI DENGAN NOWRAP) */
  .filter-segment-bar {
    background: #F1F5F9;
    border-radius: 14px;
    padding: 4px;
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }
  .filter-segment-item {
    flex: 1;
    padding: 7px 6px;
    border-radius: 10px;
    font-size: 11px;
    font-weight: 700;
    color: #64748B;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .filter-segment-item.active {
    background: #FFFFFF;
    color: #0F172A;
    font-weight: 900;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  .filter-segment-item.critical-tab {
    color: #DC2626;
  }

  /* 4. STOCK GRID */
  .section-lbl {
    font-size: 11.5px;
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .stock-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stock-card {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 14px 12px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .stock-card.critical-border {
    border-color: #FECACA;
    background: #FFFDFD;
  }

  /* STATUS BARIS ATAS: STATUS TEKS MENYATU (BUKAN KAPSUL SLOP) */
  .stock-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .stock-unit-type { font-size: 10.5px; font-weight: 700; color: #94A3B8; text-transform: uppercase; }

  .status-text-safe {
    font-size: 10.5px;
    font-weight: 800;
    color: #059669;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .status-text-critical {
    font-size: 10.5px;
    font-weight: 800;
    color: #DC2626;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dot-safe { width: 6px; height: 6px; border-radius: 3px; background: #059669; }
  .dot-critical { width: 6px; height: 6px; border-radius: 3px; background: #DC2626; }

  .stock-thumb-wrap {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    display: flex; align-items: center; justify-content: center;
    margin: 4px 0 2px 0;
    align-self: center;
  }

  .stock-item-name { font-size: 13.5px; font-weight: 800; color: #0F172A; text-align: center; }
  .stock-item-qty { font-size: 13px; font-weight: 900; color: #0F172A; text-align: center; }
  .stock-item-qty.critical { color: #DC2626; }

  /* PROGRESS BAR SISA STOK */
  .progress-bg {
    width: 100%; height: 6px; border-radius: 3px;
    background: #F1F5F9; overflow: hidden;
  }
  .progress-fill {
    height: 100%; border-radius: 3px;
    background: #10B981;
  }
  .progress-fill.low { background: #EF4444; }

  .stock-footer-meta {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10px; font-weight: 700; color: #64748B;
  }
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
    <!-- 1. Header Sub-Layar dengan Tombol Kembali (Jelas Anak dari Beranda) -->
    <div class="subpage-header">
      <div class="back-btn-row">
        <div class="back-btn" title="Kembali ke Beranda">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </div>
        <div class="header-text-col">
          <div class="page-title">Gudang Bahan Baku</div>
          <div class="page-sub">Inventaris Dapur • 8 Komoditas</div>
        </div>
      </div>
      <div class="add-stock-btn">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Beli Bahan
      </div>
    </div>

    <!-- 2. Kartu Notifikasi Menarik & Ramah (Bukan Alert Jadul Pink) -->
    <div class="toast-restock-card">
      <div class="toast-left">
        <div class="toast-icon-wrap">
          <!-- market_cart.svg -->
          <svg width="22" height="22" viewBox="0 0 72 72">
            <path d="M14 18 L22 18 L28 42 L52 42 L56 24 L24 24" fill="none" stroke="#EA580C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="30" cy="52" r="4" fill="#EA580C" />
            <circle cx="50" cy="52" r="4" fill="#EA580C" />
          </svg>
        </div>
        <div class="toast-text-col">
          <div class="toast-headline">2 Bahan Mendekati Batas Min</div>
          <div class="toast-desc">Minyak & Gas LPG butuh restok subuh.</div>
        </div>
      </div>
      <div class="toast-cta-btn">Belanja Subuh</div>
    </div>

    <!-- 3. Segmented Control Tabs (1 Baris Ringkas & Rapi) -->
    <div class="filter-segment-bar">
      <div class="filter-segment-item active">Semua (8)</div>
      <div class="filter-segment-item critical-tab">Kritis (2)</div>
      <div class="filter-segment-item">Bahan Kering</div>
      <div class="filter-segment-item">Bahan Basah</div>
    </div>

    <!-- 4. Stock Grid: ASET BAHAN BAKU ASLI + STATUS TEKS BERSIH -->
    <div class="section-lbl">Daftar Bahan Baku Dapur</div>
    <div class="stock-grid">
      
      <!-- Item 1: Tepung Terigu (wheat_flour.svg) -->
      <div class="stock-card">
        <div class="stock-card-top">
          <span class="stock-unit-type">Bahan Kering</span>
          <div class="status-text-safe">
            <div class="dot-safe"></div>
            <span>Aman</span>
          </div>
        </div>
        <div class="stock-thumb-wrap">
          <svg width="44" height="44" viewBox="0 0 72 72">
            <path d="M22 24 C20 18 60 18 58 24 L62 56 C62 66 18 66 18 56 Z" fill="#F8FAFC" stroke="#000" stroke-width="3"/>
            <circle cx="40" cy="44" r="10" fill="#FEF3C7" stroke="#000" stroke-width="2"/>
            <path d="M36 44 Q40 37 44 44 M40 38 v12" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stock-item-name">Tepung Terigu</div>
        <div class="stock-item-qty">4.5 kg</div>
        <div class="progress-bg"><div class="progress-fill" style="width: 75%;"></div></div>
        <div class="stock-footer-meta">
          <span>Min: 2 kg</span>
          <span>75% Aman</span>
        </div>
      </div>

      <!-- Item 2: Telur Ayam (egg_raw.svg) -->
      <div class="stock-card">
        <div class="stock-card-top">
          <span class="stock-unit-type">Bahan Basah</span>
          <div class="status-text-safe">
            <div class="dot-safe"></div>
            <span>Aman</span>
          </div>
        </div>
        <div class="stock-thumb-wrap">
          <svg width="44" height="44" viewBox="0 0 72 72">
            <ellipse cx="36" cy="38" rx="16" ry="22" fill="#FEF3C7" stroke="#000" stroke-width="3"/>
            <path d="M28 26 Q36 20 44 26" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          </svg>
        </div>
        <div class="stock-item-name">Telur Ayam</div>
        <div class="stock-item-qty">38 Butir</div>
        <div class="progress-bg"><div class="progress-fill" style="width: 65%;"></div></div>
        <div class="stock-footer-meta">
          <span>Min: 15 butir</span>
          <span>65% Aman</span>
        </div>
      </div>

      <!-- Item 3: Minyak Goreng (oil_butter.svg - KRITIS) -->
      <div class="stock-card critical-border">
        <div class="stock-card-top">
          <span class="stock-unit-type">Bahan Basah</span>
          <div class="status-text-critical">
            <div class="dot-critical"></div>
            <span>Kritis</span>
          </div>
        </div>
        <div class="stock-thumb-wrap">
          <svg width="44" height="44" viewBox="0 0 72 72">
            <rect x="24" y="24" width="24" height="36" rx="6" fill="#FEF08A" stroke="#000" stroke-width="3"/>
            <rect x="30" y="14" width="12" height="10" rx="3" fill="#D97706" stroke="#000" stroke-width="2"/>
            <circle cx="36" cy="42" r="5" fill="#F59E0B"/>
          </svg>
        </div>
        <div class="stock-item-name">Minyak Goreng</div>
        <div class="stock-item-qty critical">0.8 Liter</div>
        <div class="progress-bg"><div class="progress-fill low" style="width: 20%;"></div></div>
        <div class="stock-footer-meta">
          <span>Min: 2 Liter</span>
          <span style="color:#DC2626;">Sisa 20%</span>
        </div>
      </div>

      <!-- Item 4: Gas LPG 3kg (gas_cylinder.svg - KRITIS) -->
      <div class="stock-card critical-border">
        <div class="stock-card-top">
          <span class="stock-unit-type">Operasional</span>
          <div class="status-text-critical">
            <div class="dot-critical"></div>
            <span>Kritis</span>
          </div>
        </div>
        <div class="stock-thumb-wrap">
          <svg width="44" height="44" viewBox="0 0 72 72">
            <rect x="22" y="26" width="28" height="34" rx="8" fill="#10B981" stroke="#000" stroke-width="3"/>
            <path d="M26 26 C26 16 46 16 46 26" stroke="#000" stroke-width="3" fill="none"/>
            <rect x="31" y="18" width="10" height="8" rx="2" fill="#D1FAE5" stroke="#000" stroke-width="2"/>
          </svg>
        </div>
        <div class="stock-item-name">Gas LPG 3kg</div>
        <div class="stock-item-qty critical">1 Tabung</div>
        <div class="progress-bg"><div class="progress-fill low" style="width: 25%;"></div></div>
        <div class="stock-footer-meta">
          <span>Min: 2 Tabung</span>
          <span style="color:#DC2626;">Sisa 25%</span>
        </div>
      </div>

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
    "--window-size=500,1200",
    f"--screenshot={PNG_PATH}",
    HTML_PATH
], check=True)

print(f"Stock perfect screenshot rendered to {PNG_PATH}")
