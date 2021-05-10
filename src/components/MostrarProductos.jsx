import React, { useState, useEffect } from 'react';
// import ListarProductos from './ListarProductos';

export default function ListaProductos(props) {

    const [lista, setLista] = useState([]);
    const [filtro, setFiltro] = useState("");

    const handleChangeInput = (e) => {
        setFiltro( e.target.value.toUpperCase() );
    }

    useEffect(() => {
        if (filtro === "") {
            setLista(props.productos)
        } else {
            let nuevaLista = props.productos.filter(item => !item.nombre.search(filtro));
            setLista(nuevaLista)
        }
    }, [filtro, props.productos])

    return (
        <>
            <div className="card border-success mb-3" >
                <div className="card-header text-center"><h4>Productos</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 offset-md-8">
                            <input
                                type="text"
                                name="Buscador"
                                className="form-control mb-3"
                                placeholder="Buscar producto"
                                onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <table className="table table-hover text-center" id="myTable">
                        <thead>
                            <tr className="table-success">
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio en $</th>
                                <th>Precio en bs</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lista.map((item) => (
                                    < tr key={item.id} className="text-center" >
                                        <td>{item.nombre}</td>
                                        <td>{item.cantidad}</td>
                                        <td>{item.precio + '$'}</td>
                                        <td>{(item.precio * props.Dolar).toLocaleString()} Bs</td>
                                        <td>
                                            <button type="button" onClick={() => props.obtenerId(item.id)} className="btn btn-warning " htmlFor="Editar">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                </svg>
                                            </button>{"    "}
                                            <button type="button" onClick={() => props.onDeleteProductos(item.id)} className="btn btn-danger " htmlFor="Eliminar">
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}