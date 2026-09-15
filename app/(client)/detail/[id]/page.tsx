import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../../components/AddToCartButton";
import LikeButton from "../../../components/LikeButton";
import RelatedProducts from "../../../components/RelatedProducts";
import { ROUTES } from "../../../constants/routes";
import { getProductByIdFromMongo } from "../../../lib/productRepository";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdFromMongo(id);

  if (!product) {
    return (
      <section className="page-card">
        <p className="eyebrow">Không tìm thấy</p>
        <h1>Nội dung không còn hiển thị</h1>
        <p>
          Mục bạn đang tìm có thể đã được cập nhật hoặc tạm ngừng giới thiệu.
        </p>
        <Link className="detail-link" href={ROUTES.home}>
          Quay về trang chủ
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="detail-layout">
        <div className="detail-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="detail-content">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="culture-note">
            <strong>Gợi ý</strong>
            <p>{product.cultureNote}</p>
          </div>
          <strong className="detail-price">{product.price}</strong>
          <div className="detail-actions">
            <AddToCartButton product={product} />
            <LikeButton initialLikes={product.likes} />
            <Link className="back-link" href={ROUTES.homeCategories}>
              Xem thêm
            </Link>
          </div>
        </div>
      </section>
      <RelatedProducts currentProductId={id} />
    </>
  );
}
