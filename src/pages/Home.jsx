import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  ChartNoAxesCombined,
  CheckCircle2,
  Database,
  Globe,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from 'lucide-react'
import PageTransition from '../components/ui/PageTransition'
import CountUp from '../components/ui/CountUp'

const heroWords = ['Automate', 'Integrate', 'Scale']

const services = [
  {
    id: '01',
    icon: Workflow,
    title: 'Automation Systems',
    text: 'We map your manual handoffs and ship end-to-end operational automations.',
    bullets: ['Workflow mapping', 'n8n / Make', 'Approval logic', 'Audit-ready trails'],
    tags: ['Framer', 'Node JS', 'HTML', 'WordPress'],
    panelIcons: [Workflow, GitBranch, Database, ShieldCheck],
    signalStyle: 'pipeline',
    surface: 'linear-gradient(158deg, rgba(255,255,255,0.96), rgba(236,245,255,0.9))',
    backGradient: 'linear-gradient(152deg, #102238, #1a3656)',
    frontStats: [
      { label: 'Flows shipped', value: '32+' },
      { label: 'Cycle reduction', value: '58%' },
    ],
    detailCards: [
      { icon: Workflow, text: 'Map manual flow and decision points.' },
      { icon: GitBranch, text: 'Branching logic with controlled approvals.' },
      { icon: Database, text: 'Reliable state sync across tools.' },
      { icon: ShieldCheck, text: 'Audit-ready logs and recoverable runs.' },
    ],
    hoverHighlights: [
      { label: 'Automation depth', value: 'End-to-end' },
      { label: 'Approval model', value: 'Role-based' },
      { label: 'Monitoring', value: 'Live pipeline logs' },
    ],
  },
  {
    id: '02',
    icon: Bot,
    title: 'AI Agents and Copilots',
    text: 'Deploy practical agents that reason over your context and execute safe actions.',
    bullets: ['Knowledge pipelines', 'Action guardrails', 'Human approvals', 'Observability'],
    tags: ['Agents', 'Vector DB', 'RAG', 'Prompt Ops'],
    panelIcons: [Bot, Database, Network, ShieldCheck],
    signalStyle: 'orbit',
    surface: 'linear-gradient(156deg, rgba(255,255,255,0.96), rgba(240,249,246,0.9))',
    backGradient: 'linear-gradient(152deg, #132836, #1b4a54)',
    frontStats: [
      { label: 'Agent actions', value: '120k+' },
      { label: 'Resolution rate', value: '84%' },
    ],
    detailCards: [
      { icon: Bot, text: 'Agent behavior tuned for real tasks.' },
      { icon: Database, text: 'Knowledge retrieval grounded in context.' },
      { icon: Network, text: 'Action orchestration with safe connectors.' },
      { icon: ShieldCheck, text: 'Guardrails plus human handoff checkpoints.' },
    ],
    hoverHighlights: [
      { label: 'Reasoning context', value: 'RAG + memory' },
      { label: 'Action control', value: 'Permission scoped' },
      { label: 'Quality loop', value: 'Trace + evals' },
    ],
  },
  {
    id: '03',
    icon: Layers3,
    title: 'Custom CRM and Systems',
    text: 'Build management systems that match your operations, not generic templates.',
    bullets: ['Role dashboards', 'Business modules', 'Document engines', 'Team workflows'],
    tags: ['CRM Core', 'Portals', 'Dashboards', 'Approvals'],
    panelIcons: [Layers3, Database, Globe, ShieldCheck],
    signalStyle: 'stack',
    surface: 'linear-gradient(158deg, rgba(255,255,255,0.96), rgba(244,241,255,0.9))',
    backGradient: 'linear-gradient(152deg, #1a2548, #2f2f64)',
    frontStats: [
      { label: 'Modules deployed', value: '14' },
      { label: 'Teams onboarded', value: '9' },
    ],
    detailCards: [
      { icon: Layers3, text: 'Modular architecture by business domain.' },
      { icon: Database, text: 'Clean data model with entity controls.' },
      { icon: Globe, text: 'Portal views across departments and vendors.' },
      { icon: ShieldCheck, text: 'Permissions mapped to real org structure.' },
    ],
    hoverHighlights: [
      { label: 'System fit', value: 'Ops-native UX' },
      { label: 'Document layer', value: 'Template + versioning' },
      { label: 'Rollout path', value: 'Phased migration' },
    ],
  },
  {
    id: '04',
    icon: Smartphone,
    title: 'Web and Mobile Products',
    text: 'Ship production-grade product experiences backed by robust system architecture.',
    bullets: ['Product architecture', 'Web + mobile', 'QA pipelines', 'Performance tuning'],
    tags: ['iOS', 'Android', 'React', 'API Layer'],
    panelIcons: [Smartphone, Globe, Cpu, GitBranch],
    signalStyle: 'devices',
    surface: 'linear-gradient(158deg, rgba(255,255,255,0.96), rgba(255,243,235,0.9))',
    backGradient: 'linear-gradient(152deg, #2d2130, #4d2d2f)',
    frontStats: [
      { label: 'Release cadence', value: 'Bi-weekly' },
      { label: 'Perf score', value: '95+' },
    ],
    detailCards: [
      { icon: Smartphone, text: 'Mobile UX tuned for real usage patterns.' },
      { icon: Globe, text: 'Web app consistency across user journeys.' },
      { icon: Cpu, text: 'API and backend performance optimization.' },
      { icon: GitBranch, text: 'Stable release pipelines and QA gates.' },
    ],
    hoverHighlights: [
      { label: 'Platform spread', value: 'Web + iOS + Android' },
      { label: 'Reliability', value: 'Structured QA pipeline' },
      { label: 'Scale ready', value: 'Service-oriented backend' },
    ],
  },
]

