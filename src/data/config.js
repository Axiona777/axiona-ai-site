// ─────────────────────────────────────────────────────────
//  config.js — Configuración global de Axiona
//  Edita aquí: nombre, correos, dominio, SEO
// ─────────────────────────────────────────────────────────

export const companyData = {
  name: 'Axiona',
  tagline: 'Datos en Decisiones.',
  taglineFull: 'Transformamos la complejidad operativa y financiera en resultados claros y rentables.',
  taglineClosing: 'La tecnología que piensa con la misma visión financiera que tú.',
  domain: 'axiona-tech.com',
  contactEmail: 'ventas@axiona-tech.com',
  markets: 'Colombia · Estados Unidos',
  year: '2026',
  description: 'IA y automatización para PYMES y empresas que quieren crecer con claridad. No somos un proveedor — somos el puente entre tu visión financiera y la ejecución técnica.',
};

export const mailtoConfig = {
  to: companyData.contactEmail,
  subject: 'Diagnóstico sin costo — Axiona',
  body: 'Hola equipo Axiona,%0A%0AMe gustaría agendar un diagnóstico sin costo para mi empresa.%0A%0ANombre:%0AEmpresa:%0ATeléfono:',
  get href() {
    return `mailto:${this.to}?subject=${encodeURIComponent(this.subject)}&body=${this.body}`;
  },
};

export const seoData = {
  title: 'Axiona — Datos en Decisiones',
  description: 'Axiona — IA y automatización para PYMES y grandes empresas. Transformamos datos en resultados claros y rentables. Colombia · Estados Unidos.',
  keywords: 'inteligencia artificial, automatización, BI, analytics, PYME, Colombia, datos, dashboard',
};
