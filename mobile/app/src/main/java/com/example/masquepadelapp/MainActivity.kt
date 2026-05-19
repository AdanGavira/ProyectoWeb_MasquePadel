package com.example.masquepadelapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    // --- VARIABLES DE ESTADO DEL PARTIDO (El Cerebro) ---
    // Secuencia de puntos en pádel: 0, 15, 30, 40, AD (Ventaja)
    val puntosSecuencia = listOf("0", "15", "30", "40", "AD")

    // Contadores Pareja 1 (Local)
    var indexPuntosP1 = 0
    var juegosP1 = 0
    var setsP1 = 0

    // Contadores Pareja 2 (Visitante)
    var indexPuntosP2 = 0
    var juegosP2 = 0
    var setsP2 = 0

    // Referencias a los elementos de la pantalla
    private lateinit var txtPuntosP1: TextView
    private lateinit var txtPuntosP2: TextView
    private lateinit var txtJuegosP1: TextView
    private lateinit var txtJuegosP2: TextView
    private lateinit var txtEstadoServer: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 1. Enlazamos los controles gráficos del XML
        txtPuntosP1 = findViewById(R.id.txtPuntosPareja1)
        txtPuntosP2 = findViewById(R.id.txtPuntosPareja2)
        txtJuegosP1 = findViewById(R.id.txtJuegosPareja1)
        txtJuegosP2 = findViewById(R.id.txtJuegosPareja2)
        txtEstadoServer = findViewById(R.id.txtEstadoServer)

        val btnPuntoP1 = findViewById<Button>(R.id.btnPuntoPareja1)
        val btnPuntoP2 = findViewById<Button>(R.id.btnPuntoPareja2)

        // 2. Acción: Anota Punto la Pareja 1
        btnPuntoP1.setOnClickListener {
            calcularPunto(ganador = 1)
            // (1 = ID ficticio del equipo local, 8 = ID de tu jugador real que mete en BBDD)
            enviarHaciaServidorNode("Punto Ganado - Pareja 1", 8)
        }

        // 3. Acción: Anota Punto la Pareja 2
        btnPuntoP2.setOnClickListener {
            calcularPunto(ganador = 2)
            enviarHaciaServidorNode("Punto Ganado - Pareja 2", 2) // Asignamos a un jugador rival ficticio
        }
    }

    // ------------------------------------------------------------------------
    // MOTOR MATEMÁTICO DEL PÁDEL
    // ------------------------------------------------------------------------
    private fun calcularPunto(ganador: Int) {
        if (ganador == 1) {
            when {
                indexPuntosP1 < 3 -> indexPuntosP1++ // De 0 a 15, 30, 40
                indexPuntosP1 == 3 && indexPuntosP2 < 3 -> ganarJuego(1) // Tenía 40 y el otro no
                indexPuntosP1 == 3 && indexPuntosP2 == 3 -> indexPuntosP1++ // 40 iguales -> Pasa a Ventaja (AD)
                indexPuntosP1 == 3 && indexPuntosP2 == 4 -> indexPuntosP2-- // Rival tenía V, ahora vuelven a 40-40 (Deuce)
                indexPuntosP1 == 4 -> ganarJuego(1) // Ya tenía AD (Ventaja) y hace punto -> Gana Juego
            }
        } else {
            // Lo mismo, pero si gana la Pareja 2
            when {
                indexPuntosP2 < 3 -> indexPuntosP2++
                indexPuntosP2 == 3 && indexPuntosP1 < 3 -> ganarJuego(2)
                indexPuntosP2 == 3 && indexPuntosP1 == 3 -> indexPuntosP2++
                indexPuntosP2 == 3 && indexPuntosP1 == 4 -> indexPuntosP1--
                indexPuntosP2 == 4 -> ganarJuego(2)
            }
        }
        actualizarPantalla()
    }

    private fun ganarJuego(parejaGanadora: Int) {
        // Reseteamos los puntos (0-0)
        indexPuntosP1 = 0
        indexPuntosP2 = 0

        // Sumamos el juego a quien toque
        if (parejaGanadora == 1) {
            juegosP1++
            // Lógica súper simple de Set (Sin Tie-break de momento para no complicarlo)
            if (juegosP1 >= 6 && (juegosP1 - juegosP2) >= 2) {
                setsP1++
                juegosP1 = 0
                juegosP2 = 0
                Toast.makeText(this, "¡SET para Pareja LOCAL!", Toast.LENGTH_LONG).show()
            }
        } else {
            juegosP2++
            if (juegosP2 >= 6 && (juegosP2 - juegosP1) >= 2) {
                setsP2++
                juegosP1 = 0
                juegosP2 = 0
                Toast.makeText(this, "¡SET para Pareja RIVAL!", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun actualizarPantalla() {
        txtPuntosP1.text = puntosSecuencia[indexPuntosP1]
        txtPuntosP2.text = puntosSecuencia[indexPuntosP2]
        txtJuegosP1.text = "Juegos: $juegosP1 | Sets: $setsP1"
        txtJuegosP2.text = "Juegos: $juegosP2 | Sets: $setsP2"
    }


    // ------------------------------------------------------------------------
    // COMUNICACIÓN CON NODE.JS (BACKEND EN DOCKER)
    // ------------------------------------------------------------------------
    private fun enviarHaciaServidorNode(accionRealizada: String, idJugadorGolpe: Int) {
        txtEstadoServer.text = "Sincronizando con PostgreSQL..."

        // Creamos el paquete
        val jugada = PuntoJugada(
            partido_id = 1,
            jugador_id = idJugadorGolpe,
            tipo_jugada = accionRealizada,
            set_num = setsP1 + setsP2 + 1, // Para saber en qué set estamos
            juego_num = juegosP1 + juegosP2 + 1 // Para saber en qué juego estamos
        )

        // Lanzamos la petición HTTPS
        RetrofitClient.apiInterfaz.enviarPuntoAlArbitro(jugada).enqueue(object : Callback<RespuestaArbitro> {
            override fun onResponse(call: Call<RespuestaArbitro>, response: Response<RespuestaArbitro>) {
                if (response.isSuccessful) {
                    txtEstadoServer.text = "☁️ OK: Servidor guardó el punto."
                } else {
                    txtEstadoServer.text = "⚠️ Fallo Servidor: ¿Faltan IDs en la BD?"
                }
            }

            override fun onFailure(call: Call<RespuestaArbitro>, t: Throwable) {
                txtEstadoServer.text = "❌ Sin conexión a Backend: ${t.message}"
            }
        })
    }
}