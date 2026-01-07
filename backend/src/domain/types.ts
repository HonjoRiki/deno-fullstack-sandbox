export type Operator = 'add' | 'sub' | 'mul' | 'div';

export interface Calculation {
    readonly id: string,
    readonly operand1: number,
    readonly operator: Operator,
    readonly operand2: number,
    readonly result: number,
    readonly createdAt: string,
};

export interface CalculationRepository {
    readonly save: SaveCalculation;
    readonly getAll: GetCalculations;
}

export type SaveCalculation = (calc: Calculation) => Promise<void>;

export type GetCalculations = () => Promise<readonly Calculation[]>;
