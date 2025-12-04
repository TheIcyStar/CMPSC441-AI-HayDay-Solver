import type { InventoryCounts } from "../typedefs/GameTypes";

type OrdersProps = {
  inventory: InventoryCounts;
};

export default function Orders({ inventory }: OrdersProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b text-lg font-semibold">Orders</div>

      {/*9x9 Grid Layout*/}
      <div className = "flex-1 p-4 overflow-y-auto">
        <div className ="grid grid-cols-3 grid-rows-3 gap-5">
          <div className = ""> 
            <p>order slot here</p>

          </div>
          

        </div>
        

      

      </div>
      



      

      {/*  */}
      
      <div className="flex-1 p-4 overflow-y-auto text-gray-500">
        Orders view not finished yet.
      </div>
    </div>
  );
}