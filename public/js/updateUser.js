const updateUser = async (event) => {
    event.preventDefault();
    const user_name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();

    if (user_name && email) {
        const response = await fetch(`/api/users`, {
            method: 'PUT',
            body: JSON.stringify({ user_name, email }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update user');
        }
    }
};

document
    .querySelector('#update-info')
    .addEventListener('click', updateUser);