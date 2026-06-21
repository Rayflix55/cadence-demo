// Enterprise local-first IndexedDB manager for CadenceDB
export interface DbUser {
  username: string;
  passwordHash: string;
  createdAt: number;
}

export interface DbSession {
  id: string; // Dynamic unique session token ID
  username: string;
  encryptedData: string; // Encrypted session data
  createdAt: number;
  expiresAt: number; // 24 hours expiry
}

export interface DbCampaign {
  id: string;
  username: string;
  campaignData: any; // All campaign details
  createdAt: number;
  updatedAt: number;
}

const DB_NAME = "CadenceDB";
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB Open Error:", event);
      reject(new Error("Unable to open local enterprise IndexedDB storage."));
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      
      // Store 1: Users
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "username" });
      }

      // Store 2: Sessions
      if (!db.objectStoreNames.contains("sessions")) {
        db.createObjectStore("sessions", { keyPath: "id" });
      }

      // Store 3: Campaigns
      if (!db.objectStoreNames.contains("campaigns")) {
        const campaignStore = db.createObjectStore("campaigns", { keyPath: "id" });
        campaignStore.createIndex("username", "username", { unique: false });
      }
    };
  });
}

// Store actions for Users
export async function dbGetUser(username: string): Promise<DbUser | null> {
  const db = await getDB();
  return new Promise((resolve) => {
    const transaction = db.transaction("users", "readonly");
    const store = transaction.objectStore("users");
    const request = store.get(username);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      resolve(null);
    };
  });
}

export async function dbAddUser(user: DbUser): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("users", "readwrite");
    const store = transaction.objectStore("users");
    const request = store.add(user);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("User registration failed. Username might already exist locally."));
  });
}

// Store actions for Sessions
export async function dbGetSession(id: string): Promise<DbSession | null> {
  const db = await getDB();
  return new Promise((resolve) => {
    const transaction = db.transaction("sessions", "readonly");
    const store = transaction.objectStore("sessions");
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = () => {
      resolve(null);
    };
  });
}

export async function dbSaveSession(session: DbSession): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("sessions", "readwrite");
    const store = transaction.objectStore("sessions");
    const request = store.put(session);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Unable to save encrypted session state."));
  });
}

export async function dbDeleteSession(id: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve) => {
    const transaction = db.transaction("sessions", "readwrite");
    const store = transaction.objectStore("sessions");
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
  });
}

// Store actions for Campaigns
export async function dbGetCampaignsForUser(username: string): Promise<DbCampaign[]> {
  const db = await getDB();
  return new Promise((resolve) => {
    const transaction = db.transaction("campaigns", "readonly");
    const store = transaction.objectStore("campaigns");
    const index = store.index("username");
    const request = index.getAll(username);

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      resolve([]);
    };
  });
}

export async function dbSaveCampaign(campaign: DbCampaign): Promise<void> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("campaigns", "readwrite");
    const store = transaction.objectStore("campaigns");
    const request = store.put(campaign);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Failed to persist campaign state locally."));
  });
}

export async function dbDeleteCampaign(id: string): Promise<void> {
  const db = await getDB();
  return new Promise((resolve) => {
    const transaction = db.transaction("campaigns", "readwrite");
    const store = transaction.objectStore("campaigns");
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
  });
}
