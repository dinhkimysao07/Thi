import { NextResponse } from "next/server";
import { getProductsFromMongo } from "../../lib/productRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const excludedProductId = searchParams.get("exclude");
  const category = searchParams.get("category");

  const visibleProducts = await getProductsFromMongo({
    category,
    exclude: excludedProductId,
  });

  return NextResponse.json(visibleProducts);
}
