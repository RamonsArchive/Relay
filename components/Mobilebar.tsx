import React from "react";
import Link from "next/link";

const Mobilebar = () => {
  return (
    <aside className="mobilebar-root">
      <div className="flex flex-row items-center gap-3 p-2">
        <Link
          href="https://amzn.to/3VkHiVK"
          className="usb-cable-gradient"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-[10px]">Buy good waffers</span>
        </Link>
        <div className="font-plex-sans font-light text-[8px] text-center">
          <div className="relative w-6 h-4 mb-1">
            <img
              src={"/assets/icons/palestine.svg"}
              alt="Free Palestine"
              className="object-cover w-full h-full group group-border glow-border"
            />
          </div>
          <span className="text-[8px]">Relay stands with Palestine</span>
        </div>
      </div>
    </aside>
  );
};

export default Mobilebar;
