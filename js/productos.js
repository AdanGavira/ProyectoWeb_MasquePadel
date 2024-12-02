
	
	function agregarAlCarrito(){
	//creamos dos objetos 

	//el primer objeto es la lista que contiene todos los items de la tienda
	//el segundo objeto es la lista que contiene todos los items del carrito
	var listaTienda = document.getElementById("listaTienda");
	var listaCarrito = document.getElementById("listaCarrito");

	//creamos un item del carrito vacio, 
	//que va a ser una opcion de la lista del carrito en el futuro
	var itemCarrito = document.createElement("option");

	//le asignamos un nombre a la opcion que va a contener
	//el texto de la opcion seleccionada de el objeto listaTienda
	itemCarrito.text = listaTienda.options[listaTienda.selectedIndex].text;
	//Agregamos a la lista del carrito la opcion creada previamente
	listaCarrito.add(itemCarrito);
	
}



