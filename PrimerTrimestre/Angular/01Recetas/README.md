# 4vChef - Plataforma de Gestión de Recetas Full Stack

![4vChef Banner](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Symfony](https://img.shields.io/badge/Symfony-000000?style=for-the-badge&logo=symfony&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-6B1F9F?style=for-the-badge&logo=openapi-initiative&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

**4vChef** es una aplicación web robusta y moderna diseñada para la gestión integral de recetas de cocina. El proyecto combina un backend potente en **Symfony** basado en una especificación **OpenAPI** estricta y un frontend dinámico desarrollado con **Angular**.

---

## Características Principales

### Backend (Symfony 7+)
- **Sincronización OpenAPI**: Implementación basada en contrato (`api-4v-chef-specifications.yaml`).
- **Arquitectura RESTful**: Endpoints optimizados para recetas, tipos de receta y nutrientes.
- **Validaciones Estrictas**:
  - Control de integridad en creación: obligatorio al menos 1 ingrediente y 1 paso.
  - Validación de existencia de tipos y nutrientes en base de datos.
- **Sistema de Votación con Control de IP**: Implementación de lógica anti-fraude que limita un voto por usuario/receta.
- **Borrado Lógico**: Sistema de persistencia que permite ocultar registros (`deleted = true`) sin eliminarlos físicamente de la DB.
- **Datos Maestros e Iniciales**: Inclusión de fixtures para tipos de receta, nutrientes y recetas base.

### Frontend (Angular 18+)
- **Gestión de Estado Reactiva**: Uso extensivo de `RxJS` y `BehaviorSubject` para un flujo de datos en tiempo real.
- **Formularios Dinámicos**: Implementación de `FormArray` en la creación de recetas para añadir ingredientes y pasos de forma interactiva.
- **Filtros Avanzados**:
  - Buscador predictivo por título.
  - Filtrado por rango de valoraciones (Promedio de estrellas).
  - Estructura preparada para filtrado por niveles calóricos.
- **Diseño Premium**: Interfaz moderna basada en **Bootstrap 5**, totalmente responsiva y optimizada para la experiencia de usuario (UX).

---

## Tecnologías Utilizadas

### Core
- **Angular**: Framework de frontend con sintaxis de señales e inputs modernos.
- **Symfony**: Framework de backend PHP para una API segura y escalable.
- **Doctrine ORM**: Gestión eficiente de la base de datos MySQL.
- **NelmioCorsBundle**: Configuración de seguridad CORS para comunicación entre dominios.

### API & Documentación
- **OpenAPI 3.0**: Definición estandarizada de la interfaz de la API.
- **HTTP Client**: Interacción asíncrona mediante observables.

---

## Estructura del Proyecto

### Directorios Clave
- `api_4vchef/`: Código fuente del Backend (Symfony).
  - `src/Controller/`: Controladores de la API (Recetas, Maestros).
  - `src/Entity/`: Modelos de datos (Receta, Paso, Ingrediente, Valoracion).
- `src/app/`: Código fuente del Frontend (Angular).
  - `components/Molecula/`: Componentes básicos reutilizables (Receta individual).
  - `components/Organismo/`: Componentes complejos (Formularios dinámicos).
  - `services/`: Lógica de comunicación con la API.

---

## Instalación y Configuración

### 1 Clonar el repositorio
```bash
git clone https://github.com/leyreromeroo/2-DAM-DI.git
cd 2-DAM-DI/PrimerTrimestre/Angular/01Recetas
```

### 2 Backend (api_4vchef)
```bash
cd api_4vchef
composer install
symfony console doctrine:database:create
symfony console doctrine:migrations:migrate
symfony console doctrine:fixtures:load --no-interaction
symfony serve -d
```

### 3️ Frontend (Angular)
```bash
# Regresar a la carpeta 01Recetas
npm install
ng serve
```
La aplicación estará disponible en `http://localhost:4200` y la API en `http://127.0.0.1:8000`.

---

## Convenciones de Commits
Este proyecto sigue la metodología de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
- `feat(...)`: Nuevas funcionalidades.
- `fix(...)`: Corrección de errores.
- `docs(...)`: Cambios en la documentación.

---

## Autor
Desarrollado por **Leyre Romero** como parte del módulo de Diseño de Interfaces y de Desarrollo Web (DAM 2).
