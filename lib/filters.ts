import { client } from "@/sanity/lib/client";

export const getDynamicFilters = async () => {

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const data = await client.fetch(`
  {
      "colors": array::unique(*[_type == "product"].colors[]) | order(@ asc),
      "brands": array::unique(*[_type == "product"].brand[]) | order(@ asc),
      "materials": array::unique(*[_type == "product"].materials[]) | order(@ asc),
      "categories": array::unique(*[_type == "product"].categories[]) | order(@ asc)
  }`);

  const commonFilters = {
    commonColors: ["Black", "Blue", "Brown", "Gray", "Green", "Orange", "Pink", "Purple", "Red", "White", "Yellow"],
    commonBrands: [
      "Adidas", "ASICS", "Columbia", "Converse", "H&M", "Jordan", "Levi's", "Nike",
      "Patagonia", "Puma", "Reebok", "The North Face", "Under Armour", "Uniqlo", "Vans", "Zara"
    ],
    commonMaterials: ["Acrylic", "Cotton", "Denim", "Fleece", "Leather", "Nylon", "Polyester", "Rayon", "Spandex", "Wool"],
    commonCategories: ["Accessories", "Activewear", "Bottoms", "Dresses", "Loungewear", "Outerwear", "Shoes", "Swimwear", "Tops", "Underwear"]
  };

  return {
    gender: ["Men", "Women", "Unisex"],
    kids: ["Boys", "Girls"],
    size: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    cost: ["$0-$50", "$50-$100", "$100-$150", "$150-$200"],
    sale: ["Sale"],
    collections: ["Best Sellers", "Featured", "Hearted", "New Arrivals", "Sale"],
    
    colors: [...new Set([...commonFilters.commonColors, ...data.colors.map(capitalize)])].sort(),
    brands: [...new Set([...commonFilters.commonBrands, ...data.brands.map(capitalize)])].sort(),
    materials: [...new Set([...commonFilters.commonMaterials, ...data.materials.map(capitalize)])].sort(),
    categories: [...new Set([...commonFilters.commonCategories, ...data.categories.map(capitalize)])].sort()
  };
};