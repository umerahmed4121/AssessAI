export const confirmParticipant = async ({ userId, quizId}) => {

    try {
        const response = await fetch('/api/quiz/confirm_participant', {
            method: 'POST',
            body: JSON.stringify({ participantId: userId, quizId: quizId }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
    }

}