import { NextResponse } from "next/server";
import type { Product } from "../../../data/products";
import {
  createProductInMongo,
  getProductsFromMongo,
} from "../../../lib/productRepository";

export async function GET() {
  const products = await getProductsFromMongo();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = (await request.json()) as Product;

  if (!product.name || !product.category) {
    return NextResponse.json(
      { message: "Thiếu thông tin sản phẩm" },
      { status: 400 }
    );
  }

  const createdProduct = await createProductInMongo({
    ...product,
    likes: Number(product.likes) || 0,
  });

  return NextResponse.json(createdProduct, { status: 201 });
}
