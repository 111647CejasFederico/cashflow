# 💰 Cashflow Frontend

Frontend en **React + TypeScript** para la aplicación de gestión financiera personal.  
Construido con **Vite + Bun**, preparado con i18n, logger, layouts, y componentes básicos listos para iniciar los módulos funcionales.

---

## 🚀 Tech Stack

- ⚛️ [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- ⚡ [Vite](https://vitejs.dev/) + [Bun](https://bun.sh/) como runtime
- 🎨 [TailwindCSS](https://tailwindcss.com/) para estilos
- 🌐 [React Query](https://tanstack.com/query/latest) para manejo de requests
- 🌍 [i18next](https://www.i18next.com/) con soporte multilenguaje (EN/ES)
- 🛠️ ESLint + Prettier configurados
- 📝 Logger custom estilo backend
- 🔔 UI utilities: Toasts, Confirm Dialog
- 🔒 Protected routes + layouts básicos
- 🐙 Integración lista con backend vía Axios

---

## 📂 Estructura de carpetas

```text
src/
├── api/                     # Cliente API (axios) + servicios
├── app/                     # Config global: router, query, i18n, time
├── assets/                  # Recursos estáticos
├── components/              # Componentes compartidos
│   ├── basics/              # Form, table, ui genéricos
│   ├── LayoutsComponents/   # HeadBar, Sidebar, etc
│   └── UXComponents/        # ErrorBoundary, ProtectedRoute, etc
├── contexts/                # React contexts
├── locales/                 # Traducciones en.json / es.json
├── pages/                   # Páginas (Home, Login, Master, Errors)
├── scripts/                 # Utilidades para i18n (scan / sync locales)
├── theme/                   # Estilos globales y helpers de tema
├── types/                   # Tipos compartidos
└── utils/                   # Logger, helpers
```

---

## ⚙️ Configuración inicial

1. Instalar dependencias

   ```bash
   bun install
   ```

2. Variables de entorno (`.env`)

   ```ini
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_ENV=development
   ```

3. Correr el proyecto

   ```bash
   bun dev
   ```

4. Build producción
   ```bash
   bun run build
   ```

---

## 🧹 Lint & Format

- Revisar errores de lint:

  ```bash
  bun run lint
  ```

- Fix automático:

  ```bash
  bun run lint:fix
  ```

- Formatear con Prettier:
  ```bash
  bun run format
  ```

---

## 🌍 Internacionalización (i18n)

- Claves de idioma en `src/locales/en.json` y `src/locales/es.json`
- Script para escanear nuevas claves usadas en el código:

  ```bash
  bun run scan:locales
  ```

- Script para sincronizar claves faltantes:
  ```bash
  bun run sync:locales
  ```

---

## 🛡️ Manejo de errores

- `ErrorBoundary` para errores de render
- Páginas de estado:
  - `401` → Unauthorized
  - `404` → Not found
  - `500` → Server error

---
