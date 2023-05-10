import Product from '../models/Product.js'
import products from '../products.json' assert {type:'json'}

async function getAllProducts (req,res) {
    const {featured,company,search} = req.query
    const filter = Object.assign({}, 
        featured && { featured },
        company && { company },
        search && {name: {$regex: search,$options:'i'} }
        )
    const product = await Product.find(filter)
    res.json({product})
}
async function sendData () {
    try {
        await Product.deleteMany()
        await Product.create(products)
        console.log('gonderildi') 
        // process.exit(0)
    } catch (err) {
        console.log(err)
        // process.exit(1)
    }
}
export {getAllProducts,sendData}