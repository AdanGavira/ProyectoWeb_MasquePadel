package com.example.masquepadelapp // (Deja tu línea)

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

    // ⚠️ LA IP SECRETA: En los móviles virtuales de Android Studio (Emuladores),
    // la palabra "localhost" no significa "tu ordenador", sino "el propio teléfono".
    // Para que el móvil virtual encuentre tu ordenador Windows (donde corre Docker),
    // Android inventó la IP especial: 10.0.2.2
    private const val BASE_URL = "http://10.0.2.2:4000/"

    val apiInterfaz: MasquePadelApi by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(MasquePadelApi::class.java)
    }
}