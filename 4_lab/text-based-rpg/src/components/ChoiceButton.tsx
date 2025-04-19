interface ChoiceButtonProps {
    choiceText: string;
    onChoiceClicked: () => void;
    disabled?: boolean;
}

export default function ChoiceButton({ choiceText, onChoiceClicked, disabled = false } : ChoiceButtonProps) {
    return (
        <button className="choice-btn" disabled = {disabled} onClick={onChoiceClicked}>
            {choiceText}
        </button>
    )
}