import Sidebar from "./components/Sidebar";
import InventoryPage from "./pages/InventoryPage";

export default function App() {

  return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <InventoryPage />
      </div>
  );
};