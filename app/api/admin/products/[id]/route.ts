import { NextResponse } from "next/server";
import type { Product } from "../../../../data/products";
import {
  deleteProductFromMongo,
  updateProductInMongo,
} from "../../../../lib/productRepository";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = (await request.json()) as Product;

  if (!product.name || !product.category) {
    return NextResponse.json(
      { message: "Thiếu thông tin sản phẩm" },
      { status: 400 }
    );
  }

  const updatedProduct = await updateProductInMongo(id, {
    ...product,
    id,
    likes: Number(product.likes) || 0,
  });

  if (!updatedProduct) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedProduct);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteProductFromMongo(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  return NextResponse.json({ deleted: true });
}
