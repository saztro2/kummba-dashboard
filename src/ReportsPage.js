import React from 'react';
import './ReportsPage.css';

// Usaremos los mismos datos de prueba que en el Kanban para generar los reportes.
// En una aplicación real, estos datos vendrían de una base de datos de pedidos completados.
const completedOrders = [
    { id: 'K1025', items: [{ id: 1, name: 'Perro Caliente', quantity: 2 }, { id: 2, name: 'Salchipapa', quantity: 1 }], total: 32000 },
    { id: 'K1024', items: [{ id: 3, name: 'Hamburguesa Clásica', quantity: 2 }], total: 45000 },
    { id: 'K1023', items: [{ id: 1, name: 'Perro Caliente', quantity: 1 }, { id: 3, name: 'Hamburguesa Clásica', quantity: 1 }], total: 32000 },
    { id: 'K1022', items: [{ id: 2, name: 'Salchipapa', quantity: 3 }], total: 27000 },
];

const ReportsPage = () => {
    // --- LÓGICA DE CÁLCULO DE MÉTRICAS ---

    // 1. Calcular Ingresos Totales
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

    // 2. Calcular Número Total de Pedidos
    const totalOrders = completedOrders.length;

    // 3. Calcular Ticket Promedio
    const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 4. Calcular los productos más vendidos
    const itemCounts = completedOrders
        .flatMap(order => order.items) // Crea una sola lista con todos los items vendidos
        .reduce((counts, item) => {
            counts[item.name] = (counts[item.name] || 0) + item.quantity;
            return counts;
        }, {});
    
    const topItems = Object.entries(itemCounts)
        .sort(([, a], [, b]) => b - a) // Ordena de mayor a menor
        .slice(0, 5); // Se queda con los 5 primeros

    return (
        <div className="reports-page-container">
            {/* Sección de KPIs (Key Performance Indicators) */}
            <div className="kpi-container">
                <div className="kpi-card">
                    <h4>Ingresos Totales</h4>
                    <p>${totalRevenue.toLocaleString('es-CO')}</p>
                </div>
                <div className="kpi-card">
                    <h4>Pedidos Completados</h4>
                    <p>{totalOrders}</p>
                </div>
                <div className="kpi-card">
                    <h4>Ticket Promedio</h4>
                    <p>${averageTicket.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>
                </div>
            </div>

            {/* Sección de Gráficos */}
            <div className="chart-container">
                <h3>Top 5 Productos Más Vendidos</h3>
                <div className="bar-chart">
                    {topItems.map(([name, count]) => (
                        <div key={name} className="chart-item">
                            <div className="bar-label">{name} ({count})</div>
                            <div className="bar" style={{ width: `${(count / topItems[0][1]) * 100}%` }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;