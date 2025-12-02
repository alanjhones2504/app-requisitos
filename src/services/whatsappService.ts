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