const studies = [
  {
    id: 1,
    title: 'Logistics dispatch automation platform',
    industry: 'Logistics',
    metrics: [
      { label: 'Processing time reduced', value: 74, suffix: '%' },
      { label: 'Daily manual hours saved', value: 3, suffix: 'h' },
      { label: 'Manual invoicing', value: 0, suffix: '' },
    ],
    detail:
      'Built a unified dispatch flow with automated assignment, driver state updates, and billing triggers so operations run from one command layer.',
    stack: ['n8n', 'React', 'Airtable', 'Webhook orchestration'],
    visualTags: ['Fleet Ops', 'Auto Dispatch', 'Billing Sync', 'Live Status'],
  },
  {
    id: 2,
    title: 'Multi-channel commerce sync backbone',
    industry: 'E-Commerce',
    metrics: [
      { label: 'Inventory accuracy', value: 100, suffix: '%' },
      { label: 'Oversell incidents down', value: 89, suffix: '%' },
      { label: 'Weekly reconciliation time', value: 6, suffix: 'h' },
    ],
    detail:
      'Connected storefronts, fulfillment, and finance with realtime sync architecture to stop stock drift and remove reconciliation overhead.',
    stack: ['API gateway', 'Realtime sync', 'Validation jobs', 'Alert layer'],
    visualTags: ['Catalog', 'Stock Sync', 'Orders', 'Fulfillment'],
  },
  {
    id: 3,
    title: 'Healthcare reporting and compliance system',
    industry: 'Healthcare',
    metrics: [
      { label: 'Weekly reporting effort', value: 5, suffix: 'h' },
      { label: 'Data refresh interval', value: 15, suffix: 'm' },
      { label: 'Systems unified', value: 3, suffix: '' },
    ],
    detail:
      'Replaced spreadsheet reporting with a live compliance dashboard and role-specific views for leadership and clinical operations.',
    stack: ['ETL layer', 'Role controls', 'Live dashboards', 'Audit logs'],
    visualTags: ['Compliance', 'KPI Board', 'Live Feed', 'Data QA'],
  },
]

