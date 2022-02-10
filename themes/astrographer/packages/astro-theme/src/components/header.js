import React from 'react';
import { connect } from "frontity";
import Link from "@frontity/components/link";

const Header = () => {
  return (
    <div class="container">
        <div class="w-full bg-black text-center">
          <h1 class="object-none object-center text-white heading mx-auto">ASTROGRAPHER</h1>
        </div>
        <nav class="bg-purple-700 text-white w-full min-h-[15px] p-1.5 text-center">
            <Link link='/' class="heading"> Home </Link>
            <Link link='/about' class="heading"> About </Link>
        </nav>
    </div>
  );
}

export default connect(Header);
