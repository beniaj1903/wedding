#!/usr/bin/env bash
set -euo pipefail

: "${FIREBASE_API_KEY:?Falta FIREBASE_API_KEY}"
: "${FIREBASE_AUTH_DOMAIN:?Falta FIREBASE_AUTH_DOMAIN}"
: "${FIREBASE_PROJECT_ID:?Falta FIREBASE_PROJECT_ID}"
: "${FIREBASE_STORAGE_BUCKET:?Falta FIREBASE_STORAGE_BUCKET}"
: "${FIREBASE_MESSAGING_SENDER_ID:?Falta FIREBASE_MESSAGING_SENDER_ID}"
: "${FIREBASE_APP_ID:?Falta FIREBASE_APP_ID}"

cat > env.js <<EOF
window.__FIREBASE_CONFIG__ = {
  apiKey: "${FIREBASE_API_KEY}",
  authDomain: "${FIREBASE_AUTH_DOMAIN}",
  projectId: "${FIREBASE_PROJECT_ID}",
  storageBucket: "${FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${FIREBASE_APP_ID}"
};
EOF

echo "🏗️  Build estático para Netlify (HTML/CSS/JS listos)."
echo "⚙️  env.js generado con la configuración de Firebase."
echo "⚙️  Netlify se encargará de compilar las Functions con esbuild."
echo "✅  Build finalizado."

