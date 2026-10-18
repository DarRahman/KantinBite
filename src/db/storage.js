import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PROFILE: '@kantinbite_user_profile',
  RECIPES: '@kantinbite_recipes',
  PRODUCTS: '@kantinbite_products',
  CANTEENS: '@kantinbite_canteens',
  CASHFLOW: '@kantinbite_cashflow',
  CONSIGNMENT: '@kantinbite_consignment',
  STOCK_ITEMS: '@kantinbite_stock_items',
  MARKET_ITEMS: '@kantinbite_market_items',
  DEBTS: '@kantinbite_debts',
};

const DEFAULT_PROFILE = {
  businessName: 'Dapur Berkah Bunda',
  ownerName: 'Bunda Sumiati',
  pin: '123456',
  phone: '081234567890',
  address: 'Jl. Kartini No. 18, Kejaksan',
  isLoggedIn: true,
};

const DEFAULT_CANTEENS = [
  {
    id: 'c1',
    name: 'Kantin Fakultas Teknik',
    pic: 'Pak Joko Sutrisno',
    phone: '081298765432',
    address: 'Lantai 1 Gedung Sayap Barat',
    dropSchedule: '06:30 Pagi',
    fee: 400,
    avgSold: '30 pcs / hari',
    favoriteMenu: 'Risoles Rogout Ayam',
    absorption: 92,
    debt: 0,
    avatarVariant: 0,
  },
  {
    id: 'c2',
    name: 'Kantin Gedung Utama',
    pic: 'Bu Siti Khodijah',
    phone: '081345678901',
    address: 'Pujasera Utama Kampus',
    dropSchedule: '06:45 Pagi',
    fee: 500,
    avgSold: '25 pcs / hari',
    favoriteMenu: 'Pastel Sayur Telur',
    absorption: 85,
    debt: 35000,
    avatarVariant: 1,
  },
  {
    id: 'c3',
    name: 'Warung Kopi Kampus',
    pic: 'Bang Hendra',
    phone: '085712345678',
    address: 'Area Parkir Timur',
    dropSchedule: '07:00 Pagi',
    fee: 300,
    avgSold: '22 pcs / hari',
    favoriteMenu: 'Dadar Gulung Pandan',
    absorption: 88,
    debt: 15000,
    avatarVariant: 2,
  },
];

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Risoles Rogout Ayam',
    price: 1200,
    retailPrice: 1200,
    cost: 600,
    unitHpp: 600,
    stock: 50,
    type: 'risoles',
    icon: 'risoles_rogout',
    batchPortions: 50,
    canteenCut: 400,
    netProfit: 200,
    category: 'Gorengan Gurih',
    ingredientsSummary: 'Terigu Segitiga 500g, Ayam Suwir & Wortel, Telur & Panir, Minyak & Gas',
    ingredients: [
      { id: 'i1', name: 'Tepung Segitiga 500g', qty: '500 gram', cost: 6000, icon: 'wheat_flour' },
      { id: 'i2', name: 'Minyak Goreng & Telur', qty: '2 Butir & Minyak', cost: 8000, icon: 'egg_raw' },
      { id: 'i3', name: 'Ayam Suwir & Sayuran', qty: 'Isian Rogout', cost: 10000, icon: 'meat_chicken' },
      { id: 'i4', name: 'Gas LPG & Mika Plastik', qty: 'Operasional', cost: 6000, icon: 'gas_cylinder' },
    ],
    totalBatchCost: 30000,
  },
  {
    id: 'p2',
    name: 'Pastel Sayur Telur',
    price: 1500,
    retailPrice: 1500,
    cost: 750,
    unitHpp: 750,
    stock: 35,
    type: 'pastel',
    icon: 'pastel_telur',
    batchPortions: 50,
    canteenCut: 500,
    netProfit: 250,
    category: 'Gorengan Gurih',
    ingredientsSummary: 'Terigu Cakra 500g, Telur Rebus & Wortel, Ayam Cincang, Minyak & Gas',
    ingredients: [
      { id: 'i1', name: 'Tepung Cakra 500g', qty: '500 gram', cost: 7000, icon: 'wheat_flour' },
      { id: 'i2', name: 'Telur Rebus & Wortel', qty: '4 Butir & Wortel', cost: 12000, icon: 'egg_raw' },
      { id: 'i3', name: 'Daging Ayam Cincang', qty: '250 gram', cost: 10000, icon: 'meat_chicken' },
      { id: 'i4', name: 'Minyak Goreng & Gas', qty: 'Alokasi Masak', cost: 8500, icon: 'oil_butter' },
    ],
    totalBatchCost: 37500,
  },
  {
    id: 'p3',
    name: 'Dadar Gulung Pandan',
    price: 1000,
    retailPrice: 1000,
    cost: 500,
    unitHpp: 500,
    stock: 40,
    type: 'dadar',
    icon: 'dadar_gulung',
    batchPortions: 50,
    canteenCut: 300,
    netProfit: 200,
    category: 'Kue Basah Manis',
    ingredientsSummary: 'Tepung & Sari Pandan, Kelapa Parut & Gula Aren, Santan Kental, Plastik OPP',
    ingredients: [
      { id: 'i1', name: 'Tepung & Daun Suji', qty: 'Adonan Hijau', cost: 5000, icon: 'wheat_flour' },
      { id: 'i2', name: 'Kelapa Parut & Gula Jawa', qty: 'Unti Manis', cost: 9000, icon: 'sugar_cane' },
      { id: 'i3', name: 'Santan Kelapa Gurih', qty: '500 ml', cost: 6000, icon: 'oil_butter' },
      { id: 'i4', name: 'Gas LPG & Plastik OPP', qty: 'Kemasan', cost: 5000, icon: 'package_box' },
    ],
    totalBatchCost: 25000,
  },
  {
    id: 'p4',
    name: 'Lemper Ayam Ketan',
    price: 1500,
    retailPrice: 1500,
    cost: 700,
    unitHpp: 700,
    stock: 30,
    type: 'lemper',
    icon: 'lemper_ayam',
    batchPortions: 40,
    canteenCut: 500,
    netProfit: 300,
    category: 'Jajanan Pasar',
    ingredientsSummary: 'Beras Ketan Pulen, Ayam Suwir Bumbu Santan, Daun Pisang & Lidi',
    ingredients: [
      { id: 'i1', name: 'Beras Ketan Putih', qty: '500 gram', cost: 8000, icon: 'wheat_flour' },
      { id: 'i2', name: 'Daging Ayam Suwir', qty: '300 gram', cost: 12000, icon: 'meat_chicken' },
      { id: 'i3', name: 'Santan Kental Gurih', qty: '400 ml', cost: 5000, icon: 'oil_butter' },
      { id: 'i4', name: 'Daun Pisang & Lidi', qty: '2 Ikat', cost: 3000, icon: 'package_box' },
    ],
    totalBatchCost: 28000,
  },
];

