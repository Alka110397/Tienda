const sequelize = require('../db/conexion')

module.exports.listarProductos = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.productosMeli')
        return resultado
    }catch (err){
        console.log(err)
        throw new Error ('Ocurrio un problema en la consulta con la DB')
    }
}

module.exports.nuevoProducto = async (producto)=>{
    console.log("Aqui producto", producto);
    let productoNuevo = [
        producto.id_meli,
        producto.descripcion,
        producto.precio,
        producto.imagen,
        producto.fecha_registro
    ]
    try {
        let resultado = await sequelize.query(`INSERT INTO productosMeli (id_meli, descripcion, precio, imagen, fecha_registro) VALUES (?,?,?,?,?)`,
        {replacements: productoNuevo, type: sequelize.QueryTypes.SELECT});
        return resultado
    }catch (err){
        console.log(err)
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
}