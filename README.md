# Axiona — Sitio Web Oficial

Repositorio del sitio web de **Axiona** — IA y automatización para PYMES y grandes empresas.

Construido con **React 18 + Vite 5 + Tailwind CSS 3**.

---

## Tecnologías

- **React 18** — Interfaces de usuario
- **Vite 5** — Build y servidor de desarrollo ultrarrápido
- **Tailwind CSS 3** — Diseño utilitario
- **Lucide React** — Íconos SVG

---

## 🚀 Requisitos

- **Node.js** v18 o superior — [descargar](https://nodejs.org/)
- **Git**

---

## 💻 Desarrollo local

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en **http://localhost:5173/**

Cualquier cambio en el código se refleja en tiempo real gracias a HMR (Hot Module Replacement).

Para detener el servidor: `Ctrl + C`

---

## 📝 Cómo editar el contenido

La arquitectura está separada del contenido. **No necesitas tocar `App.jsx` para cambiar textos.**

Todo el contenido está en `src/data/`:

| Archivo | Qué contiene | Cuándo editarlo |
|---|---|---|
| `src/data/config.js` | Nombre de marca, correos, dominio, SEO | Cambiar correo de contacto, dominio, taglines |
| `src/data/content.js` | Todos los textos del sitio: hero, dolores, portafolio, metodología, contacto | Cambiar cualquier texto visible en el sitio |

### Ejemplos de edición común

**Cambiar el correo de contacto:**
```js
// src/data/config.js
contactEmail: 'nuevo@axiona-tech.com',
```

**Cambiar un dolor del cliente:**
```js
// src/data/content.js → doloresContent.items
{ tag: 'NUEVO TAG', title: 'Nuevo título', desc: 'Nueva descripción...' }
```

**Cambiar los textos del hero:**
```js
// src/data/content.js → heroContent
titleLine1: 'Nuevo texto línea 1',
titleLine2: 'Nuevo texto línea 2',
```

---

## 📂 Propuestas comerciales

Las propuestas generadas se alojan en `public/propuestas/`. Cada archivo `.html` es accesible directamente por URL:

```
https://axiona-tech.com/propuestas/[cliente]-[fecha].html
```

Para agregar una propuesta nueva: copia el archivo HTML en `public/propuestas/` y haz deploy.

---

## 🌐 Publicar en GitHub Pages

El sitio está configurado para publicarse en GitHub Pages de forma gratuita.

### Primera vez (configurar el repositorio)

```bash
# 1. Crear el repositorio en GitHub (github.com/[tu-usuario]/axiona-ai-site)
# 2. Conectar el repositorio local
git init
git remote add origin https://github.com/[tu-usuario]/axiona-ai-site.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

Antes de hacer el primer deploy, actualiza el campo `homepage` en `package.json`:
```json
"homepage": "https://[tu-usuario].github.io/axiona-ai-site"
```

Y actualiza la base en `vite.config.js`:
```js
base: '/axiona-ai-site/',
```

> **Si usas dominio propio (`axiona-tech.com`)**, deja `base: '/'` y configura el dominio directamente en la sección Pages de GitHub.

### Publicar cambios

```bash
npm run deploy
```

Este comando:
1. Compila el proyecto (`npm run build`)
2. Publica la carpeta `dist/` en la rama `gh-pages`

Espera 1-3 minutos para que GitHub Pages actualice el sitio.

---

## 🌿 Control de versiones (Git)

`npm run deploy` publica el sitio pero **no guarda el código fuente**. Siempre haz commit de tus cambios:

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

---

## 📁 Estructura del proyecto

```
axiona-ai-site/
├── public/
│   └── propuestas/          ← Propuestas HTML para clientes
├── src/
│   ├── data/
│   │   ├── config.js        ← ✏️ Configuración global (correos, dominio, SEO)
│   │   └── content.js       ← ✏️ Todos los textos del sitio
│   ├── App.jsx              ← Componentes y lógica visual
│   ├── index.css            ← Estilos globales y animaciones
│   └── main.jsx             ← Punto de entrada React
├── index.html               ← HTML shell con metadatos
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
