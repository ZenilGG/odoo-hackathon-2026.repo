import React, { useState, useEffect } from 'react';
import { UserCheck, X, Calendar } from 'lucide-react';

const AttendanceManagement = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([
        {
            id: 1,
            employeeName: 'John Doe',
            date: '2026-01-03',
            checkIn: '09:00 AM',
            checkOut: '06:00 PM',
            status: 'Present'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            date: '2026-01-03',
            checkIn: '09:15 AM',
            checkOut: '06:15 PM',
            status: 'Present'
        },
        {
            id: 3,
            employeeName: 'Mike Johnson',
            date: '2026-01-03',
            checkIn: '10:30 AM',
            checkOut: '06:30 PM',
            status: 'Present'
        },
        {
            id: 4,
            employeeName: 'Sarah Williams',
            date: '2026-01-03',
            checkIn: null,
            checkOut: null,
            status: 'Absent'
        },
        {
            id: 5,
            employeeName: 'David Brown',
            date: '2026-01-03',
            checkIn: '09:05 AM',
            checkOut: '06:00 PM',
            status: 'Present'
        },
        {
            id: 6,
            employeeName: 'Emily Davis',
            date: '2026-01-03',
            checkIn: '10:45 AM',
            checkOut: '07:00 PM',
            status: 'Present'
        },
        {
            id: 7,
            employeeName: 'Robert Wilson',
            date: '2026-01-03',
            checkIn: null,
            checkOut: null,
            status: 'Absent'
        },
        {
            id: 8,
            employeeName: 'Lisa Anderson',
            date: '2026-01-03',
            checkIn: '09:00 AM',
            checkOut: '05:45 PM',
            status: 'Present'
        }
    ]);

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [stats, setStats] = useState({
        present: 0,
        absent: 0,
        late: 0
    });

    useEffect(() => {
        calculateStats();
    }, [attendanceRecords]);

    const calculateStats = () => {
        const present = attendanceRecords.filter(r => r.status === 'Present').length;
        const absent = attendanceRecords.filter(r => r.status === 'Absent').length;
        const late = attendanceRecords.filter(r => {
            if (r.checkIn) {
                const checkInTime = r.checkIn.split(':')[0];
                const hour = parseInt(checkInTime);
                const isPM = r.checkIn.includes('PM');
                const actualHour = isPM && hour !== 12 ? hour + 12 : hour;
                return actualHour >= 10 || (actualHour === 9 && r.checkIn.includes(':30'));
            }
            return false;
        }).length;

        setStats({ present, absent, late });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
                        <p className="text-gray-600 mt-1">Track employee attendance and working hours</p>
                    </div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Present</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
                            </div>
                            <UserCheck className="text-green-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Absent</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
                            </div>
                            <X className="text-red-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Late Arrival</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.late}</p>
                            </div>
                            <Calendar className="text-yellow-500" size={40} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Check In</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Check Out</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {attendanceRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{record.employeeName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{record.checkIn || '-'}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{record.checkOut || '-'}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {record.status}
                                        </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceManagement;