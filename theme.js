const btnTheme = document.getElementById('theme-toggle');
const btnNewProject = document.getElementById('add-new-progect');
const container = document.querySelector('section#projects .projects');
const btnDelete = document.getElementById('delete-last');
const btnHide = document.getElementById('hide-projects');
const body = document.body;

if (!btnTheme) {
    console.error('theme.js: кнопка #theme-toggle не найдена — скрипт не выполняется');
} else {
    const savedTheme = localStorage.getItem('theme') || 'theme-light';
    body.classList.add(savedTheme);

    btnTheme.addEventListener('click', () => {
        const isDark = body.classList.contains('theme-dark');
        body.classList.toggle('theme-dark', !isDark);
        body.classList.toggle('theme-light', isDark);
        localStorage.setItem('theme', isDark ? 'theme-light' : 'theme-dark');
    });
}
if (!container) {
    console.error('theme.js: контейнер section#projects .projects не найден — скрипт не выполняется');
} else {
    if (!localStorage.getItem('projects')) {
        const initialCards = [];
        container.querySelectorAll('article.project-card').forEach(card => {
            initialCards.push({
                title: card.querySelector('.project-card__title')?.textContent || '',
                description: card.querySelector('.project-card__stack')?.textContent || '',
                icon: card.querySelector('.project-card__icon')?.textContent || '📁'
            });
        });
        localStorage.setItem('projects', JSON.stringify(initialCards));
    }

    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    container.innerHTML = '';   
    savedProjects.forEach(project => {
        container.appendChild(createCard(project.title, project.description, project.icon));
    });
    if (localStorage.getItem('projectsHidden') === 'true') {
        container.classList.add('hidden');
    }
}

function createCard(title, description, iconText) {
    const card = document.createElement('article');
    card.className = 'project-card';

    const icon = document.createElement('div');
    icon.className = 'project-card__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = iconText.trim() || '📁';

    const bodyBox = document.createElement('div');
    bodyBox.className = 'project-card__body';

    const h3 = document.createElement('h3');
    h3.className = 'project-card__title';
    h3.textContent = title.trim() || 'Без названия';

    const p = document.createElement('p');
    p.className = 'project-card__stack';
    p.textContent = description.trim() || 'Без описания';

    const link = document.createElement('a');
    link.className = 'project-card__btn';
    link.href = '#';
    link.textContent = 'Подробнее';

    bodyBox.appendChild(h3);
    bodyBox.appendChild(p);
    bodyBox.appendChild(link);

    card.appendChild(icon);
    card.appendChild(bodyBox);
    return card;
}

if (!btnNewProject) {
    console.error('theme.js: кнопка #add-new-progect не найдена — скрипт не выполняется');
} else if (!container) {
    console.error('theme.js: контейнер section#projects .projects не найден — скрипт не выполняется');
} else {
    btnNewProject.addEventListener('click', () => {
        const title = prompt('Название проекта:');
        if (title === null) return;
        const description = prompt('Описание проекта:');
        if (description === null) return;
        const iconText = prompt('Иконка проекта (эмодзи):');
        if (iconText === null) return;
        container.appendChild(createCard(title, description, iconText));
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push({ title, description, icon: iconText });
        localStorage.setItem('projects', JSON.stringify(projects));
    });
}
if (!btnDelete) {
    console.error('theme.js: кнопка #delete-last не найдена — скрипт не выполняется');
} else {
    btnDelete.addEventListener('click', () => {
        const cards = document.querySelectorAll('article.project-card');
        if (cards.length === 0) {
            console.log('Нет проектов для удаления');
            alert('Список пуст');
            return;
        }
        cards[cards.length - 1].remove();
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.pop();
        localStorage.setItem('projects', JSON.stringify(projects));
    });
}
if (!btnHide) {
    console.error('theme.js: кнопка #hide-projects не найдена — скрипт не выполняется');
} else if (!container) {
    console.error('theme.js: контейнер section#projects .projects не найден — скрипт не выполняется');
} else {
    btnHide.addEventListener('click', () => {
        const nowHidden = container.classList.toggle('hidden');
        localStorage.setItem('projectsHidden', nowHidden);
    });
}