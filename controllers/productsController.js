import Product from '../models/Product.js'
import products from '../products.json' assert {type:'json'}

async function getAllProducts (req,res) {
    const {featured,company,search,sort} = req.query
    const filter = Object.assign({}, 
        featured && { featured },
        company && { company },
        search && {name: {$regex: search,$options:'i'} }
        )
    let product = await Product.find().sort('-price name') 
    // if(sort) {
    //     let multipleSort = sort.split(",").join(" ") 
    //     result = result.sort(multipleSort)
    // } 
    // const product = await result
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