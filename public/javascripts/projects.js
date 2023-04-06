let projects = [];

function sortProjects(a, b) {
    return a.name < b.name ? -1 : b.name < a.name ? 1 : 0
};

function filterProjects() {
    const search = document.querySelector('#search').value.toLowerCase();
    showProjects(projects.filter(p => p.name.toLowerCase().includes(search) || p.title.toLowerCase().includes(search)).sort(sortProjects))
}

function showProjects(arr) {
    document.querySelector('#projects-container').innerHTML = '';

    arr.forEach((project, i) => {
        const row = document.createElement('tr');
        const numberCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const titleCell = document.createElement('td');
        const actionsCell = document.createElement('td');

        numberCell.innerText = '' + (i + 1);
        nameCell.innerText = project.name;
        titleCell.innerText = project.title;

        const button = document.createElement('button');
        button.className = "btn btn-outline-danger";
        button.textContent = 'Delete';
        button.onclick = () => {
            deleteProject(project._id);
        }

        actionsCell.appendChild(button);

        const a = document.createElement('a');
        a.href = `/projects/${project._id}`
        a.className = "btn btn-primary ms-2";
        a.textContent = 'Details';

        actionsCell.appendChild(a);

        row.appendChild(numberCell);
        row.appendChild(titleCell);
        row.appendChild(nameCell);
        row.appendChild(actionsCell);

        document.querySelector('#projects-container').appendChild(row);
    });
}

function loadProjects() {
    fetch('/projects/json').then(data => {
        data.json().then(proj => {
            projects = proj;
            showProjects(projects.sort(sortProjects));
        });
    });
}

function deleteProject(id) {
    fetch('/projects/'+id, { method: 'DELETE' }).then(data => {
        data.json().then(result => {
            if (result.success) {
                loadProjects();
            } else {
                alert('Error deleting the project');
            }
        });
    }).catch(err => {
        alert('Error: '+ err.message);
    });
}

window.onload = () => {
    loadProjects();
}