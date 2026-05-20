/**
 * Lógica para el menú de navegación (Menú Hamburguesa)
 */

function myFunction() {
    // Obtenemos el contenedor del menú usando su ID
    var x = document.getElementById("mi-menu");

    // Comprobamos si tiene solo la clase base "navbar"
    if (x.className === "navbar") {
        // Añadimos la clase "mostrar" para que se despliegue en móviles
        x.className += " mostrar";
    } else {
        // Lo devolvemos a su estado original para que se oculte
        x.className = "navbar";
    }
}