import React, { useState, useEffect } from 'react';

import AggProductos from './AgregarProducto.js';
import ListaProductos from './MostrarProductos';
import EditDolares from './Dolar';

import { db } from '../firebase';
import { toast } from 'react-toastify';

function Productos() {

    const [productos, setProductos] = useState([])
    const [currentId, setCurrentId] = useState("");

    const [Dolar, setDolar] = useState(0.0);

    const editarDolar = valor => {
        setDolar(parseInt(valor));
        toast('Dolar actualizado', {
            type: 'warning'
        });
    }
    const getProductos = () => {
        db.collection('productos').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setProductos(docs);
        });
    }

    const onDeleteProductos = async (id) => {
        if (window.confirm("¿Esta seguro que desea eliminar este producto?")) {
            await db.collection("productos").doc(id).delete();
            toast("Producto eliminado exitosamente", {
                type: "error",
                autoClose: 2000
            });
        }
    };
    const obtenerId = (id) => {
        setCurrentId(id);
    }

    useEffect(() => {
        getProductos();
    }, []);

    const addOrEditProductos = async (productoObjeto) => {
        try {
            if (currentId === "") {
                await db.collection("productos").doc().set(productoObjeto);
                toast("New producto agregado", {
                    type: "success",
                });
            } else {
                await db.collection("productos").doc(currentId).update(productoObjeto);
                toast("Producto modificado exitosamente", {
                    type: "warning",
                });
                setCurrentId("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7 ">
                        <AggProductos {...{ addOrEditProductos, currentId, productos, obtenerId }} />
                    </div>
                    <div className="col-md-5 text-right ">
                        <span className="h3">Dolar: {" " + Dolar.toLocaleString() + " B.s "}</span>
                        <EditDolares edit={editarDolar} />
                    </div>
                </div>
                <ListaProductos {... { productos, onDeleteProductos, Dolar, obtenerId }} />
            </div>
        </>
    )

}

export default Productos;
