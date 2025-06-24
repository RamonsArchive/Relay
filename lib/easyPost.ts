import { EasyPost } from "easypost";

const easypost = new EasyPost(process.env.EASYPOST_API_KEY);

if (!easypost) {
  throw new Error("EASYPOST_API_KEY is not set");
}

export const createWarehouseAddress = async () => {
    const address = await easypost.address.create({
      name: "Relay Warehouse",
      street1: "9785 Genesse Ave",
      city: "San Diego",
      state: "CA",
      zip: "92121",
      country: "US",
      phone: "949-910-7879",
    });
    
    // Store address.id in your env or database
    console.log("Warehouse address ID:", address.id);
    return address;
  };

export default easypost;