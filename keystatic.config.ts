import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Panel de contenido del portal (abrir en /keystatic).
 * - Local (por defecto): edita los archivos de /content en tu computador.
 * - GitHub: define NEXT_PUBLIC_KEYSTATIC_STORAGE=github en el hosting para
 *   editar desde la web; cada cambio se guarda como un commit en el repositorio.
 */
export const useGithub =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" || Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);

/** El panel existe en desarrollo, o en producción solo si está conectado a GitHub (requiere iniciar sesión). */
export const panelDisponible = process.env.NODE_ENV === "development" || useGithub;

const AREAS = [
  { label: "Energía y Potencia", value: "energia" },
  { label: "Electrónica y Sistemas", value: "electronica" },
  { label: "Computación y Robótica", value: "computacion" },
  { label: "Ciencia y Salud", value: "ciencia" },
  { label: "Comunidad", value: "comunidad" },
] as const;

const TIPOS_EVENTO = [
  { label: "Taller / Bootcamp", value: "WORKSHOP" },
  { label: "Conferencia / Charla", value: "CONFERENCE" },
  { label: "Cumbre / Congreso", value: "SUMMIT" },
  { label: "Hackathon / Competencia", value: "HACKATHON" },
  { label: "Visita técnica", value: "VISIT" },
  { label: "Encuentro / Reunión", value: "MEETING" },
  { label: "Otro", value: "STANDARD" },
] as const;

const imagenEvento = (label: string, description?: string) =>
  fields.image({ label, description, directory: "public/images/eventos", publicPath: "/images/eventos/" });

const lista = (label: string, itemLabel: string, description?: string) =>
  fields.array(fields.text({ label: itemLabel }), { label, description, itemLabel: (p) => p.value || itemLabel });

