import { useState, useEffect } from "react";
import { getOrders } from "../../services/orderApi";
import {
  FiShoppingBag,
  FiCalendar,
  FiUser,
  FiPhone,
  FiMail,
  FiDollarSign,
} from "react-icons/fi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-gray-400 col-span-full text-center mt-10">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-4 sm:mb-6">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 
            bg-linear-to-r from-[#f91942] to-[#ff4d6d] bg-clip-text text-transparent"
          >
            Orders
          </h1>

          <p className="text-slate-400 text-sm sm:text-base">
            View all customer orders
          </p>
        </div>

        {/* SUMMARY – ONLY TOTAL ORDERS */}
        {orders.length > 0 && (
          <div className="mb-6 bg-gray-800 border border-slate-700 rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-4 bg-slate-900 rounded-xl">
                <p className="text-slate-400 text-xs sm:text-sm mb-1">
                  Total Orders
                </p>
                <p className="text-[#f91942] text-xl sm:text-2xl font-bold">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-gray-800 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiUser size={16} />
                      Customer Name
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiPhone size={16} />
                      Phone
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiMail size={16} />
                      Email
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiShoppingBag size={16} />
                      Events
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiDollarSign size={16} />
                      Total Price
                    </div>
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <FiCalendar size={16} />
                      Date
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FiShoppingBag className="mx-auto text-slate-600 mb-4" size={64} />
                      <p className="text-slate-400">No orders yet</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">
                        {order.customerName}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {order.phone}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {order.email}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {order.items?.map((event, index) => (
                            <div key={index} className="relative">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <span className="absolute -top-1 -right-1 bg-[#f91942] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {event.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[#f91942] font-bold text-lg">
                        ${order.total}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4 mt-4">
          {orders.length === 0 ? (
            <div className="bg-gray-800 border border-slate-700 rounded-2xl p-12 text-center">
              <FiShoppingBag className="mx-auto text-slate-600 mb-4" size={64} />
              <p className="text-slate-400">No orders yet</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-gray-800 border border-slate-700 rounded-2xl p-4 space-y-3">

                <div className="flex items-center gap-2">
                  <FiUser className="text-[#f91942]" size={18} />
                  <span className="text-white font-semibold">{order.customerName}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiPhone className="text-slate-400" size={16} />
                  <span className="text-slate-300 text-sm">{order.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <FiMail className="text-slate-400" size={16} />
                  <span className="text-slate-300 text-sm break-all">
                    {order.email}
                  </span>
                </div>

                {order.items?.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                      <FiShoppingBag size={16} />
                      Events:
                    </p>

                    <div className="flex gap-2 flex-wrap">
                      {order.items.map((event, index) => (
                        <div key={index} className="relative">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="absolute -top-1 -right-1 bg-[#f91942] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {event.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-slate-400" size={16} />
                    <span className="text-slate-300 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <FiDollarSign className="text-[#f91942]" size={18} />
                    <span className="text-[#f91942] font-bold text-xl">
                      {order.total}
                    </span>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
