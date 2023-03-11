import {ChangeEvent} from "react";
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {$fromCurrency, $rates, $selectFromCurrency, $selectToCurrency, $toCurrency} from "../../data";

export function CurrencyBoxTo() {
    const rates = useRecoilValue($rates)
    const selectFromCurrency = useRecoilValue($selectFromCurrency)
    const [selectToCurrency,setSelectToCurrency] = useRecoilState($selectToCurrency)
    const [fromCurrency, setFromCurrency] = useRecoilState($fromCurrency)
    const [toCurrency, setToCurrency] = useRecoilState($toCurrency)


    //Take value from input and send to toCurrency and change fromCurrency
    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = Number(inputValue);
        if (inputValue !== "") {
            //Doesn't work if value less than 0
            if (numericValue >= 0) {
                    setToCurrency(numericValue);
                    setFromCurrency(() => {
                        if (rates !== undefined) {
                            //conversion
                            return Math.round(numericValue / rates[selectToCurrency] * rates[selectFromCurrency] * 100) / 100
                        }
                        return undefined
                    })
                } else
                    setFromCurrency(0)
            }
            else
            setToCurrency(undefined)

        }

    //Take value from select and send to selectToCurrency and change toCurrency
    const handleChange = (event: SelectChangeEvent) => {
        setSelectToCurrency(event.target.value);
        setToCurrency(()=>{
            if(rates !== undefined){
                if(fromCurrency !== undefined)
                    //conversion
                    return Math.round(fromCurrency/rates[selectFromCurrency] * rates[event.target.value]*100)/100
            }
            return undefined
        })
    };
    return (
        <>
            <TextField
                value={toCurrency}
                onChange={inputHandler}
                id="outlined-basic" type={"number"} focused
                label={selectToCurrency}
                variant="outlined"/>


            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectToCurrency}
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