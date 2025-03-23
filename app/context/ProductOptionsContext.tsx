"use client";
import React from "react";
import { createContext, useContext, useState } from "react";

type ProductOptionsContextType = {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
};

// implement setSelectedSize

export const ProductOptionsContext = createContext<ProductOptionsContextType>({
  selectedSize: "",
  setSelectedSize: () => {},
  selectedColor: "",
  setSelectedColor: () => {},
  quantity: 1,
  setQuantity: () => {},
});

//export const useProductOptions = () => useContext(ProductOptionsContext);

const ProductOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  console.log("Selected Size", selectedSize);
  console.log("Selected Color", selectedColor);
  console.log("Selected Quantity", quantity);

  return (
    <ProductOptionsContext.Provider
      value={{
        selectedSize,
        setSelectedSize,
        selectedColor,
        setSelectedColor,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductOptionsContext.Provider>
  );
};

export default ProductOptionsProvider;
