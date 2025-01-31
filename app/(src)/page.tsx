import Mobilebar from "@/components/Mobilebar";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { SignIn, SignedOut } from "@clerk/nextjs";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  console.log(`Query in home ${query}`);

  /* TODO: implement types
    const upperWear = ["shirt", "t-shirt", "sweater", "hoodie", "jacket", "coat", "blazer", "vest", "tank top"];
    const lowerWear = ["pants", "jeans", "shorts", "leggings", "sweatpants", "trousers", "skirt"];
    const footwear = ["shoes", "sneakers", "boots", "sandals", "heels", "flip-flops", "loafers"];
    const underwear = ["underwear", "boxers", "briefs", "panties", "bra", "sports bra", "nightgown", "pajamas"];
    const accessories = ["hat", "cap", "beanie", "gloves", "scarf", "belt", "sunglasses"];
    const legwear = ["socks", "stockings", "tights", "leggings"];

  */

  /* TODO: categories types
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
  ]; */

  /* TODO material types
  const commonMaterials = [
  "Cotton",      // Soft, breathable, used in most clothing
  "Polyester",   // Durable, wrinkle-resistant, common in activewear
  "Nylon",       // Lightweight, used in sportswear & shoes
  "Wool",        // Warm, insulating, used in sweaters & coats
  "Leather",     // Used in jackets, shoes, bags
  "Silk",        // Luxurious, used in dresses, blouses
  "Denim",       // Strong, used in jeans & jackets
  "Spandex",     // Stretchy, used in activewear & leggings
  "Rayon",       // Soft, mimics silk, used in dresses
  "Linen",       // Lightweight, breathable, used in summer wear
  "Fleece",      // Warm, synthetic, used in hoodies & jackets
  "Suede",       // Soft leather, used in jackets & shoes
]; */

  const products = [
    {
      _createdAt: Date.now(),
      title: "Nike Joggers",
      brand: "Nike",
      _id: "1",
      imageUrl: "/assets/images/pants.jpg",
      description: "A nice pair of pants",
      gender: "male",
      kids: "",
      size: "xl",
      sale: "",
      upperWear: [],
      lowerWear: ["pangs", "jeans"],
      footWear: [],
      underWear: [],
      accessories: [],
      legwear: [],
      types: ["pants"],
      materials: ["cotton", "polyester"],
      categories: ["casual", "loungewear"],
      cost: 100,
      stock: [
        { size: "sm", quantity: 10 },
        { size: "md", quantity: 10 },
        { size: "lg", quantity: 10 },
        { size: "xl", quantity: 10 },
      ],
    },

    {
      _createdAt: Date.now(),
      title: "Nike shoes",
      brand: "Nike",
      _id: "2",
      imageUrl: "/assets/images/shoes.jpg",
      description: "A nice pair of shoes",
      gender: "unisex",
      kids: "",
      size: "lg",
      sale: "",
      upperWear: [],
      lowerWear: [],
      footWear: ["shoes", "sneakers"],
      underWear: [],
      accessories: [],
      legwear: [],
      types: ["shoes"],
      materials: ["cotton", "polyester"],
      categories: ["activewear"],
      cost: 100,
      stock: [
        { size: "sm", quantity: 10 },
        { size: "md", quantity: 10 },
        { size: "lg", quantity: 10 },
        { size: "xl", quantity: 10 },
      ],
    },
    {
      _createdAt: Date.now(),
      title: "Nike shoes",
      brand: "Nike",
      _id: "3",
      imageUrl: "/assets/images/shoes.jpg",
      description: "A nice pair of shoes",
      gender: "unisex",
      kids: "",
      size: "lg",
      sale: "",
      upperWear: [],
      lowerWear: [],
      footWear: ["shoes", "sneakers"],
      underWear: [],
      accessories: [],
      legwear: [],
      types: ["shoes"],
      materials: ["cotton", "polyester"],
      categories: ["activewear"],
      cost: 100,
      stock: [
        { size: "sm", quantity: 10 },
        { size: "md", quantity: 10 },
        { size: "lg", quantity: 10 },
        { size: "xl", quantity: 10 },
      ],
    },
  ];
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <Navbar query={query} />
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <Mobilebar />
        <main className="home">
          <section className="home-container">
            <span className="font-plex-sans font-bold text-[30px]">
              All Clothes
            </span>
            <ul className="home-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product?._id} product={product} />
                ))
              ) : (
                <div>No product available</div>
              )}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