const DEFAULT_RECIPE = DEFAULT_PRODUCTS[0];

const DEFAULT_CASHFLOW = {
  walletBalance: 850000,
  totalIncomeToday: 320000,
  totalExpenseToday: 150000,
  weeklyTrend: [
    { day: 'Sen', amount: 240000 },
    { day: 'Sel', amount: 310000 },
    { day: 'Rab', amount: 280000 },
    { day: 'Kam', amount: 350000 },
    { day: 'Jum', amount: 390000 },
    { day: 'Sab', amount: 420000 },
    { day: 'Min', amount: 320000 },
  ],
  activities: [
    {
      id: 'act1',
      title: 'Kantin Fakultas Teknik',
      subtitle: 'Setoran 25 Risoles Rogout',
      amount: 50000,
      type: 'income',
      tag: 'Lunas Tunai',
      time: '16:30',
    },
    {
      id: 'act2',
      title: 'Belanja Pasar Subuh',
      subtitle: 'Tepung Segitiga & Minyak Sawit',
      amount: 150000,
      type: 'expense',
      tag: 'Bahan Baku',
      time: '05:15',
    },
    {
      id: 'act3',
      title: 'Penjualan Kasir Teras',
      subtitle: '35 pcs Aneka Jajanan Pagi',
      amount: 45000,
      type: 'income',
      tag: 'Kasir Langsung',
      time: '08:40',
    },
  ],
};

