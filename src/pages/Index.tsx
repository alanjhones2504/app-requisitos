import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, FileText, Zap, ArrowRight } from 'lucide-react';
import ProfileForm from '@/components/ProfileForm';
import RequirementsForm from '@/components/RequirementsForm';
import SummaryView from '@/components/SummaryView';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Index = () => {
  const [currentStep, setCurrentStep] = useState('home');
  const [profileData, setProfileData] = useState(null);
  const [requirementsData, setRequirementsData] = useState(null);

  const benefitsSectionRef = useRef(null);

  const benefits = [
    {
      icon: Users,
      title: "Melhor Qualificação",
      description: "Identifique rapidamente se o projeto se alinha com seus recursos"
    },
    {
      icon: FileText,
      title: "Documentação Estruturada",
      description: "Gere automaticamente um resumo organizado dos requisitos"
    },
    {
      icon: Zap,
      title: "Processo Otimizado",
      description: "Reduza o tempo de discovery e acelere o início dos projetos"
    }
  ];

  const handleProfileComplete = (data) => {
    setProfileData(data);
    setCurrentStep('requirements');
  };

  const handleRequirementsComplete = async (data) => {
    setRequirementsData(data);
    
    try {
      const docRef = await addDoc(collection(db, "project_requirements"), {
        profileData: profileData,
        requirementsData: data,
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setCurrentStep('summary');
  };

  const handleViewDemo = () => {
    if (benefitsSectionRef.current) {
      benefitsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentStep === 'profile') {
    return <ProfileForm onComplete={handleProfileComplete} />;
  }

  if (currentStep === 'requirements') {
    return <RequirementsForm profileData={profileData} onComplete={handleRequirementsComplete} />;
  }

  if (currentStep === 'summary') {
    return <SummaryView profileData={profileData} requirementsData={requirementsData} onRestart={() => setCurrentStep('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Simplifique seu processo de discovery
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Levantamento de
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Requisitos</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforme conversas iniciais em projetos bem estruturados. Nossa plataforma guia clientes através de um processo inteligente de coleta de requisitos, gerando documentação clara e análise preliminar de viabilidade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setCurrentStep('profile')}
              >
                Iniciar Levantamento
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
                onClick={handleViewDemo}
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div ref={benefitsSectionRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que usar nossa plataforma?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Otimize seu processo de discovery e melhore a qualidade dos seus projetos desde o primeiro contato
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-600">
              Um processo simples em 3 etapas para coletar e organizar todos os requisitos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Perfil & Contexto",
                description: "Colete informações básicas sobre o cliente e sua empresa para personalizar a experiência"
              },
              {
                step: "02", 
                title: "Requisitos Guiados",
                description: "Formulário inteligente com perguntas condicionais que se adaptam às respostas anteriores"
              },
              {
                step: "03",
                title: "Análise & Resumo",
                description: "Gere automaticamente um documento estruturado com análise preliminar de viabilidade"
              }
            ].map((process, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pronto para otimizar seu processo?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comece agora mesmo e veja como nossa plataforma pode transformar a forma como você coleta e organiza requisitos de projetos.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setCurrentStep('profile')}
          >
            Iniciar Agora
            <CheckCircle className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
