const addPet = async (event) => {
    event.preventDefault();
    const pet_name = document.querySelector('#PetName').value.trim();
    const breed = document.querySelector('#PetBreed').value.trim();
    const age = document.querySelector('#PetAge').value.trim();
    const image = document.querySelector('#PetImage').value.trim();

    if (pet_name && breed && age && image) {
        const response = await fetch(`/api/pets`, {
            method: 'POST',
            body: JSON.stringify({ pet_name, breed, age, image }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to add pet');
        }
    }
};

document
    .querySelector('#addPet')
    .addEventListener('click', addPet);