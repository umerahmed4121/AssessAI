export const getUserFromCookie = async () => {
    try {
      const res = await fetch('/api/auth/email/jwt', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.status === 200) {
        const data = await res.json()
        return data
      }
    } catch (error) {
      return null
    }

  }