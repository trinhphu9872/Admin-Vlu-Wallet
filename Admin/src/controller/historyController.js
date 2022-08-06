const db = require('../../firebase/firebase')
class historyController{
    // getListHistory(req, res){
    //     let {mssv,id} = req.params;
    //     console.log(id);
        
     
    //     return res.render('history.ejs', { dataUser: data})
    //     // return res.redirect(`/user/student/history/${mssv}`, {dataUser: data});
    //     // })
    // }
    //----------------------------------------------------------------
    getDetailHistory(req, res){
        let id = req.params.id
        console.log(id);
        const data = [];
        
        db.ref("LichSuGiaoDich").once("value").then(function (snapshot) {
            let data = [];
            snapshot.forEach(function (childSnapshot) {     
                var childkey = childSnapshot.val();
                childSnapshot.forEach(function (childData) {          
                  childData.forEach(function (childDb) {        
                  var child = childDb.val();
                  if(id === childDb.key){  
                    data.push({
                        id: childDb.key,
                        tenGD: child.tenGD,
                        email: child.email,
                        soDu: child.soDu,
                        phiGD: child.phiGD,
                        thoiGianGD: child.thoiGianGD,
                        noiDung: child.noiDung,
                        tenSV: child.tenSV
                  });
                }
                }) 
            
            })
        })   
            return res.render('detailHistory.ejs', { HistoryData: data})
        })
    }

}

module.exports =  new historyController();