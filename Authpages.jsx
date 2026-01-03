import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Mail, Lock, User, CreditCard } from 'lucide-react';

const AuthPages = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        employeeId: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'EMPLOYEE'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (isLogin) {
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
            if (!formData.password) newErrors.password = 'Password is required';
        } else {
            if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
            if (!formData.email) newErrors.email = 'Email is required';
            else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
            if (!formData.password) newErrors.password = 'Password is required';
            else if (!validatePassword(formData.password)) {
                newErrors.password = 'Password must be 8+ chars with uppercase, lowercase, number, and special character';
            }
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
            else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : {
                    employeeId: formData.employeeId,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                };

            console.log('API Call:', endpoint, payload);

            await new Promise(resolve => setTimeout(resolve, 1500));

            if (isLogin) {
                const userData = {
                    email: formData.email,
                    role: formData.role,
                    token: 'sample-jwt-token'
                };

                setUserInfo(userData);
                setIsAuthenticated(true);

                alert('Login successful! Redirecting to dashboard...');
            } else {
                alert('Registration successful! Please check your email for verification.');
                setIsLogin(true);
            }

        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserInfo(null);
        setFormData({
            employeeId: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'EMPLOYEE'
        });
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            employeeId: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'EMPLOYEE'
        });
        setErrors({});
    };

    if (isAuthenticated) {
        return <EmployeeDashboard userInfo={userInfo} onLogout={handleLogout} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dayflow</h1>
                    <p className="text-gray-600">Every workday, perfectly aligned.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-600">
                            {isLogin ? 'Sign in to your account' : 'Register as a new employee'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee ID
                                </label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="employeeId"
                                        value={formData.employeeId}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.employeeId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                        placeholder="EMP001"
                                    />
                                </div>
                                {errors.employeeId && (
                                    <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                    placeholder="you@company.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none bg-white"
                                    >
                                        <option value="EMPLOYEE">Employee</option>
                                        <option value="HR">HR Officer</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm text-red-600">{errors.submit}</p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={switchMode}
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500 mt-8">
                    © 2024 Dayflow HRMS. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AuthPages;