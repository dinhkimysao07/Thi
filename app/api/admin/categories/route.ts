import { NextResponse } from "next/server";
import {
  createCategoryInMongo,
  getCategoriesFromMongo,
} from "../../../lib/productRepository";

export async function GET() {
  const categories = await getCategoriesFromMongo();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { name } = (await request.json()) as { name?: string };
  const categoryName = name?.trim();

  if (!categoryName) {
    return NextResponse.json(
      { message: "Thiếu tên danh mục" },
      { status: 400 }
    );
  }

  const category = await createCategoryInMongo(categoryName);
  return NextResponse.json(category, { status: 201 });
}
