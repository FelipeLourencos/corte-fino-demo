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
import { MotionConfig, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { FadeUp, WordReveal } from "@/components/motion"
import { EASE_EDITORIAL } from "@/lib/motion"
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

const unsplash = (id: string, w = 1600, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80${extra}`

const IMG = {
  hero: unsplash("1503951914875-452162b0f3f1", 2000),
  salao: unsplash("1585747860715-2ba37e788b70", 1400),
  cadeira: unsplash("1512690459411-b9245aed614b", 2000),
  ferramentas: unsplash("1621605815971-fbc98d665033", 1200),
  degrade: unsplash("1599351431202-1e0f0137899a", 1000),
  barba: unsplash("1532710093739-9470acff878f", 1000),
  visagismo: unsplash("1590540179852-2110a54f813a", 1000),
  tesoura: unsplash("1517832606299-7ae9b720a186", 1200),
  oficio: unsplash("1622286342621-4bd786c2447c", 1000),
}

const AGENDAR_URL = "#agendar"

const servicos = [
  {
    nome: "Corte degradê de alta precisão",
    preco: "120",
    duracao: "50 min",
    imagem: IMG.degrade,
    descricao:
      "Antes de a máquina encostar, a gente lê o crescimento do seu cabelo e os redemoinhos. A transição é feita pente a pente, do zero ao dois, e a nuca e as costeletas fecham na navalha.",
    inclui: ["Lavagem com shampoo de menta", "Acabamento à navalha", "Finalização com pomada seca"],
  },
  {
    nome: "Barba com toalha quente e óleos essenciais",
    preco: "95",
    duracao: "40 min",
    imagem: IMG.barba,
    descricao:
      "Três toalhas quentes amaciam o fio e abrem os poros. Espuma batida no pincel, lâmina nova a cada cliente e, para fechar, toalha fria com óleo de cedro e sândalo.",
    inclui: ["Pré-barba com óleo de semente de uva", "Navalha com lâmina descartável", "Bálsamo pós-barba"],
  },
  {
    nome: "Visagismo capilar",
    preco: "180",
    duracao: "75 min",
    imagem: IMG.visagismo,
    descricao:
      "Para quem quer mudar e ainda não sabe para onde. Avaliamos formato do rosto, linha do maxilar, textura do fio e a sua rotina de manhã. Desenhamos corte e barba juntos e só depois executamos.",
    inclui: ["Consulta com o barbeiro-chefe", "Corte e barba inclusos", "Guia de manutenção por escrito"],
  },
]

const ritual = [
  {
    n: "01",
    titulo: "Toalha quente",
    texto: "Três trocas, cada uma a 60 °C, com algumas gotas de eucalipto. É aqui que o fio cede e o rosto relaxa.",
  },
  {
    n: "02",
    titulo: "Espuma no pincel",
    texto: "Sabão de barbear batido à mão em pincel de texugo. A espuma levanta o pelo e protege a pele da lâmina.",
  },
  {
    n: "03",
    titulo: "Navalha a favor do pelo",
    texto: "Primeira passada sempre no sentido do crescimento. A segunda só onde a pele permite, sem pressa.",
  },
  {
    n: "04",
    titulo: "Toalha fria e óleo",
    texto: "Fecha os poros e assenta a pele. Terminamos com óleo de cedro e sândalo, que fica no rosto até o fim do dia.",
  },
]

const depoimentos = [
  {
    nome: "Henrique Albuquerque",
    cargo: "Advogado · cliente desde 2016",
    foto: unsplash("1500648767791-00dcc994a43e", 240, "&h=240&crop=faces"),
    texto:
      "Corto com o Rafael há oito anos. Mudei de escritório duas vezes e de bairro uma, e continuo atravessando a cidade numa quinta à noite por causa daquela cadeira.",
  },
  {
    nome: "Thiago Ventura",
    cargo: "Arquiteto · cliente desde 2021",
    foto: unsplash("1506794778202-cad84cf45f1d", 240, "&h=240&crop=faces"),
    texto:
      "Cheguei pedindo um degradê qualquer. Saí com um corte que respeita o redemoinho com que eu brigava desde os doze anos. Foi a primeira vez que alguém olhou para a minha cabeça antes de ligar a máquina.",
  },
  {
    nome: "Daniel Okamoto",
    cargo: "Chef de cozinha · cliente desde 2019",
    foto: unsplash("1507003211169-0a1dd7228f2d", 240, "&h=240&crop=faces"),
    texto:
      "Passo catorze horas por dia numa cozinha quente. A barba com toalha quente de sábado é a única hora da semana em que eu desligo o telefone.",
  },
]

const faq = [
  {
    q: "Preciso agendar ou posso chegar sem horário?",
    a: "Trabalhamos com hora marcada para que cada atendimento tenha o tempo que precisa. Se houver uma cadeira livre quando você chegar, atendemos com prazer, mas aos sábados isso é raro.",
  },
  {
    q: "E se eu me atrasar?",
    a: "Seguramos o seu horário por até 10 minutos. Depois disso, tentamos encaixar no mesmo dia, mas não podemos atrasar o cliente seguinte.",
  },
  {
    q: "Como cancelo ou remarco?",
    a: "Pelo WhatsApp, com pelo menos 3 horas de antecedência. Remarcações dentro desse prazo não têm custo.",
  },
  {
    q: "Vocês atendem crianças?",
    a: "Sim, a partir de 8 anos e acompanhadas de um responsável. O corte infantil custa R$ 80 e dura cerca de 35 minutos.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Pix, cartões de débito e crédito (todas as bandeiras) e dinheiro. O Ritual Corte Fino pode ser parcelado em até 2x sem juros.",
  },
  {
    q: "Tem onde estacionar?",
    a: "Temos convênio com o estacionamento da rua ao lado: as duas primeiras horas saem por nossa conta. É só mostrar o ticket no balcão.",
  },
]

const navServicos = [
  { titulo: "Corte degradê", detalhe: "Transição pente a pente, acabamento à navalha", href: "#servicos" },
  { titulo: "Barba com toalha quente", detalhe: "Três toalhas, navalha e óleo de cedro", href: "#ritual" },
  { titulo: "Visagismo capilar", detalhe: "Corte e barba desenhados para o seu rosto", href: "#servicos" },
]

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
        "shadow-[0_10px_30px_-10px_oklch(0.74_0.085_78/60%),inset_0_1px_0_oklch(1_0_0/35%)]",
        // transition-all brigaria com o transform do Motion; animamos só o que o CSS controla
        "transition-[translate,background-color,box-shadow,opacity] duration-500 hover:-translate-y-0.5 hover:bg-gold hover:shadow-[0_18px_40px_-12px_oklch(0.74_0.085_78/75%),inset_0_1px_0_oklch(1_0_0/45%)] active:translate-y-0",
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
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.1, ease: EASE_EDITORIAL }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 rounded-md border px-4 transition-all duration-500 sm:px-6",
          scrolled
            ? "border-gold/15 bg-forest-deep/70 shadow-[0_20px_50px_-20px_black] backdrop-blur-xl"
            : "border-white/5 bg-black/20 backdrop-blur-md"
        )}
      >
        <a href="#topo" className="flex items-baseline gap-2.5">
          <span className="font-heading text-2xl font-semibold tracking-wide text-foreground">
            Corte <span className="text-gold-foil italic">Fino</span>
          </span>
          <span className="hidden text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase sm:inline">
            est. 2011
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
                Serviços
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[380px] gap-1 p-2">
                  {navServicos.map((s) => (
                    <li key={s.titulo}>
                      <NavigationMenuLink
                        href={s.href}
                        className="flex-col items-start gap-0.5 rounded-sm px-3 py-2.5 hover:bg-white/5"
                      >
                        <span className="font-heading text-lg text-foreground">{s.titulo}</span>
                        <span className="text-xs text-muted-foreground">{s.detalhe}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                  <li className="mt-1 border-t border-gold/10 pt-1">
                    <NavigationMenuLink
                      href="#servicos"
                      className="justify-between rounded-sm px-3 py-2 text-xs tracking-[0.2em] text-gold uppercase hover:bg-white/5"
                    >
                      Tabela completa de valores <ArrowRight className="size-3.5" />
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {[
              ["A Casa", "#casa"],
              ["O Ritual", "#ritual"],
              ["Clientes", "#depoimentos"],
              ["Dúvidas", "#duvidas"],
            ].map(([label, href]) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  href={href}
                  className={cn(navUnderline, "h-9 px-3")}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <a
            href="tel:+5511900000000"
            className="hidden items-center gap-2 text-xs tracking-wide text-muted-foreground opacity-80 transition-[color,opacity] duration-500 hover:text-gold hover:opacity-100 md:flex"
          >
            <Phone className="size-3.5" /> (11) 90000-0000
          </a>
          <GoldButton href={AGENDAR_URL} className="h-10 px-5 text-[0.7rem]">
            Agendar
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
  return (
    <section id="topo" className="relative isolate flex min-h-svh items-end overflow-hidden">
      {/* A foto "respira": começa um pouco mais próxima e se acomoda devagar */}
      <motion.img
        src={IMG.hero}
        alt="Barbeiro fazendo a barba de um cliente na cadeira, em luz baixa"
        className="absolute inset-0 -z-20 size-full object-cover object-[60%_30%]"
        fetchPriority="high"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2.4, ease: EASE_EDITORIAL }}
      />
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
            <Eyebrow>Pinheiros · São Paulo · desde 2011</Eyebrow>
          </motion.div>
          <h1 className="mt-8 font-heading text-[2.9rem] leading-[0.95] font-medium tracking-[-0.02em] text-balance text-foreground sm:text-[4.75rem]">
            <WordReveal
              delay={0.45}
              segments={[
                { text: "Cadeira de couro, navalha afiada e" },
                {
                  text: "tempo para fazer direito.",
                  className: "text-gold-foil pr-[0.04em] font-normal italic",
                },
              ]}
            />
          </h1>
          <motion.p
            {...heroIn(1.35)}
            className="mt-8 max-w-[34rem] text-base leading-[1.75] text-pretty text-foreground/75 sm:text-[1.075rem]"
          >
            Aqui cada atendimento dura o que precisa durar. Degradê acertado fio a fio, barba feita
            com toalha quente e uma conversa que ninguém tem pressa de terminar.
          </motion.p>
          <motion.div
            {...heroIn(1.5)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <GoldButton href={AGENDAR_URL}>
              Agendar meu horário
              <ArrowRight className="size-4 transition-transform duration-500 group-hover/gold:translate-x-1" />
            </GoldButton>
            <a
              href="#servicos"
              className="group text-sm tracking-[0.06em] text-foreground/80 transition-colors duration-500 hover:text-gold"
            >
              Ver serviços e valores
              <span className="block h-px w-full origin-left scale-x-50 bg-gold/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
          </motion.div>
        </div>

        <motion.dl
          {...heroIn(1.7)}
          className="mt-20 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-md border border-white/10 bg-white/5 backdrop-blur-md"
        >
          {[
            ["4.9", "nota média em 1.312 avaliações"],
            ["45 min", "tempo mínimo por cliente"],
            ["4", "barbeiros, nenhum aprendiz na cadeira"],
          ].map(([n, l]) => (
            <div key={l} className="bg-forest-deep/40 px-4 py-5 sm:px-6">
              <dt className="font-heading text-2xl whitespace-nowrap text-gold sm:text-4xl">{n}</dt>
              <dd className="mt-1 text-[0.7rem] leading-snug text-muted-foreground sm:text-xs">{l}</dd>
            </div>
          ))}
        </motion.dl>
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
              src={IMG.salao}
              alt="Salão da barbearia com paredes de tijolo, três cadeiras de barbeiro e luminárias pendentes"
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
              src={IMG.ferramentas}
              alt="Máquinas, tesoura, pente e pomada sobre bancada de madeira"
              className="aspect-square size-full object-cover"
              loading="lazy"
            />
          </FadeUp>
        </FadeUp>

        <div>
          <FadeUp>
            <Eyebrow>A casa</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="mt-7 font-heading text-4xl leading-[1.05] tracking-[-0.015em] text-balance sm:text-[3.25rem]">
              Aprendi o ofício varrendo cabelo no chão da barbearia do{" "}
              <em className="text-gold-foil pr-[0.04em] font-normal">meu avô.</em>
            </h2>
          </FadeUp>
          <FadeUp
            delay={0.2}
            className="mt-9 max-w-[33rem] space-y-6 text-[1.02rem] leading-[1.8] text-pretty text-foreground/70"
          >
            {/* Capitular: a primeira letra abre o texto como numa matéria de revista */}
            <p className="first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-heading first-letter:text-[4.4rem] first-letter:leading-[0.78] first-letter:text-gold">
              Seu Antônio abriu duas cadeiras em Santos em 1968. Eu tinha nove anos quando ele me
              deixou segurar a navalha pela primeira vez, num pedaço de couro pendurado atrás da
              porta. A lição daquele dia foi que o corte começa muito antes da tesoura: começa
              quando você presta atenção em quem sentou na sua frente.
            </p>
            <p>
              A Corte Fino nasceu em 2011 com essa regra. Agenda espaçada, toalhas trocadas a cada
              cliente, lâmina nova em toda barba. Hoje somos quatro barbeiros e ainda atendemos na
              mesma esquina de Pinheiros, em cadeiras Ferrante restauradas uma a uma.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12 flex items-center gap-4 border-t border-gold/15 pt-8">
            <div className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-forest">
              <Scissors className="size-5 text-gold" />
            </div>
            <div>
              <p className="font-heading text-xl italic">Rafael Monteiro</p>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Fundador e barbeiro-chefe
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
              <Eyebrow>Serviços e valores</Eyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-7 font-heading text-4xl leading-[1.05] tracking-[-0.015em] text-balance sm:text-[3.25rem]">
                Três serviços. Todos feitos à mão,{" "}
                <em className="text-gold-foil pr-[0.04em] font-normal">nenhum com cronômetro.</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp
            delay={0.2}
            className="max-w-sm border-l border-gold/25 pl-5 text-sm leading-[1.75] text-pretty text-muted-foreground"
          >
            <p>
              Os valores incluem lavagem, toalha quente e finalização. Não cobramos à parte por
              pigmentação de barba ou sobrancelha na navalha.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {servicos.map((s, i) => (
            <FadeUp key={s.nome} delay={i * 0.14} duration={1.1}>
              <Card
                className="group/card-svc h-full gap-0 rounded-md border-0 bg-card py-0 ring-gold/12 backdrop-blur-xl transition-[translate,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_black] hover:ring-gold/35"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={s.imagem}
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
                    Nº {String(i + 1).padStart(2, "0")}
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
                    <span className="align-top text-sm text-gold">R$</span>{" "}
                    <span className="text-4xl">{s.preco}</span>
                  </p>
                  <motion.a
                    href={AGENDAR_URL}
                    whileTap={{ scale: 0.95 }}
                    className="group/res relative flex items-center gap-1.5 py-1 text-xs tracking-[0.2em] text-gold uppercase opacity-85 transition-opacity duration-500 hover:opacity-100"
                  >
                    Reservar
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

        <FadeUp delay={0.1} className="mt-6">
          <Card className="rounded-md border-0 bg-linear-to-r from-forest/80 via-card to-forest/60 py-0 ring-gold/30 backdrop-blur-xl">
            <div className="grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-10">
              <div>
                <p className="text-[0.65rem] tracking-[0.3em] text-gold uppercase">
                  O mais pedido aos sábados
                </p>
                <CardTitle className="mt-3 font-heading text-3xl font-medium sm:text-4xl">
                  Ritual Corte Fino
                </CardTitle>
                <CardDescription className="mt-3 max-w-2xl leading-relaxed text-foreground/70">
                  Corte degradê, barba completa com toalha quente, limpeza de pele com argila verde e
                  massagem de couro cabeludo. Noventa minutos, acompanhados de um café coado na hora
                  ou uma dose de bourbon.
                </CardDescription>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <p className="font-heading">
                  <span className="mr-2 text-lg text-muted-foreground line-through decoration-gold/50">
                    R$ 215
                  </span>
                  <span className="align-top text-sm text-gold">R$</span>{" "}
                  <span className="text-5xl">195</span>
                </p>
                <GoldButton href={AGENDAR_URL}>Reservar o ritual</GoldButton>
              </div>
            </div>
          </Card>
        </FadeUp>
      </div>
    </section>
  )
}

function Ritual() {
  return (
    <section id="ritual" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow className="reveal">O ritual da barba</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight sm:text-5xl">
            Quarenta minutos que o seu rosto vai sentir até a noite.
          </h2>
          <p className="reveal mt-6 max-w-md leading-relaxed text-foreground/70">
            A barba com toalha quente é o serviço que mais nos ensinou paciência. Não existe atalho:
            pele mal preparada irrita, e lâmina com pressa corta. Por isso ela segue sempre os mesmos
            quatro tempos.
          </p>
          <div className="reveal mt-10 overflow-hidden rounded-md shadow-[0_40px_80px_-30px_black]">
            <img
              src={IMG.tesoura}
              alt="Barbeiro aparando a barba de um cliente com tesoura, em preto e branco"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <ol className="relative space-y-4 lg:pt-24">
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.6rem] w-px bg-linear-to-b from-transparent via-gold/30 to-transparent lg:top-24"
          />
          {ritual.map((r, i) => (
            <li
              key={r.n}
              className="reveal relative flex gap-6 rounded-md border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-500 hover:border-gold/25 hover:bg-white/[0.05]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-background font-heading text-sm text-gold">
                {r.n}
              </span>
              <div>
                <h3 className="font-heading text-2xl">{r.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Depoimentos() {
  return (
    <section id="depoimentos" className="relative overflow-hidden py-28 sm:py-36">
      <img
        src={IMG.cadeira}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 size-full object-cover opacity-30"
        loading="lazy"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background/85 to-background" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="reveal justify-center">Quem senta na cadeira</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight sm:text-5xl">
            Sete em cada dez clientes voltam no mês seguinte.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <Card
              key={d.nome}
              className="reveal justify-between gap-8 rounded-md bg-forest-deep/45 px-0 py-8 ring-white/10 backdrop-blur-xl transition-all duration-500 hover:ring-gold/30"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <CardContent className="px-7">
                <div className="flex items-center justify-between">
                  <Quote className="size-7 text-gold/60" />
                  <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
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
                  <p className="text-xs text-muted-foreground">{d.cargo}</p>
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
          src={IMG.oficio}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-20 size-full object-cover"
          loading="lazy"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-forest-deep via-forest-deep/90 to-forest/50" />
        <div className="grid grid-cols-1 gap-10 p-6 sm:p-14 lg:grid-cols-[1.3fr_1fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow>Agenda da semana</Eyebrow>
            <h2 className="mt-6 font-heading text-4xl leading-tight sm:text-5xl">
              Quinta e sexta à noite lotam primeiro.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-foreground/75">
              Escolha o barbeiro, o serviço e o horário em menos de um minuto. Você recebe a
              confirmação no WhatsApp e um lembrete na véspera.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-md border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="flex items-start gap-3 text-sm">
              <Clock className="mt-0.5 size-4 text-gold" />
              <div className="text-foreground/80">
                <p>Terça a sexta, 10h às 21h</p>
                <p>Sábado, 9h às 18h</p>
                <p className="text-muted-foreground">Domingo e segunda, fechado</p>
              </div>
            </div>
            {/* No mobile o texto pode quebrar em duas linhas, com tracking menor, para não estourar o card */}
            <GoldButton
              href="https://wa.me/5511900000000"
              className="h-auto min-h-12 w-full py-3 text-center tracking-[0.12em] whitespace-normal sm:h-12 sm:py-0 sm:tracking-[0.2em] sm:whitespace-nowrap"
            >
              Agendar pelo WhatsApp <ArrowRight className="size-4" />
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="duvidas" className="border-t border-gold/10 bg-[oklch(0.12_0.012_165)]">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Eyebrow className="reveal">Dúvidas frequentes</Eyebrow>
          <h2 className="reveal mt-6 font-heading text-4xl leading-tight">
            O que costumam perguntar antes da primeira visita.
          </h2>
          <p className="reveal mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Não encontrou a sua? Mande uma mensagem. Quem responde é a Juliana, da recepção, quase
            sempre em menos de uma hora.
          </p>
        </div>

        <Accordion className="reveal" defaultValue={["faq-0"]}>
          {faq.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`} className="border-gold/12 not-last:border-b">
              <AccordionTrigger className="py-5 font-heading text-xl font-normal hover:text-gold hover:no-underline sm:text-[1.35rem] **:data-[slot=accordion-trigger-icon]:text-gold">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-[0.95rem] leading-relaxed text-muted-foreground">
                <p>{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-3xl">
              Corte <span className="text-gold-foil italic">Fino</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Barbearia desde 2011.</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">Endereço</p>
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              Rua dos Pinheiros, 1.240
              <br />
              Pinheiros, São Paulo
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">Horários</p>
            <p>Ter a sex · 10h às 21h</p>
            <p>Sáb · 9h às 18h</p>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="mb-3 text-[0.65rem] tracking-[0.3em] text-gold uppercase">Contato</p>
            <a href="tel:+5511900000000" className="flex items-center gap-2 transition-colors hover:text-gold">
              <Phone className="size-4" /> (11) 90000-0000
            </a>
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-gold">
              <AtSign className="size-4" /> cortefino.barbearia
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Corte Fino Barbearia. Fotografias: Unsplash.
          <br />
          Site de demonstração. Negócio, avaliações e depoimentos fictícios.
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
