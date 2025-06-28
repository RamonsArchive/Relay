// easyPost.ts
import EasyPost from "@easypost/api";

const easypost = new EasyPost(process.env.EASYPOST_API_KEY);

if (!process.env.EASYPOST_API_KEY) {
  throw new Error("EASYPOST_API_KEY is not set");
}

export const createWarehouseAddress = async () => {
  const address = await easypost.Address.create({
    name: "Relay Warehouse",
    street1: "9785 Genesee Avenue",
    city: "San Diego",
    state: "CA",
    zip: "92121",
    country: "US",
    phone: "949-910-7879",
  });
  
  // Store address.id in your env or database
  return address;
};

export default easypost;