const removePet = async (event) => {
    event.preventDefault();
    const pet_name = event.target
        .previousSibling
        .previousSibling
        .previousSibling
        .previousSibling
        .innerText;
    if (pet_name) {
        const response = await fetch(`/api/pets`, {
            method: 'DELETE',
            body: JSON.stringify({ pet_name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to remove pet');
        }
    }
};


if(document.querySelector(".remove-btn") !== null) {
    for(let i = 0; i < document.querySelectorAll(".remove-btn").length; i++) {
        document.querySelectorAll(".remove-btn")[i].addEventListener("click", removePet)
    }
}