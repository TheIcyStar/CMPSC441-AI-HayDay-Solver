type PlanItemCardProps = {
  iconName: string;
  label: string;
  count: number;
};

export default function PlanItemCard({
  iconName,
  label,
  count,
}: PlanItemCardProps) {
  const src = `./assets/items/${iconName}.png`;

  return (
    <div className="flex flex-col items-center text-center text-sm">
      <img
        src={src}
        alt={label}
        className={`w-20 h-20 object-contain ${count === 0 ? "grayscale opacity-50" : ""}`}
      />
      <span className="mt-1 text-gray-800 font-bold">{label}</span>
      <span className="text-gray-600">{count}</span>
    </div>
  );
}