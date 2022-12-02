var cart = JSON.parse(localStorage.getItem("cart"));

function showCart() {
  if (cart) {
    console.log(cart);
    cart.forEach((sp, index) => {
      document.querySelector("#tblCart").innerHTML += `
            
                    <tr>
                        <td >
                            <a href="#"><img src="/images/${
                              sp.image
                            }" alt="#" /></a>                           
                        </td>
                        <td> 
                            <h5><a href="product/detail/${sp.id}" >${sp.name}</a></h5>
                        </td>
                        <td>
                            <div class="custom-cart gia">${sp.price} vnđ</div>
                        </td>
                        <td >
                            <div class="cart-plus-minus">
                                <input type="number" value="${ sp.quatity}" onkeyup="tinhtien(${sp.price}, this.value, ${index})" name="qtybutton" class="cart-plus-minus-box">
                            </div>
                        </td>
                        <td class=" tien">
                            ${sp.quatity * sp.price} vnđ
                        </td>
                        <td class=" remove">
                            <button type="submit" onclick="removeItemCard(${index})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
            `;
    });
  }
}

function tinhtien(gia, soluong, i) {
  tien = gia * soluong;
  document.getElementsByClassName("tien")[i].innerHTML = tien += " vnđ";
  tinhtongtien();
}
function tinhtongtien() {
  arrTien = document.getElementsByClassName("tien");
  tongTien = 0;
  for (let t of arrTien) {
    tongTien += parseInt(t.innerHTML);
  }
  document.getElementById("tongtien").innerHTML = tongTien += " vnđ";
  document.getElementById("tamtinh").innerHTML = tongTien;
}
function removeItemCard(id) {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (confirm("Bạn có muốn xoá sản phẩm này không") == true) {
    cart.splice(id, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  location.reload();
}

document.querySelector(".demSP").innerHTML = cart.length;
showCart();
