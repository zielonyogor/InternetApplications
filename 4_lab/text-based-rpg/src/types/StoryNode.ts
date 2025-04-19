import Choice from "./Choice";

export default interface StoryNode{
    id: string;
    text: Array<string>;
    choices?: Array<Choice>;
    
}