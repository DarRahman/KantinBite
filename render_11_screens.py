import os
import subprocess

BASE_DIR = r"C:\Users\Pongo\Documents\Codingan\kantinbite"
HTML_PATH = os.path.join(BASE_DIR, "showcase_11_screens.html")
PNG_PATH = os.path.join(BASE_DIR, "showcase_11_screens.png")

# Data 11 Layar Lengkap
screens_data = [
    {
        "id": "1",
        "title": "1. DashboardScreen (Playful Bento Hub)",
        "tag": "HUB OPERASIONAL",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="assets/openmoji/chef_mascot.svg" style="width:40px; height:40px;">
              <div>
                <div style="font-size:9px; font-weight:900; color:#EA580C;">UNIVERSAL SAAS UMKM</div>
                <div style="font-size:14px; font-weight:900; color:#1E293B;">Dapur Berkah Bunda</div>
              </div>
            </div>
            <img src="assets/openmoji/coin_gold.svg" style="width:28px; height:28px;">
          </div>

          <div class="bento-card" style="background:#FFFBEB; border-bottom:4px solid #F59E0B; margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#B45309;">TOTAL KAS DOMPET</div>
            <div style="font-size:24px; font-weight:900; color:#78350F; margin:2px 0;">Rp 850.000</div>
            <div style="display:flex; gap:6px; margin-top:6px;">
              <div style="flex:1; background:#DCFCE7; padding:6px; border-radius:8px; font-size:10px; font-weight:800; color:#15803D;">+Rp 320k Masuk</div>
              <div style="flex:1; background:#FEE2E2; padding:6px; border-radius:8px; font-size:10px; font-weight:800; color:#B91C1C;">-Rp 150k Belanja</div>
            </div>
          </div>

          <!-- Carousel Jajanan Favorit -->
          <div style="margin-top:6px;">
            <div style="font-size:11px; font-weight:900; color:#1E293B; margin-bottom:6px;">⭐ Jajanan Favorit</div>
            <div style="display:flex; gap:8px; overflow-x:hidden;">
              <div style="width:100px; background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:12px; padding:6px; text-align:center;">
                <img src="assets/food/risoles_rogout.svg" style="width:42px; height:42px;">
                <div style="font-size:10px; font-weight:800;">Risoles</div>
                <div style="font-size:9px; color:#EA580C; font-weight:900;">Rp 1.200</div>
              </div>
              <div style="width:100px; background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:12px; padding:6px; text-align:center;">
                <img src="assets/food/pastel_telur.svg" style="width:42px; height:42px;">
                <div style="font-size:10px; font-weight:800;">Pastel</div>
                <div style="font-size:9px; color:#EA580C; font-weight:900;">Rp 1.500</div>
              </div>
              <div style="width:100px; background:#FFFFFF; border:1.5px solid #E2E8F0; border-radius:12px; padding:6px; text-align:center;">
                <img src="assets/food/dadar_gulung.svg" style="width:42px; height:42px;">
                <div style="font-size:10px; font-weight:800;">Dadar G.</div>
                <div style="font-size:9px; color:#EA580C; font-weight:900;">Rp 1.000</div>
              </div>
            </div>
          </div>

          <!-- Habit Tracker -->
          <div class="bento-card" style="padding:10px; margin-top:6px;">
            <div style="font-size:9px; font-weight:900; color:#EA580C;">TARGET OPERASIONAL HARIAN</div>
            <div style="display:flex; justify-content:space-between; margin-top:6px;">
              <div style="font-size:11px; font-weight:800;">Kue Laku: <span style="color:#15803D;">93/110 (84%)</span></div>
              <div style="font-size:11px; font-weight:800;">Retur: <span style="color:#DC2626;">5 Pcs</span></div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:6px;">
            <div class="tactile-btn btn-primary" style="padding:8px; font-size:11px;">⚡ Kasir Kilat</div>
            <div class="tactile-btn btn-accent" style="padding:8px; font-size:11px;">🌾 Gudang Stok</div>
            <div class="tactile-btn btn-secondary" style="padding:8px; font-size:11px;">🏫 Mitra Kantin</div>
            <div class="tactile-btn btn-secondary" style="padding:8px; font-size:11px; color:#DC2626;">💵 Buku Piutang</div>
          </div>
        """
    },
    {
        "id": "2",
        "title": "2. HppScreen (Katalog Resep & Modal)",
        "tag": "HPP & LABA",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">KATALOG JAJANAN & HPP</div>
              <div style="font-size:15px; font-weight:900;">Modal & Untung Resep</div>
            </div>
            <div class="tactile-btn btn-primary" style="padding:6px 10px; font-size:10px;">+ Resep</div>
          </div>

          <!-- Celebration Banner -->
          <div class="bento-card" style="background:#DCFCE7; border-color:#BBF7D0; padding:10px; margin-top:8px; display:flex; align-items:center; gap:8px;">
            <img src="assets/openmoji/mascot_celebrate.svg" style="width:32px; height:32px;">
            <div>
              <div style="font-size:11px; font-weight:900; color:#15803D;">Pencapaian Omzet Hari Ini!</div>
              <div style="font-size:9px; color:#166534;">93 pcs kue laku di kantin & eceran lapak.</div>
            </div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="assets/food/risoles_rogout.svg" style="width:64px; height:64px;">
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:900;">Risoles Rogout Ayam</div>
                <div style="font-size:10px; color:#64748B;">Modal: Rp 600 • Jual: Rp 1.200</div>
                <div style="display:flex; gap:4px; margin-top:4px;">
                  <span style="background:#FEF3C7; font-size:8px; font-weight:800; padding:2px 4px; border-radius:4px; color:#B45309;">🌾 Terigu</span>
                  <span style="background:#FEF3C7; font-size:8px; font-weight:800; padding:2px 4px; border-radius:4px; color:#B45309;">🥚 Telur</span>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12px; font-weight:900; color:#15803D;">+Rp 500</div>
                <div style="font-size:8px; color:#64748B;">Untung/Pcs</div>
              </div>
            </div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="assets/food/pastel_telur.svg" style="width:64px; height:64px;">
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:900;">Pastel Telur Sayur</div>
                <div style="font-size:10px; color:#64748B;">Modal: Rp 750 • Jual: Rp 1.500</div>
                <div style="display:flex; gap:4px; margin-top:4px;">
                  <span style="background:#FEF3C7; font-size:8px; font-weight:800; padding:2px 4px; border-radius:4px; color:#B45309;">🥕 Wortel</span>
                  <span style="background:#FEF3C7; font-size:8px; font-weight:800; padding:2px 4px; border-radius:4px; color:#B45309;">🍗 Ayam</span>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12px; font-weight:900; color:#15803D;">+Rp 600</div>
                <div style="font-size:8px; color:#64748B;">Untung/Pcs</div>
              </div>
            </div>
          </div>
        """
    },
    {
        "id": "3",
        "title": "3. RecipeEditorScreen (Simulator Racik Resep)",
        "tag": "SIMULASI BATCH",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">SIMULATOR RESEP BARU</div>
              <div style="font-size:15px; font-weight:900;">Racik Risoles Mayo</div>
            </div>
            <div style="background:#F1F5F9; padding:4px 8px; border-radius:8px; font-size:10px; font-weight:800;">50 Porsi</div>
          </div>

          <div class="bento-card" style="background:#DCFCE7; border-color:#BBF7D0; margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#15803D;">ESTIMASI UNTUNG BERSIH / PCS</div>
            <div style="font-size:24px; font-weight:900; color:#166534; margin:2px 0;">Rp 750</div>
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#166534; margin-top:6px; border-top:1px dashed #BBF7D0; padding-top:4px;">
              <span>Total Modal: Rp 58.000</span>
              <span>Laba Batch: Rp 37.500</span>
            </div>
          </div>

          <div style="font-size:11px; font-weight:800; margin-top:8px;">Daftar Bahan & Energi:</div>
          <div class="bento-card" style="padding:8px; margin-top:4px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; font-weight:800;">🌾 Terigu Segitiga 1 Kg</div>
            <div style="font-size:11px; font-weight:900; color:#1E293B;">Rp 12.000</div>
          </div>
          <div class="bento-card" style="padding:8px; margin-top:4px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; font-weight:800;">🥚 Telur Ayam 12 Butir</div>
            <div style="font-size:11px; font-weight:900; color:#1E293B;">Rp 24.000</div>
          </div>
          <div class="bento-card" style="padding:8px; margin-top:4px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; font-weight:800;">🔥 Gas LPG & Kemasan Mika</div>
            <div style="font-size:11px; font-weight:900; color:#1E293B;">Rp 10.000</div>
          </div>

          <div class="tactile-btn btn-primary" style="margin-top:12px;">Simpan ke Katalog HPP</div>
        """
    },
    {
        "id": "4",
        "title": "4. PosScreen (Kasir Kilat Eceran)",
        "tag": "KASIR LAPAK",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">KASIR ECERAN LANGSUNG</div>
              <div style="font-size:15px; font-weight:900;">Penjualan Lapak Subuh</div>
            </div>
            <div style="background:#DCFCE7; padding:4px 8px; border-radius:8px; font-size:10px; font-weight:900; color:#15803D;">2 Item Dipilih</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
            <div class="bento-card" style="padding:10px; text-align:center;">
              <img src="assets/food/risoles_rogout.svg" style="width:48px; height:48px;">
              <div style="font-size:11px; font-weight:800; margin-top:4px;">Risoles Rogout</div>
              <div style="font-size:10px; color:#EA580C; font-weight:900;">Rp 1.200</div>
              <div style="display:flex; justify-content:center; gap:8px; align-items:center; margin-top:6px;">
                <div style="width:24px; height:24px; background:#F1F5F9; border-radius:6px; font-weight:900; line-height:24px;">-</div>
                <div style="font-size:12px; font-weight:900;">10</div>
                <div style="width:24px; height:24px; background:#EA580C; color:#FFF; border-radius:6px; font-weight:900; line-height:24px;">+</div>
              </div>
            </div>

            <div class="bento-card" style="padding:10px; text-align:center;">
              <img src="assets/food/dadar_gulung.svg" style="width:48px; height:48px;">
              <div style="font-size:11px; font-weight:800; margin-top:4px;">Dadar Gulung</div>
              <div style="font-size:10px; color:#EA580C; font-weight:900;">Rp 1.000</div>
              <div style="display:flex; justify-content:center; gap:8px; align-items:center; margin-top:6px;">
                <div style="width:24px; height:24px; background:#F1F5F9; border-radius:6px; font-weight:900; line-height:24px;">-</div>
                <div style="font-size:12px; font-weight:900;">5</div>
                <div style="width:24px; height:24px; background:#EA580C; color:#FFF; border-radius:6px; font-weight:900; line-height:24px;">+</div>
              </div>
            </div>
          </div>

          <!-- Floating Thumb Dock -->
          <div class="bento-card" style="background:#FFFBEB; border-color:#FDE68A; margin-top:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-size:9px; font-weight:900; color:#B45309;">TOTAL BELANJA</div>
                <div style="font-size:20px; font-weight:900; color:#78350F;">Rp 17.000</div>
              </div>
              <div style="display:flex; gap:4px;">
                <span style="background:#FFFFFF; border:1px solid #FDE68A; padding:4px 8px; border-radius:6px; font-size:10px; font-weight:900;">20k Pas</span>
                <span style="background:#FFFFFF; border:1px solid #FDE68A; padding:4px 8px; border-radius:6px; font-size:10px; font-weight:900;">50k</span>
              </div>
            </div>
            <div class="tactile-btn btn-primary" style="margin-top:8px; padding:10px;">Bayar & Cetak Struk WA</div>
          </div>
        """
    },
    {
        "id": "5",
        "title": "5. ConsignmentScreen (Titip Kantin & Rekap)",
        "tag": "KONSINYASI SORE",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">KONSINYASI SEKOLAH & KAMPUS</div>
              <div style="font-size:15px; font-weight:900;">Rekap Sore (15:00 WIB)</div>
            </div>
            <div style="background:#E0E7FF; color:#4338CA; padding:4px 8px; border-radius:8px; font-size:9px; font-weight:900;">Kantin FT</div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="assets/food/risoles_rogout.svg" style="width:52px; height:52px;">
              <div style="flex:1;">
                <div style="font-size:13px; font-weight:900;">Risoles Rogout</div>
                <div style="font-size:10px; color:#64748B;">Titip Pagi: 30 Pcs • @Rp 1.000</div>
              </div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; background:#F8FAFC; padding:8px; border-radius:10px; margin-top:8px;">
              <span style="font-size:11px; font-weight:700;">Sisa Retur Fisik:</span>
              <div style="display:flex; gap:6px; align-items:center;">
                <span style="background:#FEE2E2; color:#DC2626; font-weight:900; padding:2px 8px; border-radius:6px; font-size:12px;">5 Pcs</span>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <div>
                <div style="font-size:10px; color:#15803D; font-weight:800;">Laku Terjual: 25 Pcs</div>
                <div style="font-size:15px; font-weight:900; color:#EA580C;">Wajib Setor: Rp 25.000</div>
              </div>
              <div class="tactile-btn btn-success" style="padding:6px 10px; font-size:10px;">Lunas Tunai</div>
            </div>
          </div>
        """
    },
    {
        "id": "6",
        "title": "6. StockScreen (Gudang Sisa Stok Dapur)",
        "tag": "INVENTARIS GUDANG",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">GUDANG BAHAN BAKU</div>
              <div style="font-size:15px; font-weight:900;">Sisa Stok & Peringatan</div>
            </div>
            <div class="tactile-btn btn-accent" style="padding:4px 8px; font-size:10px;">Ke Pasar</div>
          </div>

          <!-- Alert Kritis Banner -->
          <div class="bento-card" style="background:#FFFBEB; border-color:#FDE68A; padding:10px; margin-top:8px; display:flex; gap:8px; align-items:center;">
            <img src="assets/openmoji/warning_badge.svg" style="width:32px; height:32px;">
            <div>
              <div style="font-size:11px; font-weight:900; color:#B45309;">2 Bahan Mendekati Batas Kritis!</div>
              <div style="font-size:9px; color:#78350F;">Telur & Minyak perlu dibelanjakan subuh nanti.</div>
            </div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="assets/openmoji/egg_raw.svg" style="width:36px; height:36px;">
                <div>
                  <div style="font-size:12px; font-weight:800;">Telur Ayam Negeri</div>
                  <div style="font-size:9px; color:#DC2626; font-weight:800;">⚠️ Sisa: 12 Butir (Min 15)</div>
                </div>
              </div>
              <div style="font-size:14px; font-weight:900; color:#DC2626;">Kritis</div>
            </div>
            <div style="background:#F1F5F9; height:6px; border-radius:3px; margin-top:6px; overflow:hidden;">
              <div style="background:#EF4444; width:24%; height:100%;"></div>
            </div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap:8px;">
                <img src="assets/openmoji/wheat_flour.svg" style="width:36px; height:36px;">
                <div>
                  <div style="font-size:12px; font-weight:800;">Tepung Terigu Segitiga</div>
                  <div style="font-size:9px; color:#15803D; font-weight:800;">✓ Sisa: 3.5 Kg (Min 2.0)</div>
                </div>
              </div>
              <div style="font-size:14px; font-weight:900; color:#15803D;">Aman</div>
            </div>
            <div style="background:#F1F5F9; height:6px; border-radius:3px; margin-top:6px; overflow:hidden;">
              <div style="background:#10B981; width:65%; height:100%;"></div>
            </div>
          </div>
        """
    },
    {
        "id": "7",
        "title": "7. MarketShoppingScreen (Belanja Pasar 04:00)",
        "tag": "CHECKLIST SUBUH",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">OPERASIONAL SUBUH 04:00</div>
              <div style="font-size:15px; font-weight:900;">Daftar Belanja Pasar</div>
            </div>
            <div class="tactile-btn btn-accent" style="padding:4px 8px; font-size:10px;">Share WA</div>
          </div>

          <div class="bento-card" style="background:#FFFBEB; border-color:#FDE68A; margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#92400E;">ESTIMASI ANGGARAN PASAR KANOMAN</div>
            <div style="font-size:22px; font-weight:900; color:#78350F; margin:2px 0;">Rp 273.000</div>
            <div style="font-size:10px; color:#15803D; font-weight:800;">2 dari 6 Bahan Selesai Dibeli</div>
          </div>

          <div class="bento-card" style="padding:10px; margin-top:8px; display:flex; align-items:center; gap:8px;">
            <div style="width:20px; height:20px; border-radius:10px; background:#10B981; color:#FFF; font-size:11px; font-weight:900; text-align:center; line-height:20px;">✓</div>
            <div style="flex:1;">
              <div style="font-size:11px; font-weight:800; text-decoration:line-through; color:#94A3B8;">Minyak Goreng Sawit 4L</div>
              <div style="font-size:9px; color:#94A3B8;">Rp 64.000 • Selesai</div>
            </div>
          </div>

          <div class="bento-card" style="padding:10px; margin-top:6px; display:flex; align-items:center; gap:8px;">
            <div style="width:20px; height:20px; border-radius:10px; border:2px solid #CBD5E1;"></div>
            <div style="flex:1;">
              <div style="font-size:11px; font-weight:800;">Telur Ayam 3 Kg (48 butir)</div>
              <div style="font-size:9px; color:#EA580C; font-weight:800;">Estimasi: Rp 78.000</div>
            </div>
          </div>

          <div class="tactile-btn btn-primary" style="margin-top:12px;">Selesai Belanja & Masuk Stok</div>
        """
    },
    {
        "id": "8",
        "title": "8. DebtLedgerScreen (Buku Piutang Kantin)",
        "tag": "SETORAN TERTAHAN",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">KONSINYASI TERTAHAN</div>
              <div style="font-size:15px; font-weight:900;">Buku Piutang Kantin</div>
            </div>
            <div style="background:#FEE2E2; color:#B91C1C; padding:4px 8px; border-radius:8px; font-size:9px; font-weight:900;">3 Tertahan</div>
          </div>

          <div class="bento-card" style="background:#FEF2F2; border-color:#FECACA; margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#991B1B;">TOTAL SETORAN TERTAHAN</div>
            <div style="font-size:24px; font-weight:900; color:#991B1B; margin:2px 0;">Rp 130.000</div>
            <div style="font-size:10px; color:#7F1D1D; font-weight:700;">Segera konfirmasi rekonsiliasi ke pengelola kantin.</div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="background:#FEE2E2; color:#B91C1C; font-size:8px; font-weight:900; padding:2px 4px; border-radius:4px;">Telat 1 Hari</span>
                <div style="font-size:12px; font-weight:800; margin-top:2px;">Kantin Fakultas Teknik</div>
                <div style="font-size:10px; color:#64748B;">Pak Joko • 25 Risoles & 10 Pastel</div>
              </div>
              <div style="font-size:14px; font-weight:900; color:#DC2626;">Rp 45.000</div>
            </div>
            <div style="display:flex; gap:6px; margin-top:8px;">
              <div class="tactile-btn btn-secondary" style="flex:1; padding:6px; font-size:10px;">Tagih WA</div>
              <div class="tactile-btn btn-success" style="flex:1; padding:6px; font-size:10px;">Tandai Lunas</div>
            </div>
          </div>
        """
    },
    {
        "id": "9",
        "title": "9. PartnerDirectoryScreen (Direktori Kantin)",
        "tag": "JARINGAN DISTRIBUSI",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">JARINGAN KONSINYASI</div>
              <div style="font-size:15px; font-weight:900;">Direktori Mitra Kantin</div>
            </div>
            <div class="tactile-btn btn-primary" style="padding:4px 8px; font-size:10px;">+ Mitra</div>
          </div>

          <div class="bento-card" style="background:#FFFBEB; border-color:#FDE68A; margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#B45309;">JARINGAN TITIP KULINER</div>
            <div style="font-size:22px; font-weight:900; color:#78350F; margin:2px 0;">4 Gerai Mitra Aktif</div>
            <div style="font-size:10px; color:#78350F;">Potensi serapan 150+ kue basah setiap subuh.</div>
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <span style="background:#DCFCE7; color:#15803D; font-size:8px; font-weight:900; padding:2px 4px; border-radius:4px;">● AKTIF (06:30)</span>
                <div style="font-size:13px; font-weight:900; margin-top:2px;">Kantin Fakultas Teknik</div>
                <div style="font-size:10px; color:#64748B;">PIC: Pak Joko Sutrisno (081298765432)</div>
              </div>
              <img src="assets/openmoji/canteen_shop.svg" style="width:36px; height:36px;">
            </div>
            <div style="font-size:10px; color:#475569; margin-top:4px;">⭐ Menu Favorit: Risoles Rogout Mayo</div>
            <div style="display:flex; gap:6px; margin-top:8px;">
              <div class="tactile-btn btn-secondary" style="flex:1; padding:6px; font-size:10px;">Titip Pagi</div>
              <div class="tactile-btn btn-accent" style="flex:1; padding:6px; font-size:10px;">Chat WA</div>
            </div>
          </div>
        """
    },
    {
        "id": "10",
        "title": "10. ReceiptScreen (Nota Digital Struk WA)",
        "tag": "BUKTI TRANSAKSI",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">STRUK DIGITAL RESMI</div>
              <div style="font-size:15px; font-weight:900;">Nota Siap Ekspor WA</div>
            </div>
            <div style="font-size:10px; font-weight:800; color:#64748B;">#KB-481920</div>
          </div>

          <!-- Digital Paper Receipt Sheet -->
          <div style="background:#FFFFFF; border-radius:16px; border:1.5px solid #E2E8F0; border-bottom:4px solid #CBD5E1; padding:14px; margin-top:8px; text-align:center;">
            <img src="assets/openmoji/chef_mascot.svg" style="width:40px; height:40px;">
            <div style="font-size:13px; font-weight:900; letter-spacing:0.5px;">KANTINBITE SAAS</div>
            <div style="font-size:9px; color:#64748B;">Sistem Operasional & Konsinyasi Mikro</div>
            
            <div style="border-top:1px dashed #CBD5E1; margin:8px 0;"></div>

            <div style="text-align:left; font-size:10px;">
              <div style="display:flex; justify-content:space-between;">
                <span>Risoles Rogout x10</span>
                <b>Rp 12.000</b>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:2px;">
                <span>Dadar Gulung x5</span>
                <b>Rp 5.000</b>
              </div>
            </div>

            <div style="border-top:1px dashed #CBD5E1; margin:8px 0;"></div>

            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:900;">
              <span>TOTAL TAGIHAN:</span>
              <span style="color:#EA580C;">Rp 17.000</span>
            </div>

            <div style="background:#DCFCE7; border:1px solid #BBF7D0; padding:6px; border-radius:8px; margin-top:10px; display:flex; align-items:center; justify-content:center; gap:6px;">
              <img src="assets/openmoji/check_badge.svg" style="width:16px; height:16px;">
              <span style="font-size:10px; font-weight:900; color:#15803D;">PEMBAYARAN LUNAS</span>
            </div>
          </div>

          <div class="tactile-btn btn-success" style="margin-top:10px;">Kirim Nota ke WhatsApp</div>
        """
    },
    {
        "id": "11",
        "title": "11. SettingsScreen (Profil & Kelompok C Setara)",
        "tag": "PROFIL & KELOMPOK",
        "content": """
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:9px; font-weight:900; color:#EA580C;">PENGATURAN & IDENTITAS</div>
              <div style="font-size:15px; font-weight:900;">Profil Usaha & Tim</div>
            </div>
            <img src="assets/openmoji/chef_mascot.svg" style="width:32px; height:32px;">
          </div>

          <div class="bento-card" style="margin-top:8px;">
            <div style="font-size:9px; font-weight:900; color:#EA580C;">UNIVERSAL SAAS UMKM</div>
            <div style="font-size:14px; font-weight:900;">Dapur Berkah Bunda</div>
            <div style="font-size:10px; color:#64748B;">Pemilik: Ibu Sumiati • 081234567890</div>
          </div>

          <!-- Format Anggota Setara -->
          <div class="bento-card" style="background:#F8FAFC; margin-top:8px;">
            <div style="font-size:11px; font-weight:800; color:#334155; margin-bottom:6px;">Tim Pengembang Kelompok C (Setara):</div>
            <div style="font-size:10px; font-weight:700; color:#1E293B; line-height:1.6;">
              1. Badar Rahman (14524303)<br>
              2. Avivah (14524013)<br>
              3. Cindy Septiani (24525404)<br>
              4. Nezla Veronika Putri (14524214)<br>
              5. Raehan Pramudia Nugraha (14524304)<br>
              6. Raihan Al Farizi (14524302)<br>
              7. Wisnu Hadi Pradana (14524309)
            </div>
          </div>

          <div class="tactile-btn btn-secondary" style="margin-top:8px; font-size:11px;">Salin Backup JSON SQLite</div>
        """
    }
]

