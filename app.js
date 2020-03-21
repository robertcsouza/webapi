global.db = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const router = express.Router()
router.get('/',(req,res)=>res.json({message:'Funcionado'}))
app.use('/',router)

app.listen(port)
console.log('API funcionado')


router.get('/clientes', (req,res)=> global.db.findCustomers((err,docs) => {
    if(err){
        res.status(500).json(err)
    } 
    else{
        res.json(docs)
    } 
} ))

router.get('/clientes/:id', (req,res) => global.db.findCustomer(
   
    req.params.id,(err,doc) => {

        if(err) res.status(500).json(err)
        else res.json(doc)

    }    
) )


router.post('/clientes',(req,res) =>{
    const customer = req.body
    global.db.insertCustomer(customer,(err,result) => {
        if(err) res.status(500).json(err)
        else res.json({mesage:'Cliente cadastrado com sucesso!!!'})
    })

})

router.put('/clientes/:id',(req,res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateCustomer(id,customer,(err,result)=>{
        if(err) res.status(500)
        else res.json({message: 'cliente atualizado com sucesso'})
    })
})

router.delete('/clientes/:id',(req,res)=>{
    const id = req.params.id
    global.db.deleteCustomer(id,(err,result)=>{
        if(err) res.status(500).json(err)
        else res.json({message:'cliente excluido com sucesso!'})
    })
})


//rotas agendamento

router.get('/agendamentos', (req,res)=> global.db.findAgendamentos((err,docs) => {
    if(err){
        res.status(500).json(err)
    } 
    else{
        
        res.json(docs)
    } 
} ))

router.get('/agendamentos/:id', (req,res) => global.db.findAgendamento(
   
    req.params.id,(err,doc) => {

        if(err) res.status(500).json(err)
        else res.json(doc)

    }    
) )


router.post('/agendamentos',(req,res) =>{
    const customer = req.body
    global.db.insertAgendamento(customer,(err,result) => {
        if(err) res.status(500).json(err)
        else res.json(result)
    })

})

router.put('/agendamentos/:id',(req,res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateAgendamento(id,customer,(err,result)=>{
        if(err) res.status(500)
        else res.json({message: 'Agendamento atualizado com sucesso'})
    })
})

router.delete('/agendamentos/:id',(req,res)=>{
    const id = req.params.id
    global.db.deleteAgendamento(id,(err,result)=>{
        if(err) res.status(500).json(err)
        else res.json({message:'Agendamento excluido com sucesso!'})
    })
})

//rotas Brozeamento natural



router.get('/natural', (req,res)=> global.db.findNaturals((err,docs) => {
    if(err){
        res.status(500).json(err)
    } 
    else{
        res.json(docs)
    } 
} ))

router.get('/natural/:id', (req,res) => global.db.findNatural(
   
    req.params.id,(err,doc) => {

        if(err) res.status(500).json(err)
        else res.json(doc)

    }    
) )


router.post('/natural',(req,res) =>{
    const customer = req.body
    global.db.insertNatural(customer,(err,result) => {
        if(err) res.status(500).json(err)
        else res.json({mesage:'Agendamento cadastrado com sucesso!!!'})
    })

})

router.put('/natural/:data',(req,res) => {
    const data = req.params.data
    const customer = req.body
    global.db.updateNatural(data,customer,(err,result)=>{
        if(err) res.status(500)
        else res.json({message: 'Agendamento atualizado com sucesso'})
    })
})

router.delete('/natural/:id',(req,res)=>{
    const id = req.params.id
    global.db.deleteNatural(id,(err,result)=>{
        if(err) res.status(500).json(err)
        else res.json({message:'Agendamento excluido com sucesso!'})
    })
})



//rotas Brozeamento Artificial



router.get('/artificial', (req,res)=> global.db.findArtificials((err,docs) => {
    if(err){
        res.status(500).json(err)
    } 
    else{
        res.json(docs)
    } 
} ))

router.get('/artificial/:id', (req,res) => global.db.findArtficial(
   
    req.params.id,(err,doc) => {

        if(err) res.status(500).json(err)
        else res.json(doc)

    }    
) )


router.post('/artificial',(req,res) =>{
    const customer = req.body
    global.db.insertArtificial(customer,(err,result) => {
        if(err) res.status(500).json(err)
        else res.json({mesage:'Agendamento cadastrado com sucesso!!!'})
    })

})



