const ToggleTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex bg-gray-200 rounded text-xs p-1 w-48">
            <button
                onClick={() => setActiveTab("inventory")}
                className={`flex-1 py-2 font-medium transition-all cursor-pointer ${activeTab === "inventory" ? "bg-white shadow rounded" : "text-gray-500"}`}
            >
                Inventory
            </button>
            <button
                onClick={() => setActiveTab("orderQueue")}
                className={`flex-1 py-2 font-medium transition-all cursor-pointer ${activeTab === "orderQueue" ? "bg-white shadow rounded" : "text-gray-500"}`}
            >
                Order Queue
            </button>
        </div>
    );
};

export default ToggleTabs;
