import { Component } from "react";

import { resetCatalogoPromise } from "../../utils/drinksSource";

// Si falla el fetch del catálogo (sin internet, el CDN caído, etc.) esto
// evita una pantalla en blanco y deja un mensaje simple con opción de
// reintentar. Es una clase porque React todavía no tiene un hook para
// error boundaries.
class CoErrorBoundary extends Component {
	state = { error: null };

	static getDerivedStateFromError(error) {
		return { error };
	}

	reintentar = () => {
		resetCatalogoPromise();
		this.setState({ error: null });
	};

	render() {
		if (this.state.error) {
			return (
				<div className="main-no-results">
					<h2>No se pudo cargar el catálogo</h2>
					<span>Revisa tu conexión e intenta de nuevo.</span>
					<button onClick={this.reintentar}>Reintentar</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default CoErrorBoundary;
