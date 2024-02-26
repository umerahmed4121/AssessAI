

export const getParticipants = async (user_id) => {

    try {
        const response = await fetch('/api/user/all',{
            method: 'POST',
            body: JSON.stringify({ user_id:user_id }),
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