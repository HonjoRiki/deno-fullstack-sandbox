
export type HistoryEntry = {
    id: number;
    formula: string;
    date: string;
};

const history: HistoryEntry[] = [];

export const findAll = (): HistoryEntry[] => {
    return history;
};

export const create = (formula: string): HistoryEntry => {
    const newEntry: HistoryEntry = {
        id: Date.now(),
        formula,
        date: new Date().toISOString(),
    };
    history.unshift(newEntry);
    return newEntry;
};
