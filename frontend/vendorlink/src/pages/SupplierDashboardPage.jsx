// client/src/pages/SupplierDashboardPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; // Use your AuthContext
import api from '../services/api.js'; // Your API utility
import Chart from 'chart.js/auto'; // Import Chart.js

// Helper component for Product Card (optional, can be in components/ProductCard.jsx)
const ProductCard = ({ product }) => {
    // Determine pattern class based on product category
    const getPatternClass = (category) => {
        if (category.includes('Vegetables') || category.includes('Fruits')) return 'vegetables-pattern';
        if (category.includes('Grains') || category.includes('Rice') || category.includes('Quinoa')) return 'grains-pattern';
        if (category.includes('Spices') || category.includes('Paprika')) return 'spices-pattern';
        return 'bg-gray-200'; // Default if no pattern matches
    };

    // Determine stock status class
    const getStockStatusClass = (stock) => {
        if (stock === 'In Stock') return 'text-green-600 bg-green-100';
        if (stock === 'Low Stock') return 'text-yellow-600 bg-yellow-100';
        if (stock === 'Out of Stock') return 'text-red-600 bg-red-100';
        return '';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-xl">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className={`product-image h-20 w-20 rounded-md ${getPatternClass(product.category)}`}></div>
                    <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <span className="text-sm text-gray-500">/{product.unit}</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStockStatusClass(product.stockStatus)}`}>
                        {product.stockStatus}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        <span className="font-medium">{product.availableUnits}</span> units available
                    </div>
                    <Link to={`/supplier/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</Link>
                </div>
            </div>
        </div>
    );
};

// Helper component for Order Row (optional, can be in components/OrderRow.jsx)
const OrderRow = ({ order }) => {
    // Map status to Tailwind classes
    const getStatusClasses = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'status-badge bg-status-pending-background text-status-pending-text';
            case 'processing': return 'status-badge bg-status-processing-background text-status-processing-text';
            case 'shipped': return 'status-badge bg-status-shipped-background text-status-shipped-text';
            case 'delivered': return 'status-badge bg-status-delivered-background text-status-delivered-text';
            case 'cancelled': return 'status-badge bg-status-cancelled-background text-status-cancelled-text';
            default: return 'status-badge bg-gray-100 text-gray-800';
        }
    };

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {order.customerName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.products}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusClasses(order.status)}>{order.status}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/supplier/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                <Link to={`/supplier/orders/${order.id}/edit`} className="text-gray-600 hover:text-gray-900">Edit</Link>
            </td>
        </tr>
    );
};


