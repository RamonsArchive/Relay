import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBarHeart = () => {

  return (
    <>
      <div className="navbar-icon-compact">
        <Link href="/collections/hearted">
          <Heart
            className="size-[22px] sm:size-[25px] md:size-[30px]"
          />
        </Link>
      </div>
    </>
  );
};

export default NavBarHeart;
