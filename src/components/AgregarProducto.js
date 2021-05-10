import { useState, useEffect } from "react";
import { db } from '../firebase';

function AggProductos(props) {

    const initialStateValues = {
        nombre: "",
        precio: "",
        cantidad: "0",
    };

    const [values, setValues] = useState(initialStateValues);
    const [statusBtn, setStatusBtn] = useState(false);

    const getProductoById = async (id) => {
        const doc = await db.collection("productos").doc(id).get();
        setValues({ ...doc.data() });
    };

    useEffect(() => {
        if (props.currentId === "") {
            setValues({ ...initialStateValues });
        } else {
            getProductoById(props.currentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value.toUpperCase() });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.nombre !== '' && values.nombre !== '') {
            props.addOrEditProductos(values);
            setValues({ ...initialStateValues });
        }
    };

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={() => setStatusBtn(!statusBtn)}>Agregar Producto</button>
            { statusBtn === true ?
                <div className="card border-success mb-2 mt-2">
                    <div className="card-header ">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input className="form-control" value={values.nombre} name="nombre" onChange={handleInputChange} />
                                {values.nombre === "" ? <span className='text-danger'>Este dato es requerido</span> : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="Precio del producto">Precio</label>
                                <input type="number" className='form-control' value={values.precio} name="precio" onChange={handleInputChange} />
                                {values.precio === "" ? <span className='text-danger'>Este dato es requerido</span> : ''}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cantidad del producto">cantidad</label>
                                <input type="number" value={values.cantidad} className='form-control' name="cantidad" onChange={handleInputChange} />
                            </div>
                            <div className="form-group text-right">
                                <button type="button" className="btn btn-warning" onClick={() => props.obtenerId('')} >Limpiar</button>
                                {" "}
                                <button type="button" className="btn btn-danger" onClick={() => setStatusBtn(!statusBtn)}>Cerrar</button>
                                {" "}
                                <button type="submit" className="btn btn-primary">
                                    {props.currentId === "" ? "Agregar" : "Actualizar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div> : ""
            }
        </>
    )
}
export default AggProductos;