import { useState } from "react";
import { mockOrders } from "./mockData";
import OrderList from "./OrderList";

const ITEMS_PER_PAGE = 3;

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(mockOrders.length / ITEMS_PER_PAGE);
  const pagedOrders = mockOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">결제이력</h2>

      <div className="bg-white rounded-md mt-10 mb-10">
        <div className="grid grid-cols-4 p-4 bg-gray-100 font-semibold text-sm">
          <span>주문 ID</span>
          <span>구입 날짜</span>
          <span>아이템</span>
          <span className="text-right">결제금액</span>
        </div>

        <OrderList orders={pagedOrders} />
      </div>

      <div className="flex justify-center items-center gap-2 mt-6 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        >
          &lt; 이전
        </button>

        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
              page === i + 1 ? "bg-indigo-500 text-white" : "text-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="px-2 py-1 text-gray-500 disabled:text-gray-300"
        >
          다음 &gt;
        </button>
      </div>
    </div>
  );
};
export default HistoryPage;
