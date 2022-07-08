import '../componentsStyles/Delivery.scss';
import * as React from 'react';
import { useForm } from "react-hook-form";
import Typography from '@mui/material/Typography';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addressHook } from "../hooks/addressHook";

function Error({ errors }) {
    return (
        errors ?
            <div className="error">{errors.message}</div> :
            <></>
    )
}

function saveAddress(data) {
    console.log(data);
    addressHook.sendAddress(data).then(
        (status) => {
            console.log(status);
        },
        () => {
            console.error("Błąd serwera")
        });
}

function Delivery() {
    let navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    return (
        <div className="delivery">
            <Typography variant="h4" className='tittle'>Adres dostawy</Typography>
            <form onSubmit={handleSubmit(data => {
                saveAddress(data);
                navigate("/payment")
            })}>
                <label>Ulica:</label>
                <TextField className='input' {...register('street', { required: "Wymagane" })} />
                <Error errors={errors.street} />
                <label>Numer domu/mieszkania:</label>
                <TextField className='input' type="number" {...register('houseNumber', { required: "Wymagane" })} />
                <Error errors={errors.houseNumber} />
                <label>Kod pocztowy:</label>
                <TextField className='input' type="number" {...register('postalCode', { required: "Wymagane" })} />
                <Error errors={errors.postalCode} />
                <label>Miasto:</label>
                <TextField className='input' {...register('city', { required: "Wymagane" })} />
                <Error errors={errors.city} />
                <Button
                    type="submit"
                    className='submitButton'
                    variant='contained'>
                    Przejdź do płatności
                </Button>
            </form>
        </div>
    )
}

export default Delivery