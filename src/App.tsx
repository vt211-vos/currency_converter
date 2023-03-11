import {ChangeEvent, useEffect, useState} from 'react'
import './App.css'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import axios from "axios";
import {Container, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {Header} from "./Components/Header/Header";
import {CurrencyBoxFrom} from "./Components/CurrencyBox/CurrencyBoxFrom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {$rates, $test} from "./data";
import {CurrencyBoxTo} from "./Components/CurrencyBox/CurrencyBoxTo";


interface IRates {
    [key: string]: number;
}



function App() {
    const [rate, setRates] = useRecoilState($rates)
    const GetCurrencies = async ()=>{
        try {
            const currencies = await axios.get("https://api.exchangerate.host/latest")
            setRates(currencies.data.rates)
        }catch (e) {
            console.log(e)
        }
    }


    useEffect(()=>{
        GetCurrencies()
    },[])

    return (
    <>
        <Header/>
        <Container sx={{mt: 10}}>
            <Typography className={"title"} sx = {{p:3}}>
                Вітаю у онлайн конвертаторі валют
            </Typography>
            <Box className={"box"}>
                <CurrencyBoxFrom/>
                <IconButton
                    color="inherit"
                >
                    <CompareArrowsIcon />
                </IconButton>
                <CurrencyBoxTo/>
            </Box>
        </Container>



    </>
    )
}

export default App
