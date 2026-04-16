/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  Settings, 
  Lock, 
  ChevronDown, 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  MapPin, 
  Mail, 
  Phone,
  Zap,
  ArrowRight,
  Monitor,
  Cpu,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- LOGO COMPONENT ---
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M8 32L14 18C15 15 17 14 20 20C23 26 25 25 26 22L32 8" 
        stroke="#2DD4BF" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <circle cx="8" cy="32" r="2" fill="#2DD4BF" />
      <circle cx="32" cy="8" r="2" fill="#2DD4BF" />
    </svg>
    <span className="text-[22px] font-bold tracking-tight">
      <span className="text-brand-text">Nuv</span>
      <span className="text-brand-primary">ark</span>
    </span>
  </div>
);

// --- FAQ ITEM COMPONENT ---
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-brand-primary transition-colors group"
      >
        <h3 className="text-lg font-semibold pr-8">{question}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-primary' : 'text-brand-text-muted'}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-brand-text-muted leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll Reveal Logic
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary/30 selection:text-brand-primary">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <Logo />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Servicios', 'Automatización', 'Precios', 'Contacto'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contacto')}
              className="bg-brand-primary text-brand-bg px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-primary-hover transition-all transform hover:scale-105 active:scale-95"
            >
              Diagnóstico gratis
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-brand-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-bg border-b border-brand-border overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Servicios', 'Automatización', 'Precios', 'Contacto'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-lg font-medium text-brand-text text-left"
                  >
                    {item}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-brand-primary text-brand-bg w-full py-4 rounded-lg font-bold text-center"
                >
                  Diagnóstico gratis
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* 2. HERO */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-8 reveal">
                <Shield className="w-3 h-3" />
                <span>Mar del Plata · Soporte IT · Ciberseguridad · Automatización</span>
              </div>
              
              <h1 className="text-5xl md:text-[52px] font-bold leading-[1.15] mb-6 reveal">
                Tu negocio merece tecnología que funcione
              </h1>
              
              <p className="text-lg md:text-xl text-brand-text-muted leading-relaxed mb-10 reveal" style={{ transitionDelay: '0.1s' }}>
                Nuvark protege, conecta y automatiza la tecnología de tu empresa. Soporte IT, ciberseguridad y automatización en un solo abono mensual.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16 reveal" style={{ transitionDelay: '0.2s' }}>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="bg-brand-primary text-brand-bg px-8 py-4 rounded-lg font-bold text-base hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 group"
                >
                  Solicitá tu diagnóstico gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className="border border-brand-primary/50 text-brand-primary px-8 py-4 rounded-lg font-bold text-base hover:bg-brand-primary/5 transition-all text-center"
                >
                  Ver servicios
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-brand-border reveal" style={{ transitionDelay: '0.3s' }}>
                <div>
                  <div className="text-2xl font-bold text-brand-primary mb-1">160+</div>
                  <div className="text-sm text-brand-text-muted">Empresas en MDP sin IT dedicado</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-primary mb-1">24/7</div>
                  <div className="text-sm text-brand-text-muted">Monitoreo proactivo</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-brand-primary mb-1">3 en 1</div>
                  <div className="text-sm text-brand-text-muted">3 servicios, 1 solo abono</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element: Grid of points */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full pointer-events-none hidden lg:block">
            <div className="relative w-full h-full">
              <svg className="absolute right-0 top-0 w-full h-full animate-pulse-soft" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#2DD4BF" fillOpacity="0.15" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#dots)" />
                <path d="M100 100L200 150L300 100" stroke="#2DD4BF" strokeOpacity="0.1" strokeWidth="1" />
                <path d="M50 250L150 300L250 250" stroke="#2DD4BF" strokeOpacity="0.1" strokeWidth="1" />
                <circle cx="200" cy="150" r="4" fill="#2DD4BF" fillOpacity="0.2" />
                <circle cx="150" cy="300" r="4" fill="#2DD4BF" fillOpacity="0.2" />
              </svg>
            </div>
          </div>
        </section>

        {/* 3. SECCIÓN "EL PROBLEMA" */}
        <section className="py-24 bg-brand-bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 reveal">¿Te suena familiar?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Tu negocio parado por un problema técnico",
                  desc: "Sin soporte, esperando horas para resolverlo mientras perdés ventas y productividad."
                },
                {
                  title: "Tus datos sin respaldo real",
                  desc: "Sin backup verificado, un ransomware o una falla de disco puede borrar toda tu historia."
                },
                {
                  title: "Procesos que hacés a mano y te roban tiempo",
                  desc: "Facturación, stock, pedidos... todo manual. Estás atrapado en tareas que un bot podría hacer."
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="bg-brand-card p-8 border-l-4 border-brand-primary reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-brand-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN SERVICIOS */}
        <section id="servicios" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Todo lo que tu empresa necesita, en un solo lugar</h2>
              <p className="text-brand-text-muted text-lg">Soluciones integrales diseñadas para que te olvides de los problemas técnicos y te enfoques en hacer crecer tu negocio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* MSP */}
              <div className="bg-brand-card p-10 rounded-2xl border border-brand-border hover:border-brand-primary/40 transition-all duration-300 transform hover:-translate-y-1 group reveal">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Monitor className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Soporte IT Gestionado (MSP)</h3>
                <p className="text-brand-text-muted mb-8 leading-relaxed">Monitoreo 24/7, helpdesk remoto y presencial, parches automáticos y gestión completa de dispositivos. Precio fijo mensual, sin sorpresas.</p>
                <ul className="space-y-4">
                  {[
                    "Monitoreo proactivo 24/7",
                    "Soporte remoto y presencial",
                    "Parches y actualizaciones automáticas",
                    "Gestión de usuarios y dispositivos",
                    "Backup verificado incluido"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AUTOMATIZACIÓN */}
              <div id="automatización" className="bg-brand-card p-10 rounded-2xl border border-brand-border hover:border-brand-primary/40 transition-all duration-300 transform hover:-translate-y-1 group reveal" style={{ transitionDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Cpu className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Automatización de Procesos</h3>
                <p className="text-brand-text-muted mb-8 leading-relaxed">Eliminamos tareas manuales repetitivas con workflows inteligentes. Integramos WhatsApp, facturación ARCA, stock, CRM y más.</p>
                <ul className="space-y-4">
                  {[
                    "Workflows con n8n y Make",
                    "Integración WhatsApp Business",
                    "Facturación electrónica ARCA",
                    "Sincronización de stock multicanal",
                    "Bots y asistentes automáticos"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CIBERSEGURIDAD */}
              <div className="bg-brand-card p-10 rounded-2xl border border-brand-border hover:border-brand-primary/40 transition-all duration-300 transform hover:-translate-y-1 group reveal" style={{ transitionDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Lock className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Ciberseguridad para PyMEs</h3>
                <p className="text-brand-text-muted mb-8 leading-relaxed">Protegemos los datos de tu empresa con soluciones de nivel enterprise adaptadas a tu presupuesto.</p>
                <ul className="space-y-4">
                  {[
                    "Endpoint protection (EDR)",
                    "Backup cloud verificado diario",
                    "DNS filtering anti-phishing",
                    "Capacitación del equipo",
                    "Evaluación de vulnerabilidades"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECCIÓN "POR QUÉ NUVARK" */}
        <section className="py-24 bg-brand-bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 reveal">Por qué elegir Nuvark</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Presencia local en Mar del Plata",
                  desc: "Conocemos el mercado local y estamos a minutos de tu empresa para cualquier urgencia presencial."
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Precio fijo mensual",
                  desc: "Sabés exactamente cuánto pagás. Sin sorpresas, sin facturas extra por llamadas de urgencia."
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Respuesta garantizada",
                  desc: "SLA de respuesta definido por contrato. No somos un 0800, somos tu equipo de tecnología."
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Tecnología enterprise, precio PyME",
                  desc: "Accedé a las mismas herramientas que usan las grandes corporaciones, adaptadas a tu presupuesto."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center shrink-0 text-brand-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-brand-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PRECIOS */}
        <section id="precios" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Planes simples, sin letra chica</h2>
              <p className="text-brand-text-muted text-lg">Elegí el plan que mejor se adapta a tu empresa. Podés cambiar en cualquier momento.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* PLAN ESENCIAL */}
              <div className="bg-brand-card p-8 rounded-2xl border border-brand-border reveal">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Esencial</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-primary">USD 25</span>
                    <span className="text-brand-text-muted text-sm">/usuario/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Monitoreo 24/7",
                    "Soporte remoto",
                    "Parches automáticos",
                    "Antivirus básico",
                    "Backup cloud",
                    "1 workflow de automatización"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="w-full py-3 rounded-lg border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary/5 transition-all"
                >
                  Empezar con Esencial
                </button>
              </div>

              {/* PLAN PROFESIONAL */}
              <div className="bg-brand-card p-8 rounded-2xl border-2 border-brand-primary relative transform scale-105 z-10 shadow-2xl shadow-brand-primary/10 reveal">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-brand-bg text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Más elegido
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Profesional</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-primary">USD 45</span>
                    <span className="text-brand-text-muted text-sm">/usuario/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Todo lo anterior",
                    "Soporte presencial",
                    "EDR avanzado",
                    "Gestión de firewall",
                    "5 workflows",
                    "Revisión de seguridad trimestral"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span className={i === 0 ? 'font-semibold' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="w-full py-3 rounded-lg bg-brand-primary text-brand-bg font-bold hover:bg-brand-primary-hover transition-all"
                >
                  Elegir Profesional
                </button>
              </div>

              {/* PLAN PREMIUM */}
              <div className="bg-brand-card p-8 rounded-2xl border border-brand-border reveal">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-brand-primary">USD 80</span>
                    <span className="text-brand-text-muted text-sm">/usuario/mes</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10">
                  {[
                    "Todo lo anterior",
                    "SLA garantizado",
                    "Monitoreo amenazas avanzado",
                    "Suite completa automatización",
                    "Consultoría IT mensual",
                    "Evaluación seguridad anual"
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                      <span className={i === 0 ? 'font-semibold' : ''}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollToSection('contacto')}
                  className="w-full py-3 rounded-lg border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary/5 transition-all"
                >
                  Contactar para Premium
                </button>
              </div>
            </div>

            <p className="text-center text-brand-text-muted text-xs mt-12 reveal">
              Mínimo 5 usuarios · Precios en USD · Equivalencia en ARS disponible · Sin contratos de permanencia
            </p>
          </div>
        </section>

        {/* 7. TESTIMONIOS */}
        <section className="py-24 bg-brand-bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 reveal">Empresas de Mar del Plata que confían en Nuvark</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Roberto M.",
                  role: "Estudio Contable",
                  initials: "RM",
                  text: "Desde que contratamos Nuvark dormimos tranquilos. Antes teníamos miedo de perder los datos de nuestros clientes por un virus o falla de disco."
                },
                {
                  name: "Laura G.",
                  role: "Restaurante",
                  initials: "LG",
                  text: "Automatizaron nuestros pedidos de delivery e integración con stock y ahorramos 3 horas diarias. Se pagó solo en el primer mes."
                },
                {
                  name: "Gustavo P.",
                  role: "Distribuidora",
                  initials: "GP",
                  text: "Tuvimos un intento de ransomware y el sistema de Nuvark lo bloqueó antes de que llegara a nuestros servidores. Una inversión que vale cada centavo."
                }
              ].map((t, i) => (
                <div key={i} className="bg-brand-card p-8 rounded-2xl border border-brand-border reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-brand-text-muted uppercase tracking-wider">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-brand-text-muted italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 reveal">Preguntas frecuentes</h2>
            <div className="reveal">
              <FAQItem 
                question="¿Qué pasa si tengo un problema a las 2 de la mañana?"
                answer="Nuestros sistemas de monitoreo proactivo funcionan 24/7. Muchas veces resolvemos problemas antes de que te des cuenta. Si es una emergencia crítica, contamos con guardias activas según tu plan."
              />
              <FAQItem 
                question="¿Puedo contratar solo uno de los servicios?"
                answer="Nuestros planes están diseñados para ser integrales porque creemos que la tecnología de una PyME funciona mejor cuando está unificada. Sin embargo, podemos adaptar una propuesta a medida según tus necesidades específicas."
              />
              <FAQItem 
                question="¿Cuánto tarda la implementación inicial?"
                answer="Dependiendo del tamaño de tu infraestructura, el onboarding suele tardar entre 5 y 10 días hábiles. Esto incluye la instalación de agentes, configuración de backups y auditoría inicial."
              />
              <FAQItem 
                question="¿Necesito cambiar mis equipos o sistemas actuales?"
                answer="No necesariamente. Trabajamos con lo que ya tenés y te asesoramos sobre qué actualizaciones son prioritarias para mejorar la seguridad y el rendimiento."
              />
              <FAQItem 
                question="¿Tienen contrato de permanencia mínima?"
                answer="No. Creemos en la calidad de nuestro servicio. Si no estás conforme, podés cancelar en cualquier momento con un preaviso de 30 días. Queremos que te quedes porque te servimos, no por un papel."
              />
            </div>
          </div>
        </section>

        {/* 9. CTA FINAL */}
        <section id="contacto" className="py-24 bg-brand-bg-alt relative overflow-hidden">
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-6">
                  <Zap className="w-3 h-3" />
                  <span>Cupos limitados para nuevos clientes este mes</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Empezá hoy con un diagnóstico gratuito</h2>
                <p className="text-lg text-brand-text-muted mb-10 leading-relaxed">
                  Revisamos tu infraestructura actual sin costo y te decimos exactamente qué necesita tu empresa para estar protegida y ser más eficiente.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-lg">+54 9 223 5937732</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-lg">hola@nuvark.com.ar</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-lg">Mar del Plata, Buenos Aires</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-card p-8 md:p-10 rounded-3xl border border-brand-border reveal" style={{ transitionDelay: '0.2s' }}>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Nombre</label>
                      <input type="text" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:border-brand-primary outline-none transition-colors" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Empresa</label>
                      <input type="text" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:border-brand-primary outline-none transition-colors" placeholder="Nombre de tu PyME" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Teléfono</label>
                    <input type="tel" className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:border-brand-primary outline-none transition-colors" placeholder="+54 223 ..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Servicio de interés</label>
                    <select className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:border-brand-primary outline-none transition-colors appearance-none">
                      <option>Soporte IT Gestionado</option>
                      <option>Automatización de Procesos</option>
                      <option>Ciberseguridad</option>
                      <option>Pack Integral</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-text-muted">Mensaje</label>
                    <textarea className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 focus:border-brand-primary outline-none transition-colors h-32 resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                  </div>
                  <button className="w-full bg-brand-primary text-brand-bg py-4 rounded-lg font-bold text-lg hover:bg-brand-primary-hover transition-all shadow-lg shadow-brand-primary/20">
                    Solicitar diagnóstico
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. FOOTER */}
      <footer className="py-16 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Logo className="mb-6" />
              <p className="text-brand-text-muted max-w-sm">
                Tu negocio protegido, conectado y automatizado. Soluciones tecnológicas de nivel enterprise para PyMEs de Mar del Plata.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Navegación</h4>
              <ul className="space-y-4 text-brand-text-muted">
                <li><button onClick={() => scrollToSection('servicios')} className="hover:text-brand-primary transition-colors">Servicios</button></li>
                <li><button onClick={() => scrollToSection('precios')} className="hover:text-brand-primary transition-colors">Precios</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className="hover:text-brand-primary transition-colors">Contacto</button></li>
                <li><a href="#" className="hover:text-brand-primary transition-colors">Política de privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Seguinos</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-text-muted">
            <p>© {new Date().getFullYear()} Nuvark · Mar del Plata, Argentina · Todos los derechos reservados</p>
            <p>Hecho con ❤️ en MDP</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a 
        href="https://wa.me/5492235937732" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-primary text-brand-bg rounded-full flex items-center justify-center shadow-2xl shadow-brand-primary/40 z-40 hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

    </div>
  );
}
