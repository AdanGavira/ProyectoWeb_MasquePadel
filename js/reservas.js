function reservar(celda) { 
    if (celda.classList.contains('available')) { 
        celda.classList.remove('available'); 
        celda.classList.add('reserved'); 
        celda.textContent = 'Reservado'; 
    } else { 
        celda.classList.remove('reserved'); 
        celda.classList.add('available'); 
        celda.textContent = 'Disponible'; 
    } 
}
