# Configuração de Email e WhatsApp

## 📧 Envio Automático de Emails

Atualmente, o sistema abre o cliente de email padrão do usuário com os dados preenchidos. Para envio automático real, você tem 3 opções:

### Opção 1: EmailJS (Mais Simples)
1. Crie uma conta em [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email (Gmail, Outlook, etc.)
3. Crie um template de email
4. Instale a dependência:
   ```bash
   npm install @emailjs/browser
   ```
5. Configure as credenciais em `src/services/emailService.ts`

### Opção 2: Firebase Functions
1. Crie uma Cloud Function no Firebase
2. Use o Nodemailer ou SendGrid
3. Exemplo de função:
   ```javascript
   const functions = require('firebase-functions');
   const nodemailer = require('nodemailer');

   exports.sendEmail = functions.https.onCall(async (data, context) => {
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'seu-email@gmail.com',
         pass: 'sua-senha-app'
       }
     });

     await transporter.sendMail({
       from: 'seu-email@gmail.com',
       to: 'webjhonesapp@gmail.com',
       subject: data.subject,
       html: data.html,
       attachments: [{
         filename: 'requisitos.pdf',
         content: data.pdfBase64,
         encoding: 'base64'
       }]
     });
   });
   ```

### Opção 3: Backend Próprio
Crie um endpoint no seu backend que receba os dados e envie o email.

## 📱 Envio para WhatsApp

Atualmente, o sistema abre o WhatsApp Web com uma mensagem pré-formatada. Para envio automático de PDF, você precisa de uma API do WhatsApp:

### Opção 1: WhatsApp Business API (Oficial)
- Requer aprovação do Facebook
- Mais confiável e estável
- [Documentação](https://developers.facebook.com/docs/whatsapp)

### Opção 2: Evolution API (Open Source)
1. Instale a Evolution API:
   ```bash
   docker run -d \
     --name evolution-api \
     -p 8080:8080 \
     atendai/evolution-api
   ```
2. Configure o endpoint em `src/services/whatsappService.ts`
3. Exemplo de uso:
   ```javascript
   const response = await fetch('http://localhost:8080/message/sendMedia', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'apikey': 'SUA_API_KEY'
     },
     body: JSON.stringify({
       number: '5585997509578',
       mediatype: 'document',
       mimetype: 'application/pdf',
       caption: 'Requisitos do projeto',
       media: pdfBase64
     })
   });
   ```

### Opção 3: Baileys (Node.js)
- Biblioteca Node.js para WhatsApp Web
- Requer um backend Node.js
- [GitHub](https://github.com/WhiskeySockets/Baileys)

### Opção 4: Serviços Pagos
- **Twilio**: https://www.twilio.com/whatsapp
- **MessageBird**: https://www.messagebird.com/
- **Zenvia**: https://www.zenvia.com/

## 🔧 Configuração Atual

No momento, o sistema:
1. ✅ Gera o PDF automaticamente
2. ✅ Faz download do PDF
3. ✅ Abre WhatsApp Web com mensagem formatada
4. ✅ Abre cliente de email com dados preenchidos
5. ✅ Salva dados no Firebase

Para envio totalmente automático, escolha uma das opções acima e implemente conforme a documentação.

## 📝 Dados Salvos no Firebase

Todos os levantamentos são salvos automaticamente no Firestore na collection `project_requirements` com:
- Dados do perfil do cliente
- Serviço selecionado
- Todas as respostas do questionário
- Timestamp

Você pode acessar esses dados no console do Firebase.
