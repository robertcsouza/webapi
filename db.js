const mongoClient = require("mongodb").MongoClient
mongoClient.connect("mongodb://localhost:27017/workshop")
           .then(conn => global.conn = conn.db("workshop"))
           .catch(err => console.log(err))



function findCustomers(callback){
    global.conn.collection('customers').find({}).toArray(
        callback
    )
} 

const ObjectId = require("mongodb").ObjectId

function findCustomer(id,callback){


    global.conn.collection('customers').findOne(new ObjectId(id),callback)

}


function insertCustomer(customer, callback){
    global.conn.collection('customers').insert(customer,callback)
}


function updateCustomer(id,customer,callback){

    global.conn.collection('customers').update({
        _id: new ObjectId(id)
    },customer,callback)

}

//faltou o parcial update

function deleteCustomer(id,callback){

    global.conn.collection('customers').deleteOne({_id: new ObjectId(id)},callback)

}


// agendamentos
function findAgendamentos(callback){
    global.conn.collection('agendamento').find({}).toArray(
        callback
    )
} 

/*function findAgendamento(id,callback){


    global.conn.collection('agendamento').findOne(new ObjectId(id),callback)

}*/

function findAgendamento(id,callback){
    
    global.conn.collection('agendamento').find({"id_cliente":id}).toArray(
        callback
    )
     
} 


function insertAgendamento(agend, callback){

          
    

    if(agend['bronzeamento'] === "natural"){
    global.conn.collection('natural').find({"data":agend['data']}).toArray(
      (err,result)=>{

        
        if(result[0][agend['periodo']] < 20){

            
            
            let increment = (result[0][agend['periodo']]+1)
            let p = agend['periodo']  

            console.log(p)
            
            if(p === "manha"){

                global.conn.collection('natural').updateOne({"data" : agend['data'] },{ $set:{"manha":increment}},(err,result)=>{

                    global.conn.collection('agendamento').insert(agend,callback)
    
                })

            }else{
                global.conn.collection('natural').updateOne({"data" : agend['data'] },{ $set:{"tarde":increment}},(err,result)=>{

                    global.conn.collection('agendamento').insert(agend,callback)
    
                })
            }
           
        }else{
            
           
            global.conn.collection('error').find({}).toArray(
                callback
            )
        }

        
      }
    )}

    else{

        global.conn.collection('artificial').find({"data":agend['data']}).toArray(
            (err,result)=>{
      
             console.log(result[0][agend['periodo']])
              
              if(result[0][agend['periodo']] < 20){
      
                  
                  
                  let increment = (result[0][agend['periodo']]+1)
                  let p = agend['periodo']  
      
                  console.log(p)
                  
                  if(p === "manha"){
      
                      global.conn.collection('artificial').updateOne({"data" : agend['data'] },{ $set:{"manha":increment}},(err,result)=>{
      
                          global.conn.collection('agendamento').insert(agend,callback)
          
                      })
      
                  }else{
                      global.conn.collection('artificial').updateOne({"data" : agend['data'] },{ $set:{"tarde":increment}},(err,result)=>{
      
                          global.conn.collection('agendamento').insert(agend,callback)
          
                      })
                  }
                 
              }else{
                  
                 
                  global.conn.collection('error').find({}).toArray(
                      callback
                  )
              }
      
              
            }
          )
          

    }
    
}


function updateAgendamento(id,agend,callback){

    global.conn.collection('agendamento').update({
        _id: new ObjectId(id)
    },agend,callback)

}

//faltou o parcial update

function deleteAgendamento(id,callback){

    global.conn.collection('agendamento').deleteOne({_id: new ObjectId(id)},callback)

}

//Agendamentos natural


function findNaturals(callback){
    global.conn.collection('natural').find({}).toArray(
        callback
    )
} 

/*function findAgendamento(id,callback){


    global.conn.collection('agendamento').findOne(new ObjectId(id),callback)

}*/

function findNatural(data,callback){
    
    global.conn.collection('natural').find({"data":data}).toArray(
        callback
    )
     
} 


function insertNatural(agend, callback){
    global.conn.collection('natural').insert(agend,callback)
}


function updateNatural(data,agend,callback){

    global.conn.collection('natrual').update({
        "data": data
    },agend,callback)
}


//Agendamentos Artificial


function findArtificials(callback){
    global.conn.collection('artificial').find({}).toArray(
        callback
    )
} 

/*function findAgendamento(id,callback){


    global.conn.collection('agendamento').findOne(new ObjectId(id),callback)

}*/

function findArtificial(data,callback){
    
    global.conn.collection('artificial').find({"data":data}).toArray(
        callback
    )
     
} 


function insertArtificial(agend, callback){
    global.conn.collection('artificial').insert(agend,callback)
}


function updateArtificial(data,agend,callback){

    global.conn.collection('artificial').update({
        "data": data
    },agend,callback)
}






module.exports = {
    findCustomers,findCustomer,insertCustomer,updateCustomer,deleteCustomer,

    findAgendamento,findAgendamentos,insertAgendamento,updateAgendamento,deleteAgendamento,
    
    findNaturals,findNatural,insertNatural,updateNatural,
    
    findArtificials,findArtificial,insertArtificial,updateArtificial

}           