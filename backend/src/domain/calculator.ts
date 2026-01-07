import { Operator } from "./types.ts";


export const calculate = (
    op1: number,
    operator: Operator,
    op2: number,
): number => {
    switch (operator) {
        case "add":
            return op1 + op2;
        case "sub":
            return op1 - op2;
        case "mul":
            return op1 * op2;
        case "div":
            if (op2 === 0) {
                throw new Error("Cannot divide by zero");
            }
            return op1 / op2;
    }
};
