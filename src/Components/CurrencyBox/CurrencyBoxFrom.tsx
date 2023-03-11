import {ChangeEvent} from "react";
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {$fromCurrency, $rates, $selectFromCurrency, $selectToCurrency, $toCurrency} from "../../data";

export function CurrencyBoxFrom() {
    const rates = useRecoilValue($rates)
    const [selectFromCurrency,setSelectFromCurrency] = useRecoilState($selectFromCurrency)
    const selectToCurrency = useRecoilValue($selectToCurrency)
    const [fromCurrency, setFromCurrency] = useRecoilState($fromCurrency)
    const setToCurrency = useSetRecoilState($toCurrency)

    //Take value from input and send to fromCurrency and change toCurrency
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = Number(inputValue);
        if(inputValue !== ""){
            //Doesn't work if value less than 0
            if(numericValue >= 0){
                setFromCurrency(numericValue);
                setToCurrency(()=>{
                    if(rates !== undefined){
                        //conversion
                        return Math.round(numericValue/rates[selectFromCurrency] * rates[selectToCurrency]*100)/100
                    }
                    return undefined
                })
            }
            else
                setToCurrency(0)

        }

        else
            setFromCurrency(undefined)

    };

    //Take value from select and send to selectFromCurrency and change toCurrency
    const handleChange = (event: SelectChangeEvent) => {
        setSelectFromCurrency(event.target.value);
        setToCurrency(()=>{
            if(rates !== undefined){
                if(fromCurrency !== undefined)
                    //conversion
                    return Math.round(fromCurrency/rates[event.target.value] * rates[selectToCurrency]*100)/100
            }
            return undefined
        })
    };
    return(
        <>
            <TextField
                value={fromCurrency}
                onChange={inputHandler}
                       id="outlined-basic" type={"number"} focused
                label={selectFromCurrency}
                variant="outlined" />


            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectFromCurrency}
                style={{width: "100px"}}
                onChange={handleChange}

            >
                <MenuItem value={"UAH"}>UAH</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
            </Select>
        </>
    )

}