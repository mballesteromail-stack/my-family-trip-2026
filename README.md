# Nueva York 2026 — Itinerario familiar

App web (PWA) para usar el itinerario del viaje desde el celular: día por día,
presupuesto, transporte, comidas, bucket list y reglas. Se puede marcar cada
actividad como hecha y agregar notas, y eso se sincroniza al instante entre
todos los que tengan acceso.

## 1. Crear el proyecto de Firebase (una sola vez)

1. Entrá a https://console.firebase.google.com y creá un proyecto nuevo (gratis).
2. En **Authentication → Sign-in method**, activá el proveedor **Google**.
3. En **Firestore Database**, creá una base en modo producción (cualquier región).
4. En **Configuración del proyecto → General → Tus apps**, agregá una app web
   (ícono `</>`) y copiá los valores de `firebaseConfig`.
5. Copiá `.env.local.example` a `.env.local` y completá esos valores:

   ```bash
   cp .env.local.example .env.local
   ```

6. Agregá el Gmail de cada integrante de la familia en:
   - `src/lib/allowedEmails.ts` (lista `ALLOWED_EMAILS`)
   - `firestore.rules` (dentro de la función `isFamily()`)

   Solo esos emails van a poder entrar a la app y ver/editar el itinerario.

## 2. Correr en desarrollo

```bash
npm install
npm run dev
```

Abrí http://localhost:3000, iniciá sesión con un Gmail de la lista y probá
marcar actividades.

## 3. Publicar las reglas de Firestore

```bash
npm install -g firebase-tools   # una sola vez
firebase login
firebase use --add               # elegí tu proyecto de Firebase
firebase deploy --only firestore:rules
```

## 4. Deploy de la app (Firebase Hosting)

```bash
npm run build
firebase deploy --only hosting
```

Al terminar te va a dar una URL pública (`https://TU-PROYECTO.web.app`).
Compartila con la familia.

## 5. Instalar en el iPhone

1. Abrir la URL en Safari.
2. Tocar el ícono de compartir → **Agregar a pantalla de inicio**.
3. Queda como una app con ícono propio, sin la barra de Safari.

## Estructura del proyecto

- `src/data/itinerary.ts` — todo el contenido de la guía (editable sin tocar
  el resto del código).
- `src/lib/firebase.ts` / `src/lib/auth.tsx` — conexión con Firebase y login
  con Google restringido a la whitelist de emails.
- `src/hooks/useChecklist.ts` — lectura/escritura en tiempo real del estado
  de "hecho" y las notas en Firestore.
- `src/app/*` — las pantallas (inicio, cada día, presupuesto, transporte,
  comidas, bucket list, reglas).
