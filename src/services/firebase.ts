import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

// For development/testing - replace with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDemoApiKey-Replace-With-Your-Real-Key",
  authDomain: "serenresidential-app.firebaseapp.com",
  projectId: "serenresidential-app", 
  storageBucket: "serenresidential-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo-app-id"
};

// Initialize Firebase app
let app: any;
let db: Firestore | any;
let storage: FirebaseStorage | any;
let auth: Auth | any;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firestore
  db = getFirestore(app);
  
  // Initialize Storage
  storage = getStorage(app);
  
  // Initialize Auth
  auth = getAuth(app);
  
} catch (error) {
  console.warn('Firebase initialization failed, using offline mode:', error);
  
  // Create mock objects for development/testing
  db = {
    collection: () => ({
      doc: () => ({
        set: () => Promise.resolve(),
        get: () => Promise.resolve({ exists: false, data: () => null }),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve(),
        onSnapshot: () => () => {}
      }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      where: () => ({
        get: () => Promise.resolve({ docs: [], empty: true })
      }),
      orderBy: () => ({
        get: () => Promise.resolve({ docs: [], empty: true }),
        onSnapshot: () => () => {}
      }),
      onSnapshot: () => () => {}
    })
  };
  
  storage = {
    ref: () => ({
      child: () => ({
        put: () => Promise.resolve({ ref: { getDownloadURL: () => Promise.resolve('mock-url') } })
      })
    })
  };
  
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: () => Promise.reject(new Error('Auth not configured')),
    createUserWithEmailAndPassword: () => Promise.reject(new Error('Auth not configured')),
    signOut: () => Promise.reject(new Error('Auth not configured'))
  };
}

export { db, storage, auth };
export default app;

// Type the db export to fix implicit any type errors
export type { Firestore } from 'firebase/firestore';
