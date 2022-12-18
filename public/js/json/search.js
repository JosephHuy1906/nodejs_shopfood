showproduct();
function showproduct() {
    fetch("http://localhost:3000/apiproduct/search")
      .then(function (res) {
        console.log(res); //xem thử trong console của trình duyệt nhé
        if (!res.ok) {
          throw new Error("Lỗi = " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        data.forEach((el) => {
          const pro = `
            <div class="traicay1">
            <a href="/product/detail/${el.id}">
              <img src="/images/${el.hinh}" alt="" />
              <h4>${el.tensp}</h4>
              <p>${el.gia}</p>
              </a>
              <div class="thongtinqua">
                <p>Xuất xứ: <b>${el.xuatxu}</b></p>
                <p>Quy cách đóng gói: <b>${el.quycach}</b></p>
                <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')">
                  <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          `;
          document.querySelector(".sanphamtraicay").innerHTML += pro;
        });
      })
      .catch(function (error) {
        console.log("Lỗi: ", error);
      });
  }