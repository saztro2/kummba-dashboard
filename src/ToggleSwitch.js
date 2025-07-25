import React from 'react';
import './ToggleSwitch.css'; // Crearemos sus estilos a continuación

// Recibe dos props:
// isOn: un booleano (true/false) para saber si está encendido.
// handleToggle: la función que se ejecutará cuando se haga clic en él.
const ToggleSwitch = ({ isOn, handleToggle }) => {
    return (
        // Usamos una clase dinámica para cambiar la apariencia si está encendido
        <div className={`switch-container ${isOn ? "on" : "off"}`} onClick={handleToggle}>
            <div className="switch-knob" />
        </div>
    );
};

export default ToggleSwitch;