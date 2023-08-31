import { revalidateTag } from "next/cache";

export interface Product {
  id?: number;
  product: string;
  price: string;
}

export default async function Home() {
  const res = await fetch(
    "https://64ef0b89219b3e2873c3dab0.mockapi.io/products",
    {
      cache: "no-cache",
      next: {
        tags: ["products"],
      },
    }
  );
  const products: Product[] = await res.json();

  const addProductToDB = async (e: FormData) => {
    "use server";

    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();

    if (!product || !price) return;

    const newProduct: Product = {
      product: product,
      price: price,
    };

    await fetch("https://64ef0b89219b3e2873c3dab0.mockapi.io/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("products");
  };
  return (
    <main>
      <form
        action={addProductToDB}
        className="flex flex-col max-w-xl mx-auto p-5 gap-5"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-300 p-2 rounded-md text-red-600"
          name="product"
        />
        <input
          type="text"
          placeholder="Price"
          className="border border-gray-300 p-2 rounded-md text-red-600"
          name="price"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>
      <h2>List of all products</h2>
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow shadow-white">
            <p>{product.product}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
