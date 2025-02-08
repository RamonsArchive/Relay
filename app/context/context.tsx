"use client";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import { SignIn, SignedOut } from "@clerk/nextjs";
import { createContext, useEffect, useState } from "react";
import React from "react";


const context = () => {
  return (
    <div>context</div>
  )
}

export default context