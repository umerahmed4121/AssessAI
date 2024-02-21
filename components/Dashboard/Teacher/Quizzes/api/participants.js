export const getParticipants = async () => {

    try {
        const response = await fetch('/api/user/all');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error:', error);
    }

}