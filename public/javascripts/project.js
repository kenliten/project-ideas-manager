function updateProject(id) {
    const body = {};
    body.name = document.querySelector('#name-input').value;
    body.description = document.querySelector('#description-input').value;
    body.pros = document.querySelector('#pros-input').value;
    body.cons = document.querySelector('#cons-input').value;
    body.title = document.querySelector('#title-input').value;
    body._id = id;

    fetch('/projects/' + id+'/json', {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(data => {
        data.json().then(result => {
            if (result.success) {
                alert('Success!');
            } else {
                alert('Error deleting the project');
            }
        });
    }).catch(err => {
        alert('Error: ' + err.message);
    });
}

function saveProject() {
    const body = {};
    body.name = document.querySelector('#name-input').value;
    body.description = document.querySelector('#description-input').value;
    body.pros = document.querySelector('#pros-input').value;
    body.cons = document.querySelector('#cons-input').value;
    body.title = document.querySelector('#title-input').value;

    fetch('/projects/json', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }).then(data => {
        data.json().then(result => {
            if (result.success) {
                window.location = '/projects';
            } else {
                alert('Error creating the project');
            }
        });
    }).catch(err => {
        alert('Error: ' + err.message);
    });
}