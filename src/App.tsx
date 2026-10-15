import { useEffect, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Clock,
  MapPin,
  Phone,
  Quote,
  Scissors,
  Star,
} from "lucide-react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { FadeUp, WordReveal } from "@/components/motion"
import { EASE_EDITORIAL } from "@/lib/motion"
import { conteudo, type TituloComDestaque } from "@/conteudo"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

// Todo o texto, preço, contato e foto vem de src/conteudo.ts
const {
  negocio,
  horarios,
  diasFechados,
  cabecalho,
  topo,
  casa,
  servicos,
  pacote,
  ritual,
  depoimentos,
  agenda,
  perguntas,
  rodape,
  midia,
} = conteudo

/** Âncora interna: os botões de agendar levam até a seção de agenda. */
const AGENDAR_URL = "#agendar"
const TELEFONE_URL = `tel:+55${negocio.telefone.replace(/\D/g, "")}`
const WHATSAPP_URL = `https://wa.me/${negocio.whatsapp}`

const temDepoimentos = depoimentos.itens.length > 0

const formatarPreco = (valor: number) => valor.toLocaleString("pt-BR")
const numeroDoItem = (i: number) => String(i + 1).padStart(2, "0")

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.32em] text-gold uppercase",
        className
      )}
    >
      <span className="h-px w-8 bg-gold/60" aria-hidden />
      {children}
    </p>
  )
}

/** Título com o trecho final em itálico dourado. */
function ComDestaque({ titulo }: { titulo: TituloComDestaque }) {
  return (
    <>
      {titulo.texto}
      {titulo.destaque && (
        <>
          {" "}
          <em className="text-gold-foil pr-[0.04em] font-normal">{titulo.destaque}</em>
        </>
      )}
    </>
  )
}

/** Nome da barbearia com a segunda parte em itálico dourado. */
function Logo() {
  return (
    <>
      {negocio.logo.texto}
      {negocio.logo.destaque && (
        <>
          {" "}
          <span className="text-gold-foil italic">{negocio.logo.destaque}</span>
        </>
      )}
    </>
  )
}

function GoldButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      nativeButton={false}
      // Escala tátil via Framer Motion: cresce de leve no hover e "afunda" no clique
      render={
        <motion.a
          href={href}
          whileHover={{ scale: 1.035 }}
          whileTap={{ scale: 0.965 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        />
      }
      className={cn(
        "group/gold relative h-12 overflow-hidden rounded-sm px-7 text-[0.8rem] font-semibold tracking-[0.2em] uppercase",
        "bg-linear-to-b from-gold-soft to-gold text-primary-foreground",
        "shadow-[0_10px_30px_-10px_var(--gold-glow),inset_0_1px_0_oklch(1_0_0/35%)]",
        // transition-all brigaria com o transform do Motion; animamos só o que o CSS controla
        "transition-[translate,background-color,box-shadow,opacity] duration-500 hover:-translate-y-0.5 hover:bg-gold hover:shadow-[0_18px_40px_-12px_var(--gold-glow-strong),inset_0_1px_0_oklch(1_0_0/45%)] active:translate-y-0",
        "before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12 before:bg-white/30 before:blur-md before:transition-all before:duration-700 hover:before:left-[130%]",
        className
      )}
    >
      {children}
    </Button>
  )
}

