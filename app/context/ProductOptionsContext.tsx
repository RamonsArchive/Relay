"use client";
import React from "react";
import { createContext, useContext, useState } from "react";

type ProductOptionsContextType = {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
};

// implement setSelectedSize

export const ProductOptionsContext = createContext<ProductOptionsContextType>({
  selectedSize: "",
  setSelectedSize: () => {},
});

//export const useProductOptions = () => useContext(ProductOptionsContext);

const ProductOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  console.log("Selected Size", selectedSize);

  return (
    <ProductOptionsContext.Provider value={{ selectedSize, setSelectedSize }}>
      {children}
    </ProductOptionsContext.Provider>
  );
};

export default ProductOptionsProvider;
