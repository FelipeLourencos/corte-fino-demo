/**
 * CONTEÚDO DO SITE
 * ================
 * Tudo o que é específico da barbearia fica neste arquivo: nome, contatos, textos,
 * serviços, preços, fotos e cores. Os componentes só leem daqui, então para montar o
 * site de um cliente novo basta editar este arquivo (veja o COMO-USAR.md).
 *
 * Dicas rápidas
 * - Campos marcados como "opcional" podem ser apagados ou deixados vazios ([] ou null):
 *   a seção correspondente some do site sem quebrar o layout.
 * - Fotos podem ser um endereço da internet (https://...) ou um arquivo dentro de
 *   public/, escrito a partir da barra. Ex.: public/fotos/salao.jpg vira "/fotos/salao.jpg".
 * - "alt" é a descrição da foto para leitores de tela e para o Google. Descreva o que
 *   aparece na imagem em uma frase curta.
 * - Se faltar algum campo obrigatório, o editor sublinha em vermelho e o
 *   `npm run build` acusa o erro.
 */

// ---------------------------------------------------------------------------
// Tipos (o "formulário" que o conteúdo precisa preencher). Não é preciso mexer aqui.
// ---------------------------------------------------------------------------

/** Uma foto com a sua descrição. */
export type Foto = {
  /** Endereço da imagem: "https://..." ou "/fotos/arquivo.jpg" (dentro de public/). */
  src: string
  /** Descrição curta do que aparece na foto. */
  alt: string
}

/**
 * Título com um trecho em destaque (itálico dourado) no final.
 * Ex.: { texto: "Três serviços. Todos feitos à mão,", destaque: "nenhum com cronômetro." }
 */
export type TituloComDestaque = {
  texto: string
  /** Opcional: trecho final em itálico dourado. */
  destaque?: string
}

export type Horario = {
  /** Como aparece na seção de agenda. Ex.: "Terça a sexta". */
  dias: string
  /** Versão curta, usada no rodapé. Ex.: "Ter a sex". */
  diasAbreviados: string
  /** Ex.: "10h às 21h". */
  horas: string
}

export type Servico = {
  nome: string
  descricao: string
  /** Preço em reais, só o número. Ex.: 120 */
  preco: number
  /** Ex.: "50 min" */
  duracao: string
  /** Itens incluídos, um por linha (aparecem como lista no card). */
  inclui: string[]
  foto: string
  /** Como o serviço aparece no menu "Serviços" do topo (só no computador). */
  menu: {
    /** Nome curto. Ex.: "Corte degradê" */
    titulo: string
    /** Uma linha de resumo. */
    detalhe: string
    /** Opcional: para onde o link leva. Padrão: a seção de serviços. */
    link?: string
  }
}

export type Pacote = {
  /** Frase pequena acima do nome. Ex.: "O mais pedido aos sábados" */
  chamada: string
  nome: string
  descricao: string
  /** Preço em reais, só o número. */
  preco: number
  /** Opcional: preço "de", mostrado riscado ao lado. */
  precoAntigo?: number
  /** Texto do botão. */
  botao: string
}

export type Depoimento = {
  nome: string
  /** Linha abaixo do nome. Ex.: "Advogado · cliente desde 2016" */
  descricao: string
  /** Foto do cliente (quadrada, aparece num círculo pequeno). */
  foto: string
  texto: string
}

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

/** Número de destaque no topo. Ex.: { valor: "4.9", legenda: "nota média em 1.312 avaliações" } */
export type NumeroDestaque = {
  valor: string
  legenda: string
}

