package com.example.masquepadelapp  // (Deja la línea de tu paquete que venía arriba)

data class PuntoJugada(
    val partido_id: Int,
    val jugador_id: Int,
    val tipo_jugada: String,
    val set_num: Int,
    val juego_num: Int
)

// Y necesitamos crear la caja para recibir la respuesta de Node
data class RespuestaArbitro(
    val mensaje: String,
    val error: String? // Por si acaso falla algo
)