"use client";
import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CheckBox from "./CheckBox";
import sale from "@/app/(src)/sale/page";

const Sidebar = () => {
  /* drop down icons for each filter */
  const genderOptions = ["male", "female", "unisex"];
  const kidsOptions = ["Boys", "Girls"];
  const sizeOptions = ["XS", "S", "M", "L", "XL"];
  const costOptions = ["$0-$50", "$50-$100", "$100-$150", "$150-$200"];
  const saleOptions = ["Sale", "No Sale"];
  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black", "White"];
  const brandOptions = ["Nike", "Adidas", "Puma", "Reebok"];

  /* TODO: implement types
    const upperWear = ["shirt", "t-shirt", "sweater", "hoodie", "jacket", "coat", "blazer", "vest", "tank top"];
    const lowerWear = ["pants", "jeans", "shorts", "leggings", "sweatpants", "trousers", "skirt"];
    const footwear = ["shoes", "sneakers", "boots", "sandals", "heels", "flip-flops", "loafers"];
    const underwear = ["underwear", "boxers", "briefs", "panties", "bra", "sports bra", "nightgown", "pajamas"];
    const accessories = ["hat", "cap", "beanie", "gloves", "scarf", "belt", "sunglasses"];
    const legwear = ["socks", "stockings", "tights", "leggings"];

  */
  const categories = [
    "Casual",
    "Formal",
    "Sportswear",
    "Loungewear",
    "Streetwear",
    "Business Casual",
    "Outerwear",
    "Footwear",
    "Accessories",
    "Activewear",
    "Swimwear",
    "Undergarments",
    "Luxury",
  ];

  const materials = [
    "Cotton", // Soft, breathable, used in most clothing
    "Polyester", // Durable, wrinkle-resistant, common in activewear
    "Nylon", // Lightweight, used in sportswear & shoes
    "Wool", // Warm, insulating, used in sweaters & coats
    "Leather", // Used in jackets, shoes, bags
    "Silk", // Luxurious, used in dresses, blouses
    "Denim", // Strong, used in jeans & jackets
    "Spandex", // Stretchy, used in activewear & leggings
    "Rayon", // Soft, mimics silk, used in dresses
    "Linen", // Lightweight, breathable, used in summer wear
    "Fleece", // Warm, synthetic, used in hoodies & jackets
    "Suede", // Soft leather, used in jackets & shoes
  ];

  const [genderDrop, setGenderDrop] = useState(false);
  const [kidsDrop, setKidsDrop] = useState(false);
  const [sizeDrop, setSizeDrop] = useState(false);
  const [costDrop, setCostDrop] = useState(false);
  const [saleDrop, setSaleDrop] = useState(false);
  const [colorDrop, setColorDrop] = useState(false);
  const [brandDrop, setBrandDrop] = useState(false);
  const [categoriesDrop, setCategoriesDrop] = useState(false);
  const [materialDrop, setMaterialDrop] = useState(false);
  return (
    <aside className="side-bar">
      <div className="flex items-center justify-center w-full py-3">
        <span className="font-plext-sans font-bold items-center">Filters</span>
      </div>

      <div className="side-bar-container">
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Gender</span>
            {genderDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setGenderDrop(!genderDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setGenderDrop(!genderDrop)}
              />
            )}
          </div>
          {genderDrop &&
            genderOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Kids</span>
            {kidsDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setKidsDrop(!kidsDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setKidsDrop(!kidsDrop)}
              />
            )}
          </div>
          {kidsDrop &&
            kidsOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Size</span>
            {sizeDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSizeDrop(!sizeDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSizeDrop(!sizeDrop)}
              />
            )}
          </div>
          {sizeDrop &&
            sizeOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Cost</span>
            {costDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCostDrop(!costDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCostDrop(!costDrop)}
              />
            )}
          </div>
          {costDrop &&
            costOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Sale</span>
            {saleDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSaleDrop(!saleDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setSaleDrop(!saleDrop)}
              />
            )}
          </div>
          {saleDrop &&
            saleOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Colors</span>
            {colorDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setColorDrop(!colorDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setColorDrop(!colorDrop)}
              />
            )}
          </div>
          {colorDrop &&
            colorOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Brand</span>
            {brandDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setBrandDrop(!brandDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setBrandDrop(!brandDrop)}
              />
            )}
          </div>
          {brandDrop &&
            brandOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Materials</span>
            {brandDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setMaterialDrop(!materialDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setMaterialDrop(!materialDrop)}
              />
            )}
          </div>
          {materialDrop &&
            materials.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Categories</span>
            {categoriesDrop ? (
              <ChevronUp
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCategoriesDrop(!categoriesDrop)}
              />
            ) : (
              <ChevronDown
                className="cursor-pointer"
                size="20px"
                strokeWidth={2}
                onClick={() => setCategoriesDrop(!categoriesDrop)}
              />
            )}
          </div>
          {categoriesDrop &&
            categories.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
