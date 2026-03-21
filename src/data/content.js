// ─────────────────────────────────────────────────────────
//  content.js — Todos los textos del sitio
//  Edita aquí sin tocar App.jsx
// ─────────────────────────────────────────────────────────
import { AlertTriangle, TrendingUp, Zap, Layers, Settings, Shield } from 'lucide-react';

export const heroContent = {
  eyebrow: 'Colombia · Estados Unidos · 2026',
  titleLine1: 'Transformamos',
  titleLine2: 'datos en resultados.',
  // El subtítulo es el texto que escribe el typewriter
  subtitle: 'IA y automatización para PYMES y empresas que quieren crecer con claridad. No somos un proveedor — somos el puente entre tu visión financiera y la ejecución técnica.',
  ctaPrimary: 'Diagnóstico sin costo',
  ctaSecondary: 'Ver portafolio',
  metaBar: [
    { label: 'AXIONA INTELIGENCIA', value: 'IA Estratégica' },
    { label: 'AXIONA OPERA', value: 'Automatización' },
    { label: 'DIAGNÓSTICO', value: 'Sin costo · 60 min' },
    { label: 'MERCADOS', value: 'Colombia · US' },
  ],
};

export const statsContent = {
  sectionLabel: 'Por qué Axiona',
  items: [
    { number: 3, suffix: '+', label: 'Años de experiencia', sub: 'en IA aplicada al negocio' },
    { number: 100, suffix: '%', label: 'Orientado a ROI', sub: 'cada solución tiene métrica de éxito' },
    { number: 2, suffix: '', label: 'Servicios core', sub: 'INTELIGENCIA · OPERA' },
    { number: 60, suffix: ' min', label: 'Diagnóstico gratuito', sub: 'sin compromiso, con resultados' },
  ],
};

export const doloresContent = {
  tag: 'El problema',
  title: '¿Alguno de estos\nte suena familiar?',
  subtitle: 'Los dolores que frenan a las empresas más capaces. Axiona existe para resolverlos.',
  items: [
    {
      icon: AlertTriangle,
      tag: 'OPACIDAD OPERATIVA',
      title: 'No sabes qué pasa en campo hasta que ya es tarde',
      desc: 'Desconexión total entre lo que sucede en operación y los resultados financieros. Decides mirando el retrovisor.',
    },
    {
      icon: TrendingUp,
      tag: 'FUGAS SILENCIOSAS',
      title: 'Tu caja sangra sin que nadie lo note',
      desc: 'Ineficiencias invisibles que consumen recursos mes a mes sin generar retorno. El problema no es lo que ves — es lo que no ves.',
    },
    {
      icon: Zap,
      tag: 'GESTIÓN REACTIVA',
      title: 'Solo actúas cuando hay incendio',
      desc: 'Decisiones urgentes basadas en el problema del día, no en visión de largo plazo. Siempre apagando fuegos, nunca construyendo.',
    },
    {
      icon: Layers,
      tag: 'DATOS EN SILOS',
      title: 'Tienes datos pero no tienes conocimiento',
      desc: 'Información dispersa en Excel, emails y sistemas que no hablan entre sí. Los datos existen, pero no generan inteligencia.',
    },
    {
      icon: Settings,
      tag: 'ESCALABILIDAD LIMITADA',
      title: 'Crecer significa contratar más personas',
      desc: 'Procesos manuales que frenan el crecimiento. Cada vez que escala el negocio, escala también la carga operativa.',
    },
    {
      icon: Shield,
      tag: 'BRECHA TÉCNICA',
      title: 'Los técnicos no entienden el negocio. La gerencia no entiende la tecnología.',
      desc: 'Inversiones en tecnología que no conectan con resultados financieros. El puente entre estrategia y ejecución no existe.',
    },
  ],
};

