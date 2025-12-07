// Configuración de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = window.__FIREBASE_CONFIG__;

if (!firebaseConfig || !firebaseConfig.apiKey) {
  throw new Error(
    'Firebase no está configurado. Asegúrate de definir las variables en Netlify o cargar un script con window.__FIREBASE_CONFIG__ antes de importar firebase-config.js.'
  );
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

