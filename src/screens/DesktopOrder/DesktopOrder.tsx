import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import type { JSX } from "react/jsx-runtime";

const navigationItems = [
  {
    label: "Inventory",
    to: "/desktop-u45-inventory-silo",
    top: "top-[180px]",
  },
  {
    label: "Orders",
    to: "/desktop-u45-3",
    top: "top-[283px]",
  },
  {
    label: "Plan",
    to: "/desktop-u45-4",
    top: "top-[386px]",
  },
];

const gridSquares = [
  { top: "top-[249px]", left: "left-[411px]" },
  { top: "top-[249px]", left: "left-[478px]" },
  { top: "top-[249px]", left: "left-[545px]" },
  { top: "top-[310px]", left: "left-[411px]" },
  { top: "top-[310px]", left: "left-[478px]" },
  { top: "top-[310px]", left: "left-[545px]" },
  { top: "top-[371px]", left: "left-[411px]" },
  { top: "top-[371px]", left: "left-[478px]" },
  { top: "top-[371px]", left: "left-[545px]" },
];

export const DesktopOrder = (): JSX.Element => {
  return (
    <div
      className="bg-[#cc9d1a] w-full min-w-[1440px] min-h-[1024px] relative"
      data-model-id="1:7"
    >
      <div className="top-[186px] left-[364px] w-[1008px] h-[767px] border-[5px] border-solid border-[#b77203] absolute bg-white opacity-0 animate-fade-in [--animation-delay:200ms]" />

      {navigationItems.map((item, index) => (
        <Link
          key={item.label}
          className={`absolute ${item.top} left-0 w-[287px] h-16 bg-[#6d5d31] rounded-[10px] block opacity-0 animate-fade-in transition-colors hover:bg-[#7d6d41]`}
          style={
            { "--animation-delay": `${index * 100}ms` } as React.CSSProperties
          }
          to={item.to}
        >
          <div className="absolute w-full h-[75.00%] top-[12.50%] left-0 [font-family:'Inter',Helvetica] font-normal text-white text-[40px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
            {item.label}
          </div>
        </Link>
      ))}

      <div className="absolute top-[249px] left-[624px] w-[720px] h-[602px] bg-[#dfcece] border border-solid border-[#cc9d1a] opacity-0 animate-fade-in [--animation-delay:300ms]" />

      <Button className="absolute top-[788px] left-[1093px] w-[230px] h-[43px] bg-[#b77203] rounded-[15px] border-2 border-solid border-black hover:bg-[#c7a313] transition-colors opacity-0 animate-fade-in [--animation-delay:400ms]">
        <span className="[font-family:'Inter',Helvetica] font-normal text-black text-2xl text-center tracking-[0] leading-[normal]">
          Generate
        </span>
      </Button>

      {gridSquares.map((square, index) => (
        <div
          key={`square-${index}`}
          className={`absolute ${square.top} ${square.left} w-[54px] h-[50px] bg-[#fff740] opacity-0 animate-fade-in`}
          style={
            {
              "--animation-delay": `${400 + index * 50}ms`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="flex w-[118px] h-[115px] items-center justify-center gap-2.5 p-2.5 absolute top-[26px] left-[26px] bg-[#cc9d1a] opacity-0 animate-fade-in">
        <img
          className="relative w-[118px] h-[115px] mt-[-10.00px] mb-[-10.00px] ml-[-10.00px] mr-[-10.00px] object-cover"
          alt="Image"
          src="https://c.animaapp.com/mip404x2SZH3Zg/img/image-1-4.png"
        />
      </div>

      <div className="top-[301px] left-[679px] w-[129px] h-[120px] absolute bg-white opacity-0 animate-fade-in [--animation-delay:500ms]" />
    </div>
  );
};
