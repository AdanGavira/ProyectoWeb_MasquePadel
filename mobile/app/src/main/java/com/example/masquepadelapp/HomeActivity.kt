package com.example.masquepadelapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class HomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val btnIrPartido = findViewById<Button>(R.id.btnIrPartido)
        val btnIrReservas = findViewById<Button>(R.id.btnIrReservas)
        val btnCerrarSesion = findViewById<Button>(R.id.btnCerrarSesion)

        // 1. Botón "Empezar Partido" -> Nos lleva al Marcador (MainActivity)
        btnIrPartido.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }

        // 2. Botón "Reservas" -> Aún en obras
        btnIrReservas.setOnClickListener {
            Toast.makeText(this, "Próximamente: Conexión con Pistas", Toast.LENGTH_SHORT).show()
        }

        // 3. Botón "Cerrar Sesión" -> Nos devuelve al Login
        btnCerrarSesion.setOnClickListener {
            // (Si estuviéramos guardando el Token real en móvil, aquí lo borraríamos)
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish() // Destruimos el Dashboard para no poder volver atrás con la flecha
        }
    }
}