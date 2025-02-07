import { useEffect, useState } from "react";
import { inventoryData } from "../models/mockInventory.jsx";
import TopBar from "../components/TopBar.jsx";
import ToggleTabs from "../components/ToggleTabs";
import InventoryTable from "../components/InventoryTable";
import AddNewModal from "../components/AddNewModal.jsx";

const InventoryPage = () => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(() => {
        const savedInventory = localStorage.getItem("inventoryData");
        return savedInventory ?  JSON.parse(savedInventory) : inventoryData;
    });
    const [counts, setCounts] = useState(() => {
        const savedCounts = localStorage.getItem("inventoryCounts");
        return savedCounts ? JSON.parse(savedCounts) : 
            inventoryData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {});
    });
    const [activeTab, setActiveTab] = useState("inventory");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("inventoryCounts", JSON.stringify(counts));
    }, [counts]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
    
        setFilteredData(() => {
            const fullInventory = JSON.parse(localStorage.getItem("inventoryData")) || inventoryData;
            return fullInventory.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.color.toLowerCase().includes(value.toLowerCase()) || 
                item.size.toLowerCase().includes(value.toLowerCase())
            );
        });
    };

    const handleCountChange = (id, newValue) => {
        if (newValue >= 0) {
            setCounts((prev) => ({ ...prev, [id]: newValue }));
        }
    };

    const addNewItem = (newItem) => {
        setFilteredData((prevInventory) => {
            const updatedInventory = [...prevInventory, newItem];
            localStorage.setItem("inventoryData", JSON.stringify(updatedInventory));
            return updatedInventory;
        });

        setCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts, [newItem.id]: 0 };
            localStorage.setItem("inventoryCounts", JSON.stringify(updatedCounts));
            return updatedCounts;
        });
    };

    return (
        <>
            <div className="flex-1 h-screen bg-gray-50 text-black py-8 px-24">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">
                        Materials <span className="font-light text-gray-400">/ Blanks</span>
                    </h1>
                    <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                    <div className="flex justify-between mb-4 text-xs">
                        <TopBar search={search} handleSearch={handleSearch} />
                        <button 
                            onClick={() => setShowModal(true)} // New item modal
                            className="flex justify-center items-center bg-indigo-700 text-white text-xs px-4 rounded cursor-pointer">
                            <span className="mr-2">
                                +
                            </span>
                            <span>
                                Add New
                            </span>
                        </button>
                    </div>
                    <InventoryTable filteredData={filteredData} counts={counts} handleCountChange={handleCountChange} />
                </div>
            </div>
            {showModal && (
                <AddNewModal closeModal={() => setShowModal(false)} addNewItem={addNewItem} filteredData={filteredData} />
            )}
        </>
    );
};

export default InventoryPage;
