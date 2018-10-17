const Sequelize=require('sequelize')

const sequelize=new Sequelize(process.env.NAME,'postgres',process.env.PW,{
    host:'localhost',
    dialect:'postgres'
})

sequelize.authenticate().then(
    ()=>console.log('Connected to instructional app database'),
    ()=>console.log(err)
)

module.exports=sequelize