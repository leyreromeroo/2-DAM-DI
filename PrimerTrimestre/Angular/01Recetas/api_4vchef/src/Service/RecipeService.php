<?php

namespace App\Service;

use App\Entity\Receta;
use App\Entity\Ingrediente;
use App\Entity\Paso;
use App\Entity\RecetaNutriente;
use App\Entity\Valoracion;
use App\Repository\TipoRecetaRepository;
use App\Repository\TipoNutrienteRepository;
use Doctrine\ORM\EntityManagerInterface;

class RecipeService
{
    public function __construct(
        private EntityManagerInterface $em,
        private TipoRecetaRepository $tipoRepo,
        private TipoNutrienteRepository $nutrienteRepo
    ) {}

    /**
     * Lógica para crear una nueva receta con sus relaciones.
     */
    public function createRecipe(array $data): Receta
    {
        $tipo = $this->tipoRepo->find($data['type-id'] ?? null);
        if (!$tipo) {
            throw new \InvalidArgumentException('El tipo de receta no existe');
        }

        $receta = new Receta();
        $receta->setTitulo($data['title']);
        $receta->setFoto($data['foto'] ?? null);
        $receta->setComensales($data['number-diner']);
        $receta->setTipo($tipo);
        $receta->setDeleted(false);

        // Ingredientes
        foreach ($data['ingredients'] as $ingData) {
            $ingrediente = new Ingrediente();
            $ingrediente->setNombre($ingData['name']);
            $ingrediente->setCantidad($ingData['quantity']);
            $ingrediente->setUnidad($ingData['unit']);
            $receta->addIngrediente($ingrediente);
            $this->em->persist($ingrediente);
        }

        // Pasos
        foreach ($data['steps'] as $pasoData) {
            $paso = new Paso();
            $paso->setOrden($pasoData['order']);
            $paso->setDescripcion($pasoData['description']);
            $receta->addPaso($paso);
            $this->em->persist($paso);
        }

        // Nutrientes
        if (!empty($data['nutrients'])) {
            foreach ($data['nutrients'] as $nutData) {
                $tipoNutriente = $this->nutrienteRepo->find($nutData['type-id']);
                if (!$tipoNutriente) {
                    throw new \InvalidArgumentException('Uno de los tipos de nutriente no existe');
                }
                $recetaNutriente = new RecetaNutriente();
                $recetaNutriente->setNutriente($tipoNutriente);
                $recetaNutriente->setCantidad($nutData['quantity']);
                $recetaNutriente->setReceta($receta);
                $this->em->persist($recetaNutriente);
            }
        }

        $this->em->persist($receta);
        $this->em->flush();

        return $receta;
    }

    /**
     * Lógica de borrado lógico.
     */
    public function deleteRecipe(Receta $receta): void
    {
        $receta->setDeleted(true);
        $this->em->flush();
    }

    /**
     * Lógica de votación.
     */
    public function addRating(Receta $receta, int $rate, string $ip): Valoracion
    {
        $valoracion = new Valoracion();
        $valoracion->setReceta($receta);
        $valoracion->setIp($ip);
        $valoracion->setPuntuacion($rate);

        $this->em->persist($valoracion);
        $this->em->flush();

        return $valoracion;
    }
}
