const db = require("../../firebase/firebase");
const md5 = require("md5");
module.exports.getAuthorize = (req,res,next) => {
  // check
  if (!req.cookies.admin) {
     res.redirect("/");
     return;
  }

 
    let data = [];
    db.ref("Admin")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (childSnapshot.key === "AdminAuth") {
            data.push({
              matKhau: md5(childData.matKhau),
              soDu: childData.soDu,
              taiKhoan: md5(childData.taiKhoan),
            });
           
            if(req.cookies.admin !== data[0].taiKhoan){
              res.redirect("/");
             return;
            }
            next();
            
          }
        });
      });
};
