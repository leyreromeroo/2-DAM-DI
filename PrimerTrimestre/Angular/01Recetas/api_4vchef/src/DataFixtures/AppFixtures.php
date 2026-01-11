<?php

namespace App\DataFixtures;

use App\Entity\TipoReceta;
use App\Entity\TipoNutriente;
use App\Entity\Receta;
use App\Entity\Ingrediente;
use App\Entity\Paso;
use App\Entity\RecetaNutriente;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // 1. Tipos de Receta fijos
        $tiposData = [
            ['nombre' => 'Picar', 'desc' => 'Recetas ligeras para picotear o entrantes rápidos.'],
            ['nombre' => 'Primeros', 'desc' => 'Platos principales de inicio como sopas, ensaladas o pastas.'],
            ['nombre' => 'Segundos', 'desc' => 'Platos contundentes de carne, pescado o legumbres.'],
            ['nombre' => 'Postres', 'desc' => 'Dulces y delicias para terminar la comida.'],
        ];

        $tiposEntities = [];
        foreach ($tiposData as $t) {
            $tipo = new TipoReceta();
            $tipo->setNombre($t['nombre']);
            $tipo->setDescripcion($t['desc']);
            $manager->persist($tipo);
            $tiposEntities[$t['nombre']] = $tipo;
        }

        // 2. Nutrientes fijos
        $nutrientesData = [
            ['nombre' => 'Calorías', 'unidad' => 'kcal'],
            ['nombre' => 'Proteínas', 'unidad' => 'g'],
            ['nombre' => 'Carbohidratos', 'unidad' => 'g'],
            ['nombre' => 'Grasas', 'unidad' => 'g'],
        ];

        $nutrientesEntities = [];
        foreach ($nutrientesData as $n) {
            $nutriente = new TipoNutriente();
            $nutriente->setNombre($n['nombre']);
            $nutriente->setUnidad($n['unidad']);
            $manager->persist($nutriente);
            $nutrientesEntities[$n['nombre']] = $nutriente;
        }

        // 3. Cargar Recetas de ejemplo
        $recetasMock = [
            [
                "titulo" => "Quesadillas de Pollo y Verduras",
                "categoria" => "Picar",
                "ingredientes" => ["Tortillas de trigo", "Pollo desmenuzado", "Queso cheddar"],
                "pasos" => ["Calentar sartén", "Añadir pollo y queso", "Doblar y dorar"],
                "calorias" => 450
            ],
            [
                "titulo" => "Ñoquis de Patata con Salchicha",
                "categoria" => "Primeros",
                "ingredientes" => ["Ñoquis", "Salchicha italiana", "Mantequilla", "Salvia"],
                "pasos" => ["Hervir agua", "Cocer ñoquis", "Saltear con mantequilla y salvia"],
                "calorias" => 620
            ],
            [
                "titulo" => "Penne Rigate a la Puttanesca",
                "categoria" => "Primeros",
                "ingredientes" => ["Penne", "Tomate", "Alcaparras", "Aceitunas"],
                "pasos" => ["Cocer pasta", "Preparar salsa sofrito", "Mezclar y servir"],
                "calorias" => 550
            ],
            [
                "titulo" => "Tortilla Rellena de Jamón y Queso",
                "categoria" => "Segundos",
                "ingredientes" => ["Huevos", "Jamón", "Queso"],
                "pasos" => ["Batir huevos", "Cuajar tortilla", "Rellenar y cerrar"],
                "calorias" => 380
            ]
        ];

        foreach ($recetasMock as $rData) {
            $receta = new Receta();
            $receta->setTitulo($rData['titulo']);
            $receta->setComensales(2);
            $receta->setTipo($tiposEntities[$rData['categoria']]);
            $receta->setDeleted(false);

            // Ingredientes
            foreach ($rData['ingredientes'] as $iNombre) {
                $ing = new Ingrediente();
                $ing->setNombre($iNombre);
                $ing->setCantidad(100);
                $ing->setUnidad('g');
                $receta->addIngrediente($ing);
                $manager->persist($ing);
            }

            // Pasos
            $orden = 1;
            foreach ($rData['pasos'] as $pDesc) {
                $paso = new Paso();
                $paso->setOrden($orden++);
                $paso->setDescripcion($pDesc);
                $receta->addPaso($paso);
                $manager->persist($paso);
            }

            // Nutriente Calorías
            $rn = new RecetaNutriente();
            $rn->setNutriente($nutrientesEntities['Calorías']);
            $rn->setCantidad($rData['calorias']);
            $rn->setReceta($receta);
            $manager->persist($rn);

            $manager->persist($receta);
        }

        $manager->flush();
    }
}
