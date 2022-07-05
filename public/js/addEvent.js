const createEvent = async (event) => {
  event.preventDefault();
  const date = document.querySelector('#event_date').value.trim();
  const time = document.querySelector('#event_time').value.trim();
  const location = document.querySelector('#event_location').value.trim();
  const user_id = document.querySelector('#user_id').value.trim();


  const response = await fetch('/api/events/', {
    method: 'POST',
    body: JSON.stringify({ date, time, location, user_id }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('#create_event')
  .addEventListener('submit', createEvent);