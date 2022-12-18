const express = require("express");
const router = express.Router();
const db = require("../models/database");
const modelUser = require("../models/users");
const bcrypt = require("bcrypt");
const formidable = require('formidable');
const multer = require('multer');
const fsExtra = require('fs-extra');


router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", function (req, res) {
  res.render("login");
});
router.post("/luu", function (req, res) {
  let user = req.body.username;
  let pass = req.body.password;
  let repass = req.body.repassword;
  let em = req.body.email;
  let name = req.body.name;

  if (pass != repass) {
    res.json({ thongbao: "Mật khẩu nhập lại sai" });
  } else {
    let salt = bcrypt.genSaltSync(10);
    let pass_mahoa = bcrypt.hashSync(pass, salt);
    let user_info = {
      name: name,
      username: user,
      password: pass_mahoa,
      email: em,
    };
    console.log(user_info);
    modelUser.create(user_info, function (err, data) {
      if (err) throw err;
      res.redirect('login')
    });
  }
});

router.post("/login/submit", async function (req, res) {
  let u = req.body.username;
  let p = req.body.password;
  console.log(u);
  modelUser.read(u, function (rows) {
    if (rows.length <= 0) {
      res.redirect("/thanhvien/dangnhap");
      return;
    }

    let user = rows[0];
    console.log("user = ", user);
    let pass_fromdb = user.password;
    let kq = bcrypt.compareSync(p, pass_fromdb);

    if (kq) {
      console.log("OK");
      var sess = req.session; //initialize session variable
      sess.daDangNhap = true;
      sess.username = user.username;
      sess.avata = user.avata;
      //res.redirect("/thanhvien/thanhcong");
      if (sess.back) {
        console.log(sess.back);
        res.redirect(sess.back);
      } else {
        res.redirect("/profile/");
      }
    } else {
      console.log("Not OK");
      res.redirect("/login");
    }
  });
});

router.post("/login/foget", async function (req, res) {
  const email = req.body.email;

  console.log(email);
  modelUser.searchEmail(email, function (rows) {
    if (rows.length <= 0) {
      res.redirect("/fogetpass");
      return;
    }

    let user = rows[0];
    let us = user.username;
    console.log("user = ", user);
    console.log(us);

    const code = Math.random().toString(36).substring(7);
    console.log("random", code);

    let addCode = {
      code: code
    }
    modelUser.update(us, addCode, function (err) {
      if (err) throw err;
      var nodemailer = require('nodemailer');
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'huydeptrai19062002@gmail.com', pass: 'nzvbcrwdlrrkeixa' },
        tls: { rejectUnauthorized: false }
      });
      var mailOptions = {
        from: 'g5ghoes@gmail.com',
        to: email,
        subject: 'Đổi mật Khẩu',
        //text: 'Nội dung thư, không có code html'
        html: `Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Mã code của bạn là: ${code}. Hãy truy cập vào link này để đổi mật khẩu: http://localhost:3000/fogetpassnew`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log('Đã gửi mail: ' + info.response);
      });
      res.redirect('/login');

    })

  });
});
router.post("/fogetpassnew", async function (req, res) {
  const code = req.body.code;
  const pass = req.body.password;
  const repass = req.body.repassword;
  modelUser.searchcode(code, function (rows) {
    if (rows.length <= 0) {
      var sess = req.session; //initialize session variable
      sess.error1 = "Mã code không đúng";
      res.redirect("/fogetpassnew");
      return;
    }
    const user = rows[0];
    const un = user.username
    if (pass !== repass) {
      var sess = req.session; //initialize session variable
      sess.error2 = "Mật khẩu nhập lại không đúng";
      res.redirect('/fogetpassnew')
    } else {
      let salt = bcrypt.genSaltSync(10);
      let pass_mahoa = bcrypt.hashSync(pass, salt);
      update = {
        password: pass_mahoa
      }
      modelUser.update(un, update, function (err) {
        if (err) throw err;
      })
      console.log('thành công');
      res.redirect("/login");
    }
  })

})

router.post("/capnhap", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const diachi = req.body.address;
  const phone = req.body.phone;
  const us = req.session.username;

  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fieds, files) {
    const pathFile = files.avata.filepath;
    const tenFile = files.avata.originalFilename;

    let destPath = __dirname + '\\public\\images\\' + tenFile;

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) throw err;
      fs.unlink(pathFile, () => { console.log('Đã xóa file tạm'); });
      console.log('Đã upload xong file ' + tenFile);
    });
    console.log('ten file = ', tenFile);

    let user_capnhap = {
      name: name,
      address: diachi,
      phone: phone,
      email: email,
      avata: tenFile
    };

    modelUser.update(us, user_capnhap, function (err, data) {
      if (err) throw err;
      res.redirect('/profile');
    });
  })
  let user_capnhap = {
    name: name,
    address: diachi,
    phone: phone,
    email: email,
  };

  modelUser.update(us, user_capnhap, function (err, data) {
    if (err) throw err;
    res.redirect('/profile');
  });
}
);




router.post("/repass", async function (req, res) {
  const pass = req.body.password;
  const repass = req.body.repassword;
  const us = req.session.username;
  console.log(pass, repass);


  if (repass !== pass) {
    console.log('nhập lại sai');
    var sess = req.session; //initialize session variable
    sess.err = true;
    sess.errpass = "Mật khẩu Nhập lại không đúng";
  } else {
    let salt = bcrypt.genSaltSync(10);
    let pass_mahoa = bcrypt.hashSync(pass, salt);
    update = {
      password: pass_mahoa
    }
    modelUser.update(us, update, function (err) {
      if (err) throw err;
    })
    console.log('thành công');
    res.redirect("/thoat");
  }


});
router.get("/profile/", function (req, res) {
  if (req.session.daDangNhap) {
    let id = req.session.username;
    modelUser.read(id, function (listID) {
      res.json(listID);
    })

  } else {
    req.session.back = "/profile"; //req.originalUrl
    res.redirect("/login");
  }
});
router.get("/thoat", function (req, res) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
