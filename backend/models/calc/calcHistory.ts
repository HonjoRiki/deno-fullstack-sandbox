
export type HistoryEntry = {
    id: number;
    formula: string;
    date: string;
};

let kv: Deno.Kv;
try {
    const kvPath = Deno.env.get("KV_PATH");
    kv = await Deno.openKv(kvPath);
} catch (error) {
    console.error("❌ Deno KVの起動に失敗しました。実行コマンドに '--unstable-kv' が必要かもしれません。", error);
    Deno.exit(1);
}

export const findAll = async (): Promise<HistoryEntry[]> => {
    const entries: HistoryEntry[] = [];
    for await (const entry of kv.list<HistoryEntry>({ prefix: ["history"] }, { reverse: true })) {
        entries.push(entry.value);
    }
    return entries;
};

export const create = async (formula: string): Promise<HistoryEntry> => {
    const id = Date.now();
    const newEntry: HistoryEntry = {
        id,
        formula,
        date: new Date().toISOString(),
    };
    await kv.set(["history", id], newEntry);
    return newEntry;
};
