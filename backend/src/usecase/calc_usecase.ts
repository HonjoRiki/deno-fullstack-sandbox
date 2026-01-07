import { calculate } from "../domain/calculator.ts";
import { Calculation, Operator, SaveCalculation } from "../domain/types.ts";


export const calcUseCase = async (
    input: {
        op1: number;
        op: Operator;
        op2: number;
    },
    saveFn: SaveCalculation
): Promise<Calculation> => {
    const result = calculate(input.op1, input.op, input.op2);
    const calculation: Calculation = {
        id: crypto.randomUUID(),
        operand1: input.op1,
        operator: input.op,
        operand2: input.op2,
        result: result,
        createdAt: new Date().toISOString(),
    };
    await saveFn(calculation);
    return calculation;
};
