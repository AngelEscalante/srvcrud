const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de transporte Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ejemplo: Gmail (puedes usar otros como Outlook, Yahoo, etc.)
  auth: {
    user: 'tu_correo@gmail.com', // Tu correo electrónico
    pass: 'tu_contraseña_de_aplicación', // Contraseña de aplicación
  },
});

// Endpoint para enviar correos
app.post('/api/send-email', (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({
      message: 'Los campos "to", "subject" y "text" o "html" son obligatorios.',
    });
  }

  // Configurar los datos del correo
  const mailOptions = {
    from: 'tu_correo@gmail.com', // Remitente
    to: to, // Destinatario
    subject: subject, // Asunto
    text: text, // Mensaje en texto plano
    html: html, // Mensaje en formato HTML
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ message: 'Error al enviar el correo.', error });
    }
    res.status(200).json({
      message: 'Correo enviado exitosamente.',
      info,
    });
  });
});

// Ruta de prueba para ver si el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
