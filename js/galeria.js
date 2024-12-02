let indiceActual = 0; 
function moverCarrusel(direccion) { 
	const imagenes = document.querySelector('.imagenes'); 
	const totalImagenes = imagenes.children.length; 
	indiceActual = (indiceActual + direccion + totalImagenes) % totalImagenes; 
	const porcentaje = -indiceActual * 100; 
	imagenes.style.transform = `translateX(${porcentaje}%)`; 
}