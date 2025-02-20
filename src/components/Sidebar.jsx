import { useState } from "react";
import Tally from "../assets/icons/Tally.svg";
import Materials from "../assets/icons/Materials.svg";
import Products from "../assets/icons/Products.svg";
import Orders from "../assets/icons/Orders.svg";
import Integrations from "../assets/icons/Integrations.svg";
import MaterialsDark from "../assets/icons/MaterialsDark.svg";
import ProductsDark from "../assets/icons/ProductsDark.svg";
import OrdersDark from "../assets/icons/OrdersDark.svg";
import IntegrationsDark from "../assets/icons/IntegrationsDark.svg";


import ProfileIcon from "../assets/icons/Profile.svg";
import LogoutIcon from "../assets/icons/Logout.svg";
import { useSidebar } from "../contexts/SidebarContext";

const tabs = [
    { id: "materials", name: "Materials", icon: Materials, darkIcon: MaterialsDark },
    { id: "products", name: "Products", icon: Products, darkIcon: ProductsDark},
    { id: "orders", name: "Fulfillment", icon: Orders, darkIcon: OrdersDark },
];

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { selectedTab, setSelectedTab } = useSidebar();

    return (
        <div
            className={`h-screen px-2 flex flex-col justify-between z-10 border-r border-gray-300 shadow-sm bg-gray-100 truncate transition-all duration-300 ${
                isHovered ? "w-48" : "w-14"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top Section */}
            <div className="py-3 flex flex-col items-center gap-2 transition-all duration-300">
                {/* Tally Icon (Header) */}
                <div className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-300 ${
                    isHovered ? "px-3 justify-start" : "justify-center"
                }`}>
                    <img src={Tally} alt="Tally"/>
                    {isHovered && (
                        <span className="text-lg text-indigo-800">Tally</span>
                    )}
                </div>

                {/* Sidebar Menu Items */}
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center py-2 w-full text-sm rounded-lg cursor-pointer transition-all duration-300 ${
                            isHovered ? "px-3 justify-start" : "justify-center"
                        } ${
                            selectedTab === tab.id
                                ? "bg-indigo-100 text-black outline outline-gray-300 shadow-sm"
                                : "hover:bg-gray-200 outline-none shadow-none text-gray-600"
                        }`}
                    >
                        <img src={selectedTab === tab.id ? tab.darkIcon : tab.icon } alt={tab.name} className="w-6 h-6 transition-all duration-300"/>
                        {isHovered && (
                            <span className="ml-2 transition-opacity duration-300">{tab.name}</span>
                        )}
                    </div>
                ))}

                <div className="border-t border-gray-300 w-full"></div>
                <div
                    onClick={() => setSelectedTab("integrations")}
                    className={`flex items-center py-2 w-full text-sm rounded-lg cursor-pointer transition-all duration-300 ${
                        isHovered ? "px-3 justify-start" : "justify-center"
                    } ${
                        selectedTab === "integrations"
                            ? "bg-indigo-100 text-black outline outline-gray-300 shadow-sm"
                            : "hover:bg-gray-200 outline-none shadow-none text-gray-600"
                    }`}
                >
                    <img src={selectedTab === "integrations" ? IntegrationsDark : Integrations} alt="integrations" className="w-6 h-6 transition-all duration-300" />
                    {isHovered && (
                        <span className="ml-2 transition-opacity duration-300">Integrations</span>
                    )}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="py-3 flex flex-col items-center text-sm text-gray-600 transition-all duration-300">
                {/* Logout Icon */}
                <div
                    className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-300 ${
                        isHovered ? "px-3 justify-start" : "justify-center"
                    } hover:bg-gray-200 hover:text-black`}
                >
                    <img src={LogoutIcon} alt="Logout" className="w-8 h-8 transition-all duration-300" />
                    {isHovered && <span className="ml-2 text-red-700">Logout</span>}
                </div>

                {/* Profile Icon */}
                <div
                    className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-300 ${
                        isHovered ? "px-3 justify-start" : "justify-center"
                    } hover:bg-gray-200 hover:text-black`}
                >
                    <img src={ProfileIcon} alt="Profile" className="w-8 h-8 transition-all duration-300" />
                    {isHovered && 
                        <div className="ml-2 flex flex-col justify-center text-[8px] whitespace-nowrap">
                            <div className="text-sm font-bold">Don&lsquo;t Ruin It!</div>
                            <div className="font-light">Harry Ahn</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
