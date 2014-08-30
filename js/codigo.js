///////////////////////////////////////////////////////////////////////////////////////////////
/*****SECCIÓN 1: Variables, incluídos personajes*****/
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////
//VARIABLES////////
///////////////////

var canvas,
	cxt,
	direccion; //Recibe el valor de la tecla pulsada (VER SECCIÓN 2)

//SPRITES Y ANIMACIÓN///// (VER SECCIÓN 2)
var	marioSprite; //Carga el sprite de Mario
var ultimaDireccion = 1; //Guarda si miraba hacia la izquierda (0) o la derecha (1)
var fotoMario = 0; //Elige el fotograma del sprite para la animación
var corriendo = false; //Indica que Mario corre si es verdadero
var mirando = false; //Indica que mario mira hacia arriba si es verdadero
var agachado = false; //Indica que mario está agachado si es verdadero

//COLISIÓN///////// (VER SECCIÓN 3)
var colision = false; //Si es verdadera, el personaje no se mueve más allá

//OBJETOS//////////

var fondo = {
	x: 0,
	y: 0,
	imagenURL: "http://i40.photobucket.com/albums/e241/cursoslr/marioworld_zpsf8fef84e.png",
	fondoOK: false
}

var mario = {
	x: 40,
	y:240,

	izquierdaArribaURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-arriba_zpsfdbdc786.png",
	derechaArribaURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-arriba_zps7af76649.png",

	izquierdaAbajoURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-abajo_zps8faae47c.png",
	derechaAbajoURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-abajo_zps5dd0f3a0.png",

	izquierdaURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-0_zpsb5315610.png",
	izquierda1URL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-1_zps6a77588b.png",
	izquierda2URL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-2_zps4fc81861.png",
	izquierdaListoURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-izda-listo_zps3f0b3b0d.png",
	izquierdaOK: false,

	derechaURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-0_zps157ea01c.png",
	derecha1URL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-1_zps9eaa53ae.png",
	derecha2URL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-2_zpsc5f9e833.png",
	derechaListoURL: "http://i40.photobucket.com/albums/e241/cursoslr/mario-dcha-listo_zps852c86b0.png",
	derechaOK: false,

	velocidad: 10
}

//(Para ver las teclas, ir al final del todo)



///////////////////////////////////////////////////////////////////////////////////////////////
/*****SECCIÓN 2: Dibujo, movimiento y animación*****/
///////////////////////////////////////////////////////////////////////////////////////////////



/////////////////
//DIBUJAR////////
/////////////////


//Se encarga de dibujarlo todo:
function dibujar() {
	//Capa 0: Fondo
	if (fondo.fondoOK) {
		cxt.drawImage(fondo.imagen, 0, 0);
	}


	//Capa 1: Mario si está quieto
	if (mario.derechaOK && mario.izquierdaOK) {
		//Arriba
		if (direccion == UP && mirando == false) {
			if (ultimaDireccion == 0) {
				marioSprite = mario.izquierda;
			}
			else if (ultimaDireccion == 1) {
				marioSprite = mario.derecha;
			}
		}

		//Abajo
		if (direccion == DOWN && agachado == false) {
			if (ultimaDireccion == 0) {
				marioSprite = mario.izquierda;
			}
			else if (ultimaDireccion == 1) {
				marioSprite = mario.derecha;
			}
		}

		//Izquierda
		if (direccion == LEFT  && corriendo == false) {
			marioSprite = mario.izquierda;
			ultimaDireccion = 0;
		}

		//Derecha
		if (direccion == RIGHT && corriendo == false) {
			marioSprite = mario.derecha;
			ultimaDireccion = 1;
		}

		//DIBUJA EL SPRITE DE MARIO EN LAS CORDENADAS QUE SEAN (Último paso)
		cxt.drawImage(marioSprite, mario.x, mario.y);
	}
	
}


//////////////////////////
//MOVER Y ANIMAR//////////
//////////////////////////

