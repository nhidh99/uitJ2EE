<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="static/css/product.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
              integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
              crossorigin="anonymous">
    </head>
    <body>
        <h1>Banner</h1>
        <div id="container">
            <section id="overview-block">
                <header class="block-title">Navigate</header>
                <div class="block-info">
                    <div class="row">
                        <div class="col-4" id="overview-left">
                            <img src="static/images/laptops/dell-vostro-5490-i5-10210u-8gb-256gb-win10-v4i510-1-600x600.jpg"
                                 id="product-img"
                                 alt="laptop"/>
                        </div>
                        <div class="col-8" id="overview-right">
                            <div id="product-overview">
                                <div id="product-name">Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB DDR4
                                    2666MHz/
                                    256GB
                                    M.2 PCIe NVMe/ 14
                                    FHD/ Win10) - Hàng Chính Hiệu</b>
                                </div>
                                <div id="product-rate">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    &nbsp;
                                    <label class="comment-count">(15 đánh giá)</label>
                                </div>
                                <div id="product-prices">
                                    <label id="current-price">18,290,000đ</label>
                                    <label id="origin-price">19,590,000đ</label>
                                    <label id="discount-price">(Giảm 1,300,000đ)</label>
                                </div>
                            </div>
                            <hr/>
                            <div id="product-promotions">
                                <label id="promotion-title">Quà khuyến mãi</label>
                                <div class="promotion-item">
                                    <img src="static/images/promotions/balo-lenovo-khuyen-mai-300-200x200.jpg"
                                         class="promotion-image" alt="promotions">
                                    <label class="promotion-name">Balo Laptop <i>(250,000đ)</i></label>
                                </div>
                                <div class="promotion-item">
                                    <img src="static/images/promotions/chuot-khong-day-genius-nx-7010-ava-1-200x200.jpg"
                                         class="promotion-image" alt="promotions">
                                    <label class="promotion-name">Chuột không dây <i>(150,000đ)</i></label>
                                </div>
                            </div>
                            <hr/>
                            <div id="product-actions">
                                <form>
                                    <div class="form-group row">
                                        <label class="col-2 col-form-label"><b>Số lượng:</b></label>
                                        <input id="quantity-spinner" class="col-2 form-control text-center"
                                               type="number"
                                               name="quantity" min="1" max="99" placeholder="1">
                                        <button class="col-4 btn btn-success">
                                            <i class="fa fa-shopping-cart"></i>&nbsp;&nbsp;Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="detail-block">
                <header class="block-title">Thông tin sản phẩm</header>
                <div class="block-info">
                    <table class="table-bordered">
                        <tbody>
                            <tr>
                                <th>Thương hiệu</th>
                                <td>Dell</td>
                            </tr>
                            <tr>
                                <th>CPU</th>
                                <td>Intel Core i5 Comet Lake, 10210U, 1.60 GHz</td>
                            </tr>
                            <tr>
                                <th>RAM</th>
                                <td>8 GB, DDR4 (On board +1 khe), 2666 MHz</td>
                            </tr>
                            <tr>
                                <th>Ổ cứng</th>
                                <td>SSD 256GB NVMe PCIe, Hỗ trợ khe cắm HDD SATA</td>
                            </tr>
                            <tr>
                                <th>Màn hình</th>
                                <td>14 inch, Full HD (1920 x 1080)</td>
                            </tr>
                            <tr>
                                <th>Card màn hình</th>
                                <td>Card đồ họa tích hợp, Intel UHD Graphics</td>
                            </tr>
                            <tr>
                                <th>Cổng kết nối</th>
                                <td>2 x USB 3.1, HDMI, LAN (RJ45), USB 2.0, USB Type-C</td>
                            </tr>
                            <tr>
                                <th>Đặc biệt</th>
                                <td>Có đèn bàn phím</td>
                            </tr>
                            <tr>
                                <th>Hệ điều hành</th>
                                <td>Windows 10 Home SL</td>
                            </tr>
                            <tr>
                                <th>Kích thước</th>
                                <td>Dày 18.3 mm, 1.49 kg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="suggest-block">
                <header class="block-title">Sản phẩm tương tự</header>
                <div class="block-info">
                    <div class="row">
                        <div class="col-3">
                            <img src="static/images/laptops/8cf82b1d215d342c01b9cb5c77567265.jpg"
                                 class="suggest-img" alt="suggest">
                            <label>Laptop Asus Vivobook A512DA-EJ422T AMD R5-3500U/Win10...</label><br/>
                            <label><b>24,590,000đ</b></label>&nbsp;&nbsp;
                            <label style="text-decoration: line-through">26,990,000đ</label><br/>
                            <a href="/">So sánh chi tiết</a>
                        </div>
                        <div class="col-3">
                            <img src="static/images/laptops/93cdc27215b7d3720694e3729d212c44.jpg"
                                 class="suggest-img" alt="suggest">
                            <label>Laptop Dell Vostro 5481 V5481A Core i5-8265U/ MX130 2GB...</label>
                            <label><b>24,590,000đ</b></label>&nbsp;&nbsp;
                            <label style="text-decoration: line-through">26,990,000đ</label><br/>
                            <a href="/">So sánh chi tiết</a>
                        </div>
                        <div class="col-3">
                            <img src="static/images/laptops/0159761f43849d5e260b75c8e0d04d36.jpg"
                                 class="suggest-img" alt="suggest">
                            <label>Laptop Dell Inspiron 5491 C1JW81 Core i7-10510U...</label>
                            <label><b>24,590,000đ</b></label>&nbsp;&nbsp;
                            <label style="text-decoration: line-through">26,990,000đ</label><br/>
                            <a href="/">So sánh chi tiết</a>
                        </div>
                        <div class="col-3">
                            <img src="static/images/laptops/fdcb5f5c9fd88b5c03d6d41e2e26b87e.jpg"
                                 class="suggest-img" alt="suggest">
                            <label>Laptop Lenovo Legion Y540-15IRH 81SY0037VN...</label>
                            <label><b>24,590,000đ</b></label>&nbsp;&nbsp;
                            <label style="text-decoration: line-through">26,990,000đ</label><br/>
                            <a href="/">So sánh chi tiết</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="rating-block">
                <header class="block-title">Đánh giá sản phẩm</header>
                <div class="block-info">
                    <div class="row">
                        <div class="col-4" id="rating-left">
                            <div id="rating-overview">
                                <label><b>Đánh Giá Trung Bình</b></label><br/>
                                <label id="rating">4.8/5</label><br/>
                                <label class="comment-count">(15 đánh giá)</label>
                            </div>
                            <div id="rating-detail">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label>5&nbsp;<i class="fas fa-star"></i></label>
                                            </td>
                                            <td>
                                                <progress value="80" max="100"></progress>
                                            </td>
                                            <td>80%</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>4&nbsp;<i class="fas fa-star"></i></label>
                                            </td>
                                            <td>
                                                <progress value="20" max="100"></progress>
                                            </td>
                                            <td>20%</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>3&nbsp;<i class="fas fa-star"></i></label>
                                            </td>
                                            <td>
                                                <progress value="0" max="100"></progress>
                                            </td>
                                            <td>0%</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>2&nbsp;<i class="fas fa-star"></i></label>
                                            </td>
                                            <td>
                                                <progress value="0" max="100"></progress>
                                            </td>
                                            <td>0%</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>1&nbsp;<i class="fas fa-star"></i></label>
                                            </td>
                                            <td>
                                                <progress value="0" max="100"></progress>
                                            </td>
                                            <td>0%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-8" id="rating-right">
                            <form>
                                <div class="form-group">
                                    <label class="col-form-label"><b>1. Đánh giá sản phẩm:</b></label>
                                    &nbsp;
                                    <span id="rating-stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </span>
                                    <button class="btn btn-primary" style="float: right">
                                        <i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Gửi nhận xét
                                    </button>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label"><b>2. Tiêu đề nhận xét:</b></label>
                                    <input type="text" class="form-control" maxlength="100"
                                           placeholder="(Không bắt buộc)"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-form-label"><b>3. Nội dung nhận xét:</b></label>
                                    <textarea class="form-control" rows="5"
                                              placeholder="(Không bắt buộc)"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section id="comment-block">
                <header class="block-title">Khách hàng nhận xét</header>
                <div class="block-info">
                    <div class="row">
                        <div class="comment-info col-2">
                            <label class="comment-rating">5&nbsp;<i class="fas fa-star"></i></label><br/>
                            <label class="comment-author">Nguyễn Văn A</label><br/>
                            <label>12/04/2020</label>
                        </div>
                        <div class="comment-detail col-10">
                            <header class="comment-title">Cực Kì Hài Lòng</header>
                            <p>Laptop Lenovo Legion Y540-15IRH 81SY0037VN Core i5-9300H/ GTX 1650 4GB/ Dos (15.6 FHD
                                IPS) là một cổ máy chơi game đáp ứng được cả hai nhu cầu của người dùng: Thời thượng
                                trong công việc và mạnh mẽ để chơi game. Lenovo Y540 có một thiết kế gọn gàng với khung
                                nhôm chắc chắn, vỏ ngoài màu xám sắt lạnh lùng và hệ thống chiếu sáng xung quanh lên đến
                                16 triệu màu của công nghệ CorSair ICUE, đã tạo ra một chiếc laptop gaming thách thức
                                mọi giới hạn và kì vọng của game thủ.</p>
                            <a href="#reply-1" data-toggle="collapse">Gửi trả lời</a>
                            <div id="reply-1" class="collapse">
                                <textarea class="reply-input" rows="5" maxlength="500"
                                          placeholder="Gửi trả lời của bạn (tối đa 500 từ)"></textarea>
                                <button class="btn btn-info reply-submit" style="float: right">
                                    <i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Gửi trả lời của bạn
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="row">
                        <div class="comment-info col-2">
                            <label class="comment-rating">4&nbsp;<i class="fas fa-star"></i></label><br/>
                            <label class="comment-author">Nguyễn Văn B</label><br/>
                            <label>11/04/2020</label>
                        </div>
                        <div class="comment-detail col-10">
                            <header class="comment-title">Máy tốt</header>
                            <p>Máy dùng được 4 năm vẫn chạy tốt.</p>
                            <a href="#reply-2" data-toggle="collapse">Gửi trả lời</a>
                            <div id="reply-2" class="collapse">
                                <textarea class="reply-input" rows="5" maxlength="500"
                                          placeholder="Gửi trả lời của bạn (tối đa 500 từ)"></textarea>
                                <button class="btn btn-info reply-submit" style="float: right">
                                    <i class="fa fa-paper-plane"></i>&nbsp;&nbsp;Gửi trả lời của bạn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </body>
</html>