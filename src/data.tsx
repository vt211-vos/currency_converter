import {atom} from "recoil";
interface IRates {
    [key: string]: number;
}

export const $rates = atom<IRates>({
    key: "rates"
})

export const $fromCurrency = atom<number | undefined>({
    key: "fromCurrency",
    default: undefined
})

export const $selectFromCurrency = atom<string>({
    key: "selectFromCurrency",
    default: "USD"
})

export const $toCurrency = atom<number | undefined>({
    key: "toCurrency",
    default: undefined
})

export const $selectToCurrency = atom<string>({
    key: "selectToCurrency",
    default: "UAH"
})