import { calculate } from "../domain/calculator.ts";
import { Calculation, Operator, SaveCalculation } from "../domain/types.ts";

export const calcUseCase = async (
    input: {
        op1: number;
        op: Operator;
        op2: number;
    },
    saveFn: SaveCalculation,
    generateId: () => string = () => crypto.randomUUID(),
    getNow: () => string = () => new Date().toISOString(),
): Promise<Calculation> => {
    const result = calculate(input.op1, input.op, input.op2);
    const calculation: Calculation = {
        id: generateId(),
        operand1: input.op1,
        operator: input.op,
        operand2: input.op2,
        result: result,
        createdAt: getNow(),
    };
    await saveFn(calculation);
    return calculation;
};
