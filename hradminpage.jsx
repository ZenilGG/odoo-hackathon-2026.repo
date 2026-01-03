import React, { useState } from 'react';
import { User, Briefcase, DollarSign, FileText, Edit2, Plus } from 'lucide-react';

export default function EmployeeProfileSystem() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isAdmin, setIsAdmin] = useState(true);

    const employee = {
        name: 'My Name',
        loginId: 'Login ID',
        email: 'Email',
        mobile: 'Mobile',
        company: 'Company',
        department: 'Department',
        manager: 'Manager',
        location: 'Location',
        monthWage: 50000,
        yearlyWage: 600000,
        workingDays: 5,
        breakTime: '',
        salaryComponents: [
            { name: 'Basic Salary', amount: 250000, percentage: 50.00, type: 'monthly' },
            { name: 'House Rent Allowance', amount: 125000, percentage: 50.00, type: 'monthly' },
            { name: 'Standard Allowance', amount: 41666.67, percentage: 16.67, type: 'monthly' },
            { name: 'Performance Bonus', amount: 20833.33, percentage: 8.33, type: 'monthly' },
            { name: 'Leave Travel Allowance', amount: 20833.33, percentage: 8.33, type: 'monthly' },
            { name: 'Fixed Allowance', amount: 29166.67, percentage: 11.67, type: 'monthly' }
        ],
        pfContribution: {
            employee: 30000,
            employeePercent: 12.00,
            employer: 30000,
            employerPercent: 12.00,
            professionalTax: 200
        }
    };

    const skills = [
        { category: 'Skills', items: ['Athletic Tiger'] },
        { category: 'Certification', items: [] }
    ];

    const tabs = [
        { id: 'company', label: 'Company Logo', icon: Briefcase },
        { id: 'employees', label: 'Employees', icon: User },
        { id: 'attendance', label: 'Attendance', icon: FileText },
        { id: 'timeoff', label: 'Time Off', icon: FileText }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">For Admin:</h1>
                    <div className="flex gap-4 mb-4">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Panel - Profile */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">My Profile</h2>

                        {/* Profile Header */}
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-pink-200 flex items-center justify-center">
                                <Edit2 className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-2">{employee.name}</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex justify-between border-b pb-1">
                                        <span>Login ID</span>
                                        <span className="text-right">{employee.loginId}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <span>Email</span>
                                        <span className="text-right">{employee.email}</span>
                                    </div>
                                    <div className="flex justify-between border-b pb-1">
                                        <span>Mobile</span>
                                        <span className="text-right">{employee.mobile}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex justify-between gap-8 border-b pb-1">
                                    <span>Company</span>
                                    <span className="text-right">{employee.company}</span>
                                </div>
                                <div className="flex justify-between gap-8 border-b pb-1">
                                    <span>Department</span>
                                    <span className="text-right">{employee.department}</span>
                                </div>
                                <div className="flex justify-between gap-8 border-b pb-1">
                                    <span>Manager</span>
                                    <span className="text-right">{employee.manager}</span>
                                </div>
                                <div className="flex justify-between gap-8 border-b pb-1">
                                    <span>Location</span>
                                    <span className="text-right">{employee.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tab Buttons */}
                        <div className="flex gap-2 mb-6">
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                                Resume
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                                Private Info
                            </button>
                            <button
                                className={`px-4 py-2 border rounded ${
                                    isAdmin ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                }`}
                                disabled={!isAdmin}
                            >
                                Salary Info
                            </button>
                        </div>

                        {/* About Section */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">About</h4>
                                <Edit2 className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>

                        {/* What I Love About My Job */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">What I love about my job</h4>
                                <Edit2 className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>

                        {/* Interests and Hobbies */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">My interests and hobbies</h4>
                                <Edit2 className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>

                        {/* Skills Section */}
                        <div className="space-y-4">
                            {skills.map((skillGroup, idx) => (
                                <div key={idx} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold">{skillGroup.category}</h4>
                                    </div>
                                    {skillGroup.items.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {skillGroup.items.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-yellow-200 text-sm rounded">
                          {skill}
                        </span>
                                            ))}
                                        </div>
                                    ) : null}
                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                        + Add Skills
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Team Labels */}
                        <div className="mt-6 flex gap-2">
                            <span className="px-3 py-1 bg-green-200 text-sm rounded">nayan</span>
                            <span className="px-3 py-1 bg-yellow-200 text-sm rounded">Venerated Buffalo</span>
                            <span className="px-3 py-1 bg-orange-200 text-sm rounded">jeetu</span>
                        </div>
                    </div>

                    {/* Right Panel - Salary Info */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-4">
                            <p className="text-center text-gray-600 mb-4">
                                Salary Info tab Should only be visible to Admin
                            </p>
                            <div className="flex justify-center mb-6">
                                <button className="px-6 py-2 border-2 border-gray-800 rounded-lg font-semibold hover:bg-gray-50">
                                    Salary Info
                                </button>
                            </div>
                        </div>

                        {/* Wage Information */}
                        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Month Wage</span>
                                    <span className="text-gray-400">/ Month</span>
                                </div>
                                <div className="text-2xl font-bold">{employee.monthWage}</div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Yearly wage</span>
                                    <span className="text-gray-400">/ Yearly</span>
                                </div>
                                <div className="text-2xl font-bold">{employee.yearlyWage}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">No of working days in a week:</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        className="w-32 border-b border-gray-300 text-right"
                                        placeholder="/hrs"
                                    />
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">Break Time:</div>
                        </div>

                        {/* Salary Components */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-4">Salary Components</h3>
                            <div className="space-y-3">
                                {employee.salaryComponents.map((component, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex-1">
                                            <div className="font-medium">{component.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {idx === 0 && "Before Basic salary from company cost compute is based on monthly Wages"}
                                                {idx === 1 && "HRA provided to employees 50% of the basic salary"}
                                                {idx === 2 && "A standard allowance is a predetermined fixed amount provided to employees as part of their salary"}
                                                {idx === 3 && "Variable amount used during payroll. The value defined by the company and calculated as a % of the basic salary"}
                                                {idx === 4 && "LTA is paid by the senior their travel expenses and calculated as a % of the basic salary"}
                                                {idx === 5 && "Fixed allowance portion of wages is determined after calculating all salary components"}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div>{component.amount.toFixed(2)} ₹ / month</div>
                                            <div className="text-xs text-gray-500">{component.percentage.toFixed(2)} %</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PF Contribution */}
                        <div className="bg-yellow-100 rounded-lg p-4">
                            <h3 className="font-semibold mb-4">Provident Fund (PF) Contribution</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Employee</span>
                                    <div className="text-right">
                                        <div>{employee.pfContribution.employee.toFixed(2)} ₹ / month</div>
                                        <div className="text-xs text-gray-600">{employee.pfContribution.employeePercent.toFixed(2)} %</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    PF is calculated based on the basic salary
                                </div>
                                <div className="flex justify-between">
                                    <span>Employer</span>
                                    <div className="text-right">
                                        <div>{employee.pfContribution.employer.toFixed(2)} ₹ / month</div>
                                        <div className="text-xs text-gray-600">{employee.pfContribution.employerPercent.toFixed(2)} %</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    PF is calculated based on the basic salary
                                </div>
                                <div className="flex justify-between font-semibold">
                                    <span>Professional Tax</span>
                                    <div>{employee.pfContribution.professionalTax.toFixed(2)} ₹ / month</div>
                                </div>
                                <div className="text-xs text-gray-600">
                                    Professional Tax deducted from the Gross salary
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Label */}
                <div className="mt-6 flex justify-end">
          <span className="px-4 py-2 bg-pink-200 text-sm rounded-full">
            Adventurous Giraffe
          </span>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileSystem;