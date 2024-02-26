import axios from 'axios';

export const login = async ({
    email,
    password,
}) => {
    try {

        const response = await axios.post('/api/auth/email/login', {
            email,
            password,
        })
        return response.data
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                throw new Error('User not found');
            } else if (error.response.status === 401) {
                throw new Error('Invalid password');
            } else {
                throw new Error('Something went wrong');
            }
        }
    }

}