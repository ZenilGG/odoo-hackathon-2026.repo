import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Mail, Lock, User, CreditCard, Search, Plane, LogOut } from 'lucide-react';
import App from "../App.jsx";

// Employee Dashboard Component
const EmployeeDashboard = ({ userInfo, onLogout }) => {
    const [activeTab, setActiveTab] = useState('employees');
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [checkedInEmployees, setCheckedInEmployees] = useState({});
    const [currentTime, setCurrentTime] = useState('00:00PM');

    const employees = [
        { id: 1, name: 'John Smith', status: 'present', avatar: null },
        { id: 2, name: 'Sarah Johnson', status: 'present', avatar: null },
        { id: 3, name: 'Mike Wilson', status: 'absent', avatar: null },
        { id: 4, name: 'Emily Brown', status: 'present', avatar: null },
        { id: 5, name: 'David Lee', status: 'on-leave', avatar: null },
        { id: 6, name: 'Lisa Anderson', status: 'absent', avatar: null },
        { id: 7, name: 'James Taylor', status: 'present', avatar: null },
        { id: 8, name: 'Emma Davis', status: 'present', avatar: null },
        { id: 9, name: 'Robert Miller', status: 'absent', avatar: null },
    ];

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckIn = () => {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        setCurrentTime(time);
        setCheckedInEmployees({ ...checkedInEmployees, current: true });
    };

    const handleCheckOut = () => {
        alert('Checked out successfully!');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'present':
                return 'bg-green-500';
            case 'absent':
                return 'bg-yellow-500';
            case 'on-leave':
                return 'bg-blue-500';
            default:
                return 'bg-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        if (status === 'on-leave') {
            return <Plane className="w-3 h-3 text-blue-600" />;
        }
        return null;
    };

    const getInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : 'U';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Dayflow HRMS</h1>
                            <p className="text-sm text-gray-500">Company Logo</p>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition"
                        >
                            {getInitials(userInfo?.email)}
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">{userInfo?.email}</p>
                                    <p className="text-xs text-gray-500">{userInfo?.role}</p>
                                </div>
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                                    <User className="w-4 h-4" />
                                    My Profile
                                </button>
                                <button
                                    onClick={onLogout}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex">
                <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab('employees')}
                            className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                                activeTab === 'employees'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Employees
                        </button>
                        <button
                            onClick={() => setActiveTab('attendance')}
                            className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                                activeTab === 'attendance'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Attendance
                        </button>
                        <button
                            onClick={() => setActiveTab('timeoff')}
                            className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${
                                activeTab === 'timeoff'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Time Off
                        </button>
                        <button className="w-full px-4 py-3 rounded-lg text-left font-medium text-gray-700 hover:bg-gray-50 transition">
                            Settings
                        </button>
                    </nav>
                </aside>

                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                + NEW
                            </button>

                            <div className="relative flex-1 max-w-md mx-8">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div className="bg-white border-2 border-gray-200 rounded-lg p-4 flex flex-col items-center gap-3">
                                <div className="text-sm text-gray-600">Since {currentTime}</div>
                                <button
                                    onClick={handleCheckIn}
                                    className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                                >
                                    Check IN →
                                </button>
                                <button
                                    onClick={handleCheckOut}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
                                >
                                    Check Out →
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {filteredEmployees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg transition cursor-pointer relative"
                                >
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        {getStatusIcon(employee.status)}
                                        <div className={`w-4 h-4 rounded-full ${getStatusColor(employee.status)}`} />
                                    </div>

                                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                        <User className="w-12 h-12 text-blue-600" />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">Employee</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Status Legend</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span>Green dot: Employee is present in the office.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Plane className="w-3 h-3 text-blue-600" />
                                    <span>Airplane icon: Employee is on leave.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <span>Yellow dot: Employee is absent.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EmployeeDashboard;