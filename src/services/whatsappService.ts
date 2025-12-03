// Função para formatar todos os requisitos em uma mensagem completa
export const formatRequirementsMessage = (profileData: any, serviceData: any, questions: any[]) => {
  let message = `📋 *NOVO LEVANTAMENTO DE REQUISITOS*\n`;
  message += `${'='.repeat(50)}\n\n`;

  // Dados do Cliente
  message += `👤 *DADOS DO CLIENTE*\n`;
  message += `Nome: ${profileData.name}\n`;
  message += `Email: ${profileData.email}\n`;
  if (profileData.phone) message += `Telefone: ${profileData.phone}\n`;
  if (profileData.company) message += `Empresa: ${profileData.company}\n`;
  if (profileData.role) message += `Cargo: ${profileData.role}\n`;
  if (profileData.industry) message += `Setor: ${profileData.industry}\n`;
  if (profileData.companySize) message += `Tamanho da Empresa: ${profileData.companySize}\n`;
  if (profileData.budget) message += `Orçamento: ${profileData.budget}\n`;
  if (profileData.timeline) message += `Prazo: ${profileData.timeline}\n`;
  if (profileData.description) message += `Descrição: ${profileData.description}\n`;
  message += `\n`;

  // Serviço Selecionado
  message += `🎯 *SERVIÇO SELECIONADO*\n`;
  message += `${serviceData.serviceName}\n\n`;

  // Respostas do Questionário
  message += `❓ *RESPOSTAS DO QUESTIONÁRIO*\n`;
  message += `${'='.repeat(50)}\n\n`;

  questions.forEach((question, index) => {
    const answer = serviceData.answers?.[question.id];
    if (answer) {
      message += `*${index + 1}. ${question.question}*\n`;
      
      if (Array.isArray(answer)) {
        message += answer.map(item => `  • ${item}`).join('\n');
      } else {
        message += `${answer}`;
      }
      message += `\n\n`;
    }
  });

  message += `${'='.repeat(50)}\n`;
  message += `✅ Levantamento concluído em: ${new Date().toLocaleString('pt-BR')}\n`;
  message += `📱 Enviado via WebJhones Requirements`;

  return message;
};

// Função para enviar mensagem completa via WhatsApp
export const sendCompleteRequirementsWhatsApp = (
  profileData: any,
  serviceData: any,
  questions: any[]
) => {
  try {
    const phone = '5585997509578';
    const message = formatRequirementsMessage(profileData, serviceData, questions);
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    return { success: true, url: whatsappUrl };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return { success: false, error };
  }
};

// Serviço para enviar via WhatsApp usando API
export const sendWhatsAppMessage = async (
  pdfBlob: Blob,
  profileData: any,
  serviceData: any
) => {
  try {
    // Criar FormData para enviar o arquivo
    const formData = new FormData();
    formData.append('file', pdfBlob, 'requisitos.pdf');
    formData.append('phone', '5585997509578'); // Número com código do país
    formData.append('message', `📋 *Novo Levantamento de Requisitos*\n\n` +
      `👤 Cliente: ${profileData.name}\n` +
      `📧 Email: ${profileData.email}\n` +
      `🎯 Serviço: ${serviceData.serviceName}\n\n` +
      `Segue em anexo o PDF com todos os detalhes.`
    );

    // Você precisará configurar um backend ou usar um serviço como:
    // - WhatsApp Business API
    // - Evolution API
    // - Baileys
    // - Ou serviços como Twilio, MessageBird, etc.
    
    // Exemplo com endpoint próprio:
    // const response = await fetch('https://seu-backend.com/api/send-whatsapp', {
    //   method: 'POST',
    //   body: formData
    // });

    // Por enquanto, vamos apenas gerar o link do WhatsApp Web
    const phone = '5585997509578';
    const message = encodeURIComponent(
      `📋 *Novo Levantamento de Requisitos*\n\n` +
      `👤 Cliente: ${profileData.name}\n` +
      `📧 Email: ${profileData.email}\n` +
      `🎯 Serviço: ${serviceData.serviceName}\n\n` +
      `O PDF foi gerado e está pronto para download.`
    );
    
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    return { success: true, url: whatsappUrl };
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    return { success: false, error };
  }
};

// Função alternativa para enviar apenas notificação
export const notifyWhatsApp = (profileData: any, serviceData: any) => {
  const phone = '5585997509578';
  const message = encodeURIComponent(
    `📋 *Novo Levantamento de Requisitos*\n\n` +
    `👤 Cliente: ${profileData.name}\n` +
    `📧 Email: ${profileData.email}\n` +
    `📱 Telefone: ${profileData.phone || 'Não informado'}\n` +
    `🎯 Serviço: ${serviceData.serviceName}\n` +
    `🏢 Empresa: ${profileData.company || 'Não informado'}\n\n` +
    `✅ Questionário completo! Verifique o Firebase para mais detalhes.`
  );
  
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};
