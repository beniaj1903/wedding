const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

exports.handler = async () => {
  if (
    !FIREBASE_API_KEY ||
    !FIREBASE_AUTH_DOMAIN ||
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_STORAGE_BUCKET ||
    !FIREBASE_MESSAGING_SENDER_ID ||
    !FIREBASE_APP_ID
  ) {
    return {
      statusCode: 500,
      body: `console.error('Firebase config incompleta. Revisa las variables de entorno en Netlify.');`,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-store',
      },
    };
  }

  const config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
  };

  return {
    statusCode: 200,
    body: `window.__FIREBASE_CONFIG__ = ${JSON.stringify(config)};`,
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-store',
    },
  };
};