/** Fio dourado que nasce do centro e se abre sob o link no hover/foco. */
const navUnderline = cn(
  "relative bg-transparent text-[0.78rem] tracking-[0.08em] text-foreground/75 transition-colors duration-500",
  "hover:bg-transparent hover:text-foreground focus:bg-transparent focus-visible:text-foreground",
  "after:pointer-events-none after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-linear-to-r after:from-transparent after:via-gold after:to-transparent",
  "after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100"
)

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Sem depoimentos, a seção some e o link para ela também
  const links = cabecalho.links.filter(({ link }) => temDepoimentos || link !== "#depoimentos")

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1, ease: EASE_EDITORIAL }}
      // No topo fica solto sobre o vídeo; depois de rolar vira uma faixa translúcida de ponta a ponta
      className={cn(
        "fixed inset-x-0 top-0 z-50 isolate border-b transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none",
        scrolled
          ? "border-gold/15 bg-forest-deep/75 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      {/* Degradê sutil só para garantir a leitura sobre o vídeo, no lugar de uma caixa */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160%] bg-linear-to-b from-black/40 to-transparent transition-opacity duration-300 motion-reduce:transition-none",
          scrolled && "opacity-0"
        )}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6 sm:h-20">
        <a href="#topo" className="flex items-baseline gap-2.5">
          <span className="font-heading text-2xl font-semibold tracking-wide text-foreground">
            <Logo />
          </span>
          <span className="hidden text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase sm:inline">
            {cabecalho.selo}
          </span>
        </a>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navUnderline,
                  "data-popup-open:bg-transparent data-popup-open:text-foreground data-popup-open:after:scale-x-100 data-popup-open:hover:bg-transparent"
                )}
              >
                {cabecalho.menuServicos}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[380px] gap-1 p-2">
                  {servicos.itens.map(({ menu }) => (
                    <li key={menu.titulo}>
                      <NavigationMenuLink
                        href={menu.link ?? "#servicos"}
                        className="flex-col items-start gap-0.5 rounded-sm px-3 py-2.5 hover:bg-white/5"
                      >
                        <span className="font-heading text-lg text-foreground">{menu.titulo}</span>
                        <span className="text-xs text-muted-foreground">{menu.detalhe}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-gold/10 pt-1">
                    <NavigationMenuLink
                      href="#servicos"
                      className="justify-between rounded-sm px-3 py-2 text-xs tracking-[0.2em] text-gold uppercase hover:bg-white/5"
                    >
                      {cabecalho.menuVerTodos} <ArrowRight className="size-3.5" />
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {links.map(({ rotulo, link }) => (
              <NavigationMenuItem key={link}>
                <NavigationMenuLink
                  href={link}
                  className={cn(navUnderline, "h-9 px-3")}
                >
                  {rotulo}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <a
            href={TELEFONE_URL}
            className="hidden items-center gap-2 text-xs tracking-wide text-foreground/75 transition-colors duration-500 hover:text-gold md:flex"
          >
            <Phone className="size-3.5" /> {negocio.telefone}
          </a>
          <GoldButton href={AGENDAR_URL} className="h-10 px-5 text-[0.7rem]">
            {cabecalho.botaoAgendar}
          </GoldButton>
        </div>
      </div>
    </motion.header>
  )
}

/** Entrada sequenciada do Hero: cada bloco chega depois do anterior, no carregamento. */
const heroIn = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: EASE_EDITORIAL },
})

function Hero() {
  // Quem pediu menos movimento no sistema vê só a capa, e o vídeo nem é baixado
  const reduceMotion = useReducedMotion()
  const fundo = "absolute inset-0 -z-20 size-full object-cover object-[40%_50%]"

  return (
    <section id="topo" className="relative isolate flex min-h-svh items-end overflow-hidden">
      {reduceMotion ? (
        <img
          src={midia.capa.src}
          alt={midia.capa.alt}
          className={fundo}
          fetchPriority="high"
        />
      ) : (
        <motion.video
          src={midia.video}
          poster={midia.capa.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className={fundo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE_EDITORIAL }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.13_0.02_165/96%)_0%,oklch(0.15_0.03_162/80%)_45%,oklch(0.15_0.03_162/25%)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-background to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-40 pb-20 sm:pb-28">
        <div className="max-w-2xl">
          <motion.div {...heroIn(0.25)}>
            <Eyebrow>{topo.chamada}</Eyebrow>
          </motion.div>
          <h1 className="mt-8 font-heading text-[2.9rem] leading-[0.95] font-medium tracking-[-0.02em] text-balance text-foreground sm:text-[4.75rem]">
            <WordReveal
              delay={0.45}
              segments={[
                { text: negocio.slogan.texto },
                ...(negocio.slogan.destaque
                  ? [
                      {
                        text: negocio.slogan.destaque,
                        className: "text-gold-foil pr-[0.04em] font-normal italic",
                      },
                    ]
                  : []),
              ]}
            />
          </h1>
          <motion.p
            {...heroIn(1.35)}
            className="mt-8 max-w-[34rem] text-base leading-[1.75] text-pretty text-foreground/75 sm:text-[1.075rem]"
          >
            {topo.texto}
          </motion.p>
          <motion.div
            {...heroIn(1.5)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <GoldButton href={AGENDAR_URL}>
              {topo.botaoPrincipal}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover/gold:translate-x-1" />
            </GoldButton>
            <a
              href="#servicos"
              className="group text-sm tracking-[0.06em] text-foreground/80 transition-colors duration-500 hover:text-gold"
            >
              {topo.linkSecundario}
              <span className="block h-px w-full origin-left scale-x-50 bg-gold/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>

        {topo.numeros.length > 0 && (
          <motion.dl
            {...heroIn(1.7)}
            className="mt-20 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/5 backdrop-blur-md"
          >
            {topo.numeros.map(({ valor, legenda }) => (
              <div key={legenda} className="bg-forest-deep/40 px-4 py-5 sm:px-6">
                <dt className="font-heading text-2xl whitespace-nowrap text-gold sm:text-4xl">{valor}</dt>
                <dd className="mt-1 text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">{legenda}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  )
}

function Casa() {
  return (
    <section id="casa" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <FadeUp duration={1.2} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-[0_40px_80px_-30px_black]">
            <img
              src={casa.fotoPrincipal.src}
              alt={casa.fotoPrincipal.alt}
              className="size-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 ring-1 ring-gold/15 ring-inset" aria-hidden />
          </div>
          <FadeUp
            delay={0.35}
            className="absolute -right-4 -bottom-10 hidden w-56 overflow-hidden rounded-md border-4 border-background shadow-2xl shadow-black/60 sm:block lg:-right-12"
          >
            <img
              src={casa.fotoSecundaria.src}
              alt={casa.fotoSecundaria.alt}
              className="aspect-square size-full object-cover"
              loading="lazy"
            />
          </FadeUp>
        </FadeUp>

        <div>
          <FadeUp>
            <Eyebrow>{casa.chamada}</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-7 font-heading text-4xl leading-[1.05] tracking-[-0.015em] text-balance sm:text-[3.25rem]">
              <ComDestaque titulo={casa.titulo} />
            </h2>
          </FadeUp>
          <FadeUp
            delay={0.2}
            className="mt-9 max-w-[33rem] space-y-6 text-[1.02rem] leading-[1.8] text-pretty text-foreground/70"
          >
            {casa.paragrafos.map((paragrafo, i) => (
              <p
                key={i}
                className={cn(
                  // Capitular: a primeira letra abre o texto como numa matéria de revista
                  i === 0 &&
                    "first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-heading first-letter:text-[4.4rem] first-letter:leading-[0.78] first-letter:text-gold"
                )}
              >
                {paragrafo}
              </p>
            ))}
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12 flex items-center gap-4 border-t border-gold/15 pt-8">
            <div className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-forest">
              <Scissors className="size-5 text-gold" />
            </div>
            <div>
              <p className="font-heading text-xl italic">{casa.assinatura.nome}</p>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {casa.assinatura.cargo}
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

function Servicos() {
  return (
    <section id="servicos" className="relative border-y border-gold/10 bg-graphite/60 py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,oklch(0.26_0.05_160/55%),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <FadeUp>
              <Eyebrow>{servicos.chamada}</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-7 font-heading text-4xl leading-[1.05] tracking-[-0.015em] text-balance sm:text-[3.25rem]">
                <ComDestaque titulo={servicos.titulo} />
              </h2>
            </FadeUp>
          </div>
          <FadeUp
            delay={0.2}
            className="max-w-sm border-l border-gold/25 pl-5 text-sm leading-[1.75] text-pretty text-muted-foreground"
          >
            <p>{servicos.observacao}</p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {servicos.itens.map((s, i) => (
            <FadeUp key={s.nome} delay={i * 0.14} duration={1.1}>
              <Card
                className="group/card-svc h-full gap-0 rounded-md border-0 bg-card py-0 ring-gold/12 backdrop-blur-xl transition-[translate,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_black] hover:ring-gold/35"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.foto}
                    alt={s.nome}
                    className="size-full object-cover grayscale-[35%] transition-[scale,filter] duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/card-svc:scale-105 group-hover/card-svc:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-forest-deep via-forest-deep/20 to-transparent" />
                  <span className="absolute top-4 left-4 flex items-center gap-1.5 rounded-sm border border-white/10 bg-black/40 px-2.5 py-1 text-[0.65rem] tracking-[0.15em] text-foreground/85 uppercase backdrop-blur-md">
                    <Clock className="size-3" /> {s.duracao}
                  </span>
                </div>
                <CardHeader className="gap-3 px-6 pt-7">
                  <span className="font-heading text-sm text-gold/70 italic">
                    {servicos.prefixoNumero} {numeroDoItem(i)}
                  </span>
                  <CardTitle className="font-heading text-[1.7rem] leading-[1.1] font-medium tracking-[-0.01em] text-balance">
                    {s.nome}
                  </CardTitle>
                  <CardDescription className="leading-[1.7] text-pretty text-foreground/65">
                    {s.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-6 pt-5 pb-6">
                  <ul className="space-y-2 text-[0.8rem] text-muted-foreground">
                    {s.inclui.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="size-1 rotate-45 bg-gold" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="justify-between border-gold/12 bg-black/25 px-6 py-5">
                  <p className="font-heading text-foreground">
                    <span className="align-top text-sm text-gold">{negocio.moeda}</span>{" "}
                    <span className="text-4xl">{formatarPreco(s.preco)}</span>
                  </p>
                  <motion.a
                    href={AGENDAR_URL}
                    whileTap={{ scale: 0.95 }}
                    className="group/res relative flex items-center gap-1.5 py-1 text-xs tracking-[0.2em] text-gold uppercase opacity-85 transition-opacity duration-500 hover:opacity-100"
                  >
                    {servicos.botaoReservar}
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/res:translate-x-0.5 group-hover/res:-translate-y-0.5" />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/res:scale-x-100"
                    />
                  </motion.a>
                </CardFooter>
              </Card>
            </FadeUp>
          ))}
        </div>

        {pacote && (
          <FadeUp delay={0.1} className="mt-6">
            <Card className="rounded-md border-0 bg-linear-to-r from-forest/80 via-card to-forest/60 py-0 ring-gold/30 backdrop-blur-xl">
              <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-10">
                <div>
                  <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                    {pacote.chamada}
                  </p>
                  <CardTitle className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
                    {pacote.nome}
                  </CardTitle>
                  <CardDescription className="mt-3 max-w-2xl leading-relaxed text-foreground/70">
                    {pacote.descricao}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-start gap-4 md:items-end">
                  <p className="font-heading">
                    {pacote.precoAntigo !== undefined && (
                      <span className="mr-2 text-lg text-muted-foreground line-through decoration-gold/50">
                        {negocio.moeda} {formatarPreco(pacote.precoAntigo)}
                      </span>
                    )}
                    <span className="align-top text-sm text-gold">{negocio.moeda}</span>{" "}
                    <span className="text-5xl">{formatarPreco(pacote.preco)}</span>
                  </p>
                  <GoldButton href={AGENDAR_URL}>{pacote.botao}</GoldButton>
                </div>
              </div>
            </Card>
          </FadeUp>
        )}
      </div>
    </section>
  )
}

function Ritual() {
  return (
    <section id="ritual" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow className="reveal">{ritual.chamada}</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight sm:text-5xl">
            {ritual.titulo}
          </h2>
          <p className="reveal mt-6 max-w-md leading-relaxed text-foreground/70">
            {ritual.texto}
          </p>
          <div className="reveal mt-10 overflow-hidden rounded-md shadow-[0_40px_80px_-30px_black]">
            <img
              src={ritual.foto.src}
              alt={ritual.foto.alt}
              className="aspect-[4/3] w-full object-cover object-[center_30%] sm:aspect-[16/10] sm:object-center"
              loading="lazy"
            />
          </div>
        </div>

        <ol className="relative space-y-4 lg:pt-24">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.6rem] w-px bg-linear-to-b from-transparent via-gold/30 to-transparent lg:top-24"
          />
          {ritual.passos.map((passo, i) => (
            <li
              key={passo.titulo}
              className="reveal relative flex gap-6 rounded-md border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-500 hover:border-gold/25 hover:bg-white/[0.05]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-background font-heading text-sm text-gold">
                {numeroDoItem(i)}
              </span>
              <div>
                <h3 className="font-heading text-2xl">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{passo.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Depoimentos() {
  if (!temDepoimentos) return null

  return (
    <section id="depoimentos" className="relative overflow-hidden py-28 sm:py-36">
      <img
        src={depoimentos.fotoFundo}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover opacity-30"
        loading="lazy"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/85 to-background" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="reveal justify-center">{depoimentos.chamada}</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight sm:text-5xl">
            {depoimentos.titulo}
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {depoimentos.itens.map((d, i) => (
            <Card
              key={d.nome}
              className="reveal justify-between gap-8 rounded-md bg-forest-deep/45 px-0 py-8 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:ring-gold/30"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <CardContent className="px-7">
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-gold/60" />
                  <div className="flex gap-0.5" aria-label={depoimentos.rotuloEstrelas}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 font-heading text-[1.35rem] leading-snug text-foreground/90 italic">
                  “{d.texto}”
                </blockquote>
              </CardContent>
              <div className="flex items-center gap-4 border-t border-white/5 px-7 pt-6">
                <img
                  src={d.foto}
                  alt={d.nome}
                  className="size-12 rounded-full object-cover ring-1 ring-gold/40 ring-offset-2 ring-offset-forest-deep"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-medium">{d.nome}</p>
                  <p className="text-xs text-muted-foreground">{d.descricao}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Agendar() {
  return (
    <section id="agendar" className="mx-auto max-w-6xl px-6 pb-28">
      <div className="reveal relative overflow-hidden rounded-md border border-gold/20 shadow-[0_50px_100px_-40px_black]">
        <img
          src={agenda.fotoFundo}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover"
          loading="lazy"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-forest-deep via-forest-deep/90 to-forest/50" />
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-14 lg:grid-cols-[1.3fr_1fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow>{agenda.chamada}</Eyebrow>
            <h2 className="mt-6 font-heading text-4xl leading-tight sm:text-5xl">
              {agenda.titulo}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-foreground/75">
              {agenda.texto}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-3 text-sm">
              <Clock className="mt-0.5 size-4 text-gold" />
              <div className="text-foreground/80">
                {horarios.map((h) => (
                  <p key={h.dias}>{`${h.dias}, ${h.horas}`}</p>
                ))}
                {diasFechados && <p className="text-muted-foreground">{diasFechados}</p>}
              </div>
            </div>
            {/* No mobile o texto pode quebrar em duas linhas, com tracking menor, para não estourar o card */}
            <GoldButton
              href={WHATSAPP_URL}
              className="h-auto min-h-12 w-full py-3 text-center tracking-[0.12em] whitespace-normal sm:h-12 sm:py-0 sm:tracking-[0.2em] sm:whitespace-nowrap"
            >
              {agenda.botao} <ArrowRight className="size-4" />
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const endereco = (
    <>
      <MapPin className="mt-0.5 size-4 shrink-0" />
      {negocio.endereco.linha1}
      <br />
      {negocio.endereco.linha2}
    </>
  )

  return (
    <footer id="duvidas" className="border-t border-gold/10 bg-[oklch(0.12_0.012_165)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow className="reveal">{perguntas.chamada}</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight">
            {perguntas.titulo}
          </h2>
          <p className="reveal mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {perguntas.texto}
          </p>
        </div>

        <Accordion className="reveal" defaultValue={["faq-0"]}>
          {perguntas.itens.map((item, i) => (
            <AccordionItem key={item.pergunta} value={`faq-${i}`} className="border-gold/12 not-last:border-b">
              <AccordionTrigger className="py-5 font-heading text-xl font-normal hover:text-gold hover:no-underline sm:text-[1.35rem] **:data-[slot=accordion-trigger-icon]:text-gold">
                {item.pergunta}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[0.95rem] leading-relaxed text-muted-foreground">
                <p>{item.resposta}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-3xl">
              <Logo />
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{rodape.descricao}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">{rodape.tituloEndereco}</p>
            {negocio.linkMapa ? (
              <a
                href={negocio.linkMapa}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 transition-colors hover:text-gold"
              >
                {endereco}
              </a>
            ) : (
              <p className="flex gap-2">{endereco}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">{rodape.tituloHorarios}</p>
            {horarios.map((h) => (
              <p key={h.dias}>{`${h.diasAbreviados} · ${h.horas}`}</p>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">{rodape.tituloContato}</p>
            <a href={TELEFONE_URL} className="flex items-center gap-2 transition-colors hover:text-gold">
              <Phone className="size-4" /> {negocio.telefone}
            </a>
            <a href={negocio.instagram.link} className="flex items-center gap-2 transition-colors hover:text-gold">
              <AtSign className="size-4" /> {negocio.instagram.usuario}
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} {rodape.direitos}
          {rodape.avisoDemonstracao && (
            <>
              <br />
              {rodape.avisoDemonstracao}
            </>
          )}
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  useReveal()

  return (
    // reducedMotion="user": quem pediu menos movimento no sistema vê só os fades, sem deslocamentos
    <MotionConfig reducedMotion="user">
      <div className="grain min-h-svh overflow-x-clip">
        <Header />
        <main>
          <Hero />
          <Casa />
          <Servicos />
          <Ritual />
          <Depoimentos />
          <Agendar />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
