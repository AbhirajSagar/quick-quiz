export function CreatePrompt(questionCount, topic, level, includeExplanations)
{
    return `Generate a quiz of ${questionCount} 
    questions on the topic "${topic}" at a "${level}" difficulty level. 
    Each question should have 4 options and clearly indicate the correct answer.
    ${includeExplanations ? " Include a short explanation for each answer." : ""} 
    Format the output as a JSON array with objects containing: "question", "options", "correct_index
    "${includeExplanations ? ', and "explanation"' : ""}. Make sure correct_index is not same more than at maximum 3 consecutive times`;
}

export function CreateTextPrompt(text, questionCount, level, includeExplanations)
{
    return `Generate a quiz of ${questionCount} questions based on the provided text below, at a "${level}" difficulty level.
    Each question should have 4 options and clearly indicate the correct answer.
    ${includeExplanations ? " Include a short explanation for each answer." : ""} 
    Format the output as a JSON array with objects containing: "question", "options", "correct_index"
    ${includeExplanations ? ', and "explanation"' : ""}. Make sure correct_index is not same more than at maximum 3 consecutive times

    Text:
    """
    ${text}
    """`;
}