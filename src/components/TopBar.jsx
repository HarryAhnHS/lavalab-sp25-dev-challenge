import SearchIcon from "../assets/icons/Search.svg";
import SortIcon from "../assets/icons/Sort.svg";
import FilterIcon from "../assets/icons/Filter.svg";

const TopBar = ({ search, handleSearch }) => {
    return (
        <div className="relative w-[35%] min-w-sm flex">
            <div>
                <img src={SearchIcon} alt="search" className="absolute top-2 left-2 w-4 h-4" />
            </div>
            <input
                type="text"
                placeholder="Search Materials"
                value={search}
                onChange={handleSearch}
                className="w-full p-2 pl-8 border border-gray-300 rounded-sm text-xs focus:outline-none"
            />
            <div className="ml-3 flex items-center gap-1">
                <div className="cursor-pointer">
                    <img src={FilterIcon} alt="filter" className="w-7 h-7" />
                </div>
                <div className="cursor-pointer">
                    <img src={SortIcon} alt="sort" className="w-7 h-7 " />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
