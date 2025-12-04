type InventoryItemCardProps = {
  iconName: string;
  label: string;
  count: number;
  isEditing: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function InventoryItemCard({
  iconName,
  label,
  count,
  isEditing,
  onIncrement,
  onDecrement,
}: InventoryItemCardProps) {
  const src = `/assets/items/${iconName}.png`;

  return (
    <div className="flex flex-col items-center text-center text-sm">
      <img
        src={src}
        alt={label}
        className={`w-20 h-20 object-contain ${count === 0 ? "grayscale opacity-50" : ""}`}
      />
      <span className="mt-1 text-gray-800 font-bold">{label}</span>
      <span className="text-gray-600">{count}</span>

      {isEditing && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={onDecrement}
            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold"
          >
            ➖
          </button>
          <button
            onClick={onIncrement}
            className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold"
          >
            ➕
          </button>
        </div>
      )}
    </div>
  );
}