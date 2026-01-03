import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const PayrollManagement = () => {
    const [payrollRecords, setPayrollRecords] = useState([
        {
            id: 1,
            employeeName: 'John Doe',
            baseSalary: 75000,
            bonus: 5000,
            deductions: 8000,
            netPay: 72000,
            status: 'Paid'
        },
        {
            id: 2,
            employeeName: 'Jane Smith',
            baseSalary: 85000,
            bonus: 7000,
            deductions: 9500,
            netPay: 82500,
            status: 'Paid'
        },
        {
            id: 3,
            employeeName: 'Mike Johnson',
            baseSalary: 65000,
            bonus: 3000,
            deductions: 7000,
            netPay: 61000,
            status: 'Pending'
        },
        {
            id: 4,
            employeeName: 'Sarah Williams',
            baseSalary: 90000,
            bonus: 10000,
            deductions: 11000,
            netPay: 89000,
            status: 'Paid'
        },
        {
            id: 5,
            employeeName: 'David Brown',
            baseSalary: 70000,
            bonus: 4000,
            deductions: 7500,
            netPay: 66500,
            status: 'Pending'
        },
        {
            id: 6,
            employeeName: 'Emily Davis',
            baseSalary: 80000,
            bonus: 6000,
            deductions: 8800,
            netPay: 77200,
            status: 'Paid'
        },
        {
            id: 7,
            employeeName: 'Robert Wilson',
            baseSalary: 72000,
            bonus: 4500,
            deductions: 7800,
            netPay: 68700,
            status: 'Pending'
        },
        {
            id: 8,
            employeeName: 'Lisa Anderson',
            baseSalary: 78000,
            bonus: 5500,
            deductions: 8500,
            netPay: 75000,
            status: 'Paid'
        }
    ]);

    const totalBaseSalary = payrollRecords.reduce((sum, record) => sum + record.baseSalary, 0);
    const totalBonus = payrollRecords.reduce((sum, record) => sum + record.bonus, 0);
    const totalDeductions = payrollRecords.reduce((sum, record) => sum + record.deductions, 0);
    const totalNetPay = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
                    <p className="text-gray-600 mt-1">Manage employee salaries and payments</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Base Salary</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">${totalBaseSalary.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-blue-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Bonus</p>
                                <p className="text-2xl font-bold text-green-600 mt-2">${totalBonus.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-green-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Deductions</p>
                                <p className="text-2xl font-bold text-red-600 mt-2">${totalDeductions.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-red-500" size={40} />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Net Pay</p>
                                <p className="text-2xl font-bold text-indigo-600 mt-2">${totalNetPay.toLocaleString()}</p>
                            </div>
                            <DollarSign className="text-indigo-500" size={40} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employee</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Base Salary</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bonus</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deductions</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Net Pay</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {payrollRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{record.employeeName}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">${record.baseSalary?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">${record.bonus?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">${record.deductions?.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">${record.netPay?.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            record.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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

export default PayrollManagement;