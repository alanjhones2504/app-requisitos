import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services, ServiceType } from "@/types/services";
import { ArrowLeft } from "lucide-react";

interface ServiceSelectorProps {
  onSelectService: (serviceId: string) => void;
  onBack: () => void;
}

const ServiceSelector = ({ onSelectService, onBack }: ServiceSelectorProps) => {
  const categories = {
    web: { title: 'Web & Sites', color: 'from-blue-500 to-cyan-500' },
    mobile: { title: 'Mobile', color: 'from-purple-500 to-pink-500' },
    automation: { title: 'Automação', color: 'from-green-500 to-emerald-500' },
    development: { title: 'Desenvolvimento', color: 'from-orange-500 to-red-500' }
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ServiceType[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Escolha o Tipo de <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Serviço</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Selecione o serviço que melhor atende suas necessidades
          </p>
        </div>

        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className={`w-2 h-8 bg-gradient-to-b ${categories[category as keyof typeof categories].color} rounded mr-3`}></span>
              {categories[category as keyof typeof categories].title}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <Card 
                  key={service.id}
                  className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 hover:-translate-y-1"
                  onClick={() => onSelectService(service.id)}
                >
                  <CardHeader>
                    <div className="text-5xl mb-3">{service.icon}</div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.id);
                      }}
                    >
                      Selecionar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
