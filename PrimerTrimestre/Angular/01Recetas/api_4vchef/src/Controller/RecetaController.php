<?php

namespace App\Controller;

use App\Repository\RecetaRepository;
use App\Repository\ValoracionRepository;
use App\Service\RecipeService;
use App\Service\RecipeSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/recipes')]
class RecetaController extends AbstractController
{
    public function __construct(
        private RecipeService $recipeService,
        private RecipeSerializer $serializer
    ) {}

    #[Route('', name: 'get_recetas', methods: ['GET'])]
    public function index(Request $request, RecetaRepository $recetaRepo): JsonResponse
    {
        $filtroTipoId = $request->query->get('type');
        $criteria = ['deleted' => false];
        if ($filtroTipoId) {
            $criteria['tipo'] = $filtroTipoId;
        }
        
        $recetas = $recetaRepo->findBy($criteria);
        $data = array_map(fn($r) => $this->serializer->serialize($r), $recetas);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'get_receta_detalle', methods: ['GET'])]
    public function show(int $id, RecetaRepository $repo): JsonResponse
    {
        $receta = $repo->findOneBy(['id' => $id, 'deleted' => false]);
        if (!$receta) {
            return $this->json(['code' => 404, 'description' => 'Receta no encontrada'], 404);
        }

        return $this->json($this->serializer->serialize($receta));
    }

    #[Route('/{id}', name: 'delete_receta', methods: ['DELETE'])]
    public function delete(int $id, RecetaRepository $repo): JsonResponse
    {
        $receta = $repo->find($id);
        if (!$receta || $receta->isDeleted()) {
            return $this->json(['error' => 'Receta no encontrada'], 404);
        }

        $this->recipeService->deleteRecipe($receta);

        return $this->json($this->serializer->serialize($receta), 200);
    }

    #[Route('', name: 'create_receta', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validaciones básicas (pueden Ir a un Validator separado, pero aquí ya aligeran el controller)
        if (empty($data['title']) || empty($data['number-diner'])) {
            return $this->json(['code' => 400, 'description' => 'Faltan campos obligatorios'], 400);
        }

        try {
            $receta = $this->recipeService->createRecipe($data);
            return $this->json($this->serializer->serialize($receta), 201);
        } catch (\InvalidArgumentException $e) {
            return $this->json(['code' => 400, 'description' => $e->getMessage()], 400);
        }
    }

    #[Route('/{recipeId}/rating/{rate}', name: 'votar_receta', methods: ['POST'])]
    public function votar(
        int $recipeId, 
        int $rate, 
        Request $request, 
        ValoracionRepository $valoracionRepo, 
        RecetaRepository $recetaRepo
    ): JsonResponse
    {
        $receta = $recetaRepo->findOneBy(['id' => $recipeId, 'deleted' => false]);
        if (!$receta) {
            return $this->json(['code' => 404, 'description' => 'Receta no encontrada'], 404);
        }

        $ip = $request->getClientIp();
        if ($valoracionRepo->findOneBy(['receta' => $receta, 'ip' => $ip])) {
            return $this->json(['code' => 400, 'description' => 'Ya has votado esta receta'], 400);
        }

        $this->recipeService->addRating($receta, $rate, $ip);

        return $this->json($this->serializer->serialize($receta));
    }
}