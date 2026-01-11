<?php

namespace App\Service;

use App\Entity\Receta;

class RecipeSerializer
{
    /**
     * Transforma una entidad Receta al formato JSON exacto requerido por el YAML.
     */
    public function serialize(Receta $receta): array
    {
        return [
            'id' => $receta->getId(),
            'title' => $receta->getTitulo(),
            'foto' => $receta->getFoto(),
            'number-diner' => $receta->getComensales(),
            'type' => [
                'id' => $receta->getTipo()->getId(),
                'name' => $receta->getTipo()->getNombre(),
                'description' => $receta->getTipo()->getDescripcion()
            ],
            'ingredients' => array_map(fn($i) => [
                'name' => $i->getNombre(),
                'quantity' => $i->getCantidad(),
                'unit' => $i->getUnidad()
            ], $receta->getIngredientes()->toArray()),
            'steps' => array_map(fn($p) => [
                'order' => $p->getOrden(),
                'description' => $p->getDescripcion()
            ], $receta->getPasos()->toArray()),
            'nutrients' => array_map(fn($n) => [
                'id' => $n->getId(),
                'type' => [
                    'id' => $n->getNutriente()->getId(),
                    'name' => $n->getNutriente()->getNombre(),
                    'unit' => $n->getNutriente()->getUnidad()
                ],
                'quantity' => $n->getCantidad()
            ], $receta->getRecetaNutrientes()->toArray()),
            'rating' => [
                'number-votes' => $receta->getValoraciones()->count(),
                'rating-avg' => $receta->getPromedioVotos()
            ]
        ];
    }
}
