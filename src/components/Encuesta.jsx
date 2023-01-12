import React, { useEffect, useState } from "react";
import Items from '../local-json/db.json';
import './Encuesta.css';
import firebase from 'firebase/compat/app';
import { getDatabase, ref, set } from "firebase/database" 

export const Encuesta = () => {

    const [ items, setItems ] = useState(Items);
    const mailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;

    

    const [ itemsValues, setItemsValues ] = useState({
        full_name: '',
        email: '',
        birth_date: '',
        country_of_origin: '',
        terms_and_conditions: ''
    });

    const handleChange = (e) => {
        setItemsValues({
            ...itemsValues,
            [e.target.name] : e.target.value
            
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const database = getDatabase();

        if ( itemsValues.full_name.length <= 4 ){
            alert("Debe ingresar al menos 4 letras para continuar.");
            return
        }
        if ( !itemsValues.email.match(mailRegex) ){
            alert("Debe ingresar correctamente el Mail para continuar.");
            return
        }
        if ( dateRegex.test(itemsValues.birth_date) || itemsValues.birth_date.length > 10 ) {
            alert("Debe ingresar correctamente la fecha para continuar.");
            return
        }
        if ( itemsValues.country_of_origin === "" ) {
            alert("Debe seleccionar el País de Origen para continuar.");
            return
        }

        
        set(ref(database, "encuesta" ), itemsValues )
        // push(ref(database).child("encuesta") , itemsValues )

        console.log(itemsValues)
    }

    useEffect(() => {
        console.log("")
    }, [])

    
    return(
        <div className="container">
            <h1>Encuesta</h1>
            <form onSubmit={handleSubmit} className="encuesta">
                
                {
                    items.items.map(( value, index ) => {
                        return (
                            <div className="data-container">
                                
                                
                                {
                                    value.type === "submit" 
                                    ? <></>
                                    : <label key={value.label} >{value.label} </label>
                                }
                                {
                                    value.type === "select"  
                                    ?
                                        <select 
                                            defaultValue={'DEFAULT'}
                                            onChange={handleChange}
                                            className="select"
                                            name={value.name} 
                                            key={value.name} 
                                            required>
                                            <option value="DEFAULT" disabled >Elegir un País de Origen</option>
                                            {
                                                value.options.map(( option ) => {
                                                    return(
                                                        <option value={option.value} >{option.label}  </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    :
                                        value.type === "submit" 
                                        ?
                                            <button className="button">{value.label}</button>
                                        :
                                            
                                            <input
                                                onChange={handleChange}
                                                type={value.type} 
                                                className={
                                                    value.type === "date" 
                                                    ? 
                                                        "date" 
                                                    :
                                                        value.type === "checkbox"
                                                        ?   
                                                            "checkbox"
                                                        :
                                                            "input"
                                                }
                                                name={value.name} 
                                                placeholder={`Ingrese el ${value.label}`}
                                                required
                                            />
                                }
                                
                            </div>
                        )
                    }) 
                }

            </form>
        </div>
    )
}