package com.example.masquepadelapp

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

// (Borramos PuntoJugada y RespuestaArbitro porque las tienes creadas por la carpeta en otro archivo)

// Estos dos, como son nuevos de hoy para el Login, los dejamos:
data class PeticionLogin(val email: String, val password: String)
data class RespuestaLogin(val mensaje: String, val token: String?, val error: String?)
data class UsuarioResponse(val id: Int, val nombre: String, val email: String, val rol: String)

interface MasquePadelApi {
    @POST("api/partidos/punto")
    fun enviarPuntoAlArbitro(@Body jugada: PuntoJugada): Call<RespuestaArbitro>

    @GET("api/usuarios/perfil/{id}")
    fun obtenerPerfilUsuario(@Path("id") userId: Int): Call<UsuarioResponse>

    @POST("api/usuarios/login")
    fun hacerLogin(@Body credenciales: PeticionLogin): Call<RespuestaLogin>
}