
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Globe, Smartphone, Monitor, ShoppingCart, Users, BarChart, Shield } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RequirementsFormProps {
  profileData: any;
  onComplete: (data: any) => void;
}

const RequirementsForm = ({ profileData, onComplete }: RequirementsFormProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    projectType: '',
    platforms: [],
    features: [],
    userTypes: [],
    designPreferences: '',
    technicalRequirements: '',
    integrations: [],
    dataRequirements: '',
    securityNeeds: [],
    performanceNeeds: '',
    maintenancePreferences: '',
    additionalInfo: ''
  });
  const { toast } = useToast();

  const sections = [
    "Tipo de Projeto",
    "Plataformas e Recursos",
    "Funcionalidades",
    "Design e Experiência",
    "Integrações e Dados",
    "Segurança e Performance"
  ];

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const renderSection = () => {
    switch(currentSection) {
      case 0: // Tipo de Projeto
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Que tipo de projeto você precisa?</Label>
              <RadioGroup value={formData.projectType} onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                {[
                  { value: 'website', label: 'Website Institucional', icon: Globe, desc: 'Site para apresentar sua empresa ou serviços' },
                  { value: 'webapp', label: 'Aplicação Web', icon: Monitor, desc: 'Sistema web com funcionalidades específicas' },
                  { value: 'mobileapp', label: 'Aplicativo Mobile', icon: Smartphone, desc: 'App para iOS e/ou Android' },
                  { value: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, desc: 'Loja online para vender produtos' },
                  { value: 'platform', label: 'Plataforma/Marketplace', icon: Users, desc: 'Sistema que conecta múltiplos usuários' },
                  { value: 'dashboard', label: 'Dashboard/BI', icon: BarChart, desc: 'Sistema para análise de dados e relatórios' }
                ].map(option => (
                  <div key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="flex items-center cursor-pointer font-medium">
                        <option.icon className="w-5 h-5 mr-2 text-blue-600" />
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 1: // Plataformas e Recursos
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Em quais plataformas deve funcionar?</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Web (Desktop)',
                  'Web (Mobile)',
                  'iOS App',
                  'Android App',
                  'Progressive Web App (PWA)',
                  'Desktop (Windows/Mac)'
                ].map(platform => (
                  <div key={platform} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={platform}
                      checked={formData.platforms.includes(platform)}
                      onCheckedChange={(checked) => handleArrayChange('platforms', platform, checked)}
                    />
                    <Label htmlFor={platform} className="cursor-pointer">{platform}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-4 block">Quantos usuários você espera?</Label>
              <Select value={formData.expectedUsers} onValueChange={(value) => setFormData(prev => ({ ...prev, expectedUsers: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Estimativa de usuários" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Até 100 usuários</SelectItem>
                  <SelectItem value="100-1k">100 - 1.000 usuários</SelectItem>
                  <SelectItem value="1k-10k">1.000 - 10.000 usuários</SelectItem>
                  <SelectItem value="10k-100k">10.000 - 100.000 usuários</SelectItem>
                  <SelectItem value="over-100k">Mais de 100.000 usuários</SelectItem>
                  <SelectItem value="not-sure">Não tenho certeza</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2: // Funcionalidades
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Que funcionalidades são essenciais?</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Sistema de Login/Cadastro',
                  'Pagamentos Online',
                  'Chat/Mensagens',
                  'Notificações Push',
                  'Upload de Arquivos',
                  'Busca/Filtros',
                  'Relatórios/Analytics',
                  'API/Integrações',
                  'Carrinho de Compras',
                  'Sistema de Reviews',
                  'Geolocalização',
                  'Calendário/Agendamento'
                ].map(feature => (
                  <div key={feature} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) => handleArrayChange('features', feature, checked)}
                    />
                    <Label htmlFor={feature} className="cursor-pointer">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="additionalFeatures" className="text-base font-semibold">Outras funcionalidades específicas</Label>
              <Textarea 
                id="additionalFeatures"
                value={formData.additionalFeatures}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalFeatures: e.target.value }))}
                placeholder="Descreva outras funcionalidades que não foram mencionadas acima"
                rows={3}
              />
            </div>
          </div>
        );

      case 3: // Design e Experiência
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Quem são os usuários principais?</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Consumidores finais',
                  'Empresas/B2B',
                  'Colaboradores internos',
                  'Administradores',
                  'Vendedores/Parceiros',
                  'Técnicos especialistas'
                ].map(userType => (
                  <div key={userType} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={userType}
                      checked={formData.userTypes.includes(userType)}
                      onCheckedChange={(checked) => handleArrayChange('userTypes', userType, checked)}
                    />
                    <Label htmlFor={userType} className="cursor-pointer">{userType}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="designPreferences" className="text-base font-semibold">Preferências de Design</Label>
              <Textarea 
                id="designPreferences"
                value={formData.designPreferences}
                onChange={(e) => setFormData(prev => ({ ...prev, designPreferences: e.target.value }))}
                placeholder="Descreva o estilo visual que você imagina: cores, referências, sites que admira, etc."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="brandGuidelines" className="text-base font-semibold">Você tem manual de marca ou logotipo?</Label>
              <Select value={formData.brandGuidelines} onValueChange={(value) => setFormData(prev => ({ ...prev, brandGuidelines: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Situação da identidade visual" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Tenho logotipo e manual de marca completo</SelectItem>
                  <SelectItem value="logo-only">Tenho apenas logotipo</SelectItem>
                  <SelectItem value="basic">Tenho algumas diretrizes básicas</SelectItem>
                  <SelectItem value="none">Não tenho nada, preciso criar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4: // Integrações e Dados
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Precisa integrar com algum sistema?</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'CRM (Salesforce, HubSpot, etc.)',
                  'ERP (SAP, Oracle, etc.)',
                  'Gateway de Pagamento',
                  'E-mail Marketing',
                  'Redes Sociais',
                  'Google Analytics',
                  'Sistemas de Estoque',
                  'APIs Terceiros'
                ].map(integration => (
                  <div key={integration} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={integration}
                      checked={formData.integrations.includes(integration)}
                      onCheckedChange={(checked) => handleArrayChange('integrations', integration, checked)}
                    />
                    <Label htmlFor={integration} className="cursor-pointer">{integration}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="dataRequirements" className="text-base font-semibold">Requisitos de Dados</Label>
              <Textarea 
                id="dataRequirements"
                value={formData.dataRequirements}
                onChange={(e) => setFormData(prev => ({ ...prev, dataRequirements: e.target.value }))}
                placeholder="Que tipo de dados serão armazenados? Há alguma regulamentação específica (LGPD, etc.)?"
                rows={3}
              />
            </div>
          </div>
        );

      case 5: // Segurança e Performance
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold mb-4 block">Requisitos de Segurança</Label>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Autenticação de dois fatores',
                  'Criptografia de dados',
                  'Auditoria de ações',
                  'Backup automático',
                  'Conformidade LGPD',
                  'Certificado SSL'
                ].map(security => (
                  <div key={security} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox 
                      id={security}
                      checked={formData.securityNeeds.includes(security)}
                      onCheckedChange={(checked) => handleArrayChange('securityNeeds', security, checked)}
                    />
                    <Label htmlFor={security} className="cursor-pointer">{security}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="performanceNeeds" className="text-base font-semibold">Requisitos de Performance</Label>
              <Textarea 
                id="performanceNeeds"
                value={formData.performanceNeeds}
                onChange={(e) => setFormData(prev => ({ ...prev, performanceNeeds: e.target.value }))}
                placeholder="Há algum requisito específico de velocidade, disponibilidade ou performance?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="additionalInfo" className="text-base font-semibold">Informações Adicionais</Label>
              <Textarea 
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                placeholder="Há algo mais que considera importante mencionar sobre o projeto?"
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Detalhes do Projeto
          </h1>
          <p className="text-lg text-gray-600">
            Agora vamos detalhar seus requisitos para criar a melhor solução
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-medium text-gray-700">
              {currentSection + 1} de {sections.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                index === currentSection
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : index < currentSection
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">{sections[currentSection]}</CardTitle>
            <CardDescription>
              Seção {currentSection + 1} de {sections.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderSection()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => currentSection > 0 ? setCurrentSection(currentSection - 1) : null}
                disabled={currentSection === 0}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              <Button 
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center"
              >
                {currentSection === sections.length - 1 ? 'Finalizar' : 'Próximo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequirementsForm;
