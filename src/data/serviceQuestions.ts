export interface Question {
  id: string;
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox';
  options?: string[];
  required?: boolean;
}

export const serviceQuestions: Record<string, Question[]> = {
  'landing-page': [
    {
      id: 'objective',
      question: 'Qual o objetivo principal da landing page?',
      type: 'radio',
      options: [
        'Capturar leads (e-mails)',
        'Vender produto/serviço',
        'Inscrições para evento',
        'Download de material',
        'Agendamento de consulta'
      ],
      required: true
    },
    {
      id: 'target-audience',
      question: 'Quem é seu público-alvo?',
      type: 'textarea',
      required: true
    },
    {
      id: 'cta',
      question: 'Qual a ação principal que deseja que o visitante faça?',
      type: 'text',
      required: true
    },
    {
      id: 'sections',
      question: 'Quais seções deseja incluir?',
      type: 'multiselect',
      options: [
        'Hero com chamada principal',
        'Benefícios/Vantagens',
        'Depoimentos',
        'Preços',
        'FAQ',
        'Formulário de contato',
        'Vídeo explicativo',
        'Garantias'
      ]
    },
    {
      id: 'integrations',
      question: 'Precisa integrar com ferramentas de marketing?',
      type: 'multiselect',
      options: [
        'Google Analytics',
        'Facebook Pixel',
        'Google Ads',
        'Mailchimp',
        'RD Station',
        'HubSpot',
        'ActiveCampaign'
      ]
    }
  ],
  
  'institutional-site': [
    {
      id: 'pages',
      question: 'Quantas páginas o site terá?',
      type: 'select',
      options: ['1-5 páginas', '6-10 páginas', '11-20 páginas', 'Mais de 20 páginas'],
      required: true
    },
    {
      id: 'sections',
      question: 'Quais seções são essenciais?',
      type: 'multiselect',
      options: [
        'Home',
        'Sobre nós',
        'Serviços/Produtos',
        'Portfólio',
        'Blog',
        'Contato',
        'Equipe',
        'Depoimentos',
        'FAQ',
        'Área do cliente'
      ],
      required: true
    },
    {
      id: 'cms',
      question: 'Precisa atualizar conteúdo frequentemente?',
      type: 'radio',
      options: ['Sim, preciso de CMS', 'Não, conteúdo estático', 'Não tenho certeza'],
      required: true
    },
    {
      id: 'multilanguage',
      question: 'Precisa de múltiplos idiomas?',
      type: 'radio',
      options: ['Sim', 'Não', 'Talvez no futuro']
    },
    {
      id: 'features',
      question: 'Funcionalidades especiais necessárias?',
      type: 'multiselect',
      options: [
        'Formulário de contato',
        'Chat online',
        'Newsletter',
        'Busca interna',
        'Mapa interativo',
        'Galeria de fotos',
        'Vídeos',
        'Downloads'
      ]
    }
  ],

  'ecommerce': [
    {
      id: 'products-count',
      question: 'Quantos produtos pretende vender?',
      type: 'select',
      options: ['Até 50', '51-200', '201-1000', 'Mais de 1000'],
      required: true
    },
    {
      id: 'product-type',
      question: 'Tipo de produtos',
      type: 'radio',
      options: ['Físicos', 'Digitais', 'Serviços', 'Misto'],
      required: true
    },
    {
      id: 'payment-methods',
      question: 'Métodos de pagamento desejados',
      type: 'multiselect',
      options: [
        'Cartão de crédito',
        'Boleto',
        'PIX',
        'Carteira digital (PayPal, PagSeguro)',
        'Parcelamento',
        'Assinatura recorrente'
      ],
      required: true
    },
    {
      id: 'shipping',
      question: 'Como será o envio?',
      type: 'multiselect',
      options: [
        'Correios',
        'Transportadora',
        'Retirada local',
        'Entrega própria',
        'Não se aplica (produtos digitais)'
      ]
    },
    {
      id: 'features',
      question: 'Funcionalidades necessárias',
      type: 'multiselect',
      options: [
        'Carrinho de compras',
        'Wishlist',
        'Cupons de desconto',
        'Programa de pontos',
        'Reviews de produtos',
        'Comparador de produtos',
        'Rastreamento de pedidos',
        'Área do cliente',
        'Gestão de estoque',
        'Relatórios de vendas'
      ]
    }
  ],

  'portfolio': [
    {
      id: 'portfolio-type',
      question: 'Tipo de portfólio',
      type: 'radio',
      options: [
        'Fotografia',
        'Design',
        'Desenvolvimento',
        'Arquitetura',
        'Arte',
        'Vídeo/Cinema',
        'Outro'
      ],
      required: true
    },
    {
      id: 'projects-count',
      question: 'Quantos projetos deseja exibir inicialmente?',
      type: 'select',
      options: ['Até 10', '11-30', '31-50', 'Mais de 50']
    },
    {
      id: 'features',
      question: 'Funcionalidades desejadas',
      type: 'multiselect',
      options: [
        'Galeria de imagens',
        'Vídeos',
        'Filtros por categoria',
        'Lightbox/Modal',
        'Blog',
        'Formulário de contato',
        'Depoimentos de clientes',
        'Sobre mim/empresa',
        'Download de CV/Portfólio PDF'
      ]
    },
    {
      id: 'style',
      question: 'Estilo visual preferido',
      type: 'radio',
      options: ['Minimalista', 'Moderno/Arrojado', 'Clássico/Elegante', 'Criativo/Ousado']
    }
  ],

  'mobile-native': [
    {
      id: 'platforms',
      question: 'Para quais plataformas?',
      type: 'multiselect',
      options: ['iOS', 'Android'],
      required: true
    },
    {
      id: 'app-type',
      question: 'Tipo de aplicativo',
      type: 'radio',
      options: [
        'Rede social',
        'E-commerce',
        'Produtividade',
        'Entretenimento',
        'Educação',
        'Saúde/Fitness',
        'Delivery',
        'Outro'
      ],
      required: true
    },
    {
      id: 'authentication',
      question: 'Sistema de login necessário?',
      type: 'radio',
      options: ['Sim, obrigatório', 'Sim, opcional', 'Não'],
      required: true
    },
    {
      id: 'features',
      question: 'Funcionalidades principais',
      type: 'multiselect',
      options: [
        'Push notifications',
        'Câmera/Fotos',
        'Geolocalização/Mapas',
        'Pagamentos in-app',
        'Chat/Mensagens',
        'Compartilhamento social',
        'Modo offline',
        'Sincronização em nuvem',
        'Biometria',
        'QR Code'
      ]
    },
    {
      id: 'backend',
      question: 'Precisa de backend/servidor?',
      type: 'radio',
      options: ['Sim', 'Não', 'Já tenho']
    }
  ],

  'pwa': [
    {
      id: 'main-purpose',
      question: 'Propósito principal do PWA',
      type: 'textarea',
      required: true
    },
    {
      id: 'offline',
      question: 'Precisa funcionar offline?',
      type: 'radio',
      options: ['Sim, totalmente', 'Parcialmente', 'Não necessário'],
      required: true
    },
    {
      id: 'features',
      question: 'Funcionalidades necessárias',
      type: 'multiselect',
      options: [
        'Push notifications',
        'Instalação na tela inicial',
        'Sincronização em background',
        'Acesso à câmera',
        'Geolocalização',
        'Modo offline completo',
        'Compartilhamento',
        'Pagamentos'
      ]
    },
    {
      id: 'platforms',
      question: 'Plataformas prioritárias',
      type: 'multiselect',
      options: ['Desktop', 'Mobile Android', 'Mobile iOS', 'Tablet']
    }
  ],

  'whatsapp-automation': [
    {
      id: 'objective',
      question: 'Objetivo principal da automação',
      type: 'radio',
      options: [
        'Atendimento ao cliente',
        'Vendas',
        'Agendamentos',
        'Suporte técnico',
        'Marketing/Promoções',
        'Notificações'
      ],
      required: true
    },
    {
      id: 'volume',
      question: 'Volume estimado de mensagens/dia',
      type: 'select',
      options: ['Até 100', '100-500', '500-1000', 'Mais de 1000']
    },
    {
      id: 'features',
      question: 'Funcionalidades desejadas',
      type: 'multiselect',
      options: [
        'Respostas automáticas',
        'Menu interativo',
        'Integração com CRM',
        'Envio de mídia (imagens, PDFs)',
        'Catálogo de produtos',
        'Pagamentos',
        'Agendamento de mensagens',
        'Chatbot com IA',
        'Transferência para humano',
        'Relatórios e métricas'
      ]
    },
    {
      id: 'integration',
      question: 'Precisa integrar com outros sistemas?',
      type: 'textarea'
    }
  ],

  'email-automation': [
    {
      id: 'campaign-type',
      question: 'Tipo de campanhas',
      type: 'multiselect',
      options: [
        'Newsletter',
        'Promoções',
        'Carrinho abandonado',
        'Boas-vindas',
        'Aniversário',
        'Reengajamento',
        'Pós-venda',
        'Educacional/Curso'
      ],
      required: true
    },
    {
      id: 'list-size',
      question: 'Tamanho da lista de contatos',
      type: 'select',
      options: ['Até 1.000', '1.000-5.000', '5.000-10.000', 'Mais de 10.000']
    },
    {
      id: 'features',
      question: 'Funcionalidades necessárias',
      type: 'multiselect',
      options: [
        'Segmentação de listas',
        'A/B Testing',
        'Automação de fluxos',
        'Templates personalizados',
        'Relatórios avançados',
        'Integração com CRM',
        'Landing pages',
        'Formulários de captura',
        'Score de leads'
      ]
    },
    {
      id: 'platform',
      question: 'Já usa alguma plataforma?',
      type: 'text'
    }
  ],

  'chatbot': [
    {
      id: 'platform',
      question: 'Onde o chatbot será usado?',
      type: 'multiselect',
      options: [
        'Site',
        'WhatsApp',
        'Facebook Messenger',
        'Instagram',
        'Telegram',
        'App próprio'
      ],
      required: true
    },
    {
      id: 'purpose',
      question: 'Finalidade principal',
      type: 'radio',
      options: [
        'Atendimento ao cliente',
        'Vendas',
        'Suporte técnico',
        'FAQ',
        'Agendamentos',
        'Qualificação de leads'
      ],
      required: true
    },
    {
      id: 'ai-level',
      question: 'Nível de inteligência desejado',
      type: 'radio',
      options: [
        'Básico (respostas pré-definidas)',
        'Intermediário (reconhecimento de intenções)',
        'Avançado (IA com aprendizado)'
      ]
    },
    {
      id: 'features',
      question: 'Funcionalidades necessárias',
      type: 'multiselect',
      options: [
        'Processamento de linguagem natural',
        'Múltiplos idiomas',
        'Transferência para humano',
        'Integração com base de conhecimento',
        'Coleta de dados',
        'Agendamento',
        'Pagamentos',
        'Análise de sentimento'
      ]
    }
  ],

  'crm': [
    {
      id: 'company-size',
      question: 'Tamanho da equipe que usará o CRM',
      type: 'select',
      options: ['1-5 usuários', '6-20 usuários', '21-50 usuários', 'Mais de 50 usuários'],
      required: true
    },
    {
      id: 'main-modules',
      question: 'Módulos principais necessários',
      type: 'multiselect',
      options: [
        'Gestão de contatos',
        'Pipeline de vendas',
        'Gestão de tarefas',
        'Calendário/Agendamentos',
        'E-mail marketing',
        'Relatórios e dashboards',
        'Gestão de propostas',
        'Contratos',
        'Pós-venda',
        'Suporte/Tickets'
      ],
      required: true
    },
    {
      id: 'integrations',
      question: 'Integrações necessárias',
      type: 'multiselect',
      options: [
        'E-mail (Gmail, Outlook)',
        'WhatsApp',
        'Telefonia',
        'ERP',
        'E-commerce',
        'Redes sociais',
        'Ferramentas de pagamento',
        'Google Calendar'
      ]
    },
    {
      id: 'customization',
      question: 'Nível de personalização',
      type: 'radio',
      options: [
        'Básico (campos padrão)',
        'Médio (alguns campos customizados)',
        'Alto (totalmente personalizado)'
      ]
    }
  ],

  'financial-automation': [
    {
      id: 'processes',
      question: 'Quais processos deseja automatizar?',
      type: 'multiselect',
      options: [
        'Contas a pagar',
        'Contas a receber',
        'Conciliação bancária',
        'Emissão de notas fiscais',
        'Controle de fluxo de caixa',
        'Relatórios financeiros',
        'Cobranças',
        'Aprovações de despesas'
      ],
      required: true
    },
    {
      id: 'erp-integration',
      question: 'Usa algum ERP atualmente?',
      type: 'text'
    },
    {
      id: 'bank-integration',
      question: 'Precisa integrar com bancos?',
      type: 'radio',
      options: ['Sim', 'Não', 'Não tenho certeza']
    },
    {
      id: 'features',
      question: 'Funcionalidades adicionais',
      type: 'multiselect',
      options: [
        'Dashboard financeiro',
        'Previsão de fluxo de caixa',
        'Gestão de centros de custo',
        'Múltiplas empresas',
        'Múltiplas moedas',
        'Controle de estoque',
        'Gestão de contratos',
        'Alertas e notificações'
      ]
    }
  ],

  'mvp': [
    {
      id: 'idea',
      question: 'Descreva sua ideia em poucas palavras',
      type: 'textarea',
      required: true
    },
    {
      id: 'problem',
      question: 'Que problema seu produto resolve?',
      type: 'textarea',
      required: true
    },
    {
      id: 'target',
      question: 'Quem é seu público-alvo?',
      type: 'textarea',
      required: true
    },
    {
      id: 'core-features',
      question: 'Quais as 3-5 funcionalidades essenciais?',
      type: 'textarea',
      required: true
    },
    {
      id: 'timeline',
      question: 'Prazo desejado para lançamento',
      type: 'select',
      options: ['1-2 meses', '3-4 meses', '5-6 meses', 'Flexível']
    },
    {
      id: 'validation',
      question: 'Já validou a ideia com potenciais usuários?',
      type: 'radio',
      options: ['Sim', 'Parcialmente', 'Não']
    }
  ],

  'saas': [
    {
      id: 'saas-type',
      question: 'Tipo de SaaS',
      type: 'radio',
      options: [
        'B2B',
        'B2C',
        'B2B2C',
        'Marketplace'
      ],
      required: true
    },
    {
      id: 'description',
      question: 'Descreva o que seu SaaS fará',
      type: 'textarea',
      required: true
    },
    {
      id: 'pricing-model',
      question: 'Modelo de precificação',
      type: 'radio',
      options: [
        'Assinatura mensal',
        'Assinatura anual',
        'Freemium',
        'Pay-per-use',
        'Ainda não definido'
      ]
    },
    {
      id: 'features',
      question: 'Funcionalidades principais',
      type: 'multiselect',
      options: [
        'Multi-tenancy',
        'Diferentes planos',
        'API para integrações',
        'White label',
        'Analytics avançado',
        'Gestão de usuários',
        'Billing automatizado',
        'Onboarding guiado',
        'Suporte integrado',
        'Marketplace de add-ons'
      ]
    },
    {
      id: 'scale',
      question: 'Escala esperada',
      type: 'select',
      options: [
        'Até 100 usuários',
        '100-1.000 usuários',
        '1.000-10.000 usuários',
        'Mais de 10.000 usuários'
      ]
    }
  ]
};
