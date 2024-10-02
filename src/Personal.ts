export interface Personal{
    name: string,
    billingAdress: string,
    adress: string,
    cupon: string,
    payment: {
        card: string,
        expDate: Date,
        secuCode: string
    }
}