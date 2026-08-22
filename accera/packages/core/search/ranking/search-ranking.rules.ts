/** Pure ranking rules. Search ranking is deterministic and never authorizes access. */
export const compareSearchRank = (left: Readonly<{ score: number; id: string }>, right: Readonly<{ score: number; id: string }>) => right.score - left.score || left.id.localeCompare(right.id);
