package com.example.masquepadelapp

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val inputEmail = findViewById<EditText>(R.id.inputEmail)
        val inputPassword = findViewById<EditText>(R.id.inputPassword)
        val txtEstado = findViewById<TextView>(R.id.txtEstadoLogin)

        btnLogin.setOnClickListener {
            val email = inputEmail.text.toString()
            val password = inputPassword.text.toString()

            if (email.isEmpty() || password.isEmpty()) {
                txtEstado.text = "Por favor, rellena todos los campos."
                return@setOnClickListener
            }

            txtEstado.text = "⏳ Verificando credenciales en la Nube..."
            txtEstado.setTextColor(Color.parseColor("#ffdd59")) // Amarillo

            // 1. Armamos el paquete para mandarlo a Node.js
            val credenciales = PeticionLogin(email, password)

            // 2. Enviamos el paquete por Retrofit (El Cartero Mágico)
            RetrofitClient.apiInterfaz.hacerLogin(credenciales).enqueue(object : Callback<RespuestaLogin> {

                // Si el cartero llega vivo del viaje...
                override fun onResponse(call: Call<RespuestaLogin>, response: Response<RespuestaLogin>) {
                    if (response.isSuccessful) {
                        // ¡LUZ VERDE! Contraseña correcta.
                        val datosServidor = response.body()

                        txtEstado.text = "✅ ¡Acceso Permitido!"
                        txtEstado.setTextColor(Color.parseColor("#0be881")) // Verde

                        // Aquí podríamos guardar el Token VIP (datosServidor?.token) en el móvil,
                        // para que no le pida login mañana. Pero para la prueba rápida, ¡saltamos de pantalla!

                        val intent = Intent(this@LoginActivity, HomeActivity::class.java)
                        startActivity(intent)
                        finish()

                    } else {
                        // LUZ ROJA: Email no existe o contraseña incorrecta (Error 401/404)
                        txtEstado.text = "🚨 Credenciales incorrectas."
                        txtEstado.setTextColor(Color.parseColor("#ff3f34")) // Rojo
                    }
                }

                // Si el cartero tiene un accidente (Docker apagado, sin internet...)
                override fun onFailure(call: Call<RespuestaLogin>, t: Throwable) {
                    txtEstado.text = "❌ Error de Red: Docker apagado o sin internet."
                    txtEstado.setTextColor(Color.parseColor("#ff3f34")) // Rojo
                }
            })
        }
    }
}