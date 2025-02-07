import { useEffect, useState } from "react";
import { inventoryData } from "../models/mock.jsx";

import SearchIcon from "../assets/icons/Search.svg";
import SortIcon from "../assets/icons/Sort.svg";
import FilterIcon from "../assets/icons/Filter.svg";

const InventoryPage = () => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(inventoryData);

    // Load counts from localStorage or initialize with 0
    const [counts, setCounts] = useState(() => {
        const savedCounts = localStorage.getItem("inventoryCounts");
        return savedCounts ? JSON.parse(savedCounts) : 
            inventoryData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {});
    });

    const [activeTab, setActiveTab] = useState("inventory");

    useEffect(() => {
        localStorage.setItem("inventoryCounts", JSON.stringify(counts));
    }, [counts]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredData(
            inventoryData.filter((item) =>
                item.name.toLowerCase().includes(value) ||
                item.color.toLowerCase().includes(value) || 
                item.size.toLowerCase().includes(value)
            )
        );
    };

    const handleCountChange = (id, newValue) => {
        if (newValue >= 0) {
            setCounts((prev) => ({ ...prev, [id]: newValue }));
        }
    };

    return (
        <div className="flex-1 h-screen bg-gray-50 text-black py-8 px-24">
            <div className="flex justify-between items-center mb-4">
                {/* Page Title */}
                <h1 className="text-xl font-semibold">
                    Materials <span className="font-light text-gray-400">/ Blanks</span>
                </h1>

                {/* Toggle Button */}
                <div className="flex bg-gray-200 rounded text-xs p-1 w-48">
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={`flex-1 py-2 font-medium transition-all cursor-pointer ${
                            activeTab === "inventory" ? "bg-white shadow rounded" : "text-gray-500"
                        }`}
                    >
                        Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab("orderQueue")}
                        className={`flex-1 py-2 font-medium transition-all cursor-pointer ${
                            activeTab === "orderQueue" ? "bg-white shadow rounded" : "text-gray-500"
                        }`}
                    >
                        Order Queue
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
                <div className="flex justify-between mb-4 text-xs">
                    <div className="relative w-[35%] flex">
                        <div>
                            <img src={SearchIcon} alt="search" className="absolute top-2 left-2 w-4 h-4"></img>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Materials"
                            value={search}
                            onChange={handleSearch}
                            className="w-full p-2 pl-8 border border-gray-300 rounded-sm focus:outline-none"
                        />
                        <div className="ml-3 flex items-center gap-1">
                            <div className="cursor-pointer">
                                <img src={FilterIcon} alt="search" className="w-6 h-6"></img>
                            </div>
                            <div className="cursor-pointer">
                                <img src={SortIcon} alt="search" className="w-6 h-6"></img>
                            </div>
                        </div>

                    </div>
                    <button className="flex justify-center items-center bg-indigo-700 text-white text-sm px-4 rounded cursor-pointer">
                        <span className="mr-2">
                            +
                        </span>
                        <span>
                            Add New
                        </span>
                    </button>
                </div>
                <table className="w-full">
                    <tbody>
                        {filteredData.map((item) => {
                            const isInvalid = counts[item.id] > item.stock;
                            return (
                                <tr key={item.id} className="flex items-center justify-between h-10 my-4 text-sm">
                                    <td className="flex items-center text-gray-700">
                                        <div className={`h-10 w-10 mr-4 border border-gray-300 rounded p-1
                                            ${item.color === "White" ? "bg-gray-800" : "bg-gray-50"}`}>
                                            <img src={item.image} alt={item.name} className="w-full h-full" />
                                        </div>
                                        <span>{item.name}</span>
                                        <span>&nbsp;-&nbsp;</span>
                                        <span>{item.color}</span>
                                        <span>&nbsp;/&nbsp;</span>
                                        <span className="text-gray-700">{item.size}</span>
                                    </td>
                                    <td>
                                        <div className="h-10 flex items-center">
                                            <button 
                                                onClick={() => handleCountChange(item.id, counts[item.id] - 1)}
                                                className="h-full w-10 border-l border-y border-gray-300 rounded-l cursor-pointer"
                                                disabled={counts[item.id] === 0}
                                            >
                                                -
                                            </button>
                                            <div className={`h-full w-24 flex-1 flex flex-col items-center border 
                                                ${isInvalid ? "border-gray-300 text-gray-700" : "border-yellow-600 bg-amber-100"}`}>
                                                <input 
                                                    type="number" 
                                                    value={counts[item.id]} 
                                                    onChange={(e) => handleCountChange(item.id, e.target.value)}
                                                    onBlur={(e) => {
                                                        if (e.target.value === "") handleCountChange(item.id, 0);
                                                    }}
                                                    className="h-7 w-full text-center outline-none bg-transparent"
                                                />
                                                <div className={`h-3 w-full flex justify-center items-center border-t text-[10px]
                                                                ${isInvalid ? "border-gray-300 bg-gray-50 text-gray-500" : "border-yellow-600 bg-yellow-600 text-white"}`}>
                                                    {item.stock} PCS
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => handleCountChange(item.id, counts[item.id] + 1)}
                                                className="h-full w-10 border-r border-y border-gray-300 rounded-r cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;
