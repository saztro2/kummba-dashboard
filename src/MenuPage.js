import React, { useState, useEffect } from 'react';
import './MenuPage.css';
import AddMenuItemModal from './AddMenuItemModal';
import ToggleSwitch from './ToggleSwitch';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const apiUrl = 'https://kummba-backend.onrender.com/api/menu-items';

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleEditClick = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSaveItem = (itemData) => {
        if (itemData.id) {
            fetch(`${apiUrl}/${itemData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData),
            })
            .then(response => response.json())
            .then(updatedItemFromServer => {
                setMenuItems(currentItems => 
                    currentItems.map(item => 
                        item.id === updatedItemFromServer.id ? updatedItemFromServer : item
                    )
                );
                handleCloseModal();
            })
            .catch(error => console.error('Error al actualizar el plato:', error));
        } else {
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemData),
            })
            .then(response => response.json())
            .then(newItemFromServer => {
                setMenuItems(currentItems => [newItemFromServer, ...currentItems]);
                handleCloseModal();
            })
            .catch(error => console.error('Error al guardar el nuevo plato:', error));
        }
    };

    const handleDeleteItem = (itemIdToDelete) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            fetch(`${apiUrl}/${itemIdToDelete}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    setMenuItems(currentItems => 
                        currentItems.filter(item => item.id !== itemIdToDelete)
                    );
                } else {
                    alert('No se pudo eliminar el plato.');
                }
            })
            .catch(error => console.error('Error al eliminar el plato:', error));
        }
    };
    
    // NOTA: Esta función todavía es local. Conectar esto al backend sería un buen siguiente paso.
    const handleStatusToggle = (itemIdToToggle) => {
        setMenuItems(currentItems =>
            currentItems.map(item =>
                item.id === itemIdToToggle
                    ? { ...item, status: item.status === 'available' ? 'unavailable' : 'available' }
                    : item
            )
        );
    };

    return (
        <div className="menu-page-container">
            <div className="menu-header">
                <h2>Gestión de Menú</h2>
                <button className="btn-add-new" onClick={handleAddClick}>+ Añadir Nuevo Plato</button>
            </div>
            <table className="menu-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>${item.price.toLocaleString('es-CO')}</td>
                            <td>
                                <ToggleSwitch 
                                    isOn={item.status === 'available'}
                                    handleToggle={() => handleStatusToggle(item.id)}
                                />
                            </td>
                            <td>
                                <button className="action-button edit" onClick={() => handleEditClick(item)}>Editar</button>
                                <button className="action-button delete" onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
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
