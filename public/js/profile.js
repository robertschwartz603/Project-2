const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
    const rating = document.querySelector('#project-rating').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    if (name && rating && description) {
      const response = await fetch(`/api/hotdogs`, {
        method: 'POST',
        body: JSON.stringify({ name, rating, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create hotog. you suck');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/hotdogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete hotdog');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  