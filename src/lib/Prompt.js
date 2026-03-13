export function CreatePrompt(questionCount, topic, level, includeExplanations)
{
    return `Generate a quiz of ${questionCount} 
    questions on the topic "${topic}" at a "${level}" difficulty level. 
    Each question should have 4 options and clearly indicate the correct answer.
    ${includeExplanations ? " Include a short explanation for each answer." : ""} 
    Format the output as a JSON array with objects containing: "question", "options", "correct_index
    "${includeExplanations ? ', and "explanation"' : ""}.`;
}