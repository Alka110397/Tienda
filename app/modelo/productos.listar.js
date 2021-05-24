const sequelize = require('../../db/conexion')

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
        let resultado = await sequelize.query(`INSERT INTO productos (id_meli, descripcion, precio, imagen, fecha_registro) VALUES (?,?,?,?,?)`,
        {replacements: productoNuevo, type: sequelize.QueryTypes.SELECT});
        return resultado
    }catch (err){
        console.log(err)
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
    
}
module.exports.eliminarProducto=async(producto)=>{
    let resultado = await sequelize.query(`DELETE  FROM productos WHERE id_meli = '${producto}'`)
    console.log(resultado)
      let solucion = resultado[0][0]
      return solucion
}
module.exports.modificarProducto=async(producto,contenido)=>{
    let resultado = await sequelize.query(`UPDATE productos SET precio=${contenido.precio} WHERE id_meli = '${producto}'`)
    console.log(resultado)
      let solucion = resultado[0][0]
      return solucion
}