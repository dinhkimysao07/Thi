export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  likes: number;
  image: string;
  shortDescription: string;
  description: string;
  cultureNote: string;
};

export const products: Product[] = [
  {
    id: "mang-den-rung-thong",
    name: "Măng Đen và rừng thông",
    category: "Địa điểm",
    price: "Gợi ý tham quan",
    likes: 48,
    image:
      "https://caonguyentourist.com/thumbs/1300x450x2/upload/news/den-rung-thong-mang-den-trai-nghiem-da-lat-thu-hai-noi-tay-nguyen-dai-ngan-1659409721-8610.jpg",
    shortDescription:
      "Không khí mát lành, rừng thông xanh và nhịp sống chậm của vùng cao.",
    description:
      "Măng Đen là điểm đến nổi bật của Kon Tum với khí hậu mát, rừng thông rộng và nhiều điểm dừng chân yên tĩnh.",
    cultureNote:
      "Gợi ý trải nghiệm: đi dạo dưới rừng thông vào buổi sáng, ghé quán cà phê địa phương và mua đặc sản khô về làm quà.",
  },
  {
    id: "nha-rong-kon-klor",
    name: "Nhà rông Kon Klor",
    category: "Văn hóa",
    price: "Điểm tham quan văn hóa",
    likes: 36,
    image:
      "https://mia.vn/media/uploads/blog-du-lich/ghe-nha-rong-kon-klor-chiem-nguong-net-dep-van-hoa-mien-cao-dac-sac-1659004641.jpg",
    shortDescription:
      "Không gian cộng đồng nổi bật với mái nhà cao vút của người Ba Na.",
    description:
      "Nhà rông Kon Klor là biểu tượng văn hóa của Kon Tum, gắn với sinh hoạt cộng đồng, lễ hội và đời sống tinh thần bản địa.",
    cultureNote:
      "Gợi ý trải nghiệm: tham quan vào buổi chiều, sau đó ghé khu vực cầu treo Kon Klor gần đó.",
  },
  {
    id: "cong-chieng-tay-nguyen",
    name: "Không gian cồng chiêng",
    category: "Văn hóa",
    price: "Trải nghiệm văn hóa",
    likes: 52,
    image:
      "https://imagevietnam.vnanet.vn//MediaUpload/Org/2024/06/03/vna-potal-phuc-dung-nhung-net-dep-van-hoa-cua-nguoi-dan-toc-thieu-so-74089123-9-5-53.jpg",
    shortDescription:
      "Âm thanh lễ hội gắn với đời sống tinh thần của đồng bào Tây Nguyên.",
    description:
      "Không gian cồng chiêng là nét văn hóa đặc trưng của Tây Nguyên, thường xuất hiện trong lễ hội và sinh hoạt cộng đồng.",
    cultureNote:
      "Gợi ý trải nghiệm: tìm hiểu lịch biểu diễn hoặc lễ hội địa phương trước chuyến đi.",
  },
  {
    id: "cau-treo-kon-klor",
    name: "Cầu treo Kon Klor",
    category: "Địa điểm",
    price: "Điểm check-in",
    likes: 28,
    image:
      "https://mangdentrip.com/wp-content/uploads/2025/03/4bdbddb5-839c-45de-bb5c-d2ce0fa3365b-425481977-358597297065846-2223297348888428578-njpg20241218055507-1-1400x788.jpg",
    shortDescription:
      "Cây cầu nối đôi bờ Đăk Bla và mở ra nhịp sống bình dị ven làng.",
    description:
      "Cầu treo Kon Klor là điểm dừng quen thuộc khi khám phá thành phố Kon Tum.",
    cultureNote:
      "Gợi ý trải nghiệm: kết hợp cầu treo, nhà rông Kon Klor và các quán đặc sản địa phương trong cùng một buổi.",
  },
  {
    id: "nha-tho-go-kon-tum",
    name: "Nhà thờ gỗ Kon Tum",
    category: "Địa điểm",
    price: "Điểm tham quan",
    likes: 44,
    image:
      "https://e-cdn.carpla.vn/carpla-ecom/blog/nha-tho-go-kon-tum-1758614129.669.jpg",
    shortDescription:
      "Công trình kiến trúc lâu đời, nổi bật với chất liệu gỗ và không gian yên tĩnh.",
    description:
      "Nhà thờ gỗ Kon Tum là điểm tham quan quen thuộc trong thành phố, phù hợp để tìm hiểu kiến trúc và lịch sử địa phương.",
    cultureNote:
      "Gợi ý trải nghiệm: ghé vào buổi sáng hoặc chiều mát để tham quan nhẹ nhàng và chụp ảnh bên ngoài công trình.",
  },
  {
    id: "song-dak-bla",
    name: "Sông Đăk Bla",
    category: "Địa điểm",
    price: "Gợi ý ngắm cảnh",
    likes: 31,
    image:
      "https://dulich.petrotimes.vn/stores/news_dataimages/donghoa/032021/23/14/1121_sg1.jpg?rt=20210323141146",
    shortDescription:
      "Dòng sông uốn quanh thành phố, hợp để ngắm cảnh và đi dạo chiều.",
    description:
      "Sông Đăk Bla là cảnh quan quen thuộc của Kon Tum, nổi bật với mặt nước rộng và nhịp sống ven sông.",
    cultureNote:
      "Gợi ý trải nghiệm: đi dạo ven sông vào chiều mát, sau đó ghé khu cầu treo Kon Klor gần đó.",
  },
  {
    id: "ca-phe-dak-ha",
    name: "Cà phê Đăk Hà",
    category: "Đặc sản",
    price: "120.000đ / gói",
    likes: 57,
    image:
      "https://nongthonvaphattrien.vn/uploads/images/2025/03/01/3-nguoi-dan-dak-ha-thu-hoach-ca-phe-1740794852.jpg",
    shortDescription:
      "Cà phê vùng Đăk Hà, thơm đậm và dễ chọn làm quà.",
    description:
      "Cà phê Đăk Hà là đặc sản quen thuộc của Kon Tum, phù hợp để pha phin hoặc pha máy.",
    cultureNote:
      "Gợi ý sử dụng: chọn dạng hạt hoặc bột tùy cách pha, đóng gói nhỏ sẽ tiện mang về.",
  },
  {
    id: "sam-ngoc-linh",
    name: "Sâm Ngọc Linh",
    category: "Quà tặng",
    price: "Liên hệ",
    likes: 64,
    image:
      "https://samngoclinhvietnam.com.vn/upload/sanpham/1-2310.png",
    shortDescription:
      "Sản phẩm giá trị cao, thường được chọn làm quà tặng trang trọng.",
    description:
      "Sâm Ngọc Linh là sản vật nổi tiếng của vùng núi Ngọc Linh.",
    cultureNote:
      "Gợi ý mua hàng: nên liên hệ trước để được tư vấn loại sản phẩm, quy cách đóng gói và giá.",
  },
  {
    id: "mang-kho-kon-tum",
    name: "Măng khô Kon Tum",
    category: "Đặc sản",
    price: "95.000đ / túi",
    likes: 33,
    image:
      "https://dulichviet.com.vn/images/bandidau/kinh-nghiem-du-lich-mang-den-nen-mua-dac-san-gi-ngon-ve-lam-qua.jpg",
    shortDescription:
      "Món đặc sản khô dễ bảo quản, hợp để nấu trong bữa ăn gia đình.",
    description:
      "Măng khô Kon Tum dễ đóng gói, dễ bảo quản và dùng được trong nhiều món ăn.",
    cultureNote:
      "Gợi ý sử dụng: ngâm mềm trước khi nấu, sau đó dùng với thịt kho, canh xương hoặc món xào.",
  },
  {
    id: "bo-mot-nang",
    name: "Bò một nắng Kon Tum",
    category: "Đặc sản",
    price: "220.000đ / hộp",
    likes: 41,
    image:
      "https://cattour.vn/images/upload/images/Tay-nguyen/top-nhung-mon-an-dac-san-tay-nguyen-ngon-kho-cuong/bomotnang1.png",
    shortDescription:
      "Món đặc sản đậm vị, phù hợp làm quà hoặc dùng trong bữa gặp mặt.",
    description:
      "Bò một nắng Kon Tum được tẩm ướp vừa vị, phơi se và dễ chế biến lại khi dùng.",
    cultureNote:
      "Gợi ý sử dụng: nướng hoặc áp chảo nhẹ, ăn cùng muối kiến vàng hoặc rau thơm.",
  },
  {
    id: "goi-la-kon-tum",
    name: "Gỏi lá Kon Tum",
    category: "Ẩm thực",
    price: "130.000đ / phần",
    likes: 50,
    image:
      "https://thuonghieuvaphapluat.vn/Images/mydung/2023/01/20/%E1%BA%A2nh%201.jpg",
    shortDescription:
      "Món ăn nhiều loại lá rừng, chấm cùng nước sốt đậm vị địa phương.",
    description:
      "Gỏi lá Kon Tum là món ăn đặc trưng với nhiều loại rau lá ăn kèm, tạo cảm giác mới lạ cho người muốn thử hương vị bản địa.",
    cultureNote:
      "Gợi ý thưởng thức: ăn từng phần nhỏ để cảm nhận vị chát, thơm, bùi của các loại lá và nước chấm.",
  },
  {
    id: "bun-do-kon-tum",
    name: "Bún đỏ Kon Tum",
    category: "Ẩm thực",
    price: "45.000đ / tô",
    likes: 34,
    image:
      "https://img.thuonghieusanpham.vn/img/TAPCHI_THSP/news_dataimages/2025/042025/16/11/in_article/120250416115135.jpg?rt=20250416115138",
    shortDescription:
      "Món bún dân dã, dễ ăn, phù hợp cho bữa sáng hoặc bữa xế khi đi du lịch.",
    description:
      "Bún đỏ là món ăn quen thuộc ở khu vực Tây Nguyên, có màu nước dùng bắt mắt và hương vị mộc mạc.",
    cultureNote:
      "Gợi ý thưởng thức: dùng khi còn nóng, thêm rau sống và gia vị theo khẩu vị.",
  },
  {
    id: "com-lam-ga-nuong",
    name: "Cơm lam gà nướng",
    category: "Ẩm thực",
    price: "150.000đ / phần",
    likes: 45,
    image:
      "https://bizweb.dktcdn.net/100/539/761/files/com-lam-kontum.jpg?v=1741317081606",
    shortDescription:
      "Hương vị núi rừng quen thuộc cho bữa ăn trong hành trình du lịch.",
    description:
      "Cơm lam gà nướng là món ăn dễ gợi nhớ đến trải nghiệm Tây Nguyên.",
    cultureNote:
      "Gợi ý thưởng thức: dùng khi còn nóng, ăn cùng muối lá é hoặc rau rừng theo mùa.",
  },
  {
    id: "ruou-can",
    name: "Rượu cần Tây Nguyên",
    category: "Quà tặng",
    price: "180.000đ / ché",
    likes: 39,
    image:
      "https://cdn.xanhsm.com/2025/03/f6612ffa-dac-san-gia-lai-14.jpg",
    shortDescription:
      "Thức uống truyền thống thường xuất hiện trong lễ hội và dịp sum họp.",
    description:
      "Rượu cần Tây Nguyên là sản phẩm quà tặng gắn với văn hóa cộng đồng.",
    cultureNote:
      "Gợi ý mua hàng: chọn dung tích theo nhu cầu biếu tặng hoặc dùng trong buổi gặp mặt.",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
