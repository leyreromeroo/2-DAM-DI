# Recetas de Leyre

Este es un proyecto front-end desarrollado con **Angular**, diseñado para **gestionar y visualizar recetas**.

---

## Características Principales

Hemos mejorado las características iniciales implementando un patrón de **Gestión de Estado Reactiva** y un servidor de datos simulado.

* **Listado de Recetas**: Visualiza y navega por una lista de todas las recetas disponibles.
* **Gestión de Estado (RxJS)**: Utiliza el patrón `BehaviorSubject` para manejar el estado de las recetas de forma centralizada. Los datos se actualizan automáticamente en todos los componentes tras crear, votar o eliminar, garantizando un flujo de datos reactivo y eficiente.
* **Sistema de Filtrado Completo**:
    * **Búsqueda por Título.**
    * **Filtro por Valoración Mínima** (Rating).
    * **Filtro por Categoría** (Picar, Primeros, Segundos, Postres) activado desde el menú de navegación. Toda la lógica de filtrado se realiza en el frontend para una experiencia de usuario instantánea.
* **Simulación de Backend (Mock API)**: Incluye un servidor local basado en **Express.js** que simula las operaciones **CRUD** (Crear, Leer, Actualizar, Borrar) sobre un *array* de recetas en memoria.
* **Diseño Responsivo**: Interfaz adaptada para verse bien en dispositivos móviles y de escritorio (usando **Bootstrap**).
* **Tecnología Moderna**: Implementación utilizando la última sintaxis de Angular y **RxJS** para la reactividad.

---

## Requisitos

Necesitarás tener instalados los siguientes programas en tu computadora:

-   **Node.js** y **npm** (o Yarn)
-   **Angular CLI** (Interfaz de Línea de Comandos de Angular)

Puedes instalar Angular CLI globalmente con el siguiente comando si aún no lo tienes:

```bash
npm install -g @angular/cli
```

## Instalación y Ejecución

Sigue estos pasos para descargar, instalar las dependencias y ejecutar la aplicación en tu entorno local.

1. Clonar el repositorio:
```
git clone https://github.com/your-username/recetas-de-leyre.git
```

2. Instalar las dependencias:
```
cd recetas-de-leyre
npm install
```

3. Iniciar el servidor de desarrollo:
```
ng serve
```

4. Abre tu navegador y navega a `http://localhost:4200/` para acceder a la aplicación.

## Uso de la Aplicación

La aplicación permite a los usuarios interactuar con la lista de recetas de forma reactiva.

1.  **Ver y Filtrar Recetas**:
    * La aplicación muestra la lista inicial cargada desde el Mock API.
    * Puedes usar el campo **"Buscar receta"** o el filtro de **Valoración Mínima**.
    * Usa el menú desplegable **"Recetas"** en la navegación y haz clic en una categoría (`Picar`, `Primeros`, etc.) para filtrar instantáneamente la lista.

2.  **Crear una Nueva Receta**:
    * Haz clic en **"Crear receta"** para abrir el modal.
    * Completa el formulario (asegúrate de seleccionar la **Categoría** y subir una imagen en formato **JPG/JPEG**). La receta aparecerá inmediatamente en la lista.

3.  **Valorar una Receta**:
    * Haz clic en las estrellas de cualquier tarjeta para votar. El servicio actualizará el promedio de puntuación y el conteo de votos de forma instantánea.

4.  **Eliminar una Receta**:
    * Cada tarjeta de receta tiene un botón **"X"** (Eliminar) que borra la receta del servidor simulado y actualiza la lista.

## Estructura de Componentes

La organización de los componentes dentro de la carpeta `src/app/components/` se basa en la complejidad y la función de cada elemento, siguiendo un patrón modular similar al Atomic Design.

| Carpeta | Descripción | Ejemplos |
| :--- | :--- | :--- |
| **Molecula** | Componentes de tamaño medio que combinan varios elementos (o "átomos") para formar una unidad funcional coherente. | `receta` (El componente que muestra los detalles de una receta individual). |
| **Organismo** | Secciones complejas de la interfaz que agrupan varias Moléculas. Representan bloques de construcción de una página (ej. cabeceras, pies de página o formularios completos). | `navbar`, `footer`, `nueva-receta` (El formulario para añadir una nueva receta). |
| **Pagina** | Los componentes de nivel superior que representan las vistas o páginas completas de la aplicación. Orquestan los Organismos para definir la plantilla final de la interfaz. | `recetas` (La vista principal que lista todas las recetas). |

Esta separación facilita el mantenimiento, la reutilización de código y la escalabilidad del proyecto.

## Contribución

Si quieres contribuir al proyecto Recetas de Leyre, sigue estos pasos:

  1. Haz un fork del repositorio.
  2. Crea una nueva rama para tu funcionalidad o corrección de errores.
  3. Realiza tus cambios y haz commit.
  4. Haz push de tus cambios a tu repositorio fork.
  5. Envía un pull request al repositorio original.
