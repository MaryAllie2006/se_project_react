export const signup = async (name, avatar, email, password) => {
    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, avatar, email, password }),
    });
    return response.json();
};

export const signin = async (email, password) => {
    const response = await fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};
