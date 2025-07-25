// La URL base para la API de pedidos
const apiUrl = 'https://kummba-backend.onrender.com/api/orders';

// Función para obtener los pedidos del servidor
const fetchOrders = () => {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(error => console.error("Error al obtener pedidos:", error));
};

// Usamos useEffect para cargar los pedidos cuando el componente se monta por primera vez
useEffect(() => {
    fetchOrders();
}, []);

// Función genérica para actualizar el estado de un pedido
const updateOrderStatus = (orderId, newStatus) => {
    fetch(`${apiUrl}/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(updatedOrder => {
        // Actualizamos la lista local con el pedido que nos devuelve el servidor
        setOrders(currentOrders => 
            currentOrders.map(o => o._id === updatedOrder._id ? updatedOrder : o)
        );
    })
    .catch(error => console.error("Error al actualizar estado:", error));
};

// Función para eliminar un pedido
const deleteOrder = (orderId) => {
    if (window.confirm('¿Marcar este pedido como completado/rechazado?')) {
        fetch(`${apiUrl}/${orderId}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                // Eliminamos el pedido de la lista local
                setOrders(currentOrders => currentOrders.filter(o => o._id !== orderId));
            }
        })
        .catch(error => console.error("Error al eliminar pedido:", error));
    }
};

// Filtramos la lista de pedidos para cada columna
const newOrders = orders.filter(o => o.status === 'new');
const inProgressOrders = orders.filter(o => o.status === 'in-progress');
const readyOrders = orders.filter(o => o.status === 'ready');

return (
    <div className="kanban-view">
        <div className="kanban-column">
            <div className="column-header"><h2>Nuevos ({newOrders.length})</h2></div>
            <div className="column-content">
                {newOrders.map(order => (
                    <OrderCard 
                        key={order._id} 
                        order={order} 
                        status="new"
                        onAcceptOrder={() => updateOrderStatus(order._id, 'in-progress')}
                        onRejectOrder={() => deleteOrder(order._id)}
                    />
                ))}
            </div>
        </div>
        <div className="kanban-column">
            <div className="column-header"><h2>En Preparación ({inProgressOrders.length})</h2></div>
            <div className="column-content">
                {inProgressOrders.map(order => (
                    <OrderCard 
                        key={order._id} 
                        order={order} 
                        status="in-progress"
                        onMarkAsReady={() => updateOrderStatus(order._id, 'ready')}
                    />
                ))}
            </div>
        </div>
        <div className="kanban-column">
            <div className="column-header"><h2>Listos ({readyOrders.length})</h2></div>
            <div className="column-content">
                {readyOrders.map(order => (
                    <OrderCard 
                        key={order._id} 
                        order={order} 
                        status="ready"
                        onCompleteOrder={() => deleteOrder(order._id)}
                    />
                ))}
            </div>
        </div>
    </div>
);
