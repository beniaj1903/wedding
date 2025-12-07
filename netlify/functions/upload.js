const { google } = require('googleapis');

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_DRIVE_FOLDER_ID,
  BACKEND_UPLOAD_TOKEN,
  ALLOWED_ORIGINS = '*',
} = process.env;

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  console.warn(
    'Faltan credenciales OAuth (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN).'
  );
}

const allowedOrigins = ALLOWED_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.length === 0 || allowedOrigins.includes('*');

let driveClient;

function getDriveClient() {
  if (driveClient) return driveClient;

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
    scope: SCOPES.join(' '),
  });

  driveClient = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  return driveClient;
}

function buildDescription(metadata = {}) {
  const lines = [
    `Invitado: ${metadata.guestName || 'N/A'}`,
    `Guest ID: ${metadata.guestId || 'N/A'}`,
    `Mesa: ${metadata.tableName || 'N/A'}`,
    `Table ID: ${metadata.tableId || 'N/A'}`,
    `Subido: ${metadata.uploadedAt || new Date().toISOString()}`,
    `Archivo original: ${metadata.originalName || 'N/A'} (${metadata.mimeType || 'application/octet-stream'})`,
    `Tamaño: ${metadata.originalSize || 0} bytes`,
    `Fuente: ${metadata.source || 'mi-mesa'}`,
  ];
  return lines.join('\n');
}

function getCorsHeaders(origin) {
  if (allowAllOrigins) {
    return {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Upload-Token',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
    };
  }

  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type,X-Upload-Token',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
    };
  }

  return {
    'Access-Control-Allow-Origin': allowedOrigins[0] || '',
    'Access-Control-Allow-Headers': 'Content-Type,X-Upload-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
  };
}

exports.handler = async (event) => {
  const origin = event.headers.origin || event.headers.Origin;
  const corsHeaders = getCorsHeaders(origin);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Method not allowed' }),
    };
  }

  if (
    BACKEND_UPLOAD_TOKEN &&
    event.headers['x-upload-token'] !== BACKEND_UPLOAD_TOKEN &&
    event.headers['X-Upload-Token'] !== BACKEND_UPLOAD_TOKEN
  ) {
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: 'Token inválido' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    if (!payload.data || !payload.fileName || !payload.mimeType) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, message: 'Faltan campos requeridos.' }),
      };
    }

    const targetFolder = payload.folderId || GOOGLE_DRIVE_FOLDER_ID;
    if (!targetFolder) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          message: 'No se definió GOOGLE_DRIVE_FOLDER_ID ni folderId en la petición.',
        }),
      };
    }

    const buffer = Buffer.from(payload.data, 'base64');

    const { Readable } = require('stream');
    const stream = Readable.from(buffer);

    const drive = getDriveClient();
    const response = await drive.files.create({
      requestBody: {
        name: payload.fileName,
        parents: [targetFolder],
        description: buildDescription(payload.metadata),
      },
      media: {
        mimeType: payload.mimeType,
        body: stream,
      },
      fields: 'id',
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        fileId: response.data.id,
        fileName: payload.fileName,
      }),
    };
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: error.message || 'Error interno' }),
    };
  }
};

