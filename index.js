const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Base de datos simulada
let items = []; // Arreglo para almacenar los datos
let currentId = 1;

// Rutas CRUD

// 1. Crear un nuevo elemento (Create)
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: 'El nombre y la descripción son requeridos.' });
  }
  const newItem = { id: currentId++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

// 2. Obtener todos los elementos (Read)
app.get('/api/items', (req, res) => {
  res.json(items);
});

// 3. Obtener un elemento por ID (Read)
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(i => i.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Elemento no encontrado.' });
  }
  res.json(item);
});

// 4. Actualizar un elemento por ID (Update)
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const itemIndex = items.findIndex(i => i.id === parseInt(id));
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Elemento no encontrado.' });
  }
  if (!name || !description) {
    return res.status(400).json({ message: 'El nombre y la descripción son requeridos.' });
  }
  items[itemIndex] = { id: parseInt(id), name, description };
  res.json(items[itemIndex]);
});

// 5. Eliminar un elemento por ID (Delete)
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex(i => i.id === parseInt(id));
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Elemento no encontrado.' });
  }
  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
