export type Operator =
  "+" |
  "-" |
  "*" |
  "/";

export type Expression = {
  operator: Operator;
  operand1: number;
  operand2: number;
};

export const calculate = (expression: Expression): number => {
  switch (expression.operator) {
    case "+":
      return expression.operand1 + expression.operand2;
    case "-":
      return expression.operand1 - expression.operand2;
    case "*":
      return expression.operand1 * expression.operand2;
    case "/":
      return expression.operand1 / expression.operand2;
    default:
      throw new Error(`不明な演算子: ${expression.operator}`);
  }
};

export const toString = (expression: Expression): string => {
  return `${expression.operand1} ${expression.operator} ${expression.operand2}`;
};
