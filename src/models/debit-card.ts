export interface DebitCard {
    name: string;
    number: number;
    date: string;
    cvv: number;
    isFrozen?: boolean;
}