const DEFAULT_CONSIGNMENT = {
  c1: {
    partnerName: 'Kantin Fakultas Teknik',
    picName: 'Pak Joko Sutrisno',
    itemName: 'Risoles Rogout Ayam',
    itemType: 'risoles_rogout',
    initialQty: 30,
    returnQty: 5,
    soldQty: 25,
    unitPrice: 1000,
    totalDue: 25000,
    isPaid: true,
    noteCode: '#KB-20261018',
  },
  c2: {
    partnerName: 'Kantin Gedung Utama',
    picName: 'Bu Siti Khodijah',
    itemName: 'Pastel Sayur Telur',
    itemType: 'pastel_telur',
    initialQty: 25,
    returnQty: 2,
    soldQty: 23,
    unitPrice: 1200,
    totalDue: 27600,
    isPaid: false,
    noteCode: '#KB-20261019',
  },
  c3: {
    partnerName: 'Warung Kopi Kampus',
    picName: 'Bang Hendra',
    itemName: 'Dadar Gulung Pandan',
    itemType: 'dadar_gulung',
    initialQty: 20,
    returnQty: 3,
    soldQty: 17,
    unitPrice: 900,
    totalDue: 15300,
    isPaid: true,
    noteCode: '#KB-20261020',
  },
};

const DEFAULT_STOCK_ITEMS = [
  { id: '1', name: 'Tepung Terigu', qty: '4.5 kg', numQty: 4.5, unit: 'kg', min: '2 kg', cap: 75, status: 'safe', icon: 'wheat_flour', category: 'Bahan Kering' },
  { id: '2', name: 'Telur Ayam', qty: '38 Butir', numQty: 38, unit: 'Butir', min: '15 butir', cap: 65, status: 'safe', icon: 'egg_raw', category: 'Bahan Basah' },
  { id: '3', name: 'Minyak Goreng', qty: '0.8 Liter', numQty: 0.8, unit: 'Liter', min: '2 Liter', cap: 20, status: 'critical', icon: 'oil_butter', category: 'Bahan Basah' },
  { id: '4', name: 'Gas LPG 3kg', qty: '1 Tabung', numQty: 1, unit: 'Tabung', min: '2 Tabung', cap: 25, status: 'critical', icon: 'gas_cylinder', category: 'Operasional' },
  { id: '5', name: 'Gula Pasir & Aren', qty: '3.0 kg', numQty: 3.0, unit: 'kg', min: '1 kg', cap: 80, status: 'safe', icon: 'sugar_cane', category: 'Bahan Kering' },
  { id: '6', name: 'Daging Dada Ayam', qty: '2.5 kg', numQty: 2.5, unit: 'kg', min: '1 kg', cap: 70, status: 'safe', icon: 'meat_chicken', category: 'Bahan Basah' },
  { id: '7', name: 'Wortel & Kentang', qty: '1.8 kg', numQty: 1.8, unit: 'kg', min: '1 kg', cap: 60, status: 'safe', icon: 'carrot_veg', category: 'Bahan Basah' },
  { id: '8', name: 'Mika Plastik Kue', qty: '80 Pcs', numQty: 80, unit: 'Pcs', min: '30 pcs', cap: 85, status: 'safe', icon: 'package_box', category: 'Operasional' },
];

