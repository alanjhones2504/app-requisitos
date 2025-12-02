// Serviço de email usando mailto (abre o cliente de email do usuário)
export const sendEmailWithPDF = async (
  pdfBlob: Blob,
  profileData: any,
  serviceData: any
) => {
  try {
    const subject = encodeURIComponent(`Requisitos - ${serviceData.serviceName} - ${profileData.name}`);
    const body = encodeURIComponent(
      `Olá,\n\nSegue o levantamento de requisitos:\n\n` +
      `Cliente: ${profileData.name}\n` +
      `Email: ${profileData.email}\n` +
      `Empresa: ${profileData.company || 'Não informado'}\n` +
      `Serviço: ${serviceData.serviceName}\n\n` +
      `Por favor, anexe o PDF que foi baixado.\n\n` +
      `Atenciosamente,\n${profileData.name}`
    );

    window.location.href = `mailto:webjhonesapp@gmail.com?subject=${subject}&body=${body}`;

    return { success: true };
  } catch (error) {
    console.error('Erro ao preparar email:', error);
    return { success: false, error };
  }
};

// Alternativa: Enviar dados via Firebase Functions ou backend
export const sendEmailViaBackend = async (
  profileData: any,
  serviceData: any,
  pdfUrl: string
) => {
  try {
    // Aqui você pode implementar uma Cloud Function do Firebase
    // ou um endpoint do seu backend para enviar emails
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'webjhonesapp@gmail.com',
        subject: `Requisitos - ${serviceData.serviceName}`,
        profileData,
        serviceData,
        pdfUrl
      })
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Erro ao enviar email via backend:', error);
    return { success: false, error };
  }
};
