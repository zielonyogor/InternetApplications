interface TextProps {
    text: string;
    isChoice?: boolean;
}

export default function Text({ text, isChoice = false } : TextProps) {
    return (
        <p className={isChoice ? "choice-text" : ""}>{text}</p>
    )
}