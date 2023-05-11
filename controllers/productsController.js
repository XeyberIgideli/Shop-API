import Product from '../models/Product.js'
// import products from '../products.json' assert {type:'json'}

async function getAllProducts (req,res) {
    let {featured,company,search,sort,fields,numFilters} = req.query
    const signList = {
        '>':'$gt',
        '>=': '$gte',
        '=': '$eq',
        '<':'$lt',
        '<=': '$lte'
    } 
    // Filter operation for numeric filters
    let filterOp = {}
    for(let sign in signList) {
        const splitted = numFilters.split(',')
        
        if(splitted.length === 1) {
            if(numFilters.split(sign).length !== 1) {
                const filterSign = signList[sign]
                const name = numFilters.split(sign)[0]
                filterOp[name] = {} 
                filterOp[name][filterSign] = Number(numFilters.match(/\d+(?:\.\d+)?/)[0])
            } 
        } 
         splitted.forEach(query => {
            if(query.split(sign).length !== 1) {
                const filterSign = signList[sign]  
                const name = query.split(sign)[0]
                filterOp[name] = {}              
                filterOp[name][filterSign] = Number(query.match(/\d+(?:\.\d+)?/)[0])
            } 
         })
    }    
    
    // Filter
    const filter = Object.assign({}, 
        featured && { featured },
        company && { company },
        search && {name: {$regex: search,$options:'i'} },
        numFilters && filterOp
    )  
    // Checking    
    if(sort) {
        let sortList = sort.split(",").join(" ")
        sort = sortList || "-createdAt" 
    } else if(fields) {
        fields = fields.split(",").join(" ") 
    }
    // Pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    // DB Fetching
    let product = await Product.find(filter).sort(sort).select(fields).limit(limit).skip(skip)

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