import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import type { JSX } from "react/jsx-runtime";

const navigationItems = [
  {
    label: "Inventory",
    path: "/desktop-u45-inventory-silo",
    delay: "0ms",
  },
  {
    label: "Orders",
    path: "/desktop-u45-3",
    delay: "100ms",
  },
  {
    label: "Plan",
    path: "/desktop-u45-4",
    delay: "200ms",
  },
];

export const DesktopHomepage = (): JSX.Element => {
  return (
    <div
      className="bg-[#cc9d1a] w-full min-w-[1440px] min-h-[1024px] flex"
      data-model-id="1:4"
    >
      <aside className="flex flex-col gap-[39px] pt-[180px]">
        <div className="flex items-center justify-center w-[118px] h-[115px] ml-[26px] mb-[39px] -translate-y-4 animate-fade-in opacity-0 [--animation-delay:0ms]">
          <img
            className="w-[118px] h-[115px] object-cover"
            alt="Logo"
            src="https://c.animaapp.com/mip404x2SZH3Zg/img/image-1-4.png"
          />
        </div>

        {navigationItems.map((item,map) => (
          <Link
            key={item.label}
            to={item.path}
            className={`-translate-y-4 animate-fade-in opacity-0`}
            style={{ animationDelay: item.delay }}
          >
            <Button
              className="w-[287px] h-16 bg-[#6d5d31] hover:bg-[#5d4d21] rounded-[10px] transition-colors"
              asChild
            >
              <div className="font-['Inter',Helvetica] font-normal text-white text-[40px] text-center">
                {item.label}
              </div>
            </Button>
          </Link>
        ))}
      </aside>

      <main className="flex-1 flex items-start justify-center pt-[186px] pl-[77px] pr-[68px]">
        <Card className="w-full max-w-[1008px] h-[767px] bg-white border-[5px] border-solid border-[#b77203] rounded-none shadow-none -translate-y-4 animate-fade-in opacity-0 [--animation-delay:300ms]" />
      </main>
    </div>
  );
};