const DEFAULT_MARKET_ITEMS = [
  { id: 'b1', name: 'Telur Ayam Negeri', qtyNeeded: '3 Kg (48 butir)', estCost: 78000, icon: 'egg_raw', checked: false, note: 'Pilih cangkang cokelat tebal' },
  { id: 'b2', name: 'Minyak Goreng Sawit', qtyNeeded: '4 Liter', estCost: 64000, icon: 'oil_butter', checked: true, note: 'Untuk gorengan risoles pagi' },
  { id: 'b3', name: 'Daging Dada Ayam Fillet', qtyNeeded: '1.5 Kg', estCost: 54000, icon: 'meat_chicken', checked: false, note: 'Rebus suwir isian kue' },
  { id: 'b4', name: 'Wortel Segar Manis', qtyNeeded: '2 Kg', estCost: 28000, icon: 'carrot_veg', checked: false, note: 'Potong dadu kecil rogout' },
  { id: 'b5', name: 'Plastik Mika Snack 7C', qtyNeeded: '2 Pack (100 pcs)', estCost: 24000, icon: 'package_box', checked: true, note: 'Wadah eceran lapak' },
  { id: 'b6', name: 'Gula Pasir & Daun Pisang', qtyNeeded: '1 Kg + 2 Ikat', estCost: 23000, icon: 'sugar_cane', checked: false, note: 'Pembungkus lemper harum' },
];

const DEFAULT_DEBTS = [
  {
    id: 'd1',
    canteenName: 'Kantin Fakultas Teknik',
    pic: 'Pak Joko Sutrisno',
    phone: '081298765432',
    amount: 45000,
    dueDate: 'Kemarin • Sesi Sore',
    items: '25 Risoles Rogout & 10 Pastel',
    daysLate: 1,
  },
  {
    id: 'd2',
    canteenName: 'Kantin SMP Negeri 1',
    pic: 'Bu Siti Khodijah',
    phone: '081322334455',
    amount: 60000,
    dueDate: '3 Hari Lalu',
    items: '30 Dadar Gulung & 30 Lemper',
    daysLate: 3,
  },
  {
    id: 'd3',
    canteenName: 'Koperasi Mahasiswa',
    pic: 'Mas Arif Hidayat',
    phone: '085711223344',
    amount: 25000,
    dueDate: 'Hari Ini • 16:00 WIB',
    items: '20 Risoles Rogout Mayo',
    daysLate: 0,
  },
];

export const initStorage = async () => {
  try {
    const profile = await AsyncStorage.getItem(KEYS.USER_PROFILE);
    if (!profile) await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(DEFAULT_PROFILE));

    const products = await AsyncStorage.getItem(KEYS.PRODUCTS);
    if (!products) await AsyncStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));

    const recipe = await AsyncStorage.getItem(KEYS.RECIPES);
    if (!recipe) await AsyncStorage.setItem(KEYS.RECIPES, JSON.stringify([DEFAULT_RECIPE]));

    const cashflow = await AsyncStorage.getItem(KEYS.CASHFLOW);
    if (!cashflow) await AsyncStorage.setItem(KEYS.CASHFLOW, JSON.stringify(DEFAULT_CASHFLOW));

    const canteens = await AsyncStorage.getItem(KEYS.CANTEENS);
    if (!canteens) await AsyncStorage.setItem(KEYS.CANTEENS, JSON.stringify(DEFAULT_CANTEENS));

    const consignment = await AsyncStorage.getItem(KEYS.CONSIGNMENT);
    if (!consignment) await AsyncStorage.setItem(KEYS.CONSIGNMENT, JSON.stringify(DEFAULT_CONSIGNMENT));

    const stock = await AsyncStorage.getItem(KEYS.STOCK_ITEMS);
    if (!stock) await AsyncStorage.setItem(KEYS.STOCK_ITEMS, JSON.stringify(DEFAULT_STOCK_ITEMS));

    const market = await AsyncStorage.getItem(KEYS.MARKET_ITEMS);
    if (!market) await AsyncStorage.setItem(KEYS.MARKET_ITEMS, JSON.stringify(DEFAULT_MARKET_ITEMS));

    const debts = await AsyncStorage.getItem(KEYS.DEBTS);
    if (!debts) await AsyncStorage.setItem(KEYS.DEBTS, JSON.stringify(DEFAULT_DEBTS));
  } catch (err) {
    console.error('Storage Init Error:', err);
  }
};

