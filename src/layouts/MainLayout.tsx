import type { ReactNode } from "react";

type MainLayoutProps = {
  currentView: "inventory" | "orders" | "plan";
  onChangeView: (view: "inventory" | "orders" | "plan") => void;
  children: ReactNode;
};

export default function MainLayout({ currentView, onChangeView, children }: MainLayoutProps) {
  const navItems: { key: "inventory" | "orders" | "plan"; label: string }[] = [
    { key: "inventory", label: "Inventory" },
    { key: "orders", label: "Orders" },
    { key: "plan", label: "Plan" },
  ];

  return (
    <div 
      className="min-h-screen h-screen w-screen flex overflow-hidden"
      style={{ 
        backgroundImage: "url('/assets/background/cartoony_wood.png')"
      }}
    >
      {/* Sidebar */}
      <div className="flex flex-col items-center p-4 gap-4 w-48">
        {/* Logo */}
        <img src="/assets/logo/hayday_logo.png" alt="Logo" className="w-28 h-28" />

        {/* Nav buttons */}
        <nav className="font-hayday text-xl flex flex-col gap-2 w-full">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onChangeView(item.key)}
              className={`
                py-3 px-4 rounded-xl text-left font-semibold transition-colors
                ${currentView === item.key
                  ? "bg-amber-500 text-white"
                  : "bg-amber-900 text-amber-100 hover:bg-amber-600"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-3xl m-4 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}