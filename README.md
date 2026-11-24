# Portal IEEE UD — Rama Estudiantil Universidad Distrital

Sitio web de la Rama Estudiantil IEEE de la Universidad Distrital Francisco José de Caldas (STB04331).
Hecho con Next.js 16, Tailwind CSS 4 y **Keystatic** como panel de contenido.

> **Para la mesa directiva:** no necesitas saber programar para actualizar el sitio.
> Todo el contenido (eventos, capítulos, equipo, proyectos, historias, aliados, preguntas frecuentes…) se edita desde un panel visual.

---

## Editar el contenido

### Opción A — Desde la web (cuando el sitio esté publicado y conectado a GitHub)

1. Entra a `https://<dominio-del-sitio>/keystatic`.
2. Inicia sesión con tu cuenta de GitHub (debe tener acceso al repositorio).
3. Edita y pulsa **Guardar**. El cambio se guarda en GitHub y el sitio se actualiza solo en uno o dos minutos.

### Opción B — En tu computador

```bash
npm install      # solo la primera vez
npm run dev
```

Abre <http://localhost:3000/keystatic>, edita y guarda. Los cambios quedan en la carpeta `content/`.
Luego súbelos a GitHub (commit + push) para que se publiquen.

### Qué se edita en cada sección del panel

| Sección del panel | Qué controla en el sitio |
|---|---|
| **Eventos** | Agenda de *Próximos eventos*, *Memorias*, la página de cada evento y los eventos de cada capítulo. Un evento con fecha de hoy o futura aparece como próximo; cuando pasa la fecha se mueve **solo** a Memorias. |
| **Historias de miembros** | Sección *Historias*. Escribe con el editor de texto; marca **Publicado** cuando esté lista (los borradores solo se ven en local). |
| **Proyectos de investigación** | Página *Investigación* y proyectos dentro de cada capítulo. |
| **Capítulos** | Listado de capítulos y la página propia de cada uno (`/capitulos/pels`, etc.). Desmarca **Visible en el sitio** para ocultar uno sin borrarlo. |
| **Mesa directiva de la Rama** | Página *Equipo*. Usa **Orden** para decidir quién aparece primero. Sin foto se muestran las iniciales. |
| **Aliados y patrocinadores** | Sección de aliados en el inicio y página *Aliados*. |
| **Configuración general** | Correo, redes, formulario de voluntarios, fotos de portada, evento destacado, cifras, reconocimientos y preguntas frecuentes. |

### Buenas prácticas

- **Fotos:** horizontales, de gente en acción, idealmente < 1 MB (JPG/WebP). Para perfiles, cuadradas.
- **Logos de capítulos:** PNG con fondo transparente, una versión negra (fondo claro) y otra blanca (fondo oscuro).
- **Relaciones:** al crear un evento, marca los *capítulos organizadores* para que aparezca en sus páginas.
- **Cambio de directiva:** edita las fichas existentes en vez de crear nuevas, y actualiza el **Orden**.

---

## Publicar el sitio y activar la edición web

El sitio necesita un hosting con servidor de Node (por ejemplo **Vercel**, gratuito para este uso).

1. Importa el repositorio en Vercel y despliega.
2. En las variables de entorno del proyecto añade `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` y vuelve a desplegar.
3. Entra a `/keystatic`: Keystatic te guiará para crear una **GitHub App** y te dará las variables
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` y
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Agrégalas en Vercel y despliega otra vez.
4. Da acceso al repositorio a quienes vayan a editar (Settings → Collaborators).

Sin el paso 2, `/keystatic` queda deshabilitado en producción (solo funciona en local), así nadie puede editar sin permiso.

---

## Para desarrolladores

```
content/            ← contenido editable (YAML / Markdoc). ¡No va en el código!
keystatic.config.ts ← esquema del panel (campos, etiquetas, carpetas de imágenes)
src/lib/content.ts  ← lectura del contenido + lógica de fechas (próximos vs. memorias)
src/app/(sitio)/    ← páginas públicas
src/app/keystatic/  ← panel de administración
public/images/      ← imágenes (eventos, logos, equipo, historias, aliados)
```

- Añadir un campo nuevo: agrégalo en `keystatic.config.ts` y úsalo en la página correspondiente; el panel lo muestra automáticamente.
- Las páginas con fechas se regeneran cada 12 h (`revalidate`) para mover eventos de *Próximos* a *Memorias* sin intervención.
- `npm run build` valida tipos y genera todas las páginas.
