const db = require("../../firebase/firebase");
class partnerController {
  getListPartner(req, res) {
    const data = [];
    db.ref("DoiTac")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          data.push({
            id: childSnapshot.key,
            email: childData.email,
            ngayTao: childData.ngayTao,
            ngayCapNhat: childData.ngayCapNhat,
            username: childData.username,
            soDu: childData.soDu,
            password: childData.password,
            emailVerified: childData.emailVerified,
          });
        });
        return res.render("qltkdoitac.ejs", { dataUser: data });
      });
  }
  //---------------------------------------------------------------------------
  getDetailPartner(req, res) {
    let id = req.params.id;
    const data = [];
    db.ref("DoiTac")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (id === childSnapshot.key) {
            data.push({
              id: childSnapshot.key,
              email: childData.email,
              ngayTao: childData.ngayTao,
              ngayCapNhat: childData.ngayCapNhat,
              username: childData.username,
              soDu: childData.soDu,
              emailVerified: childData.emailVerified,
            });
          }
        });

        return res.render("detailPartner.ejs", { PartnerData: data });
      });
  }
  //---------------------------------------------------------------------------
  getCreatePartner(req, res) {
    return res.render("createPartner.ejs");
  }
  //---------------------------------------------------------------------------
  postCreatePartner(req, res) {
    let { username, password, email, ngayCapNhat, diaChi } = req.body;
    let CreateTime = new Date();
    let ngayTao =
      CreateTime.getDate() +
      "/" +
      CreateTime.getMonth() +
      "/" +
      CreateTime.getFullYear();
    db.ref(`DoiTac`).push().set({
      username: username,
      password: password,
      email: email,
      soDu: 0,
      ngayTao: ngayTao,
    });
    return res.redirect("/partner/qltkdoitac");
  }
  
  //---------------------------------------------------------------------------
  postRemovePartner(req, res) {
    let id = req.body.id;
      db.ref("DoiTac")
        .once("value")
        .then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            if (id === childSnapshot.key) {
                console.log("Success Del");
                db.ref(`/DoiTac/${childSnapshot.key}`).remove();

            }
          });
        });
    
    return setTimeout(()=> { 
        res.redirect("/partner/qltkdoitac");
    },1000);
  }
  //---------------------------------------------------------------------------
  getRemovePartner(req, res) {
    let id = req.params.id;
    console.log(id);
    const data = [];
    db.ref("DoiTac")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          if (id === childSnapshot.key) {
            data.push({
              id: childSnapshot.key,
              email: childData.email,
              ngayTao: childData.ngayTao,
              username: childData.username,
              soDu: childData.soDu,
              emailVerified: childData.emailVerified,
            });
          }
        });

        return res.render("removePartner.ejs", { dataUser: data });
      });
  }

  //---------------------------------------------------------------------------
}

//---------------------------------------------------------------------------
module.exports = new partnerController();
