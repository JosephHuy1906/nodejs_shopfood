fetch("http://localhost:3000/apicategory")
  .then(function (res) {
    console.log(res); //xem thử trong console của trình duyệt nhé
    if (!res.ok) {
      throw new Error("Lỗi = " + res.status);
    }
    return res.json();
  })
  .then(function (data) {
    data.forEach((el) => {
      const pro = ` <li><a href="/product/cat/${el.iddanhmuc}"> ${el.tendanhmuc} </a></li>`;
      document.querySelector(".menuTraiCay").innerHTML += pro;
    });
  })
  .catch(function (error) {
    console.log("Lỗi: ", error);
  });


