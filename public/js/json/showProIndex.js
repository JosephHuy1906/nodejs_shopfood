listPro4();
listProNew4();
listProView4();
function listPro4() {
  fetch("http://localhost:3000/apiproduct/hot")
    .then( res => res.json() )
    .then((data) => {
      data.forEach((el) => {
        let str = `
        <div class="sanphamitem">
        <a href="/product/detail/${el.id}">
          <div class="imgItem">
            <p>Hot</p>
            <img src="/images/${el.hinh}" alt="" />
          </div>
            <h3>${el.tensp}</h3>
            <p>${el.gia}đ</p>
            </a>
            <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')" >Thêm vào giỏ</button>
          </div>
      `;
        document.querySelector(".sphot").innerHTML += str;
      });
    });
}

function listProNew4() {
  fetch("http://localhost:3000/apiproduct/new/")
    .then(res => res.json())
    .then((data) => {
      data.forEach((el) => {
        let str = `
        <div class="sanphamitem">
        <a href="/product/detail/${el.id}">
          <div class="imgItem">
            <p>New</p>
            <img src="/images/${el.hinh}" alt="" />
          </div>
            <h3>${el.tensp}</h3>
            <p>${el.gia}đ</p>
            </a>
            <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')" >Thêm vào giỏ</button>
          </div>
      `;
        document.querySelector(".spnew").innerHTML += str;
      });
    });
}
function listProView4() {
  fetch("http://localhost:3000/apiproduct/view/")
    .then(res => res.json())
    .then((data) => {
      data.forEach((el) => {
        let str = `
        <div class="sanphamitem">
        <a href="/product/detail/${el.id}">
          <div class="imgItem">
            <p><i class="fas fa-eye"></i> ${el.view}</p>
            <img src="/images/${el.hinh}" alt="" />
          </div>
            <h3>${el.tensp}</h3>
            <p>${el.gia}đ</p>
            </a>
            <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')" >Thêm vào giỏ</button>
          </div>
      `;
        document.querySelector(".spview").innerHTML += str;
      });
    });
}

function showproduct() {
  fetch("http://localhost:3000/apiproduct")
    .then(function (res) {
      console.log(res); //xem thử trong console của trình duyệt nhé
      if (!res.ok) {
        throw new Error("Lỗi = " + res.status);
      }
      return res.json();
    })
    .then(function (data) {
      data.forEach((el) => {
        const pro = `<a href="/product/detail/${el.id}">
          <div class="traicay1">
            <img src="/images/${el.hinh}" alt="" />
            <h4>${el.tensp}</h4>
            <p>${el.gia}</p>
            <div class="thongtinqua">
              <p>Xuất xứ: <b>${el.xuatxu}</b></p>
              <p>Quy cách đóng gói: <b>${el.quycach}</b></p>
              <button onclick="addCart(${el.id}, '${el.tensp}', ${el.gia}, '${el.hinh}')" >
                <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </a>`;
        document.querySelector(".sanphamtraicay").innerHTML += pro;
      });
    })
    .catch(function (error) {
      console.log("Lỗi: ", error);
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
      cart.push({ id: id, name: tensp, price: gia, image: hinh, quatity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
