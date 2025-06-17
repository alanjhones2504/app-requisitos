
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Mail, RotateCcw, User, Building2, Globe, Smartphone, Monitor, ShoppingCart, Users, BarChart, Shield, Star } from 'lucide-react';

interface SummaryViewProps {
  profileData: any;
  requirementsData: any;
  onRestart: () => void;
}

const SummaryView = ({ profileData, requirementsData, onRestart }: SummaryViewProps) => {
  const getProjectTypeIcon = (type: string) => {
    const icons = {
      website: Globe,
      webapp: Monitor,
      mobileapp: Smartphone,
      ecommerce: ShoppingCart,
      platform: Users,
      dashboard: BarChart
    };
    return icons[type] || Globe;
  };

  const getComplexityScore = () => {
    let score = 0;
    
    // Base score by project type
    const typeScores = {
      website: 1,
      webapp: 2,
      mobileapp: 3,
      ecommerce: 3,
      platform: 4,
      dashboard: 2
    };
    score += typeScores[requirementsData.projectType] || 1;
    
    // Add complexity based on features
    score += requirementsData.features?.length || 0;
    score += requirementsData.platforms?.length || 0;
    score += requirementsData.integrations?.length || 0;
    score += requirementsData.securityNeeds?.length || 0;
    
    return Math.min(score, 10);
  };

  const getComplexityLabel = (score: number) => {
    if (score <= 3) return { label: 'Baixa', color: 'bg-green-100 text-green-800' };
    if (score <= 6) return { label: 'Média', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Alta', color: 'bg-red-100 text-red-800' };
  };

  const complexityScore = getComplexityScore();
  const complexity = getComplexityLabel(complexityScore);
  const ProjectIcon = getProjectTypeIcon(requirementsData.projectType);

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (requirementsData.features?.includes('Sistema de Login/Cadastro')) {
      recommendations.push('Considere implementar autenticação social (Google, Facebook) para melhor experiência do usuário');
    }
    
    if (requirementsData.platforms?.includes('iOS App') && requirementsData.platforms?.includes('Android App')) {
      recommendations.push('Para reduzir custos, considere desenvolver um app híbrido (React Native ou Flutter)');
    }
    
    if (requirementsData.features?.includes('Pagamentos Online')) {
      recommendations.push('Integração com múltiplos gateways de pagamento pode aumentar a taxa de conversão');
    }
    
    if (profileData.budget === 'not-defined') {
      recommendations.push('Definir um orçamento claro ajudará a priorizar funcionalidades essenciais');
    }
    
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Levantamento Concluído
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resumo do Projeto
          </h1>
          <p className="text-lg text-gray-600">
            Aqui está um resumo estruturado de todos os requisitos coletados
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <ProjectIcon className="w-6 h-6 mr-3 text-blue-600" />
                  Visão Geral do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tipo de Projeto:</span>
                  <Badge variant="outline" className="text-sm">
                    {requirementsData.projectType === 'website' && 'Website Institucional'}
                    {requirementsData.projectType === 'webapp' && 'Aplicação Web'}
                    {requirementsData.projectType === 'mobileapp' && 'Aplicativo Mobile'}
                    {requirementsData.projectType === 'ecommerce' && 'E-commerce'}
                    {requirementsData.projectType === 'platform' && 'Plataforma/Marketplace'}
                    {requirementsData.projectType === 'dashboard' && 'Dashboard/BI'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Complexidade:</span>
                  <Badge className={complexity.color}>
                    {complexity.label} ({complexityScore}/10)
                  </Badge>
                </div>

                {profileData.description && (
                  <div>
                    <span className="font-medium block mb-2">Descrição:</span>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profileData.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client Profile */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  {profileData.userType === 'company' ? (
                    <Building2 className="w-5 h-5 mr-2 text-purple-600" />
                  ) : (
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                  )}
                  Perfil do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium">Nome:</span>
                  <p className="text-gray-600">{profileData.name}</p>
                </div>
                <div>
                  <span className="font-medium">Email:</span>
                  <p className="text-gray-600">{profileData.email}</p>
                </div>
                {profileData.company && (
                  <div>
                    <span className="font-medium">Empresa:</span>
                    <p className="text-gray-600">{profileData.company}</p>
                  </div>
                )}
                {profileData.role && (
                  <div>
                    <span className="font-medium">Cargo:</span>
                    <p className="text-gray-600">{profileData.role}</p>
                  </div>
                )}
                {profileData.industry && (
                  <div>
                    <span className="font-medium">Setor:</span>
                    <p className="text-gray-600">{profileData.industry}</p>
                  </div>
                )}
                {profileData.companySize && (
                  <div>
                    <span className="font-medium">Tamanho:</span>
                    <p className="text-gray-600">{profileData.companySize}</p>
                  </div>
                )}
                {profileData.budget && (
                  <div>
                    <span className="font-medium">Orçamento:</span>
                    <p className="text-gray-600">
                      {profileData.budget === 'under-5k' && 'Até R$ 5.000'}
                      {profileData.budget === '5k-15k' && 'R$ 5.000 - R$ 15.000'}
                      {profileData.budget === '15k-50k' && 'R$ 15.000 - R$ 50.000'}
                      {profileData.budget === '50k-100k' && 'R$ 50.000 - R$ 100.000'}
                      {profileData.budget === 'over-100k' && 'Acima de R$ 100.000'}
                      {profileData.budget === 'not-defined' && 'Ainda não definido'}
                    </p>
                  </div>
                )}
                {profileData.timeline && (
                  <div>
                    <span className="font-medium">Prazo:</span>
                    <p className="text-gray-600">
                      {profileData.timeline === 'asap' && 'O mais rápido possível'}
                      {profileData.timeline === '1-month' && 'Até 1 mês'}
                      {profileData.timeline === '3-months' && 'Até 3 meses'}
                      {profileData.timeline === '6-months' && 'Até 6 meses'}
                      {profileData.timeline === 'flexible' && 'Flexível'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Technical Requirements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Requisitos Técnicos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {requirementsData.platforms?.length > 0 && (
                  <div>
                    <span className="font-medium block mb-2">Plataformas:</span>
                    <div className="flex flex-wrap gap-2">
                      {requirementsData.platforms.map((platform, index) => (
                        <Badge key={index} variant="secondary">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {requirementsData.features?.length > 0 && (
                  <div>
                    <span className="font-medium block mb-2">Funcionalidades:</span>
                    <div className="flex flex-wrap gap-2">
                      {requirementsData.features.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {requirementsData.integrations?.length > 0 && (
                  <div>
                    <span className="font-medium block mb-2">Integrações:</span>
                    <div className="flex flex-wrap gap-2">
                      {requirementsData.integrations.map((integration, index) => (
                        <Badge key={index} variant="secondary">{integration}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {requirementsData.securityNeeds?.length > 0 && (
                  <div>
                    <span className="font-medium block mb-2">Requisitos de Segurança:</span>
                    <div className="flex flex-wrap gap-2">
                      {requirementsData.securityNeeds.map((need, index) => (
                        <Badge key={index} className="bg-red-100 text-red-800">{need}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {requirementsData.userTypes?.length > 0 && (
                  <div>
                    <span className="font-medium block mb-2">Tipos de Usuário:</span>
                    <div className="flex flex-wrap gap-2">
                      {requirementsData.userTypes.map((type, index) => (
                        <Badge key={index} variant="outline">{type}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Information */}
            {(requirementsData.designPreferences || requirementsData.dataRequirements || requirementsData.performanceNeeds || requirementsData.additionalInfo) && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Informações Adicionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requirementsData.designPreferences && (
                    <div>
                      <span className="font-medium block mb-2">Preferências de Design:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{requirementsData.designPreferences}</p>
                    </div>
                  )}
                  
                  {requirementsData.dataRequirements && (
                    <div>
                      <span className="font-medium block mb-2">Requisitos de Dados:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{requirementsData.dataRequirements}</p>
                    </div>
                  )}
                  
                  {requirementsData.performanceNeeds && (
                    <div>
                      <span className="font-medium block mb-2">Requisitos de Performance:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{requirementsData.performanceNeeds}</p>
                    </div>
                  )}
                  
                  {requirementsData.additionalInfo && (
                    <div>
                      <span className="font-medium block mb-2">Informações Adicionais:</span>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{requirementsData.additionalInfo}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Resumo PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button variant="outline" className="w-full" onClick={onRestart}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Novo Levantamento
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generateRecommendations().map((recommendation, index) => (
                    <div key={index} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                      <p className="text-sm text-yellow-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Health */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Análise do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Definição de Escopo</span>
                  <Badge className="bg-green-100 text-green-800">Boa</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Viabilidade Técnica</span>
                  <Badge className="bg-green-100 text-green-800">Alta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Alinhamento Orçamento</span>
                  <Badge className={profileData.budget === 'not-defined' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                    {profileData.budget === 'not-defined' ? 'A definir' : 'Adequado'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Complexidade</span>
                  <Badge className={complexity.color}>{complexity.label}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
