



const sql = require("mysql");


const errorLogger = async(data,error_msg,) =>{
    await con.query(`INSERT INTO error_logs(ERR_DATA,ERR_MSG,ERR_DATE) VALUES('${JSON.stringify(data)}','${error_msg}',sysdate())`)
}






var con = new sql.createConnection({
    host : "localhost",
    user : "root",
    password : "emreukbe55",
    database : "WebSite"
})

con.connect();


// get all users in table 
const getAllUsers = (req,res) =>{
    con.query("Select * from Users",(err,resp)=>{
        if(err) throw err;
        let jsonData = JSON.stringify(resp);
        let puredata = JSON.parse(jsonData);
        res.send(puredata)
    })
}


// check user , if not exist add user
const safeUserAdd = async (req,res)=>{
    const {pseudo,pasw,gsm,email,gender} = req.body;
    let id = '0'
    // Get last id from users table 
    await con.query("select max(id) as id from users;",(err,resp)=>{
        if(err) throw err
        id = resp[0].id + 1
    })

    await con.query(`Select * from users where gsm = ${gsm}`,(err,resp)=>{
        if(err) throw err
        if(resp.length>0){
            res.send(JSON.stringify({CreatedSuccessfully : false}))
        }
        else{
            con.query(`insert into users(id,pseudo,pasw,gsm,CT,email,gender) values(${id},'${pseudo}','${pasw}','${gsm}',NOW(),'${email}','${gender}')`,(err)=>{
                if(err) throw err
                res.send(JSON.stringify({CreatedSuccessfully : true}))
            })
        }
    })



}


// Check User if exist

const toLogin = async (req,res) =>{
    const {email,pasw} = await req.body;

    await con.query(`select * from users where email = '${email}' and pasw = '${pasw}'`,(err,resp)=>{
        if(err) throw err
        if(resp.length>0) res.send({isLogin : true})
        else{
            res.send({isLogin:false})
        }
    })
}

const getUserDataByEmail = async (req,res)=>{
    const {email} = await req.body;

    await con.query(`select * from users where email = '${email}'`,(err,resp)=>{
        if(err) throw err
        res.send(resp)
    })
}

const changePseudo = async(req,res) =>{
    const {pseudo,id} = req.body

    await con.query(`update users set pseudo = '${pseudo}' where id = '${id}'`,(err,resp)=>{
        if(err) throw err
        res.send(JSON.stringify({Updated : true}))
    })
}
const changeEmail = async(req,res) =>{
    const {email,id} = req.body

    await con.query(`update users set email = '${email}' where id = '${id}'`,(err,resp)=>{
        if(err) throw err
        res.send(JSON.stringify({Updated : true}))
    })
}
const changeGsm = async(req,res) =>{
    const {gsm,id} = req.body

    await con.query(`update users set gsm = '${gsm}' where id = '${id}'`,(err,resp)=>{
        if(err) throw err
        res.send(JSON.stringify({Updated : true}))
    })
}

const addHobbies = async(req,res) =>{
    const {id,hobbies} = req.body

    con.query(`select * from spesificInfo where id = ${id}`,(err,resp)=>{
        if(err) throw err
        if(resp.length>0){
            con.query(`update spesificInfo set hobbies = '${hobbies}' where id = ${id}`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Updated : true}))
                }
            })
        }
        else if(resp.length <=0){
            con.query(`insert into spesificInfo(id,hobbies) values(${id},'${hobbies}')`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Saved : true}))
                }
            })
        }
    })
}
const addEducation = async(req,res) =>{
    const {id,education} = req.body

    con.query(`select * from spesificInfo where id = ${id}`,(err,resp)=>{
        if(err) throw err
        if(resp.length>0){
            con.query(`update spesificInfo set education = '${education}' where id = ${id}`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Updated : true}))
                }
            })
        }
        else if(resp.length <=0){
            con.query(`insert into spesificInfo(id,education) values(${id},'${education}')`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Saved : true}))
                }
            })
        }
    })
}

const addGoal = async(req,res) =>{
    const {id,goal} = req.body

    con.query(`select * from spesificInfo where id = ${id}`,(err,resp)=>{
        if(err) throw err
        if(resp.length>0){
            con.query(`update spesificInfo set goal = '${goal}' where id = ${id}`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Updated : true}))
                }
            })
        }
        else if(resp.length <=0){
            con.query(`insert into spesificInfo(id,goal) values(${id},'${goal}')`,(err,resp)=>{
                if(err) throw err
                else{
                    res.send(JSON.stringify({Saved : true}))
                }
            })
        }
    })
}