export type Conteudo = {
  /** Dados do negócio */
  negocio: {
    nome: string
    /** Nome no logo: primeira parte normal + segunda parte em itálico dourado. */
    logo: TituloComDestaque
    /** Frase principal: vira o título grande do topo (o "destaque" sai em itálico dourado). */
    slogan: TituloComDestaque
    cidade: string
    bairro: string
    anoFundacao: number
    /** Endereço em duas linhas, como aparece no rodapé. */
    endereco: { linha1: string; linha2: string }
    /** Link do Google Maps (ou outro mapa). Deixe "" para o endereço não ser clicável. */
    linkMapa: string
    /** Como o telefone aparece no site. Ex.: "(11) 90000-0000" */
    telefone: string
    /** WhatsApp só com números: 55 + DDD + número. Ex.: "5511900000000" */
    whatsapp: string
    instagram: {
      /** Nome de usuário, sem @. */
      usuario: string
      /** Endereço do perfil. Ex.: "https://www.instagram.com/usuario/" */
      link: string
    }
    /** Símbolo da moeda que aparece antes dos preços. */
    moeda: string
  }

  /** Dias e horários de funcionamento, na ordem em que devem aparecer. */
  horarios: Horario[]
  /** Opcional: linha extra com os dias fechados (só aparece na seção de agenda). */
  diasFechados?: string

  /** Título e descrição da aba do navegador e do Google. */
  seo: {
    titulo: string
    descricao: string
    /** Cor da barra do navegador no celular (hex). */
    corTema: string
  }

  /** Cabeçalho (menu do topo) */
  cabecalho: {
    /** Texto pequeno ao lado do logo. Ex.: "est. 2011" */
    selo: string
    /** Nome do menu que abre a lista de serviços. */
    menuServicos: string
    /** Link no fim da lista de serviços. */
    menuVerTodos: string
    /** Demais links do menu. "link" é o id da seção, com # na frente. */
    links: { rotulo: string; link: string }[]
    botaoAgendar: string
  }

  /** Topo (primeira tela, com o vídeo) */
  topo: {
    /** Linha pequena acima do título. */
    chamada: string
    texto: string
    botaoPrincipal: string
    linkSecundario: string
    /** Opcional: números de destaque. Deixe [] para esconder o quadro. */
    numeros: NumeroDestaque[]
  }

  /** Seção "A Casa" (história) */
  casa: {
    chamada: string
    titulo: TituloComDestaque
    /** Um parágrafo por item. O primeiro começa com a letra grande dourada. */
    paragrafos: string[]
    assinatura: { nome: string; cargo: string }
    fotoPrincipal: Foto
    /** Foto menor sobreposta (aparece a partir do tablet). */
    fotoSecundaria: Foto
  }

  /** Seção de serviços e valores */
  servicos: {
    chamada: string
    titulo: TituloComDestaque
    /** Observação ao lado do título. */
    observacao: string
    /** Prefixo da numeração dos cards. Ex.: "Nº" vira "Nº 01". */
    prefixoNumero: string
    botaoReservar: string
    itens: Servico[]
  }

  /** Opcional: pacote em destaque abaixo dos serviços. Use null para esconder. */
  pacote: Pacote | null

  /** Seção do ritual (passo a passo) */
  ritual: {
    chamada: string
    titulo: string
    texto: string
    foto: Foto
    /** Cada passo vira um card numerado (01, 02, ...). */
    passos: { titulo: string; texto: string }[]
  }

  /** Opcional: depoimentos. Deixe "itens" vazio ([]) para esconder a seção e o link no menu. */
  depoimentos: {
    chamada: string
    titulo: string
    /** Foto de fundo da seção (aparece bem apagada). */
    fotoFundo: string
    /** Texto lido por leitores de tela no lugar das 5 estrelas. */
    rotuloEstrelas: string
    itens: Depoimento[]
  }

  /** Seção de agenda (chamada final para agendar) */
  agenda: {
    chamada: string
    titulo: string
    texto: string
    /** Texto do botão que abre o WhatsApp. */
    botao: string
    fotoFundo: string
  }

  /** Perguntas frequentes (ficam no rodapé) */
  perguntas: {
    chamada: string
    titulo: string
    texto: string
    itens: PerguntaFrequente[]
  }

  /** Rodapé */
  rodape: {
    /** Frase abaixo do logo. */
    descricao: string
    tituloEndereco: string
    tituloHorarios: string
    tituloContato: string
    /** Linha final, depois do "© ano". */
    direitos: string
    /** Opcional: aviso de site de demonstração. Use "" para esconder. */
    avisoDemonstracao: string
  }

  /** Mídia do topo (arquivos dentro de public/videos/) */
  midia: {
    video: string
    /** Imagem mostrada enquanto o vídeo carrega e para quem desativou animações. */
    capa: Foto
  }

  /**
   * Cores principais, no formato oklch(luminosidade croma matiz) ou hex (#c9a46c).
   * Os brilhos, sombras e o "ouro escovado" são calculados a partir do dourado.
   */
  cores: {
    dourado: string
    douradoClaro: string
    verde: string
    verdeEscuro: string
    grafite: string
  }
}

// ---------------------------------------------------------------------------
// Conteúdo da Corte Fino (site de demonstração). Edite daqui para baixo.
// ---------------------------------------------------------------------------

