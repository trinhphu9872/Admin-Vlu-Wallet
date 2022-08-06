const db = require('../../firebase/firebase')

 class homeController {
   //----------------------------- hàm lấy user -------------------------
   getListUser(req, res) {
     const data = [];
     db.ref("users")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           data.push({
             id: childSnapshot.key,
             email: childData.email,
             gioiTinh: childData.gioiTinh,
             tenSV: childData.tenSV,
             mssv: childData.mssv,
             soDu: childData.soDu,
             password: childData.password,
             emailVerified: childData.emailVerified,
           });
         });
         return res.render("listuser.ejs", { dataUser: data });
       });
   }
   //-------------------------------hàm lấy chi tiết user --------------------
   getDetail(req, res) {
     let mssv = req.params.mssv;
     const data = [];
     db.ref("users")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           if (mssv == childData.mssv) {
             data.push({
               id: childSnapshot.key,
               email: childData.email,
               gioiTinh: childData.gioiTinh,
               tenSV: childData.tenSV,
               mssv: childData.mssv,
               soDu: childData.soDu,
               password: childData.password,
               emailVerified: childData.emailVerified,
             });
           }
         });
         return res.render("naptien.ejs", { User: data });
       });
   }
   //----------------------------------Nap tiền -----------------------------------------
   naptienUser(req, res) {
     console.log("check req", req.body);
     let { money, soDu, mssv, email } = req.body;
     var today = new Date();
     var hours = String(today.getHours()).padStart(2, "0");
     var minute = String(today.getMinutes()).padStart(2, "0");
     var dd = String(today.getDate()).padStart(2, "0");
     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
     var yyyy = today.getFullYear();
     today = dd + "/" + mm + "/" + yyyy;
     let getDateNow = hours + ":" + minute + " - " + today;
     db.ref("users")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           let sotiennap = Number(money);
           let sodu = Number(soDu);
           let sodumoi = sotiennap + sodu;
           console.log(getDateNow);
           if (mssv == childData.mssv) {
             db.ref(`/users/${childSnapshot.key}`).update({
               soDu: sodumoi,
             });
             db.ref(`/LichSuGiaoDich/${childSnapshot.key}/NapTien`).push().set({
               tenGD: "Nạp Tiền",
               soDu: sodumoi,
               email: email,
               phiGD: sotiennap,
               thoiGianGD: getDateNow,
               noiDung: "Nạp tiền",
             });
           }
         });
         return res.redirect(`/user/student/${mssv}`);
       });
   }
   //----------------------------oke-----------------------------------------------
   // _getToday(){
   //     var today = new Date();
   //     var hours = String(today.getHours()).padStart(2, '0');
   //     var minute = String(today.getMinutes()).padStart(2, '0');
   //     var dd = String(today.getDate()).padStart(2, '0');
   //     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   //     var yyyy = today.getFullYear();
   //     today = dd + '/' + mm + '/' + yyyy
   //     return hours+':'+minute+ ' - ' +today;
   //   }
   //----------------------------------Danh sách sinh viên  -----------------------------------------
   getListStudent(req, res) {
     const data = [];
     db.ref("users")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           data.push({
             id: childSnapshot.key,
             email: childData.email,
             gioiTinh: childData.gioiTinh,
             tenSV: childData.tenSV,
             mssv: childData.mssv,
             soDu: childData.soDu,
             password: childData.password,
             emailVerified: childData.emailVerified,
           });
         });
         return res.render("studentlist.ejs", { dataUser: data });
       });
   }
   //----------------------------------Chi tiết sinh viên-----------------------------------------
   getDetailStudent(req, res) {
     let mssv = req.params.mssv;
     const data = [];
     db.ref("users")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           if (mssv == childData.mssv) {
             data.push({
               id: childSnapshot.key,
               email: childData.email,
               gioiTinh: childData.gioiTinh,
               tenSV: childData.tenSV,
               mssv: childData.mssv,
               soDu: childData.soDu,
               password: childData.password,
               emailVerified: childData.emailVerified,
             });
           }
         });
         return res.render("detailStudent.ejs", { dataUser: data });
       });
   }
   //----------------------------------Lich su giao dich-----------------------------------------
   getHistoryStudent(req, res) {
     let id = req.params.id;
     let { mssv } = req.body;
     let { tenGD, soDu, phiGD, email, thoiGianGD, noiDung, tenSV } = req.body;
     const data = [];
     let dataUser = [];
     const hisdata = [];
     let keyParam =  ['NapTien', 'rutTien', 'nhanTien', 'chuyenTien']
     db.ref("LichSuGiaoDich")
       .once("value")
       .then(function (snapshot) {
         snapshot.forEach(function (childSnapshot) {
           var childData = childSnapshot.val();
           if (id === childSnapshot.key) {     
            keyParam.forEach((item) => {
                db.ref(`LichSuGiaoDich/${id}/${item}`)
                .once("value")
                .then((childNapTien) => {
                    let dataJson = childNapTien.val();
                    for (let x in dataJson) {
                     
                        data.push(dataJson[x])
                     }
                 
                     data.forEach((item) => {
                        // console.log(item);
                        dataUser.push({
                            tenGD: item.tenGD,
                            soDu: item.soDu,
                            phiGD: item.phiGD,
                            email: item.email,
                            thoiGianGD: item.thoiGianGD,
                            noiDung: item.noiDung,
                            tenSV: item.tenSV,
                        });
                     })
                     console.log(dataUser);
                     return res.render("history.ejs", { dataUser: dataUser });
                })
            })
             }
         });
  
       });
   }
 }


//[Exports]---------------------------------------------------------------------------
module.exports=  new homeController();


