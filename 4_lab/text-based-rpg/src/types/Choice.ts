export default interface Choice {
    text: string;
    successChance?: number;
    nextId: string;
    failId?: string;
}