/** Atalho para fotos do Unsplash: id da foto + largura. */
const unsplash = (id: string, largura = 1600, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${largura}&q=80${extra}`

// ===== Dados do negócio =====
const negocio: Conteudo["negocio"] = {
  nome: "Corte Fino",
  logo: { texto: "Corte", destaque: "Fino" },
  slogan: { texto: "Cadeira de couro, navalha afiada e", destaque: "tempo para fazer direito." },
  cidade: "São Paulo",
  bairro: "Pinheiros",
  anoFundacao: 2011,
  endereco: { linha1: "Rua dos Pinheiros, 1.240", linha2: "Pinheiros, São Paulo" },
  linkMapa: "",
  telefone: "(11) 90000-0000",
  whatsapp: "5511900000000",
  instagram: {
    usuario: "cortefino.barbearia",
    // Perfil fictício na demonstração: o link fica sem destino
    link: "#",
  },
  moeda: "R$",
}

export const conteudo: Conteudo = {
  negocio,

  // ===== Horários de funcionamento =====
  horarios: [
    { dias: "Terça a sexta", diasAbreviados: "Ter a sex", horas: "10h às 21h" },
    { dias: "Sábado", diasAbreviados: "Sáb", horas: "9h às 18h" },
  ],
  diasFechados: "Domingo e segunda, fechado",

  // ===== Aba do navegador e Google =====
  seo: {
    titulo: `${negocio.nome} · Barbearia em ${negocio.bairro}`,
    descricao:
      "Corte degradê de alta precisão, barba com toalha quente e visagismo capilar em Pinheiros, São Paulo. Atendimento com hora marcada desde 2011.",
    corTema: "#0f1a15",
  },

  // ===== Cabeçalho =====
  cabecalho: {
    selo: `est. ${negocio.anoFundacao}`,
    menuServicos: "Serviços",
    menuVerTodos: "Tabela completa de valores",
    links: [
      { rotulo: "A Casa", link: "#casa" },
      { rotulo: "O Ritual", link: "#ritual" },
      { rotulo: "Clientes", link: "#depoimentos" },
      { rotulo: "Dúvidas", link: "#duvidas" },
    ],
    botaoAgendar: "Agendar",
  },

  // ===== Topo =====
  topo: {
    chamada: `${negocio.bairro} · ${negocio.cidade} · desde ${negocio.anoFundacao}`,
    texto:
      "Aqui cada atendimento dura o que precisa durar. Degradê acertado fio a fio, barba feita com toalha quente e uma conversa que ninguém tem pressa de terminar.",
    botaoPrincipal: "Agendar meu horário",
    linkSecundario: "Ver serviços e valores",
    // Opcional: deixe [] para esconder
    numeros: [
      { valor: "4.9", legenda: "nota média em 1.312 avaliações" },
      { valor: "45 min", legenda: "tempo mínimo por cliente" },
      { valor: "4", legenda: "barbeiros, nenhum aprendiz na cadeira" },
    ],
  },

  // ===== A Casa =====
  casa: {
    chamada: "A casa",
    titulo: {
      texto: "Aprendi o ofício varrendo cabelo no chão da barbearia do",
      destaque: "meu avô.",
    },
    paragrafos: [
      "Seu Antônio abriu duas cadeiras em Santos em 1968. Eu tinha nove anos quando ele me deixou segurar a navalha pela primeira vez, num pedaço de couro pendurado atrás da porta. A lição daquele dia foi que o corte começa muito antes da tesoura: começa quando você presta atenção em quem sentou na sua frente.",
      "A Corte Fino nasceu em 2011 com essa regra. Agenda espaçada, toalhas trocadas a cada cliente, lâmina nova em toda barba. Hoje somos quatro barbeiros e ainda atendemos na mesma esquina de Pinheiros, em cadeiras Ferrante restauradas uma a uma.",
    ],
    assinatura: { nome: "Rafael Monteiro", cargo: "Fundador e barbeiro-chefe" },
    fotoPrincipal: {
      src: unsplash("1585747860715-2ba37e788b70", 1400),
      alt: "Salão da barbearia com paredes de tijolo, três cadeiras de barbeiro e luminárias pendentes",
    },
    fotoSecundaria: {
      src: unsplash("1621605815971-fbc98d665033", 1200),
      alt: "Máquinas, tesoura, pente e pomada sobre bancada de madeira",
    },
  },

  // ===== Serviços =====
  servicos: {
    chamada: "Serviços e valores",
    titulo: { texto: "Três serviços. Todos feitos à mão,", destaque: "nenhum com cronômetro." },
    observacao:
      "Os valores incluem lavagem, toalha quente e finalização. Não cobramos à parte por pigmentação de barba ou sobrancelha na navalha.",
    prefixoNumero: "Nº",
    botaoReservar: "Reservar",
    itens: [
      {
        nome: "Corte degradê de alta precisão",
        descricao:
          "Antes de a máquina encostar, a gente lê o crescimento do seu cabelo e os redemoinhos. A transição é feita pente a pente, do zero ao dois, e a nuca e as costeletas fecham na navalha.",
        preco: 120,
        duracao: "50 min",
        inclui: ["Lavagem com shampoo de menta", "Acabamento à navalha", "Finalização com pomada seca"],
        foto: unsplash("1599351431202-1e0f0137899a", 1000),
        menu: { titulo: "Corte degradê", detalhe: "Transição pente a pente, acabamento à navalha" },
      },
      {
        nome: "Barba com toalha quente e óleos essenciais",
        descricao:
          "Três toalhas quentes amaciam o fio e abrem os poros. Espuma batida no pincel, lâmina nova a cada cliente e, para fechar, toalha fria com óleo de cedro e sândalo.",
        preco: 95,
        duracao: "40 min",
        inclui: ["Pré-barba com óleo de semente de uva", "Navalha com lâmina descartável", "Bálsamo pós-barba"],
        foto: unsplash("1532710093739-9470acff878f", 1000),
        menu: {
          titulo: "Barba com toalha quente",
          detalhe: "Três toalhas, navalha e óleo de cedro",
          link: "#ritual",
        },
      },
      {
        nome: "Visagismo capilar",
        descricao:
          "Para quem quer mudar e ainda não sabe para onde. Avaliamos formato do rosto, linha do maxilar, textura do fio e a sua rotina de manhã. Desenhamos corte e barba juntos e só depois executamos.",
        preco: 180,
        duracao: "75 min",
        inclui: ["Consulta com o barbeiro-chefe", "Corte e barba inclusos", "Guia de manutenção por escrito"],
        foto: unsplash("1590540179852-2110a54f813a", 1000),
        menu: { titulo: "Visagismo capilar", detalhe: "Corte e barba desenhados para o seu rosto" },
      },
    ],
  },

  // ===== Pacote em destaque (opcional: use null para esconder) =====
  pacote: {
    chamada: "O mais pedido aos sábados",
    nome: "Ritual Corte Fino",
    descricao:
      "Corte degradê, barba completa com toalha quente, limpeza de pele com argila verde e massagem de couro cabeludo. Noventa minutos, acompanhados de um café coado na hora ou uma dose de bourbon.",
    preco: 195,
    precoAntigo: 215,
    botao: "Reservar o ritual",
  },

  // ===== Ritual =====
  ritual: {
    chamada: "O ritual da barba",
    titulo: "Quarenta minutos que o seu rosto vai sentir até a noite.",
    texto:
      "A barba com toalha quente é o serviço que mais nos ensinou paciência. Não existe atalho: pele mal preparada irrita, e lâmina com pressa corta. Por isso ela segue sempre os mesmos quatro tempos.",
    foto: {
      src: unsplash("1517832606299-7ae9b720a186", 1200),
      alt: "Barbeiro aparando a barba de um cliente com tesoura, em preto e branco",
    },
    passos: [
      {
        titulo: "Toalha quente",
        texto: "Três trocas, cada uma a 60 °C, com algumas gotas de eucalipto. É aqui que o fio cede e o rosto relaxa.",
      },
      {
        titulo: "Espuma no pincel",
        texto: "Sabão de barbear batido à mão em pincel de texugo. A espuma levanta o pelo e protege a pele da lâmina.",
      },
      {
        titulo: "Navalha a favor do pelo",
        texto: "Primeira passada sempre no sentido do crescimento. A segunda só onde a pele permite, sem pressa.",
      },
      {
        titulo: "Toalha fria e óleo",
        texto: "Fecha os poros e assenta a pele. Terminamos com óleo de cedro e sândalo, que fica no rosto até o fim do dia.",
      },
    ],
  },

  // ===== Depoimentos (opcional: deixe itens: [] para esconder) =====
  depoimentos: {
    chamada: "Quem senta na cadeira",
    titulo: "Sete em cada dez clientes voltam no mês seguinte.",
    fotoFundo: unsplash("1512690459411-b9245aed614b", 2000),
    rotuloEstrelas: "5 de 5 estrelas",
    itens: [
      {
        nome: "Henrique Albuquerque",
        descricao: "Advogado · cliente desde 2016",
        foto: unsplash("1500648767791-00dcc994a43e", 240, "&h=240&crop=faces"),
        texto:
          "Corto com o Rafael há oito anos. Mudei de escritório duas vezes e de bairro uma, e continuo atravessando a cidade numa quinta à noite por causa daquela cadeira.",
      },
      {
        nome: "Thiago Ventura",
        descricao: "Arquiteto · cliente desde 2021",
        foto: unsplash("1506794778202-cad84cf45f1d", 240, "&h=240&crop=faces"),
        texto:
          "Cheguei pedindo um degradê qualquer. Saí com um corte que respeita o redemoinho com que eu brigava desde os doze anos. Foi a primeira vez que alguém olhou para a minha cabeça antes de ligar a máquina.",
      },
      {
        nome: "Daniel Okamoto",
        descricao: "Chef de cozinha · cliente desde 2019",
        foto: unsplash("1507003211169-0a1dd7228f2d", 240, "&h=240&crop=faces"),
        texto:
          "Passo catorze horas por dia numa cozinha quente. A barba com toalha quente de sábado é a única hora da semana em que eu desligo o telefone.",
      },
    ],
  },

  // ===== Agenda =====
  agenda: {
    chamada: "Agenda da semana",
    titulo: "Quinta e sexta à noite lotam primeiro.",
    texto:
      "Escolha o barbeiro, o serviço e o horário em menos de um minuto. Você recebe a confirmação no WhatsApp e um lembrete na véspera.",
    botao: "Agendar pelo WhatsApp",
    fotoFundo: unsplash("1622286342621-4bd786c2447c", 1000),
  },

  // ===== Perguntas frequentes =====
  perguntas: {
    chamada: "Dúvidas frequentes",
    titulo: "O que costumam perguntar antes da primeira visita.",
    texto:
      "Não encontrou a sua? Mande uma mensagem. Quem responde é a Juliana, da recepção, quase sempre em menos de uma hora.",
    itens: [
      {
        pergunta: "Preciso agendar ou posso chegar sem horário?",
        resposta:
          "Trabalhamos com hora marcada para que cada atendimento tenha o tempo que precisa. Se houver uma cadeira livre quando você chegar, atendemos com prazer, mas aos sábados isso é raro.",
      },
      {
        pergunta: "E se eu me atrasar?",
        resposta:
          "Seguramos o seu horário por até 10 minutos. Depois disso, tentamos encaixar no mesmo dia, mas não podemos atrasar o cliente seguinte.",
      },
      {
        pergunta: "Como cancelo ou remarco?",
        resposta: "Pelo WhatsApp, com pelo menos 3 horas de antecedência. Remarcações dentro desse prazo não têm custo.",
      },
      {
        pergunta: "Vocês atendem crianças?",
        resposta:
          "Sim, a partir de 8 anos e acompanhadas de um responsável. O corte infantil custa R$ 80 e dura cerca de 35 minutos.",
      },
      {
        pergunta: "Quais formas de pagamento vocês aceitam?",
        resposta:
          "Pix, cartões de débito e crédito (todas as bandeiras) e dinheiro. O Ritual Corte Fino pode ser parcelado em até 2x sem juros.",
      },
      {
        pergunta: "Tem onde estacionar?",
        resposta:
          "Temos convênio com o estacionamento da rua ao lado: as duas primeiras horas saem por nossa conta. É só mostrar o ticket no balcão.",
      },
    ],
  },

  // ===== Rodapé =====
  rodape: {
    descricao: `Barbearia desde ${negocio.anoFundacao}.`,
    tituloEndereco: "Endereço",
    tituloHorarios: "Horários",
    tituloContato: "Contato",
    direitos: `${negocio.nome} Barbearia. Fotografias: Unsplash.`,
    // Opcional: use "" para esconder
    avisoDemonstracao: "Site de demonstração. Negócio, avaliações e depoimentos fictícios.",
  },

  // ===== Vídeo e capa do topo =====
  midia: {
    video: "/videos/hero.mp4",
    capa: {
      src: "/videos/hero-poster.jpg",
      alt: "Barbeiro cortando o cabelo de um cliente na cadeira, em luz baixa",
    },
  },

  // ===== Cores =====
  cores: {
    dourado: "oklch(0.74 0.085 78)",
    douradoClaro: "oklch(0.83 0.06 82)",
    verde: "oklch(0.22 0.04 160)",
    verdeEscuro: "oklch(0.15 0.025 165)",
    grafite: "oklch(0.2 0.006 160)",
  },
}