export const getProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = async (newProfile) => {
  try {
    const current = await getProfile();
    const merged = { ...current, ...newProfile };
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.error('Save Profile Error:', err);
    return DEFAULT_PROFILE;
  }
};

export const getCanteens = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CANTEENS);
    return data ? JSON.parse(data) : DEFAULT_CANTEENS;
  } catch {
    return DEFAULT_CANTEENS;
  }
};

export const addCanteen = async (canteen) => {
  try {
    const list = await getCanteens();
    const updated = [
      ...list,
      {
        id: 'c_' + Date.now(),
        debt: 0,
        address: 'Mitra Kantin Baru',
        dropSchedule: '06:30 Pagi',
        fee: 400,
        avgSold: '25 pcs / hari',
        favoriteMenu: 'Risoles Rogout Ayam',
        absorption: 88,
        ...canteen,
      },
    ];
    await AsyncStorage.setItem(KEYS.CANTEENS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Canteen Error:', err);
    return DEFAULT_CANTEENS;
  }
};

export const getCashflow = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CASHFLOW);
    return data ? JSON.parse(data) : DEFAULT_CASHFLOW;
  } catch {
    return DEFAULT_CASHFLOW;
  }
};

export const addIncomeTransaction = async (title, subtitle, amount, tag = 'Setoran Kantin') => {
  try {
    const cash = await getCashflow();
    const val = Math.round(Number(amount) || 0);
    const newActivity = {
      id: 'inc_' + Date.now(),
      title: title || 'Pemasukan Usaha',
      subtitle: subtitle || tag,
      amount: val,
      type: 'income',
      tag,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = {
      ...cash,
      walletBalance: Math.round(cash.walletBalance + val),
      totalIncomeToday: Math.round(cash.totalIncomeToday + val),
      activities: [newActivity, ...(cash.activities || []).slice(0, 14)],
    };
    await AsyncStorage.setItem(KEYS.CASHFLOW, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Income Error:', err);
  }
};

export const addExpenseTransaction = async (title, amount, tag = 'Operasional') => {
  try {
    const cash = await getCashflow();
    const cost = Math.round(Number(amount) || 0);
    const newBalance = Math.max(0, Math.round(cash.walletBalance - cost));
    const newExpense = Math.round(cash.totalExpenseToday + cost);
    const newActivity = {
      id: 'exp_' + Date.now(),
      title: title || 'Pengeluaran Dapur',
      subtitle: tag,
      amount: cost,
      type: 'expense',
      tag: tag,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = {
      ...cash,
      walletBalance: newBalance,
      totalExpenseToday: newExpense,
      activities: [newActivity, ...(cash.activities || []).slice(0, 14)],
    };
    await AsyncStorage.setItem(KEYS.CASHFLOW, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Expense Error:', err);
  }
};

export const getProducts = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
};

export const addProduct = async (prod) => {
  try {
    const list = await getProducts();
    const existingIdx = list.findIndex((p) => p.id === prod.id);
    let updated;
    if (existingIdx >= 0) {
      updated = list.map((p, idx) => (idx === existingIdx ? { ...p, ...prod } : p));
    } else {
      updated = [{ ...prod, id: prod.id || 'p_' + Date.now(), stock: prod.stock || 40 }, ...list];
    }
    await AsyncStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Product Error:', err);
    return DEFAULT_PRODUCTS;
  }
};

export const getRecipe = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.RECIPES);
    return data ? JSON.parse(data)[0] : DEFAULT_RECIPE;
  } catch {
    return DEFAULT_RECIPE;
  }
};

export const getConsignment = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.CONSIGNMENT);
    return data ? JSON.parse(data) : DEFAULT_CONSIGNMENT;
  } catch {
    return DEFAULT_CONSIGNMENT;
  }
};

