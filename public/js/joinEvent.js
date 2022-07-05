const loginFormHandler = async (event) => {
    event.preventDefault();
    const urlArr = window.location.href.split("/");
    const id = urlArr[urlArr.length - 1];

    if (id) {
      const response = await fetch('/api/events/', {
        method: 'PUT',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

document
  .querySelector('#join-event')
  .addEventListener('click', loginFormHandler);