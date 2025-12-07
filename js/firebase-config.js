// Configuración de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = window.__FIREBASE_CONFIG__;

if (!firebaseConfig || !firebaseConfig.apiKey) {
  throw new Error(
    'Firebase no está configurado. Asegúrate de generar env.js (ejecuta scripts/netlify-build.sh o define las variables en Netlify).'
  );
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

