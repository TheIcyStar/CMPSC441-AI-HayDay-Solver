import type { InventoryCounts } from "../typedefs/GameTypes";

type PlanProps = {
  inventory: InventoryCounts;
};

export default function Plan({ inventory }: PlanProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b text-lg font-semibold">Plan</div>
      <div className="flex-1 p-4 overflow-y-auto text-gray-500">
        Plan view not finished yet
      </div>
    </div>
  );
}