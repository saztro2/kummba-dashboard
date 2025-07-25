import React from 'react';
import './OrderCard.css';

// 1. Añadimos onRejectOrder y onCompleteOrder a las props
const OrderCard = ({ order, status, onAcceptOrder, onMarkAsReady, onRejectOrder, onCompleteOrder }) => {
    const change = order.payment.paidWith ? order.payment.paidWith - order.total : 0;

    return (
        <div className={`order-card status-${status}`}>
            <div className="card-header">
                <span className="order-id">#{order.id}</span>
                <span className="order-time">{order.time}</span>
            </div>
            <div className="card-body">
                <p className="customer-name">Cliente: {order.customer.name}</p>
                <ul className="item-list">
                    {order.items.map(item => (
                        <li key={item.id}>
                            <span className="item-quantity">{item.quantity}x</span>
                            <span className="item-name">{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card-payment-details">
                <p><strong>Total: ${order.total.toLocaleString('es-CO')}</strong></p>
                {order.payment.method === 'Efectivo' && order.payment.paidWith && (
                    <p className="payment-cash">Paga con: ${order.payment.paidWith.toLocaleString('es-CO')} (Cambio: ${change.toLocaleString('es-CO')})</p>
                )}
            </div>
            
            <div className="card-footer">
                {status === 'new' && (
                    <>
                        <button className="btn btn-accept" onClick={() => onAcceptOrder(order.id)}>✓ Aceptar</button>
                        {/* 2. Conectamos la función onRejectOrder */}
                        <button className="btn btn-reject" onClick={() => onRejectOrder(order.id)}>✗ Rechazar</button>
                    </>
                )}

                {status === 'in-progress' && (
                    <button className="btn btn-ready" onClick={() => onMarkAsReady(order.id)}>✓ Marcar como Listo</button>
                )}

                {status === 'ready' && (
                     /* 3. Conectamos la función onCompleteOrder */
                     <button className="btn btn-complete" onClick={() => onCompleteOrder(order.id)}>✓ Completar Pedido</button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;