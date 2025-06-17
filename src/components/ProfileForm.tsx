
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  onComplete: (data: any) => void;
}

const ProfileForm = ({ onComplete }: ProfileFormProps) => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    companySize: '',
    industry: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userType || !formData.name || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    onComplete({ userType, ...formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vamos nos conhecer melhor
          </h1>
          <p className="text-lg text-gray-600">
            Algumas informações básicas para personalizar sua experiência
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Perfil</CardTitle>
            <CardDescription>
              Conte-nos um pouco sobre você e seu projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Você é:</Label>
                <RadioGroup value={userType} onValueChange={setUserType} className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client" className="flex items-center cursor-pointer">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Cliente / Pessoa Física
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="company" id="company" />
                    <Label htmlFor="company" className="flex items-center cursor-pointer">
                      <Building2 className="w-5 h-5 mr-2 text-purple-600" />
                      Empresa / Pessoa Jurídica
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input 
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">
                    {userType === 'company' ? 'Nome da Empresa' : 'Empresa (opcional)'}
                  </Label>
                  <Input 
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Nome da sua empresa"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo/Função</Label>
                  <Input 
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Ex: Diretor, Empreendedor, Gerente"
                  />
                </div>
              </div>

              {/* Company Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Tamanho da Empresa</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Pessoa Física</SelectItem>
                      <SelectItem value="micro">Micro (até 9 funcionários)</SelectItem>
                      <SelectItem value="small">Pequena (10-49 funcionários)</SelectItem>
                      <SelectItem value="medium">Média (50-249 funcionários)</SelectItem>
                      <SelectItem value="large">Grande (250+ funcionários)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Setor/Indústria</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tecnologia</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="healthcare">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                      <SelectItem value="finance">Financeiro</SelectItem>
                      <SelectItem value="retail">Varejo</SelectItem>
                      <SelectItem value="manufacturing">Manufatura</SelectItem>
                      <SelectItem value="services">Serviços</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Overview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento Estimado</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Faixa de orçamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-5k">Até R$ 5.000</SelectItem>
                      <SelectItem value="5k-15k">R$ 5.000 - R$ 15.000</SelectItem>
                      <SelectItem value="15k-50k">R$ 15.000 - R$ 50.000</SelectItem>
                      <SelectItem value="50k-100k">R$ 50.000 - R$ 100.000</SelectItem>
                      <SelectItem value="over-100k">Acima de R$ 100.000</SelectItem>
                      <SelectItem value="not-defined">Ainda não definido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Prazo Desejado</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Quando precisa ficar pronto?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">O mais rápido possível</SelectItem>
                      <SelectItem value="1-month">Até 1 mês</SelectItem>
                      <SelectItem value="3-months">Até 3 meses</SelectItem>
                      <SelectItem value="6-months">Até 6 meses</SelectItem>
                      <SelectItem value="flexible">Flexível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descreva brevemente sua ideia/projeto</Label>
                <Textarea 
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Conte-nos sobre o que você tem em mente. Não precisa ser muito detalhado, faremos isso juntos nas próximas etapas."
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileForm;
