import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-6 text-xl font-bold text-green-600">
        EventSphere Admin
      </div>

      <nav className="flex flex-col gap-2 px-4">
        <NavLink
          to="/admin/events"
          className="hover:bg-gray-100"
        >
          Events
        </NavLink>

        <NavLink
          to="/admin/orders"
          className="hover:bg-gray-100"
        >
          Orders
        </NavLink>
      </nav>
    </aside>
  );
};

