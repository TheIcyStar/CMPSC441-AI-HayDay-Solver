import { useState } from "react";

const AVAILABLE_ITEMS = [
  "Wheat", "Corn", "Soybean", "Sugarcane", "Carrot", "Indigo", "Pumpkin",
  "Cotton", "ChiliPepper", "Tomato", "Apple", "Raspberry", "Cherry",
  "Blackberry", "Blueberry", "Egg", "Milk", "Bacon", "Wool", "Bread",
  "ChickenFeed", "CowFeed", "Cream", "CornBread", "BrownSugar", "Popcorn",
  "Butter", "Pancake", "Cookie", "Cheese", "CarrotPie", "Hamburger"
];

type ItemSelectorProps = {
    onSelectItem : (
        itemName: string,
        count: number,
    ) => void;
    onClose: () => void;
};

export default function ItemSelector({ onSelectItem, onClose}: ItemSelectorProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState<string | null > (null);
    const [quantity, setQuantity] = useState(1);

    const filteredItems = AVAILABLE_ITEMS.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        if (selectedItem) {
            onSelectItem(selectedItem, quantity);
            onClose();
        }
    };

    return (
        <div className = "fixed inset-0 bg-black bg-opacty-50 flex items-center justify-center z-50">
            <div className = "bg-white rounded-lg p-6 w-[500px] max-h-[600px] flex flex-col">
                <div className = "flex justify-between items-center mb-4">
                    <h2 className = "text-xl font-bold"> Select Item</h2>
                    <button onClick = {onClose} 
                        className = "text-gray-500 hover:text-gray-700 text-2xl"> x 
                    </button>
                </div>    
            

                <input type = "text"
                    placeholder = "Search items..."
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    className = "w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <div className = "flex1 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-2">
                    <div className = "grid grid-cols-2 gap2">
                        {filteredItems.map((item) => (
                            <button
                                key = {item}
                                onClick = {() => setSelectedItem(item)}
                                className = {`
                                    px-3 py-2 rounded text-sm transition-colors
                                    ${selectedItem === item 
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                                    } 
                                `} >
                                    {item}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedItem && (
                    <div className = "mb-4 p-3 bg-blue-50 rounded-lg">
                        <label className = "block text-sm font-semibold mb-2">
                            Quantity for {selectedItem}:
                        </label>
                        <input
                            type = "number"
                            min = {1}
                            value = {quantity}
                            onChange = {(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className = "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            
                    </div>
                )}

                <div className = "flex gap-2">
                    <button 
                        onClick = {onClose}
                        className = "flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                            Cancel
                    </button>
            

                    <button 
                        onClick = {handleAdd}
                        className = {`
                            flex-1 px-4 py-2 rounded-lg font-semibold transition-colors
                            ${selectedItem 
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }
                                `}>
                                Add Item 
                    </button>
                </div>
            </div>
        </div>
    );



}