export const saveConsignment = async (sessionMap) => {
  try {
    await AsyncStorage.setItem(KEYS.CONSIGNMENT, JSON.stringify(sessionMap));
    return sessionMap;
  } catch (err) {
    console.error('Save Consignment Error:', err);
    return sessionMap;
  }
};

export const addPosTransaction = async (totalAmount, itemsCount) => {
  try {
    const val = Math.round(Number(totalAmount) || 0);
    return await addIncomeTransaction(
      'Penjualan Kasir Eceran',
      `${itemsCount} pcs jajanan terjual langsung`,
      val,
      'Kasir Langsung'
    );
  } catch (err) {
    console.error('Add POS Transaction Error:', err);
  }
};

export const getStockItems = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.STOCK_ITEMS);
    return data ? JSON.parse(data) : DEFAULT_STOCK_ITEMS;
  } catch {
    return DEFAULT_STOCK_ITEMS;
  }
};

export const saveStockItems = async (items) => {
  try {
    await AsyncStorage.setItem(KEYS.STOCK_ITEMS, JSON.stringify(items));
    return items;
  } catch {
    return items;
  }
};

export const getMarketItems = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.MARKET_ITEMS);
    return data ? JSON.parse(data) : DEFAULT_MARKET_ITEMS;
  } catch {
    return DEFAULT_MARKET_ITEMS;
  }
};

export const saveMarketItems = async (items) => {
  try {
    await AsyncStorage.setItem(KEYS.MARKET_ITEMS, JSON.stringify(items));
    return items;
  } catch {
    return items;
  }
};

export const getDebts = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.DEBTS);
    return data ? JSON.parse(data) : DEFAULT_DEBTS;
  } catch {
    return DEFAULT_DEBTS;
  }
};

export const saveDebts = async (debts) => {
  try {
    await AsyncStorage.setItem(KEYS.DEBTS, JSON.stringify(debts));
    return debts;
  } catch {
    return debts;
  }
};

export const exportBackupJSON = async () => {
  try {
    const [profile, canteens, products, recipe, cashflow, consignment, stock, market, debts] =
      await Promise.all([
        getProfile(),
        getCanteens(),
        getProducts(),
        getRecipe(),
        getCashflow(),
        getConsignment(),
        getStockItems(),
        getMarketItems(),
        getDebts(),
      ]);

    const backupData = {
      appName: 'KantinBite',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      profile,
      canteens,
      products,
      recipe,
      cashflow,
      consignment,
      stock,
      market,
      debts,
    };
    return JSON.stringify(backupData, null, 2);
  } catch (err) {
    console.error('Export Backup Error:', err);
    throw err;
  }
};

export const restoreBackupJSON = async (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    if (!data.profile && data.appName !== 'KantinBite') {
      throw new Error('Format cadangan data tidak valid.');
    }
    if (data.profile) await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(data.profile));
    if (data.canteens) await AsyncStorage.setItem(KEYS.CANTEENS, JSON.stringify(data.canteens));
    if (data.products) await AsyncStorage.setItem(KEYS.PRODUCTS, JSON.stringify(data.products));
    if (data.recipe) await AsyncStorage.setItem(KEYS.RECIPES, JSON.stringify([data.recipe]));
    if (data.cashflow) await AsyncStorage.setItem(KEYS.CASHFLOW, JSON.stringify(data.cashflow));
    if (data.consignment) await AsyncStorage.setItem(KEYS.CONSIGNMENT, JSON.stringify(data.consignment));
    if (data.stock) await AsyncStorage.setItem(KEYS.STOCK_ITEMS, JSON.stringify(data.stock));
    if (data.market) await AsyncStorage.setItem(KEYS.MARKET_ITEMS, JSON.stringify(data.market));
    if (data.debts) await AsyncStorage.setItem(KEYS.DEBTS, JSON.stringify(data.debts));
    return true;
  } catch (err) {
    console.error('Restore Backup Error:', err);
    throw err;
  }
};
