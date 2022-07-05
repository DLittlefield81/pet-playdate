const deleteEvent = async (event) => {
    event.preventDefault();
    const id = event.target.previousSibling.innerText
    console.log(id)
    if (id) {
        const response = await fetch(`/api/events`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
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


if(document.querySelector(".del-event") !== null) {
    for(let i = 0; i < document.querySelectorAll(".del-event").length; i++) {
        document.querySelectorAll(".del-event")[i].addEventListener("click", deleteEvent)
    }
}