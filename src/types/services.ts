export interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'web' | 'mobile' | 'automation' | 'development';
}

export const services: ServiceType[] = [
  {
    id: 'landing-page',
    name: 'Landing Page de Alta Conversão',
    description: 'Página otimizada para capturar leads e converter visitantes',
    icon: '🎯',
    category: 'web'
  },
  {
    id: 'institutional-site',
    name: 'Site Institucional Premium',
    description: 'Site completo para apresentar sua empresa',
    icon: '🏢',
    category: 'web'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Completo',
    description: 'Loja online com gestão de produtos e pagamentos',
    icon: '🛒',
    category: 'web'
  },
  {
    id: 'portfolio',
    name: 'Portfólio Digital Profissional',
    description: 'Showcase profissional de trabalhos e projetos',
    icon: '💼',
    category: 'web'
  },
  {
    id: 'mobile-native',
    name: 'App Mobile Nativo',
    description: 'Aplicativo nativo para iOS e Android',
    icon: '📱',
    category: 'mobile'
  },
  {
    id: 'pwa',
    name: 'App PWA',
    description: 'Progressive Web App multiplataforma',
    icon: '⚡',
    category: 'mobile'
  },
  {
    id: 'whatsapp-automation',
    name: 'Automação de Vendas WhatsApp',
    description: 'Bot inteligente para vendas via WhatsApp',
    icon: '💬',
    category: 'automation'
  },
  {
    id: 'email-automation',
    name: 'Automação de E-mail Marketing',
    description: 'Sistema automatizado de campanhas de e-mail',
    icon: '📧',
    category: 'automation'
  },
  {
    id: 'chatbot',
    name: 'Chatbot Inteligente',
    description: 'Assistente virtual com IA para atendimento',
    icon: '🤖',
    category: 'automation'
  },
  {
    id: 'crm',
    name: 'Sistema de CRM Personalizado',
    description: 'Gestão de relacionamento com clientes',
    icon: '👥',
    category: 'development'
  },
  {
    id: 'financial-automation',
    name: 'Automação de Processos Financeiros',
    description: 'Sistema para automatizar fluxos financeiros',
    icon: '💰',
    category: 'development'
  },
  {
    id: 'mvp',
    name: 'MVP Development - Produto Mínimo Viável',
    description: 'Desenvolvimento rápido de protótipo funcional',
    icon: '🚀',
    category: 'development'
  },
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Software como Serviço escalável',
    icon: '☁️',
    category: 'development'
  }
];
