import { Calculation, GetCalculations } from "../domain/types.ts";

export const calcHistoryUseCase = async (
    getFn: GetCalculations,
): Promise<readonly Calculation[]> => {
    return await getFn();
};