export const portafolioContent = {
  tag: 'Portafolio',
  title: 'Dos servicios.\nUn solo objetivo.',
  subtitle: 'Inteligencia y operación, diseñados para trabajar juntos o de forma independiente según la madurez de tu empresa.',
  ctaNote: '¿No sabes cuál necesitas? En el diagnóstico lo definimos juntos — sin costo.',
  ctaButton: 'Agendar diagnóstico gratuito',
  servicios: [
    {
      id: 'inteligencia',
      tag: 'AXIONA INTELIGENCIA',
      tagline: 'El Cerebro de la Empresa',
      quote: 'La tecnología que piensa con la misma visión financiera que tú.',
      desc: 'IA estratégica diseñada para decisiones que impulsan ingresos, reducen gastos y optimizan costos. Pasas de la intuición a la predicción con ventaja competitiva sostenible.',
      resultado: 'De la intuición a la predicción — ventaja competitiva sostenible.',
      items: [
        'Analítica avanzada para identificar oportunidades ocultas de negocio',
        'Agentes de IA que analizan y apoyan decisiones de alto impacto',
        'Modelos predictivos: demanda, rentabilidad, riesgo, churn',
        'Tableros BI por nivel: estratégico, táctico y operativo',
        'Alertas inteligentes y detección temprana de anomalías',
      ],
      accent: 'cyan',
    },
    {
      id: 'opera',
      tag: 'AXIONA OPERA',
      tagline: 'El Motor de la Empresa',
      quote: 'Automatizar es la forma más inteligente de aumentar capacidad sin desgastar tu nómina.',
      desc: 'Automatización operativa para eliminar costos y escalar sin aumentar estructura. Precisión técnica que libera a tu equipo para lo que realmente importa.',
      resultado: 'Optimización de costos fijos y escalabilidad operativa real.',
      items: [
        'Automatización de reportes y flujos periódicos',
        'Atención al cliente 24/7: WhatsApp, email y CRM',
        'Gestión automática de inventario y alertas de stock',
        'Integración de sistemas, eliminación de procesos manuales',
        'Bots y agentes de IA operativos a la medida del negocio',
      ],
      accent: 'navy',
    },
  ],
};

export const metodologiaContent = {
  tag: 'Metodología',
  title: 'El crecimiento no ocurre\npor azar. Ocurre por diseño.',
  subtitle: 'Diagnosticamos tu nivel actual y diseñamos el camino exacto al siguiente. Resultados medibles en cada etapa.',
  etapas: [
    {
      step: '01',
      tag: 'FOUNDATION',
      name: 'Estructuramos',
      desc: 'Ordenamos la información para tener visibilidad y control total. Modelo de datos, métricas definidas y fuentes integradas.',
    },
    {
      step: '02',
      tag: 'LAUNCH',
      name: 'Visualizamos',
      desc: 'Tableros de control intuitivos para decisiones precisas y ágiles. Dashboards por nivel con capacitación del equipo.',
    },
    {
      step: '03',
      tag: 'CORE',
      name: 'Optimizamos',
      desc: 'IA y automatización para predecir el futuro y escalar sin límites. Modelos predictivos, agentes y automatizaciones activas.',
    },
  ],
  proceso: [
    {
      n: '01',
      title: 'Diagnóstico',
      sub: 'Sin costo · Sin compromiso',
      desc: 'Entendemos tu situación financiera y operativa, identificamos las mayores oportunidades de impacto real.',
    },
    {
      n: '02',
      title: 'Implementación',
      sub: 'Resultados medibles',
      desc: 'Desarrollamos e implementamos soluciones con hitos claros. No avanzamos sin tu aprobación explícita en cada etapa.',
    },
    {
      n: '03',
      title: 'Acompañamiento',
      sub: 'Apoyo continuo',
      desc: 'Nos quedamos hasta lograr los objetivos. No entregamos y desaparecemos — somos socios, no proveedores.',
    },
  ],
};

export const contactoContent = {
  eyebrow: 'Diagnóstico sin costo · 60 minutos',
  title: 'Tu operación merece',
  titleAccent: 'más claridad.',
  subtitle: 'En 60 minutos identificamos las oportunidades más grandes de tu negocio y diseñamos el camino. Sin costo. Sin compromiso.',
  ctaPrimary: 'Escribirnos ahora',
  ctaSecondary: '', // Se llena dinámicamente con contactEmail
};
