import { NextResponse } from "next/server";
import {
  deleteCategoryFromMongo,
  updateCategoryInMongo,
} from "../../../../lib/productRepository";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name } = (await request.json()) as { name?: string };
  const categoryName = name?.trim();

  if (!categoryName) {
    return NextResponse.json(
      { message: "Thiếu tên danh mục" },
      { status: 400 }
    );
  }

  const category = await updateCategoryInMongo(id, categoryName);

  if (!category) {
    return NextResponse.json(
      { message: "Không tìm thấy danh mục" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await deleteCategoryFromMongo(id);

  if (!result.deleted && result.reason === "CATEGORY_HAS_PRODUCTS") {
    return NextResponse.json(
      { message: "Không thể xóa danh mục đang có sản phẩm" },
      { status: 409 }
    );
  }

  if (!result.deleted) {
    return NextResponse.json(
      { message: "Không tìm thấy danh mục" },
      { status: 404 }
    );
  }

  return NextResponse.json({ deleted: true });
}
