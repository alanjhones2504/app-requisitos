import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Download, Mail, RotateCcw, User, Building2, Globe, Smartphone, Monitor, ShoppingCart, Users, BarChart, Shield, Star } from 'lucide-react';
import { ProfileFormData } from './ProfileForm';
import html2pdf from 'html2pdf.js';
import React, { useRef, useEffect, useState } from 'react';
import { services } from '@/types/services';
import { serviceQuestions } from '@/data/serviceQuestions';
import { notifyWhatsApp, sendCompleteRequirementsWhatsApp } from '@/services/whatsappService';
import { useToast } from '@/hooks/use-toast';

interface SummaryViewProps {
  profileData: ProfileFormData;
  requirementsData: any;
  onRestart: () => void;
}

const SummaryView = ({ profileData, requirementsData, onRestart }: SummaryViewProps) => {
  const summaryRef = useRef(null);
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const service = services.find(s => s.id === requirementsData?.serviceId);
  const questions = serviceQuestions[requirementsData?.serviceId] || [];

  // Enviar notificação automática ao carregar o resumo
  useEffect(() => {
    const sendNotifications = async () => {
      try {
        // Notificar via WhatsApp com todos os requisitos
        setTimeout(() => {
          sendCompleteRequirementsWhatsApp(profileData, requirementsData, questions);
        }, 1000);

        toast({
          title: "Requisitos enviados!",
          description: "Mensagem completa aberta no WhatsApp.",
        });
      } catch (error) {
        console.error('Erro ao enviar notificações:', error);
      }
    };

    sendNotifications();
  }, []);

  const getComplexityScore = () => {
    let score = 3; // Base score
    
    // Count answers
    const answerCount = Object.keys(requirementsData?.answers || {}).length;
    score += Math.floor(answerCount / 3);
    
    // Check for array answers (multiselect)
    Object.values(requirementsData?.answers || {}).forEach((answer: any) => {
      if (Array.isArray(answer)) {
        score += answer.length * 0.5;
      }
    });
    
    return Math.min(Math.round(score), 10);
  };

  const getComplexityLabel = (score: number) => {
    if (score <= 3) return { label: 'Baixa', color: 'bg-green-100 text-green-800' };
    if (score <= 6) return { label: 'Média', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Alta', color: 'bg-red-100 text-red-800' };
  };

  const complexityScore = getComplexityScore();
  const complexity = getComplexityLabel(complexityScore);

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (profileData.budget === 'not-defined') {
      recommendations.push('Definir um orçamento claro ajudará a priorizar funcionalidades essenciais');
    }
    
    if (complexityScore >= 7) {
      recommendations.push('Projeto de alta complexidade. Considere dividir em fases para melhor gestão');
    }
    
    if (profileData.timeline === 'asap') {
      recommendations.push('Prazo apertado pode impactar qualidade. Considere priorizar funcionalidades essenciais');
    }
    
    if (service?.category === 'mobile') {
      recommendations.push('Para apps mobile, considere começar com um MVP para validar a ideia');
    }
    
    if (service?.category === 'automation') {
      recommendations.push('Automações bem implementadas podem gerar ROI significativo em poucos meses');
    }
    
    return recommendations.slice(0, 3);
  };

  const handleDownloadPDF = async () => {
    if (summaryRef.current) {
      setIsSending(true);
      try {
        const opt = {
          margin: 10,
          filename: `requisitos_${profileData.name}_${Date.now()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Gerar PDF
        const pdfBlob = await html2pdf().from(summaryRef.current).set(opt).outputPdf('blob');
        
        // Fazer download local
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = opt.filename;
        link.click();
        URL.revokeObjectURL(url);

        toast({
          title: "PDF gerado com sucesso!",
          description: "O arquivo foi baixado e as notificações foram enviadas.",
        });

        // Enviar notificação via WhatsApp
        setTimeout(() => {
          notifyWhatsApp(profileData, requirementsData);
        }, 500);

      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        toast({
          title: "Erro ao gerar PDF",
          description: "Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      // Gerar PDF
      const opt = {
        margin: 10,
        filename: `requisitos_${profileData.name}_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const pdfBlob = await html2pdf().from(summaryRef.current).set(opt).outputPdf('blob');

      // Criar link mailto com informações
      const subject = encodeURIComponent(`Requisitos - ${requirementsData.serviceName} - ${profileData.name}`);
      const body = encodeURIComponent(
        `Olá,\n\nSegue o levantamento de requisitos:\n\n` +
        `Cliente: ${profileData.name}\n` +
        `Email: ${profileData.email}\n` +
        `Serviço: ${requirementsData.serviceName}\n\n` +
        `O PDF foi gerado e está anexado.\n\n` +
        `Atenciosamente,\n${profileData.name}`
      );

      window.location.href = `mailto:webjhonesapp@gmail.com?subject=${subject}&body=${body}`;

      toast({
        title: "Email preparado!",
        description: "Seu cliente de email foi aberto. Anexe o PDF baixado.",
      });

    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div ref={summaryRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <span className="text-4xl mr-3">{service?.icon}</span>
                  Visão Geral do Projeto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tipo de Serviço:</span>
                  <Badge variant="outline" className="text-sm">
                    {service?.name}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Categoria:</span>
                  <Badge variant="secondary" className="text-sm">
                    {service?.category === 'web' && 'Web & Sites'}
                    {service?.category === 'mobile' && 'Mobile'}
                    {service?.category === 'automation' && 'Automação'}
                    {service?.category === 'development' && 'Desenvolvimento'}
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

            {/* Requirements Answers */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Respostas do Questionário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question) => {
                  const answer = requirementsData?.answers?.[question.id];
                  if (!answer) return null;

                  return (
                    <div key={question.id}>
                      <span className="font-medium block mb-2">{question.question}</span>
                      {Array.isArray(answer) ? (
                        <div className="flex flex-wrap gap-2">
                          {answer.map((item, index) => (
                            <Badge key={index} variant="secondary">{item}</Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{answer}</p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleDownloadPDF}
                  disabled={isSending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isSending ? 'Gerando...' : 'Baixar PDF'}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleSendEmail}
                  disabled={isSending}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => sendCompleteRequirementsWhatsApp(profileData, requirementsData, questions)}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Enviar Requisitos Completos
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