//Lo activa keydown:
function moverMario(datos) {
	direccion = datos.keyCode;
	corriendo = true;
	mirando = true;
	agachado = true;

	//Si la dirección es una de las flechas
	if (direccion > 36 && direccion < 41) {
		//Para que mire
		if (direccion == UP) {
			mirarMario();
		}

		//Para que se agache
		if (direccion == DOWN) {
			agacharMario();
		}

		//Para que corra, si no ha chocado
		if (direccion == LEFT) {
			comprobarColision();
			ejecutarColision();

			if (!ejecutarColision() ) {
				ultimaDireccion = 0;
				animarMario();
				mario.x -= mario.velocidad;
			}

			if (ejecutarColision() ) {
				detener();
			}
		}
		if (direccion == RIGHT) {
			comprobarColision();
			ejecutarColision();

			if (!ejecutarColision() ) {
				ultimaDireccion = 1;
				animarMario();
				mario.x += mario.velocidad;
			}

			if (ejecutarColision() ) {
				detener();
			}
		}
		dibujar();
	}
	//Si es cualquier otra tecla
	else {
		if (corriendo || mirando || agachado) {
			if (ultimaDireccion == 0) {
			marioSprite = mario.izquierda;
			}
		}
		if (corriendo || mirando || agachado) {
			if (ultimaDireccion == 1) {
			marioSprite = mario.derecha;
			}
		}
	}
}

//Esto es lo que hace que Mario mire hacia arriba
function mirarMario() {
	if (mirando == true && ultimaDireccion == 0) {
		marioSprite = mario.izquierdaArriba;
		dibujar();
	}
	else if (mirando == true && ultimaDireccion == 1)
		marioSprite = mario.derechaArriba;
		dibujar();
}

//Esto es lo que hace que Mario se agache
function agacharMario() {
	if (agachado == true && ultimaDireccion == 0) {
		marioSprite = mario.izquierdaAbajo;
		dibujar();
	}
	else if (mirando == true && ultimaDireccion == 1)
		marioSprite = mario.derechaAbajo;
		dibujar();
}

//Esto es lo que anima a Mario si corriendo es true y dependiendo de adonde mire.
//Básicamente, cada "fotoMario" funciona como un fotograma, y al final los reseteo.
//El fotograma 0 lo uso para disimular el delay en el keydown, que no lo sé eliminar...
function animarMario() {
	//Izquierda
	if (corriendo == true && direccion == LEFT) {
		
		if (fotoMario == 0) {
			marioSprite = mario.izquierdaListo;
			fotoMario += 1;
		}
		else if (fotoMario == 1) {
			marioSprite = mario.izquierda1;
			fotoMario += 1;
		}
		else if (fotoMario == 2) {
			marioSprite = mario.izquierda1;
			fotoMario += 1;
		}
		else if (fotoMario == 3) {
			marioSprite = mario.izquierda2;
			fotoMario += 1;
		}
		else if (fotoMario == 4) {
			marioSprite = mario.izquierda2;
			fotoMario += 1;
		}
		else if (fotoMario == 5) {
			marioSprite = mario.izquierda;
			fotoMario += 1;
		}
		else if (fotoMario == 6) {
			marioSprite = mario.izquierda;
			fotoMario -= 5;
		}

		if (ultimaDireccion == 1) {
			fotoMario = 0;
		}

		dibujar();

	}

	//Derecha
	if (corriendo == true && direccion == RIGHT) {
		
		if (fotoMario == 0) {
			marioSprite = mario.derechaListo;
			fotoMario += 1;
		}
		else if (fotoMario == 1) {
			marioSprite = mario.derecha1;
			fotoMario += 1;
		}
		else if (fotoMario == 2) {
			marioSprite = mario.derecha1;
			fotoMario += 1;
		}
		else if (fotoMario == 3) {
			marioSprite = mario.derecha2;
			fotoMario += 1;
		}
		else if (fotoMario == 4) {
			marioSprite = mario.derecha2;
			fotoMario += 1;
		}
		else if (fotoMario == 5) {
			marioSprite = mario.derecha;
			fotoMario += 1;
		}
		else if (fotoMario == 6) {
			marioSprite = mario.derecha;
			fotoMario -= 5;
		}

		if (ultimaDireccion == 0) {
			fotoMario = 0;
		}
		dibujar();

	}

	
}



