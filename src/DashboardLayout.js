import React, { useState } from 'react';
import './DashboardLayout.css';
import OrderKanbanView from './OrderKanbanView';
import MenuPage from './MenuPage';
import StorePage from './StorePage';
import ReportsPage from './ReportsPage'; // 1. IMPORTAMOS

const DashboardLayout = () => {
    const [activeView, setActiveView] = useState('pedidos');

    const renderActiveView = () => {
        switch (activeView) {
            case 'pedidos': return <OrderKanbanView />;
            case 'menu': return <MenuPage />;
            case 'tienda': return <StorePage />;
            case 'reportes': return <ReportsPage />; // 2. AÑADIMOS EL CASO
            default: return <OrderKanbanView />;
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Kummba Panel</h3>
                </div>
                {/* 3. CONECTAMOS TODOS LOS ENLACES */}
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeView === 'pedidos' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveView('pedidos')}>Pedidos</a>
                        </li>
                        <li className={activeView === 'menu' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveView('menu')}>Menú</a>
                        </li>
                        <li className={activeView === 'reportes' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveView('reportes')}>Reportes</a>
                        </li>
                        <li className={activeView === 'tienda' ? 'active' : ''}>
                            <a href="#" onClick={() => setActiveView('tienda')}>Mi Tienda</a>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="main-content">
                <header className="main-header">
                    <h1>
                        {activeView === 'pedidos' && 'Gestión de Pedidos'}
                        {activeView === 'menu' && 'Gestión de Menú'}
                        {activeView === 'tienda' && 'Información de la Tienda'}
                        {activeView === 'reportes' && 'Reportes y Analíticas'}
                    </h1>
                </header>
                <section className="content-area">
                    {renderActiveView()}
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;