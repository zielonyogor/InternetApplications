import React from "react";
import story from "@/assets/story.json"
import Text from "./Text";
import StoryNode from "../types/StoryNode";
import ChoiceButton from "./ChoiceButton";
import Choice from "../types/Choice";


export default function RPGEngine() {
    const [currentNode, setCurrentNode] = React.useState<StoryNode>(story["start"]);
    const [lineIndex, setLineIndex] = React.useState(-1);
    const [readLines, setReadLines] = React.useState<Array<{ text: string, isChoice?: boolean }>>([]);

    const storyContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const container = storyContainerRef.current;
        if(container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [readLines]);

    function onClickContinue() {
        if(lineIndex < currentNode.text.length - 1) {
            setReadLines(prevLines => [...prevLines, {text: currentNode.text[lineIndex + 1], isChoice: false}]);
            setLineIndex(prevIndex => prevIndex + 1);
        }
    }

    function onChoiceClicked(selectedChoice : Choice) {
        setReadLines(prevLines => [...prevLines, {text: selectedChoice.text, isChoice: true}]);
        if(selectedChoice.successChance !== undefined) {
            const randomVal = Math.random();
            if(selectedChoice.successChance >= randomVal) {
                setCurrentNode(story[selectedChoice.failId]);
            }
            else {
                setCurrentNode(story[selectedChoice.nextId]);
            }
        }
        else {
            setCurrentNode(story[selectedChoice.nextId]);
        }
        setLineIndex(-1);
    }

    return (
        <div className="rpg-engine-container">
            <div className="story-container" ref={storyContainerRef}>
                {readLines?.map((lineObj, index) => (
                    <Text key={index} text={lineObj.text} isChoice={lineObj.isChoice} />
                ))}
            </div>
            <div className="choices-container">
                {(lineIndex === currentNode.text.length - 1) && currentNode.choices && (
                    currentNode.choices.map((choice, index) => (
                        <ChoiceButton key={index} choiceText={choice.text} onChoiceClicked={() => {onChoiceClicked(choice)}} />
                    ))
                )}
            </div>
            <button className="continue-btn" onClick={onClickContinue}>Continue</button>
        </div>
    )
}