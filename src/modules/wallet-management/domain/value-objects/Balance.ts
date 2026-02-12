export class Balance {
    constructor(private readonly value: number) { }

    public static fromNumber(value: number) {
        if (value < 0) throw new Error('Balance cannot be negative');
        return new Balance(value);
    }

    public static fromDecimal(decimal: any) {
        const value = Number(decimal.toString())
        if (value < 0) throw new Error('Balance cannot be negative');
        return new Balance(value);
    }

    getValue() {
        return this.value;
    }
}