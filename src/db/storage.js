import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_PROFILE: '@kantinbite_user_profile',
  RECIPES: '@kantinbite_recipes',
  PRODUCTS: '@kantinbite_products',
  CANTEENS: '@kantinbite_canteens',
  CASHFLOW: '@kantinbite_cashflow',
  CONSIGNMENT: '@kantinbite_consignment'
};

const DEFAULT_PROFILE = {
  businessName: 'Dapur Berkah Bu Sumi',
  ownerName: 'Ibu Sumiati',
  pin: '123456',
  phone: '081234567890',
  isLoggedIn: true
};

const DEFAULT_CANTEENS = [
  { id: 'c1', name: 'Kantin Fakultas Teknik', pic: 'Pak Joko', phone: '081298765432', debt: 0 },
  { id: 'c2', name: 'Kantin Gedung Utama', pic: 'Bu Siti', phone: '081345678901', debt: 35000 },
  { id: 'c3', name: 'Warung Kopi Kampus', pic: 'Bang Hendra', phone: '085712345678', debt: 15000 }
];

const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Risoles Rogout', price: 1200, cost: 600, stock: 50, type: 'risoles' },
  { id: 'p2', name: 'Pastel Telur', price: 1500, cost: 750, stock: 35, type: 'pastel' },
  { id: 'p3', name: 'Dadar Gulung', price: 1000, cost: 500, stock: 40, type: 'dadar' },
  { id: 'p4', name: 'Lemper Ayam', price: 1500, cost: 800, stock: 30, type: 'lemper' }
];

const DEFAULT_RECIPE = {
  id: 'r1',
  name: 'Risoles Rogout Ayam',
  portions: 50,
  ingredients: [
    { name: 'Tepung Segitiga 500g', cost: 6000 },
    { name: 'Minyak Goreng & Telur', cost: 8000 },
    { name: 'Ayam Suwir & Sayuran', cost: 10000 },
    { name: 'Gas LPG & Mika Plastik', cost: 6000 }
  ],
  totalBatchCost: 30000,
  unitHpp: 600,
  marginPercent: 50,
  canteenPrice: 1000,
  retailPrice: 1200
};

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
    { day: 'Min', amount: 320000 }
  ],
  activities: [
    {
      id: 'act1',
      title: 'Kantin Teknik Mesin',
      subtitle: 'Setoran 25 Risoles Mayo',
      amount: 50000,
      type: 'income',
      tag: 'Lunas Tunai',
      time: '16:30'
    },
    {
      id: 'act2',
      title: 'Belanja Pasar Subuh',
      subtitle: 'Tepung Segitiga & Minyak',
      amount: 150000,
      type: 'expense',
      tag: 'Bahan Baku',
      time: '05:15'
    }
  ]
};

const DEFAULT_CONSIGNMENT = {
  partnerName: 'Kantin Fakultas Teknik',
  picName: 'Pak Joko',
  itemName: 'Risoles Rogout',
  initialQty: 30,
  returnQty: 5,
  soldQty: 25,
  unitPrice: 1000,
  totalDue: 25000,
  isPaid: true,
  noteCode: '#KB-20261007'
};

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
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(newProfile));
  } catch (err) {
    console.error('Save Profile Error:', err);
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
    const updated = [...list, { ...canteen, id: 'c_' + Date.now(), debt: 0 }];
    await AsyncStorage.setItem(KEYS.CANTEENS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Canteen Error:', err);
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

export const addExpenseTransaction = async (title, amount, tag = 'Operasional') => {
  try {
    const cash = await getCashflow();
    const cost = Math.round(Number(amount) || 0);
    const newBalance = Math.max(0, cash.walletBalance - cost);
    const newExpense = cash.totalExpenseToday + cost;
    const newActivity = {
      id: 'exp_' + Date.now(),
      title: title || 'Pengeluaran Dapur',
      subtitle: tag,
      amount: cost,
      type: 'expense',
      tag: tag,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = {
      ...cash,
      walletBalance: newBalance,
      totalExpenseToday: newExpense,
      activities: [newActivity, ...cash.activities.slice(0, 9)]
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
    const updated = [...list, { ...prod, id: 'p_' + Date.now(), stock: 30 }];
    await AsyncStorage.setItem(KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add Product Error:', err);
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

export const addPosTransaction = async (totalAmount, itemsCount) => {
  try {
    const cash = await getCashflow();
    const newBalance = cash.walletBalance + totalAmount;
    const newIncome = cash.totalIncomeToday + totalAmount;
    const newActivity = {
      id: 'pos_' + Date.now(),
      title: 'Penjualan Kasir Mandiri',
      subtitle: `${itemsCount} pcs jajanan eceran`,
      amount: totalAmount,
      type: 'income',
      tag: 'Kasir Langsung',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = {
      ...cash,
      walletBalance: newBalance,
      totalIncomeToday: newIncome,
      activities: [newActivity, ...cash.activities.slice(0, 9)]
    };
    await AsyncStorage.setItem(KEYS.CASHFLOW, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Add POS Transaction Error:', err);
  }
};

// FITUR BACKUP & RESTORE DATA (LENGKAP SEPERTI DAPUR-RN)
export const exportBackupJSON = async () => {
  try {
    const profile = await getProfile();
    const canteens = await getCanteens();
    const products = await getProducts();
    const recipe = await getRecipe();
    const cashflow = await getCashflow();
    const consignment = await getConsignment();

    const backupData = {
      appName: 'KantinBite',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      profile,
      canteens,
      products,
      recipe,
      cashflow,
      consignment
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
    return true;
  } catch (err) {
    console.error('Restore Backup Error:', err);
    throw err;
  }
};
