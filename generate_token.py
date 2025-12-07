from google_auth_oauthlib.flow import InstalledAppFlow

# Alcance: acceso para gestionar archivos creados por la app
SCOPES = ['https://www.googleapis.com/auth/drive.file']


def main():
    try:
        flow = InstalledAppFlow.from_client_secrets_file('client_secret.json', SCOPES)
        creds = flow.run_local_server(port=0)

        print("\n--- ¡ÉXITO! COPIA ESTOS DATOS EN TU .ENV ---")
        print(f"GOOGLE_CLIENT_ID={creds.client_id}")
        print(f"GOOGLE_CLIENT_SECRET={creds.client_secret}")
        print(f"GOOGLE_REFRESH_TOKEN={creds.refresh_token}")
    except FileNotFoundError:
        print("\nERROR: No se encontró el archivo 'client_secret.json'.")
        print("Descárgalo de Google Cloud Console (Credenciales -> OAuth Client ID) y ponlo en la raíz.")


if __name__ == '__main__':
    main()

