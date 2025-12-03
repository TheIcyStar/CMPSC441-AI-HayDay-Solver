import React from "react";
import type { JSX } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const navigationItems = [
  {
    label: "Inventory",
    path: "/desktop-u45-inventory-silo",
    isActive: true,
  },
  {
    label: "Orders",
    path: "/desktop-u45-3",
    isActive: false,
  },
  {
    label: "Plan",
    path: "/desktop-u45-4",
    isActive: false,
  },
];

export const DesktopInventorySilo = (): JSX.Element => {
  return (
    <div
      className="bg-[#cc9d1a] w-full min-w-[1440px] min-h-[1024px] flex"
      data-model-id="22:49"
    >
      <aside className="flex flex-col pt-[26px] pl-[26px]">
        <div className="w-[118px] h-[115px] mb-[41px] translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <img
            className="w-full h-full object-cover"
            alt="Logo"
            src="https://c.animaapp.com/mip404x2SZH3Zg/img/image-1-4.png"
          />
        </div>

        <nav className="flex flex-col gap-[19px]">
          {navigationItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={`translate-y-[-1rem] animate-fade-in`}
              style={
                {
                  "--animation-delay": `${(index + 1) * 200}ms`,
                } as React.CSSProperties
              }
            >
              <Button
                className={`w-[287px] h-16 rounded-[10px] text-white text-[40px] [font-family:'Inter',Helvetica] font-normal transition-colors ${item.isActive
                    ? "bg-[#6d5d31]"
                    : "bg-[#6e5e32] hover:bg-[#6d5d31]"
                  }`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col pt-[133px] pl-[108px] pr-[68px]">
        <div className="translate-y-[-1rem] animate-fade-in [--animation-delay:800ms]">
          <Tabs defaultValue="silo" className="w-full">
            <TabsList className="h-[53px] bg-transparent p-0 gap-[25px] mb-[53px]">
              <TabsTrigger
                value="silo"
                className="w-[244px] h-[53px] bg-[#bc7400] data-[state=active]:bg-[#bc7400] data-[state=inactive]:bg-[#d9d9d9] text-black text-4xl [font-family:'Inter',Helvetica] font-normal rounded-none transition-colors"
                asChild
              >
                <Link to="/desktop-u45-inventory-silo">Silo</Link>
              </TabsTrigger>
              <TabsTrigger
                value="barn"
                className="w-[244px] h-[53px] bg-[#d9d9d9] data-[state=active]:bg-[#bc7400] data-[state=inactive]:bg-[#d9d9d9] text-black text-4xl [font-family:'Inter',Helvetica] font-normal rounded-none transition-colors"
              >
                Barn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="silo" className="mt-0">
              <div className="w-[1008px] h-[767px] bg-white border-[5px] border-solid border-[#b77203]" />
            </TabsContent>

            <TabsContent value="barn" className="mt-0">
              <div className="w-[1008px] h-[767px] bg-white border-[5px] border-solid border-[#b77203]" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
