export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="page-card">
        <p className="eyebrow">Về chúng tôi</p>
        <h1>Chạm vào nhịp sống Kon Tum</h1>
        <p>
          Chạm Kon Tum giới thiệu những điểm đến dễ yêu, món ăn bản địa và đặc
          sản đáng mang về. Mỗi gợi ý được chọn để người xem có thể lên lịch
          trình nhanh hơn và mua quà địa phương thuận tiện hơn.
        </p>
        <p>
          Website hướng đến trải nghiệm gọn, rõ và gần gũi: xem điểm đến, đọc
          thông tin cần thiết, lưu mục yêu thích và chọn đặc sản phù hợp.
        </p>
      </div>

      <div className="about-grid">
        <article>
          <h2>Điểm đến</h2>
          <p>
            Gợi ý các nơi nên ghé khi đến Kon Tum, từ không gian văn hóa đến
            những điểm nghỉ dưỡng xanh.
          </p>
        </article>
        <article>
          <h2>Đặc sản</h2>
          <p>
            Chọn lọc các món dễ mua làm quà như cà phê, măng khô, rượu cần và
            sản phẩm địa phương theo mùa.
          </p>
        </article>
        <article>
          <h2>Trải nghiệm</h2>
          <p>
            Kết nối chuyến đi với món ăn, câu chuyện bản địa và những lựa chọn
            quà tặng có dấu ấn Kon Tum.
          </p>
        </article>
      </div>
    </section>
  );
}
