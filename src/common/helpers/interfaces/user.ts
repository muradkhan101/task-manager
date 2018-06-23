export interface User {
    ID: number;
    FirstName: string;
    LastName: string;
    Email: string;
    BoardOrder: Array<number>;
    theme: Theme;
}

export type Theme = 'light' | 'dark';
