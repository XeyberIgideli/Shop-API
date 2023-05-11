import Product from '../models/Product.js'
import products from '../products.json' assert {type:'json'}

async function getAllProducts (req,res) {
    let {featured,company,search,sort,fields} = req.query
    const filter = Object.assign({}, 
        featured && { featured },
        company && { company },
        search && {name: {$regex: search,$options:'i'} }
        )
    if(sort) {
        let sortList = sort.split(",").join(" ")
        sort = sortList || "-createdAt" 
    } else if(fields) {
        fields = fields.split(",").join(" ") 
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    let product = await Product.find(filter).sort(sort).select(fields).limit(limit).skip(skip)
    // if(sort) {
    //     let multipleSort = sort.split(",").join(" ") 
    //     result = result.sort(multipleSort)
    // } 
    // const product = await result
    res.json({product,length:product.length})
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