const team = [
  {
    name: 'Rayan Siddiqui',
    role: 'Automation Architect',
    bio: 'Designs operating systems that remove repetitive operational work across teams.',
  },
  {
    name: 'Maha Karim',
    role: 'Product Engineer',
    bio: 'Builds robust web and mobile products with high-quality UX and maintainable code.',
  },
  {
    name: 'Ibrahim Noor',
    role: 'AI Systems Lead',
    bio: 'Implements practical AI copilots and retrieval pipelines with safe execution patterns.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Home() {
  const [activeStudy, setActiveStudy] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === 'undefined' ? 1200 : window.innerWidth))

  const servicesSectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const currentStudy = studies[activeStudy]

  useEffect(() => {
    const timer = setInterval(() => {
      setShowDetails(false)
      setActiveStudy((prev) => (prev + 1) % studies.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isDesktop = viewportWidth >= 768

  const desktopStackProfiles = useMemo(
    () => [
      { x: 180, y: 150, rotate: -7, scale: 0.95, zIndex: 10 },
      { x: -170, y: 125, rotate: 6, scale: 0.93, zIndex: 9 },
      { x: 170, y: -425, rotate: -5, scale: 0.91, zIndex: 8 },
      { x: -180, y: -440, rotate: 7, scale: 0.89, zIndex: 7 },
    ],
    []
  )

  const mobileStackProfiles = useMemo(
    () => [
      { x: 0, y: 0, rotate: -3, scale: 1, zIndex: 10 },
      { x: 10, y: -570, rotate: 2, scale: 0.98, zIndex: 9 },
      { x: -8, y: -1140, rotate: -2, scale: 0.96, zIndex: 8 },
      { x: 12, y: -1710, rotate: 3, scale: 0.94, zIndex: 7 },
    ],
    []
  )

  const { scrollYProgress: servicesProgressRaw } = useScroll({
    target: servicesSectionRef,
    offset: ['start 88%', 'start 35%'],
  })

  const servicesProgress = useSpring(servicesProgressRaw, {
    stiffness: 168,
    damping: 24,
    mass: 0.38,
  })

  const stats = useMemo(
    () => [
      { icon: ChartNoAxesCombined, label: 'Average throughput gain', value: 2.8, suffix: 'x' },
      { icon: Database, label: 'Manual operations removed', value: 42, suffix: '%' },
      { icon: Network, label: 'Automated steps deployed', value: 180, suffix: '+' },
    ],
    []
  )

  return (
    <PageTransition>
      <main className="relative isolate overflow-hidden" id="home">
        <div className="pointer-events-none absolute inset-0 -z-10 elite-surface" />

        <section className="pop-on-scroll relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-10 pt-24 md:px-12">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div variants={reveal} initial="hidden" animate="show">
              <p className="text-label mb-7">AI-first software agency</p>
              <h1
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(2.6rem, 7vw, 6rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  fontWeight: 600,
                  maxWidth: '14ch',
                }}
              >
                Systems that
              </h1>

              <motion.div
                className="mt-2 flex flex-wrap gap-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { delayChildren: 0.18, staggerChildren: 0.14 } },
                }}
              >
                {heroWords.map((word, index) => (
                  <motion.span
                    key={word}
                    variants={{
                      hidden: { opacity: 0, x: index % 2 ? 26 : -26, y: 18, filter: 'blur(4px)' },
                      show: {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        filter: 'blur(0px)',
                        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    style={{
                      fontSize: 'clamp(2.3rem, 6.5vw, 5.6rem)',
                      color: 'var(--ink)',
                      letterSpacing: '-0.02em',
                      lineHeight: 0.94,
                      fontWeight: 600,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>

              <p className="mt-8" style={{ color: 'var(--ash)', maxWidth: '50ch', lineHeight: 1.75, fontSize: '1.02rem', fontWeight: 500 }}>
                enntal builds custom CRMs, AI agent workflows, and product-grade software that removes manual overhead across your business.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="lift-expand inline-flex items-center gap-2"
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.74rem',
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Book a call <ArrowUpRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="lift-expand inline-flex items-center"
                  style={{
                    border: '1.5px solid var(--ink)',
                    color: 'var(--ink)',
                    padding: '0.9rem 1.5rem',
                    fontSize: '0.74rem',
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Explore services
                </button>
              </div>
            </motion.div>

            <motion.div variants={reveal} initial="hidden" animate="show" className="flex justify-center">
              <HeroOrbitBoard />
            </motion.div>
          </div>
        </section>

        <section className="pop-on-scroll mx-auto w-full max-w-7xl px-6 py-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 rounded-3xl border p-5 md:grid-cols-3 md:p-7"
            style={{ borderColor: 'rgba(30,43,60,0.14)', background: 'rgba(255,255,255,0.84)' }}
          >
            {stats.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="pop-on-scroll lift-expand rounded-2xl border p-5" style={{ borderColor: 'rgba(30,43,60,0.12)' }}>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(30,43,60,0.08)', color: 'var(--ink)' }}>
                    <Icon size={18} />
                  </div>
                  <p className="text-label mb-1">{item.label}</p>
                  <p className="text-2xl" style={{ color: 'var(--ink)' }}>
                    <CountUp end={item.value} suffix={item.suffix} />
                  </p>
                </div>
              )
            })}
          </motion.div>
        </section>

        <section id="services" ref={servicesSectionRef} className="pop-on-scroll mx-auto w-full max-w-7xl px-6 py-14 md:px-12">
          <SectionMarker label="How We Help" />
          <p className="text-label mb-4" style={{ color: 'rgba(17,26,40,0.76)' }}>
            Services
          </p>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.4rem)', color: 'var(--ink)', lineHeight: 1.12, maxWidth: '17ch', fontWeight: 600 }}>
            Services that remove bottlenecks and turn operations into scalable systems.
          </h2>

          <div className="services-stack-grid mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const stackProfile = (isDesktop ? desktopStackProfiles : mobileStackProfiles)[index]

              return (
                <ServiceStackCard
                  key={service.id}
                  service={service}
                  index={index}
                  progress={servicesProgress}
                  stackProfile={stackProfile}
                  shouldReduceMotion={shouldReduceMotion}
                >
                </ServiceStackCard>
              )
            })}
          </div>
        </section>

        <section id="case-studies" className="pop-on-scroll mx-auto w-full max-w-7xl px-6 py-14 md:px-12">
          <SectionMarker label="Proof From Production" />
          <p className="text-label mb-4" style={{ color: 'rgba(17,26,40,0.76)' }}>
            Case studies
          </p>
          <h2 style={{ fontSize: 'clamp(2.05rem, 4vw, 3.2rem)', color: 'var(--ink)', lineHeight: 1.12, maxWidth: '17ch', fontWeight: 600 }}>
            Real deployments with measurable outcomes, not concept work.
          </h2>

          <div
            className="pop-on-scroll mt-8 rounded-[1.9rem] border p-4 md:p-5"
            style={{ borderColor: 'rgba(17,26,40,0.26)', background: 'linear-gradient(152deg, #0e1725, #1a2b43)' }}
          >
            <div className="overflow-hidden rounded-[1.4rem] border" style={{ borderColor: 'rgba(255,255,255,0.24)', minHeight: '460px' }}>
              <AnimatePresence mode="wait">
                {(() => {
                  const study = currentStudy
                  const accent = study.id === 1 ? '#c7f7df' : study.id === 2 ? '#d8ecff' : '#efe3ff'
                  return (
                  <motion.article
                    key={study.id}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="p-7 md:p-9"
                    style={{ background: 'linear-gradient(160deg, #f9fbff, #eef3fa)', minHeight: '460px' }}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-label">{study.industry}</span>
                      <span className="text-label" style={{ color: 'var(--bone)' }}>Project {study.id}</span>
                    </div>
                    <h3 className="mt-4" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.2, color: 'var(--ink)', letterSpacing: '-0.01em', maxWidth: '24ch' }}>
                      {study.title}
                    </h3>

                    <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.16)', background: accent }}>
                      <p className="text-label mb-2" style={{ color: 'rgba(17,26,40,0.78)' }}>System snapshot</p>
                      <div className="flex flex-wrap gap-2">
                        {study.visualTags.map((tag) => (
                          <span key={tag} className="rounded-full border px-3 py-1" style={{ borderColor: 'rgba(17,26,40,0.16)', fontSize: '0.68rem', color: 'var(--ink)', background: 'white' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="rounded-xl border p-4" style={{ borderColor: 'rgba(30,43,60,0.12)' }}>
                          <p style={{ fontSize: '1.5rem', color: 'var(--ink)', lineHeight: 1.1 }}>
                            <CountUp end={metric.value} suffix={metric.suffix} />
                          </p>
                          <p className="mt-1" style={{ fontSize: '0.7rem', color: 'var(--ash)' }}>{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowDetails((prev) => !prev)}
                      className="lift-expand mt-6 rounded-full border px-5 py-3"
                      style={{
                        borderColor: 'rgba(30,43,60,0.18)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--ink)',
                        background: 'rgba(255,255,255,0.8)',
                        fontWeight: 600,
                      }}
                    >
                      {showDetails && currentStudy.id === study.id ? 'Hide details' : 'View details'}
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 8 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 8 }}
                          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-5 overflow-hidden"
                        >
                          <p style={{ color: 'var(--ash)', lineHeight: 1.72, maxWidth: '60ch' }}>{study.detail}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {study.stack.map((tool) => (
                              <span
                                key={tool}
                                className="rounded-full border px-4 py-2"
                                style={{ borderColor: 'rgba(30,43,60,0.12)', fontSize: '0.7rem', color: 'var(--ink)' }}
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                )})()}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDetails(false)
                    setActiveStudy((prev) => (prev - 1 + studies.length) % studies.length)
                  }}
                  className="lift-expand inline-flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'rgba(255,255,255,0.08)' }}
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowDetails(false)
                    setActiveStudy((prev) => (prev + 1) % studies.length)
                  }}
                  className="lift-expand inline-flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white', background: 'rgba(255,255,255,0.08)' }}
                >
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="flex gap-2">
                {studies.map((study, index) => (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => {
                      setShowDetails(false)
                      setActiveStudy(index)
                    }}
                    style={{
                      width: index === activeStudy ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '999px',
                      border: 'none',
                      background: index === activeStudy ? 'white' : 'rgba(255,255,255,0.35)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="pop-on-scroll mx-auto w-full max-w-7xl px-6 py-14 md:px-12">
          <SectionMarker label="About Section" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.9rem] border p-7 md:p-10"
            style={{ borderColor: 'rgba(30,43,60,0.14)', background: 'rgba(255,255,255,0.9)' }}
          >
            <div className="pointer-events-none absolute -right-16 -top-12 opacity-20">
              <Sparkles size={220} />
            </div>
            <p className="text-label mb-4">About enntal</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.9vw, 3rem)', color: 'var(--ink)', lineHeight: 1.16, letterSpacing: '-0.01em', maxWidth: '19ch' }}>
              One team blending software engineering, systems design, and practical AI automation.
            </h2>
            <p className="mt-5" style={{ color: 'var(--ash)', lineHeight: 1.75, maxWidth: '62ch' }}>
              We focus on shipping useful infrastructure quickly, with clear ownership, maintainable architecture, and weekly product momentum.
            </p>
            <div className="mt-7 flex flex-wrap gap-4 text-sm" style={{ color: 'var(--ash)' }}>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} style={{ color: 'var(--ink)' }} /> Practical over theoretical</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} style={{ color: 'var(--ink)' }} /> Documented and maintainable</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} style={{ color: 'var(--ink)' }} /> Outcome-driven shipping</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 grid gap-4 md:grid-cols-3"
          >
            {team.map((member) => (
              <article
                key={member.name}
                className="pop-on-scroll rounded-2xl border p-6"
                style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.9)' }}
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'rgba(17,26,40,0.09)', color: 'var(--ink)' }}>
                  {member.name[0]}
                </div>
                <h3 style={{ color: 'var(--ink)', fontSize: '1.2rem', fontWeight: 600 }}>{member.name}</h3>
                <p className="text-label mt-1">{member.role}</p>
                <p className="mt-3" style={{ color: 'var(--ash)', lineHeight: 1.7 }}>{member.bio}</p>
              </article>
            ))}
          </motion.div>
        </section>

        <section id="booking" className="pop-on-scroll mx-auto w-full max-w-7xl px-6 pb-24 pt-16 md:px-12">
          <SectionMarker label="Booking Section" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.9rem] border p-7 md:p-10"
            style={{ borderColor: 'rgba(30,43,60,0.14)', background: 'rgba(255,255,255,0.92)' }}
          >
            <p className="text-label mb-4">Book a meeting</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.9vw, 3rem)', color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: '18ch' }}>
              Pick an available time directly in Google Calendar.
            </h2>
            <p className="mt-4" style={{ color: 'var(--ash)', lineHeight: 1.72, maxWidth: '58ch' }}>
              Use the calendar below to find available time windows. If your calendar is not publicly shareable yet, use the quick booking link to open Google Calendar with the account.
            </p>

            <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: 'rgba(30,43,60,0.14)', background: 'rgba(248,250,253,0.9)' }}>
              <p className="text-label mb-3" style={{ color: 'rgba(17,26,40,0.72)' }}>Google booking</p>
              <p style={{ color: 'var(--ash)', lineHeight: 1.7, maxWidth: '62ch' }}>
                Google only renders appointment-booking slots in iframe when an Appointment Schedule is published. If this area appears blank for your account, use the button below and share your Appointment Schedule URL to enable embedded slot booking.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(17,26,40,0.12)', background: '#ffffff' }}>
                <iframe
                  title="Google Calendar Booking"
                  src="https://calendar.google.com/calendar/embed?src=raysid986%40gmail.com&ctz=UTC&mode=WEEK&showTitle=0&showPrint=0&showNav=1"
                  style={{ width: '100%', height: '620px', border: 0, background: 'white' }}
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full border px-4 py-2" style={{ borderColor: 'rgba(30,43,60,0.16)', fontSize: '0.72rem', color: 'var(--ink)' }}>Available time slots</span>
                <span className="rounded-full border px-4 py-2" style={{ borderColor: 'rgba(30,43,60,0.16)', fontSize: '0.72rem', color: 'var(--ink)' }}>Google Meet link</span>
                <span className="rounded-full border px-4 py-2" style={{ borderColor: 'rgba(30,43,60,0.16)', fontSize: '0.72rem', color: 'var(--ink)' }}>Instant confirmation</span>
              </div>
            </div>

            <a
              href="https://calendar.google.com/calendar/u/0/r?cid=raysid986%40gmail.com"
              target="_blank"
              rel="noreferrer"
              className="lift-expand mt-7 inline-flex items-center gap-2 rounded-full"
              style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '0.9rem 1.4rem',
                textDecoration: 'none',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Open Google Calendar Booking <ArrowUpRight size={15} />
            </a>
          </motion.div>
        </section>

        <style>{`
          .elite-surface {
            background:
              radial-gradient(circle at 12% 10%, rgba(17,26,40,0.08), transparent 42%),
              radial-gradient(circle at 84% 18%, rgba(17,26,40,0.07), transparent 40%),
              repeating-linear-gradient(0deg, rgba(30,43,60,0.018) 0 1px, transparent 1px 42px),
              repeating-linear-gradient(90deg, rgba(30,43,60,0.015) 0 1px, transparent 1px 42px),
              linear-gradient(180deg, #ffffff 0%, #fdfdfd 48%, #ffffff 100%);
          }

          .lift-expand {
            transition: transform 0.25s ease, box-shadow 0.25s ease;
            will-change: transform;
          }

          .lift-expand:hover {
            transform: translateY(-2px) scale(1.03);
            box-shadow: 0 16px 34px -20px rgba(30, 43, 60, 0.6);
          }

          .service-card {
            transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.24s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .services-stack-grid {
            perspective: 1200px;
            transform-style: preserve-3d;
          }

          .service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 44px -28px rgba(30, 43, 60, 0.62);
          }

          .service-card {
            transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.24s cubic-bezier(0.22, 1, 0.36, 1), background 0.24s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .service-front {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1), transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .service-back {
            opacity: 0;
            transform: translateY(14px);
            pointer-events: none;
            transition: opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1), transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .service-hover-card:hover .service-front {
            opacity: 0;
            transform: translateY(-10px);
          }

          .service-hover-card:hover .service-back {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          .orbit-spin {
            animation: orbitSpin 16s linear infinite;
          }

          @keyframes orbitSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    </PageTransition>
  )
}

function HeroOrbitBoard() {
  const chips = [
    { label: 'Framer', x: '8%', y: '16%', tilt: '-14deg' },
    { label: 'WordPress', x: '6%', y: '56%', tilt: '-24deg' },
    { label: 'HTML', x: '78%', y: '10%', tilt: '-8deg' },
    { label: 'Node JS', x: '73%', y: '54%', tilt: '26deg' },
  ]

  return (
    <div
      className="relative w-full max-w-[560px] overflow-hidden rounded-[2rem] border p-6"
      style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.86)', minHeight: '360px' }}
    >
      <div className="pointer-events-none absolute inset-0" style={{
        background:
          'repeating-linear-gradient(0deg, rgba(17,26,40,0.038) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(17,26,40,0.038) 0 1px, transparent 1px 22px)',
      }} />

      <div className="absolute left-1/2 top-[33%] -translate-x-1/2">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border bg-white" style={{ borderColor: 'rgba(17,26,40,0.12)' }}>
          <Code2 size={34} style={{ color: 'var(--ink)' }} />
        </div>
      </div>

      <div className="absolute left-1/2 top-[57%] -translate-x-1/2 rounded-full px-7 py-3" style={{ background: 'var(--ink)', color: 'white' }}>
        <p style={{ fontSize: '1.85rem', lineHeight: 1, fontWeight: 600 }}>
          <span style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>Deployment</span>
        </p>
      </div>

      <div className="absolute inset-0 orbit-spin">
        {chips.map((chip) => (
          <div
            key={chip.label}
            className="absolute rounded-full border px-5 py-3"
            style={{
              left: chip.x,
              top: chip.y,
              transform: `rotate(${chip.tilt})`,
              borderColor: 'rgba(17,26,40,0.16)',
              background: 'rgba(255,255,255,0.8)',
            }}
          >
            <span style={{ color: 'var(--ink)', fontSize: '0.95rem', fontWeight: 600 }}>{chip.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceStackCard({ service, index, progress, stackProfile, shouldReduceMotion }) {
  const Icon = service.icon

  const x = useTransform(progress, [0, 1], [stackProfile.x, 0])
  const y = useTransform(progress, [0, 1], [stackProfile.y, 0])
  const rotate = useTransform(progress, [0, 1], [stackProfile.rotate, 0])
  const scale = useTransform(progress, [0, 1], [stackProfile.scale, 1])
  const opacity = useTransform(progress, [0, 0.22, 1], [0.7, 0.9, 1])

  return (
    <motion.article
      className="pop-on-scroll service-card service-hover-card relative overflow-hidden rounded-[1.7rem] border p-6 md:p-7"
      style={{
        borderColor: 'rgba(30,43,60,0.13)',
        background: service.surface,
        minHeight: '560px',
        x: shouldReduceMotion ? 0 : x,
        y: shouldReduceMotion ? 0 : y,
        rotate: shouldReduceMotion ? 0 : rotate,
        scale: shouldReduceMotion ? 1 : scale,
        opacity: shouldReduceMotion ? 1 : opacity,
        zIndex: stackProfile.zIndex,
        willChange: 'transform, opacity',
      }}
      transition={{ duration: 0.62, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <IconGridBackdrop icon={Icon} muted={false} />

      <div className="service-front relative z-10 flex h-full flex-col">
        <p className="text-label mb-3">Service {service.id}</p>
        <h3 style={{ color: 'var(--ink)', fontSize: '1.7rem', letterSpacing: '-0.01em', lineHeight: 1.15, fontWeight: 600 }}>
          {service.title}
        </h3>
        <p className="mt-3" style={{ color: 'var(--ash)', lineHeight: 1.72, fontWeight: 500 }}>
          {service.text}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {service.frontStats.map((item) => (
            <div key={item.label} className="rounded-xl border px-3 py-2" style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.78)' }}>
              <p style={{ color: 'var(--ink)', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.2 }}>{item.value}</p>
              <p style={{ color: 'var(--ash)', fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</p>
            </div>
          ))}
        </div>

        <ServiceBadgeVisual tags={service.tags} panelIcons={service.panelIcons} />

        <div className="mt-4">
          <ServiceSignalBoard service={service} shouldReduceMotion={shouldReduceMotion} />
        </div>
      </div>

      <div
        className="service-back absolute inset-0 z-20 rounded-[1.7rem] border p-6 md:p-7"
        style={{
          borderColor: 'rgba(17,26,40,0.2)',
          background: service.backGradient,
        }}
      >
        <div className="flex h-full flex-col">
          <p className="text-label mb-3" style={{ color: 'rgba(255,255,255,0.64)' }}>Service {service.id} details</p>
          <h3 style={{ color: '#ffffff', fontSize: '1.7rem', letterSpacing: '-0.01em', lineHeight: 1.15, fontWeight: 600 }}>
            {service.title}
          </h3>
          <p className="mt-3" style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.68 }}>
            {service.text}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {service.hoverHighlights.map((item) => (
              <div key={item.label} className="rounded-lg border px-2 py-2" style={{ borderColor: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.07)' }}>
                <p style={{ color: 'white', fontSize: '0.72rem', fontWeight: 600, lineHeight: 1.3 }}>{item.value}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.62rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
            {service.detailCards.map((card) => (
              <IconDetail key={card.text} icon={card.icon} text={card.text} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 overflow-hidden">
            {service.bullets.map((bullet) => (
              <span
                key={bullet}
                className="rounded-full border px-4 py-2"
                style={{
                  borderColor: 'rgba(255,255,255,0.24)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                {bullet}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.article>
  )
}

function ServiceBadgeVisual({ tags, panelIcons }) {
  return (
    <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.12)', background: 'rgba(255,255,255,0.65)' }}>
      <div className="flex items-center justify-between gap-3">
        {panelIcons.map((Icon, idx) => (
          <motion.div
            key={`panel-${idx}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
            style={{ borderColor: 'rgba(17,26,40,0.16)' }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
          >
            <Icon size={18} style={{ color: 'var(--ink)' }} />
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1"
            style={{ borderColor: 'rgba(17,26,40,0.14)', fontSize: '0.68rem', color: 'var(--ink)', background: 'white' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ServiceSignalBoard({ service, shouldReduceMotion }) {
  if (service.signalStyle === 'pipeline') {
    return (
      <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.13)', background: 'rgba(255,255,255,0.75)' }}>
        <p className="text-label mb-2">Pipeline pulse</p>
        <div className="grid grid-cols-3 gap-2">
          {service.bullets.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item}
              className="rounded-lg border px-2 py-2"
              style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.88)' }}
              animate={shouldReduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.22 }}
            >
              <p style={{ color: 'var(--ink)', fontSize: '0.68rem', lineHeight: 1.35 }}>{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (service.signalStyle === 'orbit') {
    return (
      <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.13)', background: 'rgba(255,255,255,0.75)' }}>
        <p className="text-label mb-2">Agent activity</p>
        <div className="relative h-20">
          <motion.div
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: 'rgba(17,26,40,0.18)', background: 'rgba(17,26,40,0.08)' }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="absolute h-3 w-3 rounded-full"
              style={{ background: 'var(--ink)', left: `${22 + dot * 24}%`, top: `${20 + dot * 16}%` }}
              animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: dot * 0.18 }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (service.signalStyle === 'stack') {
    return (
      <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.13)', background: 'rgba(255,255,255,0.75)' }}>
        <p className="text-label mb-2">System layers</p>
        <div className="space-y-2">
          {['Access layer', 'Data layer', 'Workflow layer'].map((layer, idx) => (
            <motion.div
              key={layer}
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.88)' }}
              animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.22 }}
            >
              <p style={{ color: 'var(--ink)', fontSize: '0.7rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{layer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.13)', background: 'rgba(255,255,255,0.75)' }}>
      <p className="text-label mb-2">Product release board</p>
      <div className="grid grid-cols-2 gap-2">
        {['UX', 'API', 'QA', 'Deploy'].map((item, idx) => (
          <motion.div
            key={item}
            className="rounded-lg border px-3 py-2"
            style={{ borderColor: 'rgba(17,26,40,0.14)', background: 'rgba(255,255,255,0.88)' }}
            animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.12 }}
          >
            <p style={{ color: 'var(--ink)', fontSize: '0.68rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function IconDetail({ icon: Icon, text }) {
  return (
    <div className="rounded-xl border p-3 min-w-0" style={{ borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}>
      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(255,255,255,0.12)', color: 'white' }}>
        <Icon size={14} />
      </div>
      <p style={{ fontSize: '0.74rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.86)', wordBreak: 'break-word' }}>{text}</p>
    </div>
  )
}

function CaseVisualStrip({ tags }) {
  return (
    <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: 'rgba(17,26,40,0.12)', background: 'rgba(255,255,255,0.72)' }}>
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(17,26,40,0.16)' }}>
          <Network size={16} style={{ color: 'var(--ink)' }} />
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(17,26,40,0.16)' }}>
          <Workflow size={16} style={{ color: 'var(--ink)' }} />
        </div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(17,26,40,0.16)' }}>
          <Database size={16} style={{ color: 'var(--ink)' }} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-3 py-1"
            style={{ borderColor: 'rgba(17,26,40,0.14)', fontSize: '0.68rem', color: 'var(--ink)', background: 'white' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function IconGridBackdrop({ icon: Icon }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-10 -top-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.08 }}
      >
        <Icon size={180} />
      </motion.div>
      <motion.div
        className="absolute -bottom-16 right-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.06 }}
      >
        <Icon size={220} />
      </motion.div>
    </div>
  )
}

function SectionMarker({ label }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontSize: '0.78rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'rgba(17,26,40,0.44)',
        marginBottom: '0.85rem',
        fontWeight: 600,
      }}
    >
      {label}
    </motion.p>
  )
}
