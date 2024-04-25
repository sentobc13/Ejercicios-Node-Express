
const express = require("express")
const app = express()
const PORT = 3001

app.use(express.json())



const items = [
    { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
    { id: 2, nombre: 'FIFA 23 PS5' , precio: 1000},
    {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
    {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
    {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
    {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}
  ]

app.get("/",(req,res) => {
    res.send(items)
})


app.post("/", (req,res)=> {
    const newItem = {
        id: items.length +1,
        nombre: req.body.nombre,
        precio: req.body.precio
    }
    items.push(newItem)
    res.status(201).send(items)
})

app.put("/id/:id",(req,res)=>{
    const found = items.some(item => item.id == req.params.id)

    if(found){
        items.forEach(item =>{
            if(item.id == req.params.id){
                item.nombre =req.body.nombre ? req.body.nombre: item.nombre
                item.precio =req.body.precio || item.precio
            }
        })
        res.send(items)
    }else{
        res.status(404).send(`Item with id ${req.params.id} not found`)
    }
})

app.delete("/id/:id",(req,res)=>{
    const found = items.some(item => item.id == req.params.id)
    if(found){
        const itemsFilter = items.filter(item => item.id != req.params.id)
        res.send(itemsFilter)
    }else{
        res.status(404).send(`Item with id ${req.params.id} not found`)
    }
})


app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`);
})

