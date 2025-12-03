import { MinusIcon, PlusIcon } from "lucide-react";
import React, { type JSX } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
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

const inventoryItems = [
  {
    id: 1,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-2.png",
    hasCounter: true,
    size: "w-16 h-16",
  },
  {
    id: 2,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-3.png",
    hasCounter: false,
    size: "w-[90px] h-[90px]",
  },
  {
    id: 3,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-4.png",
    hasCounter: false,
    size: "w-[84px] h-[84px]",
  },
  {
    id: 4,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-6.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 5,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-7.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 6,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-9.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 7,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-11.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 8,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-24.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 9,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-12.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 10,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-21.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 11,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-13.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 12,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-27.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 13,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-16.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 14,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-29.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 15,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-28.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 16,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-15.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 17,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-14.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 18,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-26.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 19,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-10.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 20,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-17.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 21,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-5.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 22,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-18.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 23,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-19.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 24,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-36.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 25,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-35.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 26,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-34.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 27,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-33.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 28,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-32.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 29,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-31.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 30,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-30.png",
    hasCounter: false,
    size: "w-[100px] h-[100px]",
  },
  {
    id: 31,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-8.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 32,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-23.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 33,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-20.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 34,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-25.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
  {
    id: 35,
    image: "https://c.animaapp.com/mip404x2SZH3Zg/img/image-22.png",
    hasCounter: false,
    size: "w-[75px] h-[75px]",
  },
];

export const DesktopInventoryBarn = (): JSX.Element => {
  const [count, setCount] = React.useState(0);

  return (
    <div
      className="bg-[#cc9d1a] w-full min-w-[1440px] min-h-[1024px] flex"
      data-model-id="1:5"
    >
      <aside className="flex flex-col pt-[180px]">
        {navigationItems.map((item, index) => (
          <Link
            key={item.label}
            to={item.path}
            className={`w-[287px] h-16 rounded-[10px] flex items-center justify-center mb-[39px] transition-colors ${
              item.isActive ? "bg-[#6d5d31]" : "bg-[#6e5e32]"
            } translate-y-[-1rem] animate-fade-in opacity-0`}
            style={
              { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
            }
          >
            <span className="[font-family:'Inter',Helvetica] font-normal text-white text-[40px] text-center tracking-[0] leading-[normal]">
              {item.label}
            </span>
          </Link>
        ))}

        <div className="flex items-center justify-center p-2.5 mt-[-154px] mb-auto ml-[26px]">
          <img
            className="w-[118px] h-[115px] object-cover translate-y-[-1rem] animate-fade-in opacity-0"
            style={{ "--animation-delay": "0ms" } as React.CSSProperties}
            alt="Farm logo"
            src="https://c.animaapp.com/mip404x2SZH3Zg/img/image-1-4.png"
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col pt-[133px] pl-[108px]">
        <Tabs
          defaultValue="barn"
          className="w-[1008px] translate-y-[-1rem] animate-fade-in opacity-0"
          style={{ "--animation-delay": "300ms" } as React.CSSProperties}
        >
          <TabsList className="grid w-full grid-cols-2 h-[53px] bg-transparent p-0 gap-[25px]">
            <TabsTrigger
              value="silo"
              className="bg-[#d9d9d9] data-[state=active]:bg-[#d9d9d9] rounded-none h-full [font-family:'Inter',Helvetica] font-normal text-black text-4xl transition-colors hover:bg-[#e5e5e5]"
              asChild
            >
              <Link to="/desktop-u45-inventory-silo">Silo</Link>
            </TabsTrigger>
            <TabsTrigger
              value="barn"
              className="bg-[#bc7400] data-[state=active]:bg-[#bc7400] rounded-none h-full [font-family:'Inter',Helvetica] font-normal text-black text-4xl transition-colors hover:bg-[#d08500]"
            >
              Barn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="barn" className="mt-0">
            <ScrollArea
              className="w-[1008px] h-[767px] bg-white border-[5px] border-solid border-[#b77203] translate-y-[-1rem] animate-fade-in opacity-0"
              style={{ "--animation-delay": "400ms" } as React.CSSProperties}
            >
              <div className="grid grid-cols-4 gap-[30px] p-[39px_14px_0_14px]">
                {inventoryItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center justify-start bg-white translate-y-[-1rem] animate-fade-in opacity-0"
                    style={
                      {
                        "--animation-delay": `${500 + index * 50}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <img
                      className={`${item.size} object-cover`}
                      alt="Inventory item"
                      src={item.image}
                    />

                    {item.hasCounter && (
                      <div className="flex items-center gap-2.5 mt-[7px] bg-white rounded-[100px] px-5 py-2.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-[37px] h-[37px] p-0 hover:bg-gray-100 transition-colors"
                          onClick={() => setCount(Math.max(0, count - 1))}
                        >
                          <MinusIcon className="w-[37px] h-[37px] text-black" />
                        </Button>

                        <span className="[font-family:'Inter',Helvetica] font-normal text-[#2c2a2a] text-3xl text-center tracking-[0] leading-[normal]">
                          {count}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-[37px] h-[37px] p-0 bg-[#41b441] rounded-[100px] hover:bg-[#36a036] transition-colors"
                          onClick={() => setCount(count + 1)}
                        >
                          <PlusIcon className="w-[15px] h-[15px] text-white" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="silo" className="mt-0">
            <div className="w-[1008px] h-[767px] bg-white border-[5px] border-solid border-[#b77203]" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
