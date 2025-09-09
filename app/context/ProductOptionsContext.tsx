"use client";
import React, { useContext } from "react";
import { createContext, useState } from "react";

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

const ProductOptionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

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


export const useProductOptions = () => {
  const context = useContext(ProductOptionsContext);
  if (!context) {
    throw new Error("useProductOptions must be used within a ProductOptionsProvider");
  }
  return context;
}

export default ProductOptionsProvider;
