const express = require('express');
const cors = require('cors');
const recetasRouter = require('./routes/recetas');// Cargar el nuevo router

const app = express();
app.use(express.json());// Permite a Express leer JSON en peticiones POST/PUT
app.use(cors());// Habilita la comunicación entre el front(puerto de Angular 4200) y el mock-api(puerto de la API 3000)

// Usar el nuevo router en la ruta '/recetas'
app.use('/recetas', recetasRouter);

//Verificación de que el servidor funciona
app.get('/', (req, res) => {
  res.send('Mock API corriendo dentro del proyecto Angular 🚀');
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Mock API levantada en http://localhost:${PORT}`);
});
