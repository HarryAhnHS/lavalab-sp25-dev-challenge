import MinusIcon from "../assets/icons/Minus.svg";
import PlusIcon from "../assets/icons/Plus.svg";

const InventoryTable = ({ filteredData, counts, handleCountChange }) => {
    return (
        <div className="h-[475px] overflow-y-scroll">
            <table className="w-full">
                <tbody>
                    {filteredData.map((item) => {
                        const isInvalid = counts[item.id] > item.stock;
                        return (
                            <tr key={item.id} className="flex items-center justify-between h-10 my-4 text-sm">
                                <td className="flex items-center text-gray-700">
                                    <div className={`h-10 w-10 mr-4 border border-gray-300 rounded p-1 ${item.color.toLowerCase() === "white" ? "bg-gray-800" : "bg-gray-50"}`}>
                                        {item.image 
                                        ? <img src={item.image} alt={item.name} className="w-full h-full" /> 
                                        : <div className="w-full h-full bg-gray text-[8px] flex justify-center items-center">No Image</div>}
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
                                            onClick={() => handleCountChange(item.id, parseInt(counts[item.id]) - 1)} 
                                            className="h-full w-10 flex items-center justify-center border-l border-y border-gray-300 text-xl rounded-l cursor-pointer" 
                                            disabled={counts[item.id] === 0}
                                        >
                                            <img src={MinusIcon} alt="Minus" className="w-4 h-4" />
                                        </button>
                                        <div className={`h-full w-24 flex-1 flex flex-col items-center border ${isInvalid ? "border-gray-300 text-gray-700" : "border-yellow-600 bg-amber-100"}`}>
                                            <input 
                                                type="number" 
                                                value={counts[item.id] || 0} 
                                                onChange={(e) => handleCountChange(item.id, e.target.value)}
                                                onBlur={(e) => { if (e.target.value === "") handleCountChange(item.id, 0); }}
                                                className="h-7 w-full text-center outline-none bg-transparent"
                                            />
                                            <div className={`h-3 w-full flex justify-center items-center border-t text-[10px] ${isInvalid ? "border-gray-300 bg-gray-50 text-gray-500" : "border-yellow-600 bg-yellow-600 text-white"}`}>
                                                {item.stock} PCS
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleCountChange(item.id, parseInt(counts[item.id]) + 1)} 
                                            className="h-full w-10 flex items-center justify-center border-r border-y border-gray-300 text-xl rounded-r cursor-pointer"
                                        >
                                            <img src={PlusIcon} alt="Plus" className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default InventoryTable;
