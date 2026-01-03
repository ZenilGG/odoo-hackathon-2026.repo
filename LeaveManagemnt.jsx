import React, { useState, useEffect } from 'react';
import { Calendar, Check, X } from 'lucide-react';

const LeaveManagement = () => {
    const [leaveRequests, setLeaveRequests] = useState([
        {
            id: 1,
            employeeName: 'John Doe',
            type: 'Sick Leave',
            startDate: '2026-01-10',
            endDate: '2026-01-12',
            days: 3,
            status: 'Pending'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            type: 'Annual Leave',
            startDate: '2026-01-15',
            endDate: '2026-01-19',
            days: 5,
            status: 'Approved'
        },
        {
            id: 3,
            employeeName: 'Mike Johnson',
            type: 'Casual Leave',
            startDate: '2026-01-08',
            endDate: '2026-01-09',
            days: 2,
            status: 'Pending'
        },
        {
            id: 4,
            employeeName: 'Sarah Williams',
            type: 'Annual Leave',
            startDate: '2026-01-20',
            endDate: '2026-01-24',
            days: 5,
            status: 'Approved'
        },
        {
            id: 5,
            employeeName: 'David Brown',
            type: 'Sick Leave',
            startDate: '2026-01-05',
            endDate: '2026-01-06',
            days: 2,
            status: 'Rejected'
        },
        {
            id: 6,
            employeeName: 'Emily Davis',
            type: 'Maternity Leave',
            startDate: '2026-02-01',
            endDate: '2026-03-30',
            days: 60,
            status: 'Pending'
        },
        {
            id: 7,
            employeeName: 'Robert Wilson',
            type: 'Casual Leave',
            startDate: '2026-01-13',
            endDate: '2026-01-13',
            days: 1,
            status: 'Approved'
        },
        {
            id: 8,
            employeeName: 'Lisa Anderson',
            type: 'Annual Leave',
            startDate: '2026-01-22',
            endDate: '2026-01-26',
            days: 5,
            status: 'Pending'
        }
    ]);

    const [stats, setStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
        totalDays: 0
    });

    useEffect(() => {
        calculateStats();
    }, [leaveRequests]);

    const calculateStats = () => {
        const pending = leaveRequests.filter(r => r.status === 'Pending').length;
        const approved = leaveRequests.filter(r => r.status === 'Approved').length;
        const rejected = leaveRequests.filter(r => r.status === 'Rejected').length;
        const totalDays = leaveRequests.reduce((sum, r) => sum + r.days, 0);

        setStats({ pending, approved, rejected, totalDays });
    };

    const handleApprove = (id) => {
        setLeaveRequests(leaveRequests.map(request =>
            request.id === id ? { ...request, status: 'Approved' } : request
        ));
    };

    const handleReject = (id) => {
        setLeaveRequests(leaveRequests.map(request =>
            request.id === id ? { ...request, status: 'Rejected' } : request
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
                    <p className="text-gray-600 mt-1">Manage employee leave requests and approvals</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Pending Requests', value: stats.pending, color: 'bg-yellow-500' },
                        { label: 'Approved', value: stats.approved, color: 'bg-green-500' },
                        { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' },
                        { label: 'Total Leave Days', value: stats.totalDays, color: 'bg-blue-500' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-12 h-12 rounded-full`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Start Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">End Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Days</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {leaveRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{request.employeeName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{request.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{request.startDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{request.endDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{request.days}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                        }`}>
                                            {request.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm space-x-2">
                                    {request.status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleApprove(request.id)} className="text-green-600 hover:text-green-800 p-1">
                                                <Check size={18} />
                                            </button>
                                            <button onClick={() => handleReject(request.id)} className="text-red-600 hover:text-red-800 p-1">
                                                <X size={18} />
                                            </button>
                                        </>
                                    )}
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

export default LeaveManagement;