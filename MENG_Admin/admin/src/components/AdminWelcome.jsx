
const features = [
    {
        // Plus in box (Add Items)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M12 8v8M8 12h8" />
            </svg>
        ),
        title: "Add Items",
        desc: "Add new products to your catalog",
        color: "bg-[#2b5175]/10 text-[#2b5175]",
    },
    {
        // List icon (List Items)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
            </svg>
        ),
        title: "List Items",
        desc: "View and manage all products",
        color: "bg-[#2b5175]/10 text-[#263D54]",
    },
    {
        // Cart icon (Orders)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
        ),
        title: "Orders",
        desc: "Monitor and manage customer orders",
        color: "bg-green-100 text-green-700",
    },
    {
        // Ticket icon (Coupons)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="2" />
                <path d="M7 7v10M17 7v10" />
            </svg>
        ),
        title: "Coupons",
        desc: "Create and manage discount coupons",
        color: "bg-yellow-100 text-yellow-700",
    },
    {
        // User icon (Users)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/>
                <path d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2"/>
            </svg>
        ),
        title: "Users",
        desc: "View and manage user accounts",
        color: "bg-purple-100 text-purple-700",
    },
    {
        // Bar chart icon (Analytics)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="12" width="4" height="8" rx="1"/>
                <rect x="9" y="8" width="4" height="12" rx="1"/>
                <rect x="15" y="4" width="4" height="16" rx="1"/>
            </svg>
        ),
        title: "Analytics",
        desc: "View sales and performance metrics",
        color: "bg-pink-100 text-pink-700",
    },
    {
        // Warning icon (Low Stock)
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01"/>
                <rect x="3" y="5" width="18" height="14" rx="2"/>
            </svg>
        ),
        title: "Low Stock",
        desc: "See products about to run out",
        color: "bg-red-100 text-red-700",
    },
    {
        // Coming Soon icon
        icon: (
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeDasharray="4 2" />
                <path d="M12 8v4l2 2" />
            </svg>
        ),
        title: "Other Feature",
        desc: "Coming soon...",
        color: "bg-gray-100 text-gray-500",
    },
];

const AdminWelcome = () => {

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-8 mb-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-[#263D54] dark:text-white mb-2 flex items-center gap-2 animate-fade-in-down">
                    <span className="inline-block animate-bounce">Welcome to Admin Dashboard</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                    Hello <span className="font-semibold">{'Admin'}</span>! You have full access to manage the platform.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Use the sidebar to navigate between dashboard features.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className={`rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center hover:shadow-lg transition ${f.color} bg-white dark:bg-slate-800`}
                    >
                        <div className="mb-4">{f.icon}</div>
                        <h3 className="text-xl font-semibold text-[#263D54] dark:text-white mb-2">{f.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🔒</span>
                    <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                        Admin-Only Access
                    </h3>
                </div>
                <p className="text-yellow-700 dark:text-yellow-300 text-center">
                    You are currently in admin mode. The main website is not accessible while you are logged in as an admin.
                    Use the navigation sidebar to access different admin functions.
                </p>
            </div>
        </div>
    );
};

export default AdminWelcome;
