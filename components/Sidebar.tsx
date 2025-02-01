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
  const sizeOptions = ["XS", "S", "M", "L", "XL", "xxl", "xxxl"];
  const costOptions = ["$0-$50", "$50-$100", "$100-$150", "$150-$200"];
  const saleOptions = ["Sale"];
  const collectionOptions = [
    "New Arrivals",
    "Featured",
    "Hearted",
    "Best Sellers",
  ];
  const colorOptions = [
    "Black",
    "White",
    "Gray",
    "Beige",
    "Navy",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Pink",
    "Brown",
    "Olive",
    "Orange",
    "Teal",
    "Maroon",
  ];
  const brandOptions = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "New Balance",
    "Under Armour",
    "Converse",
    "Vans",
    "Jordan",
    "Fila",
    "ASICS",
    "Columbia",
    "Patagonia",
    "The North Face",
    "Levi's",
    "H&M",
    "Zara",
    "Uniqlo",
    "Gucci",
    "Louis Vuitton",
  ];

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
    "Wool", // Warm, insulating, used in sweaters & coats
    "Linen", // Lightweight, breathable, used in summer wear
    "Silk", // Luxurious, soft, used in dresses, blouses
    "Cashmere", // Soft, high-end wool used in sweaters & coats
    "Hemp", // Durable, eco-friendly, used in sustainable clothing
    "Suede", // Soft leather, used in jackets & shoes
    "Leather", // Used in jackets, shoes, bags
    "Denim", // Strong, durable, used in jeans & jackets

    // 🔹 SYNTHETIC MATERIALS
    "Polyester", // Durable, wrinkle-resistant, common in activewear
    "Nylon", // Lightweight, used in sportswear & shoes
    "Spandex", // Stretchy, used in activewear & leggings
    "Rayon", // Soft, mimics silk, used in dresses
    "Fleece", // Warm, synthetic, used in hoodies & jackets
    "Acrylic", // Soft, wool-like, used in sweaters
    "Microfiber", // Used in sportswear, towels, and cleaning cloths

    // 🔹 HIGH-TECH & SPECIALTY FABRICS
    "Gore-Tex", // Waterproof, breathable, used in outdoor gear
    "Neoprene", // Water-resistant, used in wetsuits & some fashionwear
    "Kevlar", // Strong, heat-resistant, used in workwear & safety gear
    "Coolmax", // Moisture-wicking, used in performance clothing
    "Tencel (Lyocell)", // Eco-friendly, soft, used in sustainable fashion
    "Modal", // Soft, similar to cotton, used in luxury loungewear

    // 🔹 BLENDED & ECO-FRIENDLY MATERIALS
    "Organic Cotton", // Grown without pesticides, used in sustainable fashion
    "Recycled Polyester", // Eco-friendly, made from plastic bottles
    "Bamboo Fabric", // Breathable, moisture-wicking, used in sustainable fashion
    "Viscose", // Soft, semi-synthetic, used in dresses & blouses
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
  const [collectionDrop, setCollectionDrop] = useState(false);
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
            <div className="shrink-0">
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
          </div>
          {saleDrop &&
            saleOptions.map((option, index) => (
              <CheckBox key={index} options={option} />
            ))}
        </div>
        <div className="side-bar-option-container">
          <div className="side-bar-options">
            <span>Collections</span>
            <div className="shrink-0">
              {collectionDrop ? (
                <ChevronUp
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setCollectionDrop(!collectionDrop)}
                />
              ) : (
                <ChevronDown
                  className="cursor-pointer"
                  size="20px"
                  strokeWidth={2}
                  onClick={() => setCollectionDrop(!collectionDrop)}
                />
              )}
            </div>
          </div>
          {collectionDrop &&
            collectionOptions.map((option, index) => (
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
            {materialDrop ? (
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
