import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { products } from "../../data/products";
import type { Product } from "../../data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

const cartPath = path.join(process.cwd(), "app", "data", "cart.json");

async function readCart() {
  try {
    const data = await fs.readFile(cartPath, "utf8");
    const cart = JSON.parse(data) as CartItem[];
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

async function writeCart(cart: CartItem[]) {
  await fs.writeFile(cartPath, `${JSON.stringify(cart, null, 2)}\n`, "utf8");
}

export async function GET() {
  const cart = await readCart();
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { productId?: string } | null;
  const product = products.find((item) => item.id === body?.productId);

  if (!product) {
    return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  const cart = await readCart();
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  await writeCart(cart);

  return NextResponse.json({
    cart,
    totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
  });
}