const getAllSpesifics = async(req,res)=>{

    const {id} = req.body

    con.query(`select * from spesificInfo where id = ${id}`,(err,resp)=>{
        if(err) throw err
        res.send(resp)
    })
}


const createSpecificUserCart = async(req,res)=>{

    const {id,propertyId,propertyIdentity,propertyPrice} = await req.body

    
    const encodedPropertyId = btoa(propertyId);
    const encodedPropertyIdentity = btoa(propertyIdentity);
    const encodedPropertyPrice = btoa(propertyPrice)
    const tableName = `cart${id}`

    //wait for (maximumId + 1)
    let tempId = await new Promise((resolve,reject)=>{
        con.query(`select max(id) as id from ${tableName}`,(err,resp)=>{
            if(err) reject(err)
            else if(resp.length < 0){
                resolve(0)
            }
            else{
                resolve(resp[0].id + 1)
            }
        })
    })

    let state = await new Promise((resolve,reject)=>{
        con.query(`CREATE TABLE ${tableName}(id integer not null primary key,propertyId integer not null,propertyIdentity varchar(999) not null,propertyPrice varchar(999) not null)`,(err,resp)=>{
            if(err){
                con.query(`INSERT INTO ${tableName}(id,propertyId,propertyIdentity,propertyPrice) VALUES(${tempId},${propertyId},'${encodedPropertyIdentity}','${encodedPropertyPrice}')`,(err,resp)=>{
                    if(err) reject(err)
                    else{
                        resolve({inserted : true})
                    }
                })
            }
            else{
                con.query(`INSERT INTO ${tableName}(id,propertyId,propertyIdentity,propertyPrice) VALUES(${tempId},${propertyId},'${encodedPropertyIdentity}','${encodedPropertyPrice}')`,(err,resp)=>{
                    if(err) reject(err)
                    else{
                        resolve({inserted : true})
                    }
                })
            }
        })

    })
    

    res.send(state)
     
   

    

}


const getSpecificCart = async (req, res) => {
    const id = req.params.id;
    let metaData = req;
    const tableName = `cart${id}`;
    let data = [];
    let errorState = false
    try {
      const rows = await new Promise((resolve, reject) => {
        con.query(`SELECT * FROM ${tableName}`, (err, response) => {
          if (err) {
            errorLogger({data:{id:id}},err.code)
            res.send({error: true})
            errorState = true
          } else {
            resolve(response)
          }
        });
      });
      
     if(!errorState){ const maxIdResult = await new Promise((resolve, reject) => {
        con.query(`SELECT MAX(propertyId) AS maxId FROM ${tableName}`, (err, resp) => {
          if (err) {
            reject(err);
          } else {
            resolve(resp);
          }
        });
      });
  
      const maxId = maxIdResult[0].maxId;
  
      const countQueries = [];
      for (let i = 0; i <= maxId; i++) {
        countQueries.push(
          new Promise((resolve, reject) => {
            con.query(`SELECT COUNT(*) AS count FROM ${tableName} WHERE propertyId = ${i}`, (err, resp) => {
              if (err) {
                reject(err);
              } else {
                resolve(resp[0].count);
              }
            });
          })
        );
      }
  
      const counts = await Promise.all(countQueries);
  
      for (let i = 1; i <= maxId; i++) {
        data.push({
          propertyId: i,
          count: counts[i]
        });
      }
      data.push({rows : rows })
      res.send(data);}
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Table does not exist" });
    }

   
  };

  const createUserCart = async (req,res) =>{
    const  id  =  req.body.id
    console.log(id)
    const tableName = `cart${id}`
    await con.query(`CREATE TABLE ${tableName}(id integer not null primary key,propertyId integer not null,propertyIdentity varchar(999) not null,propertyPrice varchar(999) not null)`,(err,resp)=>{
        if(err) console.log(err.code)
        else{
            res.send({created : true})
        }

    })
 }
  const removeProduct = async(req,res) =>{
     const id  = await req.params.id;
     const userId = await req.params.userId
     const tableName = `cart${userId}`
     let transactionState = await new Promise((resolve)=>{
        con.query(`delete from ${tableName} where id = ${id}`,(err,resp)=>{
            if(err) resolve({errorState : true})
            else{
                resolve({deleted : true})
            }
        })
        
     })
     res.send(transactionState)
  }
  
  


module.exports = {
    getAllUsers,
    safeUserAdd,
    toLogin,
    getUserDataByEmail,
    changePseudo,
    changeGsm,
    changeEmail,
    addHobbies,
    addEducation,
    addGoal,
    getAllSpesifics,
    createSpecificUserCart,
    getSpecificCart,
    removeProduct,
    createUserCart


}


