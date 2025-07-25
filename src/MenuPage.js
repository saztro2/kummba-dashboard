import React, { useState, useEffect } from 'react';
import './MenuPage.css';
import AddMenuItemModal from './AddMenuItemModal';
import ToggleSwitch from './ToggleSwitch';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // La URL de nuestra API en producción
    const apiUrl = 'https://kummba-backend.onrender.com/api/menu-items';

    // Obtener los datos cuando el componente se carga
    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (item) => { setEditingItem(item); setIsModalOpen(true); };
    const handleAddClick = () => { setEditingItem(null); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setEditingItem(null); };

    const handleSaveItem = (itemData) => {
        const isEditing = !!itemData._id;
        const url = isEditing ? `${apiUrl}/${itemData._id}` : apiUrl;
        const method = isEditing ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData),
        })
        .then(response => response.json())
        .then(savedItem => {
            if (isEditing) {
                setMenuItems(current => current.map(item => (item._id === savedItem._id ? savedItem : item)));
            } else {
                setMenuItems(current => [savedItem, ...current]);
            }
            handleCloseModal();
        })
        .catch(error => console.error('Error al guardar:', error));
    };

    const handleDeleteItem = (itemIdToDelete) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            fetch(`${apiUrl}/${itemIdToDelete}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMenuItems(current => current.filter(item => item._id !== itemIdToDelete));
                    } else {
                        alert('No se pudo eliminar el plato.');
                    }
                })
                .catch(error => console.error('Error al eliminar:', error));
        }
    };

    const handleStatusToggle = (itemIdToToggle) => {
        const toggleUrl = `${apiUrl}/${itemIdToToggle}/status`;
        fetch(toggleUrl, { method: 'PATCH' })
            .then(response => response.json())
            .then(updatedItemFromServer => {
                setMenuItems(currentItems =>
                    currentItems.map(item =>
                        item._id === updatedItemFromServer._id ? updatedItemFromServer : item
                    )
                );
            })
            .catch(error => console.error('Error al cambiar el estado:', error));
    };

    return (
        <div className="menu-page-container">
            <div className="menu-header">
                <h2>Gestión de Menú</h2>
                <button className="btn-add-new" onClick={handleAddClick}>+ Añadir Nuevo Plato</button>
            </div>
            <table className="menu-table">
                <thead>
                    <tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${item.price.toLocaleString('es-CO')}</td>
                            <td>
                                <ToggleSwitch 
                                    isOn={item.status === 'available'}
                                    handleToggle={() => handleStatusToggle(item._id)}
                                />
                            </td>
                            <td>
                                <button className="action-button edit" onClick={() => handleEditClick(item)}>Editar</button>
                                <button className="action-button delete" onClick={() => handleDeleteItem(item._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AddMenuItemModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveItem}
                itemToEdit={editingItem}
            />
        </div>
    );
};

export default MenuPage;
