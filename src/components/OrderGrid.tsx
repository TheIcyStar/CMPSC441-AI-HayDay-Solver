
type OrderGridProps = {
    orders: any[];
    selectedOrder: number;
    onOrderSelect: (order: number) => void;
}

export function OrderGrid({ orders, selectedOrder, onOrderSelect }: OrderGridProps) {
    return (
        <div className="w-1/3 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-amber-800">Order Board</h2>

            <div className="grid grid-cols-3 gap-2 aspect-square">
                {orders.map((order, index) => (
                    <button
                        key={index}
                        onClick={() => onOrderSelect(index)}
                        className={`
                    border-4 rounded-xl flex items-center justify-center text-2xl font-bold transition-all
                    ${selectedOrder === index
                                ? "border-blue-500 bg-blue-50"
                                : "border-amber-700 bg-amber-100 hover:bg-amber-200"
                            }
                    `}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}