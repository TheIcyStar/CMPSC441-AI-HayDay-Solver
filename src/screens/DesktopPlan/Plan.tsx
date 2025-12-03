import React, { type JSX } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

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
    path: "#",
    isActive: false,
  },
];

export const DesktopPlan = (): JSX.Element => {
  return (
    <div
      className="bg-[#cc9d1a] w-full min-w-[1440px] min-h-[1024px] flex flex-col"
      data-model-id="1:104"
    >
      <header className="flex items-start p-[26px]">
        <div className="flex items-center justify-center w-[118px] h-[115px] -translate-y-4 animate-fade-in">
          <img
            className="w-[118px] h-[115px] object-cover"
            alt="Logo"
            src="https://c.animaapp.com/mip404x2SZH3Zg/img/image-1-4.png"
          />
        </div>
      </header>

      <div className="flex flex-1 gap-[77px] px-0">
        <nav className="flex flex-col gap-[23px] pt-[13px]">
          {navigationItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className="-translate-y-4 animate-fade-in"
              style={
                {
                  "--animation-delay": `${(index + 1) * 100}ms`,
                } as React.CSSProperties
              }
            >
              <Button
                className={`w-[287px] h-16 rounded-[10px] ${item.isActive ? "bg-[#6d5d31]" : "bg-[#6e5e32]"
                  } hover:bg-[#6d5d31] transition-colors`}
                asChild
              >
                <div className="font-['Inter',Helvetica] font-normal text-white text-[40px] text-center tracking-[0] leading-[normal]">
                  {item.label}
                </div>
              </Button>
            </Link>
          ))}
        </nav>

        <main
          className="flex-1 pt-[7px] pr-[68px] pb-[70px] -translate-y-4 animate-fade-in"
          style={{ "--animation-delay": "400ms" } as React.CSSProperties}
        >
          <Card className="w-full h-[767px] bg-white border-[5px] border-solid border-[#b77203] rounded-none shadow-none" />
        </main>
      </div>
    </div>
  );
};
