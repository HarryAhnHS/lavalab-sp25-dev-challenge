import { useState } from "react";
import Tally from "../assets/icons/Tally.svg";
import Materials from "../assets/icons/Materials.svg";
import Products from "../assets/icons/Products.svg";
import Orders from "../assets/icons/Orders.svg";
import Integrations from "../assets/icons/Integrations.svg";
import ProfileIcon from "../assets/icons/Profile.svg";
import LogoutIcon from "../assets/icons/Logout.svg";
import { useSidebar } from "../contexts/SidebarContext";

const tabs = [
    { id: "materials", name: "Materials", icon: Materials },
    { id: "products", name: "Products", icon: Products },
    { id: "orders", name: "Fulfillment", icon: Orders },
    { id: "integrations", name: "Integrations", icon: Integrations },
];

const Sidebar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { selectedTab, setSelectedTab } = useSidebar();

    return (
        <div
            className={`h-screen flex flex-col justify-between z-10 border-r border-gray-300 shadow-sm bg-gray-100 text-black transition-all duration-300 ${
                isHovered ? "w-48" : "w-14"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Top Section */}
            <div className="py-3 px-1 flex flex-col items-center gap-4 transition-all duration-300">
                {/* Tally Icon (Header) */}
                <div className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-200 ${
                    isHovered ? "px-3 justify-start" : "justify-center"
                }`}>
                    <img src={Tally} alt="Tally"/>
                    {isHovered && (
                        <span className="ml-2 font-semibold text-indigo-800">Tally</span>
                    )}
                </div>

                {/* Sidebar Menu Items */}
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center py-2 w-full text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                            isHovered ? "px-3 justify-start" : "justify-center"
                        } ${
                            selectedTab === tab.id
                                ? "bg-indigo-100 text-black outline outline-gray-300 shadow-sm"
                                : "hover:bg-gray-200 outline-none shadow-none text-gray-600"
                        }`}
                    >
                        <img src={tab.icon} alt={tab.name} className="w-6 h-6 transition-all duration-300" />
                        {isHovered && (
                            <span className="ml-2 transition-opacity duration-300">{tab.name}</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="py-3 px-1 flex flex-col items-center text-sm text-gray-600 transition-all duration-300">
                {/* Logout Icon */}
                <div
                    className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-200 ${
                        isHovered ? "px-3 justify-start" : "justify-center"
                    } hover:bg-gray-200 hover:text-black`}
                >
                    <img src={LogoutIcon} alt="Logout" className="w-8 h-8 transition-all duration-300" />
                    {isHovered && <span className="ml-2">Logout</span>}
                </div>

                {/* Profile Icon */}
                <div
                    className={`flex items-center py-2 w-full rounded-lg cursor-pointer transition-all duration-200 ${
                        isHovered ? "px-3 justify-start" : "justify-center"
                    } hover:bg-gray-200 hover:text-black`}
                >
                    <img src={ProfileIcon} alt="Profile" className="w-8 h-8 transition-all duration-300" />
                    {isHovered && <span className="ml-2">Profile</span>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
