class Seguro {
	constructor(marca, anio, tipo) {
		this.marca = marca;
		this.anio = anio;
		this.tipo = tipo;
	}

	cotizarSeguro() {
		let cantidad;
		const base = 2000;

		switch (this.marca) {
			case '1':
				cantidad = base * 1.15;
				break;
			case '2':
				cantidad = base * 1.05;
				break;
			case '3':
				cantidad = base * 1.45;
				break;
		}

		const diferencia = new Date().getFullYear() - this.anio;

		cantidad -= (diferencia * 3 * cantidad) / 100;

		this.tipo === 'basico' ? (cantidad *= 1.3) : (cantidad *= 1.5);

		return cantidad;
	}
}

class Interfaz {
	mensaje(mensaje, tipo) {
		const div = document.createElement('div');

		if (tipo === 'error') {
			div.classList.add('mensaje', 'error');
		} else {
			div.classList.add('mensaje', 'correcto');
		}

		div.innerHTML = `${mensaje}`;
		formulario.insertBefore(div, document.querySelector('.form-group'));

		setTimeout(() => {
			document.querySelector('.mensaje').remove();
		}, 3000);
	}

	mostrarResultado(datos, total) {
		const resultado = document.getElementById('resultado');

		let marca;

		switch (datos.marca) {
			case '1':
				marca = 'Americano';
				break;
			case '2':
				marca = 'Asiatico';
				break;
			case '3':
				marca = 'Europeo';
				break;
		}
		const div = document.createElement('div');

		div.innerHTML = `
	<p class='header'>Tu resumen:</p>
	<p>Marca: ${marca}</p>
	<p>Año: ${datos.anio}</p>
	<p>Precio: ${total}</p>`;

		const spinner = document.querySelector('#cargando img');

		spinner.style.display = 'block';

		setTimeout(() => {
			spinner.style.display = 'none';
			resultado.appendChild(div);
		}, 3000);
	}
}

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const marca = document.getElementById('marca');
	const anio = document.getElementById('anio');

	const marcaSelect = marca.value,
		anioSelect = anio.value;

	const tipoSelect = document.querySelector('input[name="tipo"]:checked').value;

	const interfaz = new Interfaz();

	if (marcaSelect == '' || anioSelect == '' || tipoSelect == '') {
		interfaz.mensaje('Faltan datos, no se puede enviar', 'error');
	} else {
		const resultados = document.querySelector('#resultado div');
		if (resultados != null) {
			resultados.remove();
		}
		const seguro = new Seguro(marcaSelect, anioSelect, tipoSelect);
		const cantidad = seguro.cotizarSeguro();
		interfaz.mensaje('Cargando...', 'correcto');
		interfaz.mostrarResultado(seguro, cantidad);
	}
});

//se generan los años desde la fecha actual
const selectAnios = document.getElementById('anio');

const max = new Date().getFullYear(),
	min = max - 20;

for (let i = max; i >= min; i--) {
	let option = document.createElement('option');
	option.innerHTML = i;
	option.value = i;
	selectAnios.appendChild(option);
}
