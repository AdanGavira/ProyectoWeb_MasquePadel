# 🎾 MasQuePadel - Proyecto Web

**Más Que Padel** es una aplicación Full-Stack desarrollada como proyecto integrador. Se trata de una plataforma web diseñada para el mundo del pádel, estructurando de manera profesional la gestión de usuarios, reservas y tienda.

Este proyecto destaca por el uso de buenas prácticas de desarrollo, separación de responsabilidades y su preparación para el despliegue en contenedores.

---

## 🛠️ Stack Tecnológico

El proyecto sigue una arquitectura distribuida:

### ⚙️ Backend
* **Entorno:** Node.js
* **Framework:** Express.js
* **Arquitectura:** Patrón **MVC** (Models, Views, Controllers) para mantener la lógica limpia y escalable.
* **Gestión de Paquetes:** npm

### 🖥️ Frontend
* **Tecnologías Front:** HTML5, CSS3, JavaScript.
* **Estructura:** Páginas modulares, estilos separados por componentes y recursos multimedia.

### 🐳 Infraestructura & Despliegue
* **Docker:** Uso de `Dockerfile` para empaquetar el servidor.
* **Orquestación:** `docker-compose.yml` en la raíz del proyecto para facilitar el levantamiento del entorno.

---

## 📁 Arquitectura del Proyecto

El código está dividido en módulos independientes para garantizar su mantenibilidad:

```text
📦 ProyectoWeb_MasquePadel
 ┣ 📂 backend/       # API REST y lógica de servidor (MVC)
 ┃ ┣ 📂 config/      # Configuración de BD y entorno
 ┃ ┣ 📂 controllers/ # Lógica de negocio de las rutas
 ┃ ┣ 📂 models/      # Esquemas de la base de datos
 ┃ ┣ 📂 routes/      # Definición de endpoints de la API
 ┃ ┗ 📜 server.js    # Punto de entrada de la app
 ┣ 📂 frontend/      # Vistas e interfaz de usuario
 ┃ ┣ 📂 pages/       # Vistas HTML principales
 ┃ ┣ 📂 css/ & js/   # Hojas de estilo y scripts
 ┃ ┗ 📂 shop/        # Módulo de tienda
 ┣ 📂 mobile/        # Base para futura integración móvil
 ┗ 📜 docker-compose.yml # Orquestador de contenedores
```

---

## 💻 Capturas de Pantalla

*(Nota: En GitHub, edita este archivo y arrastra aquí 2 capturas reales de tu web funcionando para que se vean directamente)*

---

## 👨‍💻 Autor

Desarrollado integralmente por **Adán Gavira Palacios** 
* 💼 **LinkedIn:** [Adán Gavira](https://www.linkedin.com/in/adan-gavira-palacios/)
* 🎓 Desarrollado como aplicación para el Grado Superior de Desarrollo de Aplicaciones Multiplataforma (DAM).