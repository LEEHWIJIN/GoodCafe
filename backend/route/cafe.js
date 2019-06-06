const Router = require('express')
const router = Router()
const mysql = require('../db/database_config.js')
var conn = mysql()

router.get('/getCafeMenu', function(req, res){
    var sql = 'SELECT menuName menu, avg(starScore) avgStar FROM cafe join menu join starScore WHERE cafeID = cafeIndex and menuID = menuIndex and cafeName = ? group by menuName'
    var params = [req.query.cafe]
    console.log(req.query.cafe)
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else {
            return res.json(rows)
        }
    })
})

router.get('/getSelectMenu', function(req, res){
    var sql = 'SELECT starScore FROM cafe join menu join starScore WHERE cafeID = cafeIndex and menuID = menuIndex and cafeName = ? and menuName =?'
    var params = [req.query.cafe, req.query.menu]
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else {
            var five=0, four=0, three=0, two=0, one =0
            for(var i = 0; i<rows.length;i++){
                if(rows[i].starScore == 5) five++
                else if(rows[i].starScore == 4) four++
                else if(rows[i].starScore==3) three++
                else if(rows[i].starScore==2) two++
                else if(rows[i].starScore==1) one++
            }
            var data = {
                five : five,
                four : four,
                three : three,
                two : two,
                one : one
            }
            console.log(data)
            return res.json(data)
        }
    })
})

router.post('/ratingCafe', function(req, res){
    Promise.resolve()
        .then(first)
        .then(second)
        .catch(function (err) {
            console.log('Error', err)
            process.exit()
        })
    function first() {
        return new Promise(function (resolve,reject) {
            var sql1 = 'select menuID FROM cafe join menu WHERE cafeID =  cafeIndex and cafeName = ? and menuName = ?'
            var params1 = [req.body.data.cafe, req.body.data.menu]
            conn.init().query(sql1, params1, function (err,rows) {
                if(err) console.log(err)
                else{
                    resolve(rows[0].menuID)
                }
            })
        })
    }
    function second(data) {
        return new Promise(function (resolve, reject) {
            var sql2 = 'INSERT INTO starScore (starScore, menuIndex) values (?,?)'
            var params2 = [req.body.data.rating, data]
            conn.init().query(sql2, params2, function (err, rows) {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    res.send('0')
                }
            })
        })
    }
})

router.get('/getCafe', function(req, res){
    var sql = 'SELECT * FROM cafe'
    var params = [req.query.cafe]
    conn.init().query(sql,params,function(err, rows){
        if(err) console.log(err)
        else {
           res.json(rows)
        }
    })
})

router.get('/recommendationCafe', function(req, res){
    var sql = 'SELECT cafeName, round(avg(menuPrice)) avg FROM cafe join menu WHERE cafeID = cafeIndex '
    var params = []
    if(req.query.menu != 0){
        sql += 'and menuCategory = ? '
        params.push(req.query.menu)
    }
    if(req.query.reason != 0){
        sql += 'and cafeCategory = ? '
        params.push(req.query.reason)
    }
    if(req.query.distance != 0){
        sql += 'and locationNum = ? '
        params.push(req.query.distance)
    }
    sql += 'GROUP BY cafeName'
            conn.init().query(sql,params,function(err, rows){
                if(err) console.log(err)
                else {
                    var data = []
                    for(var i = 0; i<rows.length; i++){
                        if(req.query.cost==0){
                                data.push(rows[i].cafeName)
                        }
                        else {
                            if (rows[i].avg == req.query.cost) {
                                data.push(rows[i].cafeName)
                            }
                        }
                    }
                    res.json(data)
                }
            })
    })


module.exports = router