export default config({
  storage: useGithub ? { kind: "github", repo: "LucasJaramilloAreiza/IEEE-pag-proyect" } : { kind: "local" },
  ui: {
    brand: { name: "IEEE UD · Contenido" },
    navigation: {
      "Actividades": ["eventos", "historias", "proyectos"],
      "Comunidad": ["capitulos", "equipo", "aliados"],
      "Sitio": ["sitio"],
    },
  },

  singletons: {
    sitio: singleton({
      label: "Configuración general",
      path: "content/sitio",
      format: { data: "yaml" },
      schema: {
        correo: fields.text({ label: "Correo de contacto", description: "Correo general de la Rama. Si está vacío, no se muestra." }),
        whatsapp: fields.url({ label: "Enlace de WhatsApp (opcional)", description: "Ej.: https://wa.me/57300... o enlace de un grupo/canal." }),
        formularioVoluntarios: fields.url({ label: "Formulario de voluntarios", description: "Enlace a un Google Form u otro formulario para quienes quieran participar." }),
        instagram: fields.url({ label: "Instagram" }),
        linkedin: fields.url({ label: "LinkedIn" }),
        heroFotos: fields.array(imagenEvento("Foto"), {
          label: "Fotos de la portada",
          description: "3 fotos de gente en acción. La primera es la más grande.",
          itemLabel: (p) => p.value?.filename ?? "Foto",
        }),
        eventoDestacado: fields.relationship({ label: "Evento destacado en la portada", collection: "eventos", description: "Déjalo vacío para no mostrar ninguno." }),
        estadisticas: fields.array(
          fields.object({ valor: fields.text({ label: "Cifra (ej. 18+)" }), etiqueta: fields.text({ label: "Descripción" }) }),
          { label: "Cifras de la Rama", itemLabel: (p) => `${p.fields.valor.value} — ${p.fields.etiqueta.value}` }
        ),
        reconocimientos: fields.array(
          fields.object({ titulo: fields.text({ label: "Premio" }), detalle: fields.text({ label: "Detalle (año, región…)" }) }),
          { label: "Reconocimientos", itemLabel: (p) => p.fields.titulo.value }
        ),
        faq: fields.array(
          fields.object({ pregunta: fields.text({ label: "Pregunta" }), respuesta: fields.text({ label: "Respuesta", multiline: true }) }),
          { label: "Preguntas frecuentes", itemLabel: (p) => p.fields.pregunta.value }
        ),
      },
    }),
  },

  collections: {
    eventos: collection({
      label: "Eventos",
      slugField: "titulo",
      path: "content/eventos/*",
      format: { data: "yaml" },
      columns: ["titulo", "fechaInicio"],
      schema: {
        titulo: fields.slug({ name: { label: "Título del evento", validation: { isRequired: true } }, slug: { label: "Dirección web (se genera sola)" } }),
        tipo: fields.select({ label: "Tipo", options: [...TIPOS_EVENTO], defaultValue: "WORKSHOP" }),
        fechaInicio: fields.date({ label: "Fecha de inicio", validation: { isRequired: true }, description: "Si la fecha es hoy o futura, el evento aparece en «Próximos eventos». Cuando pasa, se mueve solo a «Memorias»." }),
        fechaFin: fields.date({ label: "Fecha de fin (opcional)", description: "Solo para eventos de varios días." }),
        horario: fields.text({ label: "Horario", description: "Ej.: 2:00 PM – 5:00 PM" }),
        lugar: fields.text({ label: "Lugar", validation: { isRequired: true } }),
        resumen: fields.text({ label: "Resumen corto", multiline: true, description: "1–2 frases. Se ve en las tarjetas." }),
        imagen: imagenEvento("Imagen principal"),
        registro: fields.url({ label: "Enlace de inscripción", description: "Para eventos próximos: formulario o página de registro (vTools, Google Form…)." }),
        vtools: fields.url({ label: "Enlace en IEEE vTools" }),
        calendario: fields.url({ label: "Enlace de calendario (.ics)", description: "Opcional. vTools lo da como …/event/ID/ical" }),
        mapa: fields.url({ label: "Enlace de Google Maps" }),
        capitulos: fields.multiRelationship({ label: "Capítulos organizadores", collection: "capitulos", description: "El evento aparecerá también en la página de cada capítulo." }),
        descripcion: fields.text({ label: "Descripción del evento", multiline: true }),
        ejes: fields.text({ label: "Ejes y actividades", multiline: true }),
        impacto: fields.text({ label: "Impacto y resultados", multiline: true, description: "Para la memoria, una vez realizado el evento." }),
        conclusion: fields.text({ label: "Conclusión", multiline: true }),
        galeria: fields.array(imagenEvento("Foto"), { label: "Galería de fotos", itemLabel: (p) => p.value?.filename ?? "Foto" }),
        organizadores: lista("Unidades organizadoras (texto de vTools)", "Unidad"),
        etiquetas: lista("Etiquetas", "Etiqueta"),
      },
    }),

    capitulos: collection({
      label: "Capítulos",
      slugField: "sigla",
      path: "content/capitulos/*",
      format: { data: "yaml" },
      columns: ["sigla", "nombre"],
      schema: {
        sigla: fields.slug({ name: { label: "Sigla (ej. PELS)", validation: { isRequired: true } }, slug: { label: "Dirección web (se genera sola)" } }),
        nombre: fields.text({ label: "Nombre completo", validation: { isRequired: true } }),
        activo: fields.checkbox({ label: "Visible en el sitio", defaultValue: true, description: "Desmárcalo para ocultar el capítulo sin borrarlo." }),
        tipo: fields.select({ label: "Tipo", options: [{ label: "Capítulo técnico", value: "capitulo" }, { label: "Grupo de afinidad", value: "afinidad" }], defaultValue: "capitulo" }),
        area: fields.select({ label: "Área", options: [...AREAS], defaultValue: "electronica" }),
        orden: fields.integer({ label: "Orden", defaultValue: 100, description: "Número menor = aparece primero." }),
        proposito: fields.text({ label: "Propósito", multiline: true }),
        pilares: lista("Áreas clave", "Área"),
        logoClaro: fields.image({ label: "Logo para fondo claro (versión negra)", directory: "public/images/logos", publicPath: "/images/logos/" }),
        logoOscuro: fields.image({ label: "Logo para fondo oscuro (versión blanca)", directory: "public/images/logos", publicPath: "/images/logos/" }),
        directiva: fields.array(
          fields.object({
            nombre: fields.text({ label: "Nombre" }),
            cargo: fields.text({ label: "Cargo (Chair, Vice Chair, Advisor…)" }),
            foto: fields.image({ label: "Foto (opcional)", directory: "public/images/equipo", publicPath: "/images/equipo/" }),
            linkedin: fields.url({ label: "LinkedIn (opcional)" }),
          }),
          { label: "Mesa directiva del capítulo", itemLabel: (p) => `${p.fields.nombre.value} — ${p.fields.cargo.value}` }
        ),
        correo: fields.text({ label: "Correo del capítulo" }),
        redSocial: fields.url({ label: "Red social principal" }),
      },
    }),

    equipo: collection({
      label: "Mesa directiva de la Rama",
      slugField: "nombre",
      path: "content/equipo/*",
      format: { data: "yaml" },
      columns: ["nombre", "cargo"],
      schema: {
        nombre: fields.slug({ name: { label: "Nombre", validation: { isRequired: true } }, slug: { label: "Identificador (se genera solo)" } }),
        cargo: fields.text({ label: "Cargo", validation: { isRequired: true } }),
        foto: fields.image({ label: "Foto", directory: "public/images/equipo", publicPath: "/images/equipo/", description: "Cuadrada, idealmente 600×600 px. Si no hay foto se muestran las iniciales." }),
        linkedin: fields.url({ label: "LinkedIn" }),
        correo: fields.text({ label: "Correo" }),
        orden: fields.integer({ label: "Orden", defaultValue: 100, description: "Número menor = aparece primero." }),
      },
    }),

    proyectos: collection({
      label: "Proyectos de investigación",
      slugField: "titulo",
      path: "content/proyectos/*",
      format: { data: "yaml" },
      schema: {
        titulo: fields.slug({ name: { label: "Título", validation: { isRequired: true } } }),
        responsables: fields.text({ label: "Responsables (ej. IEEE PELS)" }),
        capitulo: fields.relationship({ label: "Capítulo", collection: "capitulos" }),
        icono: fields.select({
          label: "Icono",
          options: [
            { label: "Energía", value: "energia" },
            { label: "Robot", value: "robot" },
            { label: "Chip", value: "chip" },
            { label: "Escudo", value: "escudo" },
            { label: "Salud", value: "salud" },
            { label: "Planeta", value: "planeta" },
            { label: "Código", value: "codigo" },
          ],
          defaultValue: "chip",
        }),
        estado: fields.text({ label: "Estado (ej. En desarrollo)" }),
        descripcion: fields.text({ label: "Descripción", multiline: true }),
        enlace: fields.url({ label: "Enlace (video, artículo…)" }),
        enlaceTexto: fields.text({ label: "Texto del enlace", defaultValue: "Ver más" }),
        etiquetas: lista("Etiquetas", "Etiqueta"),
        orden: fields.integer({ label: "Orden", defaultValue: 100 }),
      },
    }),

    historias: collection({
      label: "Historias de miembros",
      slugField: "titulo",
      path: "content/historias/*",
      format: { contentField: "contenido" },
      columns: ["titulo", "fecha"],
      schema: {
        titulo: fields.slug({ name: { label: "Título", validation: { isRequired: true } } }),
        publicado: fields.checkbox({ label: "Publicado", defaultValue: false, description: "Mientras esté desmarcado, solo se ve en modo local como borrador." }),
        autor: fields.text({ label: "Autor(a)" }),
        rolAutor: fields.text({ label: "Rol del autor (ej. Chair IEEE PELS UD)" }),
        fecha: fields.date({ label: "Fecha", validation: { isRequired: true } }),
        capitulo: fields.relationship({ label: "Capítulo relacionado", collection: "capitulos" }),
        portada: fields.image({ label: "Foto de portada", directory: "public/images/historias", publicPath: "/images/historias/" }),
        resumen: fields.text({ label: "Resumen", multiline: true, description: "1–2 frases para la tarjeta." }),
        contenido: fields.markdoc({ label: "Historia", extension: "mdoc" }),
      },
    }),

    aliados: collection({
      label: "Aliados y patrocinadores",
      slugField: "nombre",
      path: "content/aliados/*",
      format: { data: "yaml" },
      schema: {
        nombre: fields.slug({ name: { label: "Nombre", validation: { isRequired: true } } }),
        tipo: fields.select({
          label: "Tipo",
          options: [
            { label: "Industria", value: "industria" },
            { label: "Academia", value: "academia" },
            { label: "Gobierno", value: "gobierno" },
            { label: "Comunidad", value: "comunidad" },
          ],
          defaultValue: "industria",
        }),
        logo: fields.image({ label: "Logo (opcional, PNG con fondo transparente)", directory: "public/images/aliados", publicPath: "/images/aliados/" }),
        sitio: fields.url({ label: "Sitio web" }),
        descripcion: fields.text({ label: "Cómo nos ha apoyado", multiline: true }),
        orden: fields.integer({ label: "Orden", defaultValue: 100 }),
      },
    }),
  },
});
