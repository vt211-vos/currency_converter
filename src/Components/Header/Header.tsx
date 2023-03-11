import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Button} from "@mui/material";
import {useRecoilValue} from "recoil";
import {$rates} from "../../data";


interface IRates {
    [key: string]: number;
}

export function Header() {
    const rates = useRecoilValue($rates)
    return (
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"

                >
                    <CurrencyExchangeIcon />
                </IconButton>

                <Box className={"currencies"} sx={{ flexGrow: 1}} >
                    {['USD','EUR'].map((item) => (
                        <Button size={"large"} key={item} sx={{ color: '#fff' }}>
                            {item}=
                            {
                                rates &&
                                Math.round(1/rates[item] * rates["UAH"]*100)/100
                            }
                        </Button>

                    ))}

                </Box>
            </Toolbar>
        </AppBar>
    );
}

