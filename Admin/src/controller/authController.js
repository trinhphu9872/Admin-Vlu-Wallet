const db = require("../../firebase/firebase");
const MD5 = require("md5");

class authController {
  login(req, res) {
    res.render("login");
  }

  postlogin(req, res) {
    let { email, password } = req.body;
    let data = [];
    
    db.ref("Admin")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key === "AdminAuth") {
            data.push({
              matKhau: MD5(childData.matKhau),
              soDu: childData.soDu,
              taiKhoan: MD5(childData.taiKhoan),
            });
            let { matKhau, soDu, taiKhoan } = data[0];
        
            if (MD5(email) === taiKhoan && MD5(password) === matKhau ) {
              res.cookie("admin",MD5(email))
              //var sess = req.session; //initialize session variable
                // sess.status = true;
                // sess.profile = "Admin";
                // sess.taiKhoan = MD5(taiKhoan);
                // sess.passCode = MD5(matKhau);
              res.redirect("/overview");
            }else{
              res.redirect("/");
            }
          }
        });
      });
  }


  postLogout(req, res) {
    let { email, password } = req.body;
    let data = [];

    db.ref("Admin")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key === "AdminAuth") {
            data.push({
              matKhau: MD5(childData.matKhau),
              soDu: childData.soDu,
              taiKhoan: MD5(childData.taiKhoan),
            });
            let { matKhau, soDu, taiKhoan } = data[0];
              res.clearCookie("admin", taiKhoan)
              res.redirect("/");
          }
          console.log("cookie clear")
        });
      });  
  }
  
}

module.exports = new authController();
