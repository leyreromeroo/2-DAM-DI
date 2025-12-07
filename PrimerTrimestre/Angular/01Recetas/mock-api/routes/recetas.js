const express = require('express');
const router = express.Router();

//Cargar los datos iniciales y hacerlo mutable (let) para simular la DB
const recetasIniciales = require('../mock-data/recetas.json');
let recetas = [...recetasIniciales]; // Creamos una copia en memoria

// ==========================================================
// 1. GET /recetas (Cargar todas)
// ==========================================================
router.get('/', (req, res) => {
    console.log('GET /recetas');
    res.json(recetas);
});

// ==========================================================
// 2. POST /recetas (Crear nueva receta)
// ==========================================================
router.post('/', (req, res) => {
    console.log('POST /recetas');
    // Generamos un ID único simple para MockAPI
    const nuevoId = 'R' + Date.now();

    // Creamos la nueva receta, asegurando que tenga el ID y los valores del body
    const nuevaReceta = {
        ...req.body,
        id: nuevoId,
        puntuacion: 0,
        votos: 0
    };

    recetas.push(nuevaReceta); // Añadir a la lista en memoria
    res.status(201).json(nuevaReceta); // Devolver la receta creada con status 201
});

// ==========================================================
// 3. PUT /recetas/:id (Valorar/Actualizar)
// ==========================================================
router.put('/:id', (req, res) => {
    console.log(`PUT /recetas/${req.params.id}`);
    const id = req.params.id;
    const index = recetas.findIndex(r => r.id === id);

    if (index !== -1) {
        // Sobrescribir la receta existente con el body (que contiene puntuacion y votos nuevos)
        recetas[index] = { ...recetas[index], ...req.body };
        res.json(recetas[index]); // Devolver la receta actualizada
    } else {
        res.status(404).json({ error: 'Receta no encontrada para actualizar' });
    }
});

// ==========================================================
// 4. DELETE /recetas/:id (Borrar)
// ==========================================================
router.delete('/:id', (req, res) => {
    console.log(`DELETE /recetas/${req.params.id}`);
    const id = req.params.id;
    const initialLength = recetas.length;

    // Filtramos la lista, eliminando la receta con ese ID
    recetas = recetas.filter(r => r.id !== id);

    if (recetas.length < initialLength) {
        res.status(204).send(); // Status 204: Eliminación exitosa
    } else {
        res.status(404).json({ error: 'Receta no encontrada para borrar' });
    }
});

module.exports = router;