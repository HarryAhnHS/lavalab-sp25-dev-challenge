import { useState } from "react";

const AddNewModal = ({ filteredData, closeModal, addNewItem }) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [stock, setStock] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (stock <= 0) return;

        const newItem = {
            id: filteredData.length + 1,
            name: name,
            color: color,
            size,
            stock: Number(stock),
            image: "", // Disabled for now
        };

        addNewItem(newItem);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl mb-4">New Inventory Item</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name field */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Color input */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-700">Color</label>
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Size dropdown */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-700">Size</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        >
                            <option value="" disabled>Select a size</option>
                            <option value="S">Small (S)</option>
                            <option value="M">Medium (M)</option>
                            <option value="L">Large (L)</option>
                        </select>
                    </div>

                    {/* Stock input */}
                    <div className="mb-4">
                        <label className="text-xs text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                        {stock != "" && stock <= 0 && <p className="text-red-500 text-sm mt-1">Stock must be greater than 0.</p>}
                    </div>

                    {/* Control */}
                    <div className="flex justify-end text-sm gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-600 hover:text-black font-medium cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={stock <= 0}
                            className="px-4 py-2 rounded-md cursor-pointer bg-indigo-600 text-white"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewModal;
