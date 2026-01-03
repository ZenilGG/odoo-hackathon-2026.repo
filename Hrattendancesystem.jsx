// HRAttendanceSystem.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar, Clock, Users } from 'lucide-react';

const HRAttendanceSystem = () => {
    const [activeView, setActiveView] = useState('admin');
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 9, 22));
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data
    const [attendanceData, setAttendanceData] = useState([
        {
            id: 1,
            employee: 'Employee1',
            checkIn: '10:00',
            checkOut: '19:00',
            workHours: '09:00',
            extraHours: '01:00',
            date: '29/10/2025'
        },
        {
            id: 2,
            employee: 'Employee2',
            checkIn: '10:00',
            checkOut: '19:00',
            workHours: '09:00',
            extraHours: '01:00',
            date: '29/10/2025'
        }
    ]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const navigateDate = (direction) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + direction);
        setSelectedDate(newDate);
    };

    const filteredData = attendanceData.filter(record =>
        record.employee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Users className="text-white" size={24} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveView('admin')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                activeView === 'admin'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Admin/HR View
                        </button>
                        <button
                            onClick={() => setActiveView('employee')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                activeView === 'employee'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Employee View
                        </button>
                    </div>
                </div>
            </div>

            {/* Admin/HR View */}
            {activeView === 'admin' && (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b">
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Company Logo
                            </button>
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Employees
                            </button>
                            <button className="px-6 py-4 bg-blue-50 text-blue-600 border-b-2 border-blue-600 font-medium">
                                Attendance
                            </button>
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Time Off
                            </button>
                            <div className="ml-auto flex items-center gap-2 px-4">
                                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Search and Controls */}
                        <div className="p-6 bg-gray-50 border-b">
                            <div className="flex items-center gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search employees..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <button
                                    onClick={() => navigateDate(-1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => navigateDate(1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    <ChevronRight size={20} />
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Date
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                                    Day
                                </button>
                            </div>
                        </div>

                        {/* Date Display */}
                        <div className="px-6 py-4 bg-white border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {formatDate(selectedDate)}
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Emp</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check In</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check Out</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Work Hours</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Extra hours</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredData.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.employee}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.workHours}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.extraHours}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Employee View */}
            {activeView === 'employee' && (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b">
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Company Logo
                            </button>
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Employees
                            </button>
                            <button className="px-6 py-4 bg-blue-50 text-blue-600 border-b-2 border-blue-600 font-medium">
                                Attendance
                            </button>
                            <button className="px-6 py-4 text-gray-600 hover:bg-gray-50 font-medium">
                                Time Off
                            </button>
                            <div className="ml-auto flex items-center gap-2 px-4">
                                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="p-6 bg-gray-50 border-b">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigateDate(-1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => navigateDate(1)}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    <ChevronRight size={20} />
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Oct
                                </button>
                                <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                                    Count of days present
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                                    Leaves count
                                </button>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                                    Total working days
                                </button>
                            </div>
                        </div>

                        {/* Date Display */}
                        <div className="px-6 py-4 bg-white border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {formatDate(selectedDate)}
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check In</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Check Out</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Work Hours</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Extra hours</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {attendanceData.map((record) => (
                                    <tr key={record.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.checkIn}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.checkOut}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.workHours}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{record.extraHours}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HRAttendanceSystem;