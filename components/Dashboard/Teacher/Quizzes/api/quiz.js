export const createQuiz = async (quiz) => {

    try {
        const response = await fetch('/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

export const updateQuiz = async (quiz) => {

    try {
        const response = await fetch('/api/quiz', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
    }

}


export const getQuizzesByCreator = async (user_id) => {

    try {
        console.log("user_id", user_id);
        const response = await fetch(`/api/quiz/get_by_creator`, {
            method: 'POST',
            body: JSON.stringify({ creator_id: user_id }),
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

export const getResponsesOfQuiz = async ({creator_id, quiz_id}) => {

    try {
        const response = await fetch(`/api/quiz/get_responses`, {
            method: 'POST',
            body: JSON.stringify({ creator_id: creator_id, quiz_id: quiz_id}),
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
export const assessQuizWithGpt = async (quiz_id) => {

    try {
        const response = await fetch(`/api/quiz/assess_with_gpt`, {
            method: 'POST',
            body: JSON.stringify({ quiz_id: quiz_id}),
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

