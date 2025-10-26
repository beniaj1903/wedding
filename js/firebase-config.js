// Configuración de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBfKXlXYCxwDcNJ-9ADnFrGEDCkcnLWqjM",
  authDomain: "boda-yoselyn-benito.firebaseapp.com",
  projectId: "boda-yoselyn-benito",
  storageBucket: "boda-yoselyn-benito.firebasestorage.app",
  messagingSenderId: "438613344073",
  appId: "1:438613344073:web:5fe49570444b0ea5816498"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

