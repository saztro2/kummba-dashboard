import React, { useState } from 'react';
import './StorePage.css'; // Crearemos sus estilos a continuación

// Datos iniciales de la tienda
const initialStoreData = {
    name: 'Restaurante de Kummba',
    address: 'Calle Falsa 123, Ciudad Ejemplo',
    hours: [
        { day: 'Lunes', open: '12:00', close: '22:00', enabled: true },
        { day: 'Martes', open: '12:00', close: '22:00', enabled: true },
        { day: 'Miércoles', open: '12:00', close: '22:00', enabled: true },
        { day: 'Jueves', open: '12:00', close: '23:00', enabled: true },
        { day: 'Viernes', open: '12:00', close: '23:00', enabled: true },
        { day: 'Sábado', open: '13:00', close: '23:00', enabled: true },
        { day: 'Domingo', open: '', close: '', enabled: false },
    ]
};

const StorePage = () => {
    const [storeName, setStoreName] = useState(initialStoreData.name);
    const [address, setAddress] = useState(initialStoreData.address);
    // Por ahora, los horarios son solo visuales, no editables, para mantenerlo simple.

    const handleSaveChanges = (e) => {
        e.preventDefault();
        // En una aplicación real, aquí se enviarían los datos al servidor.
        alert('¡Cambios guardados con éxito!');
        console.log({ storeName, address });
    };

    return (
        <div className="store-page-container">
            <form onSubmit={handleSaveChanges}>
                <div className="form-section">
                    <h3>Información General</h3>
                    <div className="form-group">
                        <label htmlFor="storeName">Nombre del Restaurante</label>
                        <input 
                            type="text" 
                            id="storeName" 
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección</label>
                        <input 
                            type="text" 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Horarios de Atención</h3>
                    <div className="hours-list">
                        {initialStoreData.hours.map(dayInfo => (
                            <div key={dayInfo.day} className="hour-row">
                                <span className="day-name">{dayInfo.day}</span>
                                {dayInfo.enabled ? (
                                    <div className="time-inputs">
                                        <input type="time" defaultValue={dayInfo.open} />
                                        <span>-</span>
                                        <input type="time" defaultValue={dayInfo.close} />
                                    </div>
                                ) : (
                                    <span className="closed-text">Cerrado</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="save-button-container">
                    <button type="submit" className="save-changes-button">Guardar Cambios</button>
                </div>
            </form>
        </div>
    );
};

export default StorePage;