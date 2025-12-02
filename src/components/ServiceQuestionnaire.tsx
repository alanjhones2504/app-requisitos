import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Edit2, Eye } from 'lucide-react';
import { serviceQuestions, Question } from '@/data/serviceQuestions';
import { services } from '@/types/services';
import { ProfileFormData } from './ProfileForm';

interface ServiceQuestionnaireProps {
  serviceId: string;
  profileData: ProfileFormData;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const ServiceQuestionnaire = ({ serviceId, profileData, onComplete, onBack }: ServiceQuestionnaireProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const service = services.find(s => s.id === serviceId);
  const questions = serviceQuestions[serviceId] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelectChange = (questionId: string, option: string, checked: boolean) => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      return {
        ...prev,
        [questionId]: checked 
          ? [...current, option]
          : current.filter((item: string) => item !== option)
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion.required && !answers[currentQuestion.id]) {
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete({
        serviceId,
        serviceName: service?.name,
        answers
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
            className="text-base"
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder="Digite sua resposta"
            rows={4}
            className="text-base"
          />
        );

      case 'select':
        return (
          <Select 
            value={answers[question.id]} 
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup 
            value={answers[question.id]} 
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            <div className="space-y-3">
              {question.options?.map(option => (
                <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer flex-1">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case 'multiselect':
      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map(option => (
              <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={(answers[question.id] || []).includes(option)}
                  onCheckedChange={(checked) => handleMultiSelectChange(question.id, option, Boolean(checked))}
                />
                <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (!service || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xl text-gray-600">Serviço não encontrado ou sem perguntas configuradas.</p>
          <Button onClick={onBack} className="mt-4">Voltar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {service.name}
          </h1>
          <p className="text-lg text-gray-600">
            Responda as perguntas para personalizarmos sua proposta
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-medium text-gray-700">
              {currentQuestionIndex + 1} de {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentQuestion.question}
              {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
            </CardTitle>
            <CardDescription>
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              {renderQuestion(currentQuestion)}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentQuestionIndex === 0 ? 'Voltar' : 'Anterior'}
              </Button>
              <Button 
                type="button"
                onClick={handleNext}
                disabled={currentQuestion.required && !answers[currentQuestion.id]}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próximo'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Question Navigator */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                index === currentQuestionIndex
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110'
                  : answers[questions[index].id]
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Eye className="w-5 h-5 mr-2" />
                  Resumo das Respostas
                </CardTitle>
                <CardDescription>
                  {Object.keys(answers).length} de {questions.length} respondidas
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto space-y-4">
                {questions.map((question, index) => {
                  const answer = answers[question.id];
                  if (!answer) return null;

                  return (
                    <div key={question.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          Pergunta {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setCurrentQuestionIndex(index)}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        {question.question}
                      </p>
                      {Array.isArray(answer) ? (
                        <div className="flex flex-wrap gap-1">
                          {answer.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {answer}
                        </p>
                      )}
                    </div>
                  );
                })}
                
                {Object.keys(answers).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Suas respostas aparecerão aqui
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceQuestionnaire;
