
import { redirect } from 'next/navigation';

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


export const getQuizzesByParticipant = async (user_id) => {

    try {
        const response = await fetch(`/api/quiz/get_by_participant`, {
            method: 'POST',
            body: JSON.stringify({ participant_id: user_id }),
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

export const createResponse = async ({userId, quizId}) => {

      
    try {
        const response = await fetch(`/api/quiz/create_response`, {
            method: 'POST',
            body: JSON.stringify({ participant_id:userId, quiz_id:quizId }),
            headers: {
                'Content-Type': 'application/json'
            },

        });
        if (response.ok) {
            const data = await response.json();
            if (data.isSuccess) {
                window.location.href = data.url;
            }
            
        }
    } catch (error) {
        console.error('Error:', error);
    }

}

export const getQuizForResponse = async (token) => {
    
        try {
            const response = await fetch(`/api/quiz/get_for_response`, {
                method: 'POST',
                body: JSON.stringify({ token }),
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

export const submitResponse = async (data) => {
    
        try {
            const response = await fetch('/api/quiz/submit_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    
    }