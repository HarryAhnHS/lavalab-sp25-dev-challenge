import { useState } from "react";
import { inventoryData } from "../models/mock.jsx";

const InventoryPage = () => {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(inventoryData);

    // Handle Search
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        setFilteredData(
            inventoryData.filter((item) =>
                item.name.toLowerCase().includes(value)
            )
        );
    };

    return (
        <div className="flex-1 h-screen bg-gray-50 text-black py-8 px-24">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-4">
                {/* To do - set as nav title and create toggle button */}
                <h1 className="text-2xl font-bold">Materials / Blank</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Inventory | Order Queue
                </button>
            </div>

            {/* Inventory component - todo abstract */}
            <div className="bg-white rounded-lg shadow-md p-4">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full p-2 pl-10 border border-gray-400 rounded-lg focus:outline-none"
                    />
                    {/* <FiSearch className="absolute left-3 top-3 text-gray-500" /> */}
                </div>
                {/* Table */}
                <table className="w-full">
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="flex items-center justify-between h-12 m-3 text-sm">
                                <td className="flex items-center">
                                    <div className={`h-12 w-12 p-2 border border-gray-300 rounded 
                                        ${item.color == "White" ? "bg-gray-800" : "bg-gray-50"}`}>
                                        <img src={item.image} alt={item.name} className="w-full h-full"></img>
                                    </div>
                                    <span>{item.name}</span>
                                    <span className="text-gray-700">-{item.color}</span>
                                    <span className="text-gray-700">/{item.size}</span>
                                    
                                </td>
                                <td>
                                    <div className="h-12 flex items-center">
                                        <button className="h-full w-10 border border-gray-300 rounded-l">-</button>
                                        <div className="h-full w-24 flex-1 flex flex-col items-center border-y border-gray-300">
                                            <div className="h-8">
                                                Count
                                            </div>
                                            <div className="h-4 w-full flex justify-center items-center border-t border-gray-300 bg-gray-50 text-gray-400 text-xs">
                                                {item.stock} PCS
                                            </div>
                                        </div>
                                        <button className="h-full w-10 border border-gray-300 rounded-r">+</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;
