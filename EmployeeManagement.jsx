import React, { useState } from 'react';
import { Users, Edit, Trash2, Plus } from 'lucide-react';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@company.com',
            department: 'Engineering',
            position: 'Senior Developer',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            department: 'Marketing',
            position: 'Marketing Manager',
            status: 'Active'
        }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
        status: 'Active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentEmployee) {
            // Update existing employee
            setEmployees(employees.map(emp =>
                emp.id === currentEmployee.id
                    ? { ...formData, id: currentEmployee.id }
                    : emp
            ));
        } else {
            // Add new employee
            const newEmployee = {
                ...formData,
                id: Math.max(0, ...employees.map(e => e.id)) + 1
            };
            setEmployees([...employees, newEmployee]);
        }

        setShowModal(false);
        resetForm();
    };

    const handleEdit = (employee) => {
        setCurrentEmployee(employee);
        setFormData(employee);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            department: '',
            position: '',
            status: 'Active'
        });
        setCurrentEmployee(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
                        <p className="text-gray-600 mt-1">Manage your organization's employees</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowModal(true); }}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                    >
                        <Plus size={20} />
                        <span>Add Employee</span>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Position</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{employee.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.department}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                                <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {employee.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm space-x-2">
                                    <button onClick={() => handleEdit(employee)} className="text-indigo-600 hover:text-indigo-800 p-1">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-800 p-1">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {currentEmployee ? 'Edit Employee' : 'Add New Employee'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                                    <input
                                        type="text"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div className="flex space-x-4 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeManagement;