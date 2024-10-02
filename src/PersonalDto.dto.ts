export class PersonalDto {
    name: string;
    billingAdress: string;
    adress: string;
    cupon: string;
    payment: {
        card: string,
        expDate: string;
        secuCode: string
    }
}