// client/src/pages/SupplierLoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Corrected path and extension

const SupplierLoginPage = () => {
    const [username, setUsername] = useState(''); // Using username as per backend mock
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // AuthContext's login function already handles setUser internally // To update user state after login

    // State and function to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear previous errors
        setLoading(true); // Show loading state

        // Basic client-side validation (backend will also validate)
        if (!username || !password) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        try {
            // Call your backend API for login
            const result = await login(username, password); // Use login function from AuthContext

            if (result.success) {
                // Check if the logged-in user is a supplier
                if (result.user.role === 'supplier') {
                    // setUser is already handled by AuthContext's login method
                    navigate('/supplier-dashboard', { replace: true }); // Redirect and replace history entry // Redirect to supplier dashboard
                } else {
                    // If not a supplier, show an error message
                    setError('Access denied: This login is for suppliers only. Please use the general login for other roles.');
                    // Optionally, log them out if they are logged in with wrong role
                    // logout(); // Assuming logout is also available from useAuth if needed here
                }
            } else {
                // Display error message from the backend
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            // Catch network or unexpected errors
            setError('An unexpected error occurred during login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-inter py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">Supplier Login</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Access your supplier dashboard to manage your products and orders
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-center">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full p-3 inline-flex">
                                {/* Supplier Icon SVG (from Canva AI) */}
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error message display */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {/* Username Input (using 'username' as per your backend mock setup) */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text" // Use 'text' for username input
                                    autoComplete="username"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'} // Toggle type based on state
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                                >
                                    {showPassword ? (
                                        // Eye-off icon (hidden password)
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                        </svg>
                                    ) : (
                                        // Eye icon (visible password)
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={loading} // Disable button when loading
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:translate-y-[-1px]" // Combined btn-hover with Tailwind
                            >
                                {loading ? (
                                    // Loading spinner SVG
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {loading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    {/* Divider and Social Logins (kept for design, but not functional) */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    {/* GitHub SVG (from Canva AI) */}
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    {/* Telegram SVG (from Canva AI) */}
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.11 8.882l-4.438 2.256-.002-.002c-.126.064-.26.098-.396.098-.117 0-.23-.025-.338-.078-.196-.096-.34-.262-.393-.472l-.005-.016-1.444-5.534c-.118-.452.213-.888.665-.967.45-.079.883.194.999.646l1.313 5.029 4.047-2.048c.408-.207.907-.027 1.114.381.207.409.026.907-.383 1.115z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Not a supplier yet?
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                                Apply to become a supplier
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierLoginPage;