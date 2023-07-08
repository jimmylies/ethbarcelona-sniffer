interface Token {
    address: string;
    name: string;
    amount: number;
}

export const tokens: Token[] = [
    {
        address: "AS12iX3jzxH1gDBMZHKfZYfQcWqdpamxB1nzp35ha1zvpMQs1z5KX",
        name: "MAS",
        amount: 2000,
    },
    {
        address: "AS1gJksq7mE73CVz4XTNn8wXCEkNGqV5QdPR8qJAgsfTxMH23wpL",
        name: "USDC",
        amount: 10000,
    },
    {
        address: "AS1WwMcQEsKkUwR4HrB6UXJpivsVDnuY4BU6VUr69q3LFNswUusG",
        name: "WETH",
        amount: 5,
    },
];
