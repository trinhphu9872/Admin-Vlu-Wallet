// setup database
const db = require("../../firebase/firebase");
// app route
const userRoute = require("./user");
const partnerRoute = require("./partner");
const historyRoute = require("./history");
const authRoute = require("./auth");
const Authorize = require("../middlewares/auth.middeware");

const initWebRoute = (app) => {
  // app.get('/login', function (req, res) {
  //     res.render('login')
  // })
  app.use("/", authRoute);
  app.use("/user", Authorize.getAuthorize, userRoute);
  app.use("/partner", Authorize.getAuthorize, partnerRoute);
  app.use("/history", Authorize.getAuthorize, historyRoute);

  app.get("/overview", Authorize.getAuthorize, async function (req, res) {
    let countUser = 0;
    let countCabolator = 0;

    const dataCalbo = [];

    const dataUser = [];
    await db
      .ref("DoiTac")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          dataCalbo.push({
            id: childSnapshot.key,
            email: childData.email,
            ngayTao: childData.ngayTao,
            ngayCapNhat: childData.ngayCapNhat,
            username: childData.username,
            soDu: childData.soDu,
            password: childData.password,
            emailVerified: childData.emailVerified,
          });
          countCabolator = dataCalbo.length.toString();
        });
      });

    await db
      .ref("users")
      .once("value")
      .then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          dataUser.push({
            id: childSnapshot.key,
            email: childData.email,
            gioiTinh: childData.gioiTinh,
            tenSV: childData.tenSV,
            mssv: childData.mssv,
            soDu: childData.soDu,
            password: childData.password,
            emailVerified: childData.emailVerified,
          });
          countUser = dataUser.length.toString();
        });
      });
    res.render("overview", {
      countUser: countUser,
      countCabolator: countCabolator,
    });
  });
  //page 404
  app.get("*", (req, res) => {
    res.render("page404", {
      title: "404",
      name: "page404",
      errorMessage: "Page not found",
    });
    app.get("/redirect", (req, res) => {
      res.require("back");
    });
  });
};

export default initWebRoute;
