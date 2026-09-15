import type { Filter } from "mongodb";
import { getMongoDb } from "./mongodb";
import type { Product } from "../data/products";

type ProductDocument = Product & {
  _id?: unknown;
};

export type Category = {
  id: string;
  name: string;
  totalProducts: number;
};

type CategoryDocument = Omit<Category, "totalProducts"> & {
  _id?: unknown;
};

type ProductFilters = {
  category?: string | null;
  exclude?: string | null;
};

const PRODUCTS_COLLECTION = "products";
const CATEGORIES_COLLECTION = "categories";

function toProduct(document: ProductDocument): Product {
  const { _id, ...product } = document;
  void _id;
  return product;
}

export async function getProductsFromMongo(filters: ProductFilters = {}) {
  const db = await getMongoDb();
  const query: Filter<ProductDocument> = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.exclude) {
    query.id = { $ne: filters.exclude };
  }

  const products = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .find(query)
    .sort({ idNumber: 1, name: 1 })
    .toArray();

  return products.map(toProduct);
}

export async function getProductByIdFromMongo(id: string) {
  const db = await getMongoDb();
  const product = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .findOne({ id });

  return product ? toProduct(product) : null;
}

export async function createProductInMongo(product: Product) {
  const db = await getMongoDb();
  const productCollection = db.collection<ProductDocument>(PRODUCTS_COLLECTION);
  const existingProducts = await productCollection
    .find({}, { projection: { id: 1 } })
    .toArray();
  const maxId = existingProducts.reduce((maxValue, currentProduct) => {
    const numericId = Number(currentProduct.id);
    return Number.isFinite(numericId) ? Math.max(maxValue, numericId) : maxValue;
  }, 0);
  const nextId = String(maxId + 1);
  const productWithId = { ...product, id: nextId };

  await productCollection.insertOne(productWithId);
  return productWithId;
}

export async function updateProductInMongo(id: string, product: Product) {
  const db = await getMongoDb();
  const result = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      { id },
      { $set: { ...product, id } },
      { returnDocument: "after" }
    );

  return result ? toProduct(result) : null;
}

export async function deleteProductFromMongo(id: string) {
  const db = await getMongoDb();
  const result = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .deleteOne({ id });

  return result.deletedCount > 0;
}

export async function getCategoriesFromMongo() {
  const db = await getMongoDb();

  return db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .aggregate<Category>([
      {
        $lookup: {
          from: PRODUCTS_COLLECTION,
          localField: "name",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          totalProducts: { $size: "$products" },
        },
      },
      { $sort: { name: 1 } },
    ])
    .toArray();
}

export async function createCategoryInMongo(name: string) {
  const db = await getMongoDb();
  const category = { id: name, name };

  await db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .updateOne({ id: name }, { $setOnInsert: category }, { upsert: true });

  return { ...category, totalProducts: 0 };
}

export async function updateCategoryInMongo(id: string, name: string) {
  const db = await getMongoDb();
  const category = await db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .findOneAndUpdate(
      { id },
      { $set: { id: name, name } },
      { returnDocument: "after" }
    );

  if (!category) {
    return null;
  }

  await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .updateMany({ category: id }, { $set: { category: name } });

  return { id: category.id, name: category.name, totalProducts: 0 };
}

export async function deleteCategoryFromMongo(id: string) {
  const db = await getMongoDb();
  const productsInCategory = await db
    .collection<ProductDocument>(PRODUCTS_COLLECTION)
    .countDocuments({ category: id });

  if (productsInCategory > 0) {
    return { deleted: false, reason: "CATEGORY_HAS_PRODUCTS" };
  }

  const result = await db
    .collection<CategoryDocument>(CATEGORIES_COLLECTION)
    .deleteOne({ id });

  return { deleted: result.deletedCount > 0 };
}
