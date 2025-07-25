import React, { useState, useEffect } from 'react'; // 1. Importamos useEffect
import './AddMenuItemModal.css';

// 2. Ahora recibe una prop más: itemToEdit
const AddMenuItemModal = ({ isOpen, onClose, onSave, itemToEdit }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    // --- 3. AQUÍ ESTÁ LA LÓGICA CLAVE ---
    // useEffect se ejecutará cada vez que el modal se abra o cuando 'itemToEdit' cambie.
    useEffect(() => {
        if (itemToEdit) {
            // Si nos pasan un ítem para editar, llenamos el formulario con sus datos.
            setName(itemToEdit.name);
            setCategory(itemToEdit.category);
            setPrice(itemToEdit.price);
        } else {
            // Si no, nos aseguramos de que el formulario esté vacío (para crear uno nuevo).
            setName('');
            setCategory('');
            setPrice('');
        }
    }, [itemToEdit, isOpen]); // La lista de dependencias: se ejecuta si cambian estas props.


    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category || !price) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        // Pasamos los datos al padre, incluyendo el ID si estamos editando.
        onSave({ id: itemToEdit ? itemToEdit.id : null, name, category, price: Number(price) });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* 4. El título ahora es dinámico */}
                <h2>{itemToEdit ? 'Editar Plato' : 'Añadir Nuevo Plato'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Plato</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Categoría</label>
                        <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn-save">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenuItemModal;