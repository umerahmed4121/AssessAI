import axios from 'axios';

export const signUp = async ({
  email,
  password,
  role,
  name,
  birthday
}) => {
  try {

    const response = await axios.post('/api/auth/email/signup', {
      email,
      password,
      role,
      name,
      birthday
    })
    return response.data
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error('User already exists');
      } else {
        throw new Error('Something went wrong');
      }
    }
  }

}