# Generate Full HTML
html_body = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Showcase 11 Layar KantinBite</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', Roboto, sans-serif; }}
  body {{
    background: #0B1120;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}
  .board-header {{
    text-align: center;
    color: #F8FAFC;
    margin-bottom: 30px;
  }}
  .board-header h1 {{
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -0.5px;
    color: #F8FAFC;
  }}
  .board-header p {{
    font-size: 14px;
    color: #94A3B8;
    margin-top: 6px;
  }}
  .board-badge {{
    display: inline-block;
    padding: 6px 14px;
    background: #EA580C;
    color: #FFF;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 800;
    margin-top: 10px;
  }}
  .screens-grid {{
    display: grid;
    grid-template-columns: repeat(4, 340px);
    gap: 24px;
    justify-content: center;
  }}
  .screen-card {{
    background: #FAF8F5;
    border-radius: 28px;
    border: 5px solid #1E293B;
    box-shadow: 0 16px 32px rgba(0,0,0,0.4);
    height: 640px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }}
  .screen-bar {{
    background: #1E293B;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }}
  .screen-bar-title {{
    color: #F8FAFC;
    font-size: 11px;
    font-weight: 800;
  }}
  .screen-bar-tag {{
    background: #EA580C;
    color: #FFF;
    font-size: 8px;
    font-weight: 900;
    padding: 2px 6px;
    border-radius: 4px;
  }}
  .screen-body {{
    flex: 1;
    padding: 14px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }}
  .bento-card {{
    background: #FFFFFF;
    border-radius: 16px;
    padding: 12px;
    border: 1.5px solid #E2E8F0;
    border-bottom: 3.5px solid #CBD5E1;
  }}
  .tactile-btn {{
    border-radius: 12px;
    padding: 10px;
    font-weight: 800;
    font-size: 11px;
    text-align: center;
    border-bottom: 3px solid rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
  }}
  .btn-primary {{ background: #EA580C; color: #FFF; border-bottom-color: #9A3412; }}
  .btn-accent {{ background: #F59E0B; color: #FFF; border-bottom-color: #B45309; }}
  .btn-success {{ background: #10B981; color: #FFF; border-bottom-color: #047857; }}
  .btn-secondary {{ background: #FFFFFF; color: #1E293B; border: 1.5px solid #E2E8F0; border-bottom-color: #CBD5E1; }}
  .screen-dock {{
    height: 44px;
    background: #FFFFFF;
    border-top: 1.5px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    font-size: 9px;
    font-weight: 800;
    color: #64748B;
  }}
</style>
</head>
<body>

<div class="board-header">
  <h1>KantinBite Universal SaaS: Showcase 11 Layar Lengkap</h1>
  <p>Pola Desain: Mobbin • Pinterest • Uiverse.io • Zero Dead Space • SQLite Luring 100%</p>
  <div class="board-badge">TUGAS BESAR PEMVIS • STIKOM POLTEK CIREBON • KELOMPOK C</div>
</div>

<div class="screens-grid">
"""

for s in screens_data:
    html_body += f"""
  <div class="screen-card">
    <div class="screen-bar">
      <span class="screen-bar-title">{s['title']}</span>
      <span class="screen-bar-tag">{s['tag']}</span>
    </div>
    <div class="screen-body">
      {s['content']}
    </div>
    <div class="screen-dock">
      <span style="color:#EA580C;">● Beranda</span>
      <span>🌾 HPP</span>
      <span>⚡ Kasir</span>
      <span>🏫 Kantin</span>
      <span>⚙ Akun</span>
    </div>
  </div>
"""

html_body += """
</div>
</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_body)

print("HTML generated at", HTML_PATH)

# Render menggunakan MS Edge Headless
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

file_url = f"file:///{HTML_PATH.replace(os.sep, '/')}"

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--window-size=1500,2200",
    f"--screenshot={PNG_PATH}",
    file_url
]

subprocess.run(cmd, check=True)
print("Screenshot rendered successfully at", PNG_PATH)
