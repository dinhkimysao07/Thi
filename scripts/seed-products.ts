import { MongoClient } from "mongodb";
import { products } from "../app/data/products";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "chamkontum";

async function main() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI in .env.local");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const productCollection = db.collection("products");
    const categoryCollection = db.collection("categories");
    const categories = Array.from(new Set(products.map((product) => product.category))).map(
      (category) => ({
        id: category,
        name: category,
      })
    );

    await productCollection.createIndex({ id: 1 }, { unique: true });
    await productCollection.createIndex({ category: 1 });
    await categoryCollection.createIndex({ id: 1 }, { unique: true });

    await Promise.all(
      products.map((product, index) =>
        productCollection.updateOne(
          { id: String(index + 1) },
          {
            $set: {
              ...product,
              id: String(index + 1),
            },
          },
          { upsert: true }
        )
      )
    );

    const activeProductIds = products.map((_, index) => String(index + 1));
    await productCollection.deleteMany({
      id: { $nin: activeProductIds },
    });

    await Promise.all(
      categories.map((category) =>
        categoryCollection.updateOne(
          { id: category.id },
          { $set: category },
          { upsert: true }
        )
      )
    );

    await categoryCollection.deleteMany({
      id: { $nin: categories.map((category) => category.id) },
    });

    console.log(
      `Synced ${products.length} products and ${categories.length} categories into ${dbName}`
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
