# Ruta Secreta por Norte de Santander

## Archivos

- `index.html`: juego para enviarle a tu amiga.
- `admin.html`: panel privado para revisar las respuestas.
- `Codigo_Apps_Script.gs`: código que guarda las respuestas en Google Sheets.

## 1. Crear la hoja de respuestas

1. En Google Drive crea una hoja de cálculo nueva.
2. En la hoja, abre **Extensiones > Apps Script**.
3. Borra el código existente y pega todo el contenido de `Codigo_Apps_Script.gs`.
4. En Apps Script abre **Configuración del proyecto > Propiedades del script**.
5. Crea una propiedad:
   - Nombre: `ADMIN_KEY`
   - Valor: una contraseña privada que solo tú conozcas.
6. Pulsa **Implementar > Nueva implementación**.
7. Tipo: **Aplicación web**.
8. Ejecutar como: **Yo**.
9. Quién tiene acceso: **Cualquier persona**.
10. Autoriza y copia la URL terminada en `/exec`.

## 2. Conectar el juego

En `index.html` y `admin.html`, busca:

```javascript
const API_URL = "PEGA_AQUI_LA_URL_DE_TU_APPS_SCRIPT";
```

Reemplaza el texto por la URL `/exec` copiada anteriormente.

## 3. Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html` y `admin.html`.
3. En el repositorio abre **Settings > Pages**.
4. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Guarda.

El juego quedará normalmente en:

`https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/`

El panel de respuestas estará en:

`https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/admin.html`

Para entrar al panel usa la contraseña guardada como `ADMIN_KEY`.

## Nota de privacidad

El juego guarda únicamente las respuestas que la persona escribe o selecciona. No solicita ubicación, cámara, correo ni número de teléfono.


VERSIÓN 3: incluye mapa de progreso, bus animado, misiones, sonidos opcionales, recompensas y confeti.
