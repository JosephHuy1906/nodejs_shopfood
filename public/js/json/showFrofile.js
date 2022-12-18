listPro4();
function listPro4() {
  fetch("http://localhost:3000/apiuser/profile")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let str = `
        <div class="bang">
        <h3>Thông tin tài khoản</h3>
        <div class="profile">
          <div class="trai">
            <img src="/images/${data[0].avata}" alt="" />
            <div class="traiFr">
              <p><b>${data[0].name}</b></p>
              <p><i class="far fa-edit"></i> Sửa thông tin</p>
            </div>
          </div>
          <div class="phai">
            <h3>Hồ sơ của tôi</h3>
      
            <form action="/apiuser/capnhap/" method="POST"  enctype="multipart/form-data">
            <div class="formsubmit">

              <div class="trai">
                <p>Họ tên: </p>
                <p>Email:</p>
                <p>Điện Thoại:</p>
                <p>Địa chỉ:</p>
                <p>Ảnh đại diện:</p>
              </div>

              <div class="phai">
                <input type="text" name="name" value="${data[0].name}"/>
                <input type="text" name="email" value="${data[0].email}"/>
                <input type="text" name="phone" value="${data[0].phone}"/>
                <input type="text" name="address" value="${data[0].address}"/>
                <input type="file" name="avata" id="avata" class="formFile" value="${data[0].avata}"/>
              </div>

            </div>
              <div class="updateUser">
                <button type="submit">Cập nhập</button>
                <a href="/apiuser/repass">Đổi mật khẩu</a>
              </div>
          </form>
          </div>
         
        </div>
      </div>
        `;
        document.querySelector(".container").innerHTML = str;
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