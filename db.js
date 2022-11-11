let productos = [];

class Producto {
    constructor(id, nombre, precio, stock, img) {
        this.id = parseInt(id);
        this.nombre = nombre[0].toUpperCase() + nombre.substring(1);
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
        this.img = img;        
    }
}

productos.push(new Producto("1", "transistores", 2.75, 100, "./img/transistores.webp"));
productos.push(new Producto("2", "resistencias", 1.25, 500, "./img/resistencias.webp"));
productos.push(new Producto("3", "capacitores", 1.60, 300, "./img/capacitores.webp"));
productos.push(new Producto("4", "integrados", 4.75, 80, "./img/circuitos-integrados.webp"));
productos.push(new Producto("5", "plaquetas", 0.75, 900, "./img/plaqueta-virgen.webp"));

