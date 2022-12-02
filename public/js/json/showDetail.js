listPro4();
function listPro4() {
  fetch("http://localhost:3000/apiproduct/hot")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        let str = `
        <a href="/product/detail/${el.id}">
          <div class="sanphamitem">
            <div class="imgItem">
              <p>Hot</p>
              <img src="/images/${el.hinh}" alt="" />
            </div>
              <h3>${el.tensp}</h3>
              <p>${el.gia}đ</p>
              <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')">Thêm vào giỏ</button>
            </div>
        </a>
        `;
        document.querySelector(".sphot").innerHTML += str;
      });
    });
}

function addCart(id, tensp, gia, hinh) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
    cart.push({ id: id, name: tensp, price: gia, image: hinh, quatity: 1 });
  } else {
    let item = cart.find((item) => item.id === id);
    if (item) item.quatity++;
    else
      cart.push({id: id, name: tensp, price: gia, image: hinh, quatity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}