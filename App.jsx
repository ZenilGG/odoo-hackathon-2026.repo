import React, { useState, useEffect } from 'react';
import { Home, Users, Calendar, FileText, DollarSign, Award, LogOut, Menu, X } from 'lucide-react';
import EmployeeManagement from './components/EmployeeManagement';
import AttendanceManagement from './components/AttendanceManagement';
import LeaveManagement from './components/LeaveManagemnt.jsx';
import PayrollManagement from './components/PayrollManagement';
import PerformanceReview from './components/Performamcereview.jsx';
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        setCurrentPage('dashboard');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, component: Dashboard },
        { id: 'employees', label: 'Employees', icon: Users, component: EmployeeManagement },
        { id: 'attendance', label: 'Attendance', icon: Calendar, component: AttendanceManagement },
        { id: 'leave', label: 'Leave Management', icon: FileText, component: LeaveManagement },
        { id: 'payroll', label: 'Payroll', icon: DollarSign, component: PayrollManagement },
        { id: 'performance', label: 'Performance', icon: Award, component: PerformanceReview }
    ];

    const CurrentComponent = menuItems.find(item => item.id === currentPage)?.component || Dashboard;

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
                <div className="p-6 flex items-center justify-between">
                    {sidebarOpen && <h1 className="text-2xl font-bold">HRMS</h1>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-indigo-800 p-2 rounded">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                currentPage === item.id
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={20} />
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-indigo-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 hover:text-white transition-colors"
                    >
                        <LogOut size={20} />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {menuItems.find(item => item.id === currentPage)?.label}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    <CurrentComponent user={user} />
                </div>
            </main>
        </div>
    );
}

export default App;