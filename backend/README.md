# 📊 Cashflow Backend (Esqueleto)

## 🚀 Descripción

Backend en **TypeScript** con **Express**, **Sequelize**, **Valibot**, **i18next** y **Swagger**, diseñado como base para un sistema de **gestión financiera personal**.  
Incluye estructura modular para **controladores**, **servicios**, **modelos**, **middlewares** y **utilidades**, con soporte **multilenguaje** y **documentación de API**.

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) o [Bun](https://bun.sh/)
- [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) (u otro dialecto soportado por Sequelize)
- Archivo `.env` con la configuración necesaria

### Ejemplo de `.env`

```env
SV_PORT=3000
SV_HOST=localhost
SV_BASEURL=http://localhost:
SV_LIMITOFRESTARS=3

DB_DIALECT=mysql
DB_URI=mysql://user:pass@localhost:3306/dbname
```

---

## ⚙️ Instalación y uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar a dist/
npm run build

# Ejecutar en producción
npm start
```

---

## 📑 Endpoints iniciales

- `GET /api-docs` → documentación Swagger UI
- `GET /test-i18n` → prueba de traducciones

---

## 📂 Estructura

```bash
src/
  config/         # configuración global (db, i18n, swagger)
  controllers/    # lógica de endpoints
  models/         # definiciones Sequelize
  services/       # capa de negocio
  routes/         # definiciones de rutas Express
  middleware/     # middlewares (errores, not found, etc.)
  utils/          # helpers genéricos
  locales/        # archivos de traducción i18n
  scripts/        # scripts de soporte (i18n-scan, sync-locales)
  seeders/        # semillas de DB
  types/          # contratos y tipados
```

---

## 🤝 Contribución

1. Usa **ramas por feature** (`feature/nombre`).
2. Corre:
   ```bash
   npm run i18n:scan   # escanea claves usadas en el código
   npm run i18n:sync   # sincroniza claves entre idiomas
   ```
3. Sigue el formato de errores de la API:
   ```json
   { "code": "ERROR_CODE", "message": "Mensaje legible", "details": {} }
   ```

---

## 📝 Notas

- Las traducciones deben usarse en formato `namespace:key` (ej: `errors:notFound`).
- Los controladores validan con **Valibot** antes de llegar a la DB.
- Middleware globales aseguran respuestas JSON coherentes (errores, 404, etc.).