//Lo activa keyup
//Hace que se dibuje el sprite de Mario parado, y resetea la animación
//Si está mirando arriba/agachado y sueltas la tecla, vuelve a mirar hacia delante
function detener() {
	mirando = false;
	agachado = false;
	corriendo = false;
	fotoMario = 0;

	dibujar();
}



///////////////////////////////////////////////////////////////////////////////////////////////
/*****SECCIÓN 3: Obstáculos y resolución de colisiones*****/
///////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////
//OBSTÁCULOS//////////
//////////////////////

//Límites del canvas
var bordes = {
	TOP: 0,
	BOTTOM: 420,
	LEFT: 0,
	RIGHT: 600,
}


//////////////////////
//COLISIONES//////////
//////////////////////

function comprobarColision() {
	//Límites de Mario
	mario.TOP = mario.y
	mario.BOTTOM = mario.y + 60;
	mario.LEFT = mario.x;
	mario.RIGHT = mario.x + 40;
}

function ejecutarColision() {
	//Si choca con los bordes, detiene el movimiento hacia el borde
	if (mario.LEFT <= bordes.LEFT && direccion == LEFT) {
		return true;
	}
	if (mario.RIGHT >= bordes.RIGHT && direccion == RIGHT) {
		return true;
	}


}





///////////////////////////////////////////////////////////////////////////////////////////////
/*****SECCIÓN 4: Carga del canvas, de imágenes y eventos de teclado*****/
///////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////
//LAS IMÁGENES QUE SE CARGAN////////
//Y EVENTOS DE TECLADO PARA/////////
//LA ANIMACIÓN: keydown/keyup///////
////////////////////////////////////

function inicio() {
	canvas = document.getElementById('canvas');
	cxt = canvas.getContext('2d');

	//Eventos de teclado: activan y desactivan la animación
	document.addEventListener("keydown", moverMario);
	document.addEventListener("keyup", detener);

	ultimaDireccion = 1;


	//FONDO
	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	//MARIO
	mario.izquierdaArriba = new Image();
	mario.izquierdaArriba.src = mario.izquierdaArribaURL;
	mario.derechaArriba = new Image();
	mario.derechaArriba.src = mario.derechaArribaURL;

	mario.izquierdaAbajo = new Image();
	mario.izquierdaAbajo.src = mario.izquierdaAbajoURL;
	mario.derechaAbajo = new Image();
	mario.derechaAbajo.src = mario.derechaAbajoURL;

	mario.izquierda = new Image();
	mario.izquierda.src = mario.izquierdaURL;
	mario.izquierda.onload = confirmarMarioIzquierda;
	mario.izquierda1 = new Image();
	mario.izquierda1.src = mario.izquierda1URL;
	mario.izquierda2 = new Image();
	mario.izquierda2.src = mario.izquierda2URL;
	mario.izquierdaListo = new Image();
	mario.izquierdaListo.src = mario.izquierdaListoURL;

	mario.derecha = new Image();
	mario.derecha.src = mario.derechaURL;
	mario.derecha.onload = confirmarMarioDerecha;
	mario.derecha1 = new Image();
	mario.derecha1.src = mario.derecha1URL;
	mario.derecha2 = new Image();
	mario.derecha2.src = mario.derecha2URL;
	mario.derechaListo = new Image();
	mario.derechaListo.src = mario.derechaListoURL;
	

	


}

///////////////////////////////
//CONFIRMACIÓN DE CARGA////////
///////////////////////////////

//No lo he cargado todo, como hay poco tampoco es mucho problema.
function confirmarFondo() {
	fondo.fondoOK = true;
	dibujar();
}
function confirmarMarioIzquierda() {
		mario.izquierdaOK = true;

		dibujar();
}
function confirmarMarioDerecha() {
		mario.derechaOK = true;
		marioSprite = mario.derecha;

		dibujar();
}



////////////////////
//TECLAS////////////
////////////////////

var UP = 38;
var DOWN = 40;
var LEFT = 37;
var RIGHT = 39;
var SPACE = 32;
