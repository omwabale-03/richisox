import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

let adminApp: App;

if (getApps().length === 0) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    try {
      const parsed = JSON.parse(serviceAccount);
      adminApp = initializeApp({
        credential: cert(parsed),
      });
    } catch {
      // Fallback: initialize without credentials (will fail on verify but won't crash startup)
      adminApp = initializeApp();
    }
  } else {
    adminApp = initializeApp();
  }
} else {
  adminApp = getApps()[0];
}

const adminAuth = getAuth(adminApp);

export { adminAuth };