const SupplierDashboardPage = () => {
    const { user, loading: authLoading, isSupplier, logout } = useAuth(); // Get auth state
    const navigate = useNavigate();
    const chartRef = useRef(null); // Ref for the Chart.js canvas
    const salesChartInstance = useRef(null); // Ref to store the Chart.js instance

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
    const [activeChartPeriod, setActiveChartPeriod] = useState('Weekly');
    const [productSearchTerm, setProductSearchTerm] = useState('');

    // Mock Data for Dashboard (replace with API calls to your backend later)
    const mockStats = {
        totalSales: 12426,
        salesChange: 12.5,
        salesTarget: 16000,
        totalOrders: 248,
        ordersChange: 8.2,
        ordersTarget: 300,
        inventoryTotal: 24,
        inventoryInStock: 18,
        inventoryLowStock: 3,
        inventoryOutOfStock: 3,
        customerRating: 4.8,
        ratingChange: 0.2,
        totalReviews: 156
    };

    const mockOrders = [
        { id: '#ORD-12345', customerName: 'John Doe', customerEmail: 'john@example.com', products: 'Organic Tomatoes (10kg)', amount: 120.00, date: 'May 12, 2023', status: 'Processing' },
        { id: '#ORD-12344', customerName: 'Jane Smith', customerEmail: 'jane@example.com', products: 'Organic Carrots (5kg), Potatoes (8kg)', amount: 85.50, date: 'May 11, 2023', status: 'Shipped' },
        { id: '#ORD-12343', customerName: 'Robert Johnson', customerEmail: 'robert@example.com', products: 'Organic Apples (3kg), Bananas (2kg)', amount: 42.75, date: 'May 10, 2023', status: 'Delivered' },
        { id: '#ORD-12342', customerName: 'Emily Wilson', customerEmail: 'emily@example.com', products: 'Organic Spinach (2kg), Kale (1kg)', amount: 35.20, date: 'May 9, 2023', status: 'Delivered' },
        { id: '#ORD-12341', customerName: 'Michael Brown', customerEmail: 'michael@example.com', products: 'Organic Rice (10kg), Quinoa (2kg)', amount: 78.90, date: 'May 8, 2023', status: 'Cancelled' },
    ];

    const mockProducts = [
        { id: 'prod1', name: 'Organic Tomatoes', description: 'Fresh, locally grown', category: ['Vegetables'], price: 4.99, unit: 'kg', availableUnits: 120, stockStatus: 'In Stock' },
        { id: 'prod2', name: 'Organic Rice', description: 'Premium quality', category: ['Grains'], price: 3.50, unit: 'kg', availableUnits: 85, stockStatus: 'In Stock' },
        { id: 'prod3', name: 'Organic Paprika', description: 'Premium spice', category: ['Spices'], price: 6.75, unit: '100g', availableUnits: 8, stockStatus: 'Low Stock' },
        { id: 'prod4', name: 'Organic Carrots', description: 'Fresh, locally grown', category: ['Vegetables'], price: 2.99, unit: 'kg', availableUnits: 0, stockStatus: 'Out of Stock' },
        { id: 'prod5', name: 'Organic Quinoa', description: 'Premium quality', category: ['Grains'], price: 8.25, unit: 'kg', availableUnits: 42, stockStatus: 'In Stock' },
        { id: 'prod6', name: 'Organic Spinach', description: 'Fresh, locally grown', category: ['Vegetables'], price: 3.75, unit: 'kg', availableUnits: 5, stockStatus: 'Low Stock' },
    ];

    // Filtered products based on search term
    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(productSearchTerm.toLowerCase())
    );


    // Effect for authentication and redirection
    useEffect(() => {
        if (authLoading) return; // Wait for auth data to load

        if (!user || user.role !== 'supplier') {
            // If not logged in or not a supplier, redirect to login
            navigate('/login');
        }
    }, [user, authLoading, isSupplier, navigate]);


    // Effect for Chart.js initialization and updates
    useEffect(() => {
        const getChartData = (period) => {
            switch (period) {
                case 'Weekly':
                    return {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        data: [1200, 1900, 1500, 2500, 2200, 3000, 2800]
                    };
                case 'Monthly':
                    return {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        data: [8000, 10500, 9800, 12000]
                    };
                case 'Yearly':
                    return {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        data: [25000, 28000, 32000, 38000, 42000, 48000, 52000, 58000, 62000, 68000, 72000, 78000]
                    };
                default:
                    return {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        data: [1200, 1900, 1500, 2500, 2200, 3000, 2800]
                    };
            }
        };

        const { labels, data } = getChartData(activeChartPeriod);

        if (chartRef.current) {
            if (salesChartInstance.current) {
                // Update existing chart instance
                salesChartInstance.current.data.labels = labels;
                salesChartInstance.current.data.datasets[0].data = data;
                salesChartInstance.current.update();
            } else {
                // Initialize new chart instance
                const ctx = chartRef.current.getContext('2d');
                salesChartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Sales',
                            data: data,
                            backgroundColor: 'rgba(79, 70, 229, 0.1)', // Tailwind indigo-600 with opacity
                            borderColor: 'rgba(79, 70, 229, 1)',      // Tailwind indigo-600
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#1F2937', // Tailwind dark
                                titleColor: '#F9FAFB',     // Tailwind light
                                bodyColor: '#F3F4F6',
                                displayColors: false,
                                callbacks: {
                                    label: function(context) {
                                        return `$${context.parsed.y}`;
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: { color: 'rgba(156, 163, 175, 0.1)' }, // gray-400 with opacity
                                ticks: {
                                    callback: function(value) { return '$' + value; }
                                }
                            },
                            x: {
                                grid: { display: false }
                            }
                        }
                    }
                });
            }
        }

        // Cleanup function to destroy chart instance on component unmount
        return () => {
            if (salesChartInstance.current) {
                salesChartInstance.current.destroy();
                salesChartInstance.current = null;
            }
        };
    }, [activeChartPeriod]); // Re-run effect when activeChartPeriod changes

    // Handle initial loading/redirect
    if (authLoading) {
        return <div className="flex justify-center items-center h-screen text-gray-700">Loading user data...</div>;
    }

    if (!user || !isSupplier) {
        // Redirection handled by useEffect, but return null/loader for immediate render
        return <div className="flex justify-center items-center h-screen text-gray-700">Redirecting...</div>;
    }

    // Get initials for user avatar
    const userInitials = user.username ? user.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'SU'; // SU for Supplier User

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside id="sidebar" className={`sidebar bg-white w-64 fixed h-full shadow-lg z-30 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-6 pt-8 pb-6 flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center mb-8">
                        <svg className="h-10 w-10 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H21V18H3V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 6L12 12L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 12L3 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 18L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="ml-2 text-xl font-bold text-gray-900">StreetMarket</span>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                            {userInitials}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.role === 'supplier' ? 'Verified Supplier' : user.role}</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        <Link to="/supplier-dashboard" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            Dashboard
                        </Link>
                        <Link to="/supplier/orders" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                            </svg>
                            Orders
                        </Link>
                        <Link to="/supplier/products" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Products
                        </Link>
                        <Link to="/supplier/analytics" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Analytics
                        </Link>
                        <Link to="/supplier/payments" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Payments
                        </Link>
                        <Link to="/supplier/schedule" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Schedule
                        </Link>
                        <Link to="/supplier/settings" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            Settings
                        </Link>
                    </nav>
                    {/* Help & Support */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <Link to="/supplier/help" className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Help & Support
                        </Link>
                        <button onClick={logout} className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md w-full text-left">
                            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Top Navigation */}
                <header className="bg-white shadow-sm sticky top-0 z-20">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            {/* Mobile Menu Button */}
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>

                            {/* Page Title */}
                            <h1 className="text-lg font-semibold text-gray-900">Supplier Dashboard</h1>

                            {/* Right Side Actions */}
                            <div className="flex items-center space-x-4">
                                {/* Search */}
                                <div className="hidden sm:block">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                        <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search..."
                                            value={productSearchTerm}
                                            onChange={(e) => setProductSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div className="relative">
                                    <button onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)} className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">View notifications</span>
                                        <div className="relative">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                            </svg>
                                            <span className="notification-dot"></span>
                                        </div>
                                    </button>

                                    {/* Notification Dropdown */}
                                    <div className={`${isNotificationDropdownOpen ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                                        <div className="py-2">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto">
                                                {/* Mock Notifications */}
                                                <a href="#" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">New order received</p>
                                                            <p className="text-xs text-gray-500">Order #12345 - 10 units of Organic Tomatoes</p>
                                                            <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">Payment received</p>
                                                            <p className="text-xs text-gray-500">$235.40 payment for order #12340</p>
                                                            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">Low inventory alert</p>
                                                            <p className="text-xs text-gray-500">Organic Carrots (5 units remaining)</p>
                                                            <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="px-4 py-2 border-t border-gray-200">
                                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all notifications</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* User Menu */}
                                <div className="relative">
                                    <button onClick={() => setIsNotificationDropdownOpen(false) /* Close notifications if open */ } className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open user menu</span>
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                            {userInitials}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="py-6 px-4 sm:px-6 lg:px-8">
                    {/* Welcome Message */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username || 'Supplier'}!</h2>
                        <p className="text-sm text-gray-500">Here's what's happening with your products today.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Sales Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+{mockStats.salesChange}%</span>
                            </div>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-gray-900">${mockStats.totalSales}</p>
                                <p className="ml-2 text-sm text-gray-500">this month</p>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(mockStats.totalSales / mockStats.salesTarget) * 100}%` }}></div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">Monthly target</p>
                                    <p className="text-xs font-medium text-gray-700">${mockStats.salesTarget}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Orders Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+{mockStats.ordersChange}%</span>
                            </div>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
                                <p className="ml-2 text-sm text-gray-500">this month</p>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${(mockStats.totalOrders / mockStats.ordersTarget) * 100}%` }}></div>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">Monthly target</p>
                                    <p className="text-xs font-medium text-gray-700">{mockStats.ordersTarget}</p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Inventory Status</h3>
                                <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">{mockStats.inventoryLowStock} Low</span>
                            </div>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-gray-900">{mockStats.inventoryTotal}</p>
                                <p className="ml-2 text-sm text-gray-500">products</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-green-600 font-medium">In Stock ({mockStats.inventoryInStock})</span>
                                    <span className="text-yellow-600 font-medium">Low Stock ({mockStats.inventoryLowStock})</span>
                                    <span className="text-red-600 font-medium">Out of Stock ({mockStats.inventoryOutOfStock})</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mt-1 flex">
                                    <div className="h-full bg-green-500 rounded-l-full" style={{ width: `${(mockStats.inventoryInStock / mockStats.inventoryTotal) * 100}%` }}></div>
                                    <div className="h-full bg-yellow-500" style={{ width: `${(mockStats.inventoryLowStock / mockStats.inventoryTotal) * 100}%` }}></div>
                                    <div className="h-full bg-red-500 rounded-r-full" style={{ width: `${(mockStats.inventoryOutOfStock / mockStats.inventoryTotal) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Rating Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-500">Customer Rating</h3>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+{mockStats.ratingChange}</span>
                            </div>
                            <div className="flex items-baseline">
                                <p className="text-2xl font-bold text-gray-900">{mockStats.customerRating}</p>
                                <p className="ml-2 text-sm text-gray-500">out of 5</p>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center">
                                    {/* Star rating display */}
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className={`h-4 w-4 ${mockStats.customerRating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    ))}
                                    <span className="ml-2 text-xs text-gray-500">based on {mockStats.totalReviews} reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <Link to="/supplier/products/add" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Add Product</span>
                            </Link>
                            <Link to="/supplier/invoices/create" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Create Invoice</span>
                            </Link>
                            <Link to="/supplier/inventory/update" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Update Stock</span>
                            </Link>
                            <Link to="/supplier/offers/create" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Create Offer</span>
                            </Link>
                            <Link to="/supplier/reports" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">View Reports</span>
                            </Link>
                            <Link to="/supplier/delivery-schedule" className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center hover:bg-indigo-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-gray-700">Schedule Delivery</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                            <Link to="/supplier/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</Link>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {mockOrders.map(order => (
                                            <OrderRow key={order.id} order={order} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Section */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
                            <div className="flex space-x-2">
                                <button onClick={() => setActiveChartPeriod('Weekly')} className={`tab-button px-3 py-1 text-sm font-medium rounded-md ${activeChartPeriod === 'Weekly' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>Weekly</button>
                                <button onClick={() => setActiveChartPeriod('Monthly')} className={`tab-button px-3 py-1 text-sm font-medium rounded-md ${activeChartPeriod === 'Monthly' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>Monthly</button>
                                <button onClick={() => setActiveChartPeriod('Yearly')} className={`tab-button px-3 py-1 text-sm font-medium rounded-md ${activeChartPeriod === 'Yearly' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>Yearly</button>
                            </div>
                        </div>
                        <div className="bg-white shadow-sm rounded-lg p-6">
                            <div className="h-80">
                                <canvas ref={chartRef} id="salesChart"></canvas>
                            </div>
                        </div>
                    </div>

                    {/* Product Inventory */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Product Inventory</h3>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input id="product-search" type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search products..."
                                        value={productSearchTerm}
                                        onChange={(e) => setProductSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex">
                                    <button id="grid-view-btn" className="p-1.5 rounded-l-md bg-indigo-100 text-indigo-600">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                        </svg>
                                    </button>
                                    <button id="list-view-btn" className="p-1.5 rounded-r-md text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Grid View */}
                        <div id="grid-view" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* List View (Hidden by default) */}
                        <div id="list-view" className="hidden bg-white shadow-sm rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProducts.map(product => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`product-image h-10 w-10 rounded-md ${getPatternClass(product.category)}`}></div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-500">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category.join(', ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}/{product.unit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.availableUnits} units</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStockStatusClass(product.stockStatus)}`}>
                                                    {product.stockStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/supplier/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                                                <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierDashboardPage;
