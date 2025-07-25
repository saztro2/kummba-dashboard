import React, { useState } from 'react';
import OrderCard from './OrderCard';
import './OrderKanbanView.css';

const initialOrders = [
    { id: 'K1025', time: '19:10h', customer: { name: 'Carlos Pérez' }, items: [{ id: 1, name: 'Perro Caliente', quantity: 2 }, { id: 2, name: 'Salchipapa', quantity: 1 }], total: 32000, payment: { method: 'Tarjeta', paidWith: null } },
    { id: 'K1024', time: '19:05h', customer: { name: 'Ana Gómez' }, items: [{ id: 3, name: 'Hamburguesa Clásica', quantity: 2 }], total: 45000, payment: { method: 'Efectivo', paidWith: 50000 } }
];

const OrderKanbanView = () => {
    const [newOrders, setNewOrders] = useState(initialOrders);
    const [inProgressOrders, setInProgressOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);

    // Mueve de 'Nuevos' a 'En Preparación'
    const handleAcceptOrder = (orderId) => {
        const orderToMove = newOrders.find(order => order.id === orderId);
        if (orderToMove) {
            setInProgressOrders(current => [orderToMove, ...current]);
            setNewOrders(current => current.filter(order => order.id !== orderId));
        }
    };

    // Mueve de 'En Preparación' a 'Listos'
    const handleMarkAsReady = (orderId) => {
        const orderToMove = inProgressOrders.find(order => order.id === orderId);
        if (orderToMove) {
            setReadyOrders(current => [orderToMove, ...current]);
            setInProgressOrders(current => current.filter(order => order.id !== orderId));
        }
    };

    // Elimina un pedido de la columna 'Nuevos'
    const handleRejectOrder = (orderId) => {
        setNewOrders(current => current.filter(order => order.id !== orderId));
    };

    // Elimina un pedido de la columna 'Listos' (lo marca como completado)
    const handleCompleteOrder = (orderId) => {
        setReadyOrders(current => current.filter(order => order.id !== orderId));
    };

    return (
        <div className="kanban-view">
            {/* Columna de Nuevos Pedidos */}
            <div className="kanban-column">
                <div className="column-header"><h2>Nuevos ({newOrders.length})</h2></div>
                <div className="column-content">
                    {newOrders.map(order => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                            status="new"
                            onAcceptOrder={handleAcceptOrder} 
                            onRejectOrder={handleRejectOrder}
                        />
                    ))}
                </div>
            </div>

            {/* Columna de Pedidos en Preparación */}
            <div className="kanban-column">
                <div className="column-header"><h2>En Preparación ({inProgressOrders.length})</h2></div>
                <div className="column-content">
                    {inProgressOrders.map(order => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                            status="in-progress"
                            onMarkAsReady={handleMarkAsReady}
                        />
                    ))}
                </div>
            </div>

            {/* Columna de Pedidos Listos */}
            <div className="kanban-column">
                <div className="column-header"><h2>Listos ({readyOrders.length})</h2></div>
                <div className="column-content">
                     {readyOrders.map(order => (
                        <OrderCard 
                            key={order.id} 
                            order={order} 
                            status="ready"
                            onCompleteOrder={handleCompleteOrder}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderKanbanView;