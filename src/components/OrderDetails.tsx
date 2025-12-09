type OrderDetailsProps = {
    selectedSlot: number;
    onGenerate: () => void;
};

export function OrderDetails({ selectedSlot, onGenerate }: OrderDetailsProps) {
    return (
        <div className="w-2/3 bg-white border-4 border-amber-700 rounded-xl p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
                Order #{selectedSlot + 1} Details
            </h2>

            {/* TODO: Add order items */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-400 text-center mt-10">Empty Order</p>
            </div>

            {/* Add buttons */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={onGenerate}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                >
                    Generate Order
                </button>

                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors">
                    + Add Item
                </button>
            </div>
        </div>

    );
}