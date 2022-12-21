document.addEventListener('click', async function(event) {
    /* LOCAL VARIABLES */
    const buttonID = event.target.dataset.index;

    /* Action for remove button click */
    if(event.target.classList.contains('heart-unfilled')) {
        event.target.classList.remove('heart-unfilled');
        event.target.classList.add('heart-filled');
        const response = await fetch('http://localhost:3000/contacts/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: event.target.dataset.index }),
        })
        .catch((error) => {
                console.error('Error:', error);
        });
    /* Action for thumbs-up button set */
    } else if (event.target.classList.contains('heart-filled')) {
        event.target.classList.remove('heart-filled');
        event.target.classList.add('heart-unfilled');
        const response = await fetch('http://localhost:3000/contacts/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: event.target.dataset.index }),
        })
        .catch((error) => {
                console.error('Error:', error);
        });
    }
});
