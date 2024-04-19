const langList = ['en', 'es', 'tr', 'pt'];

/*
----------------
FUNCTIONS
----------------
*/
const setProgrammerQuote = (programmerQuotes) => {
    const quote = document.querySelector('#quote');
    const randomQuote = programmerQuotes[Math.floor(Math.random() * programmerQuotes.length)];

    quote.innerHTML = randomQuote;
};

const getCookie = (cookieName) => {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null;
};

const changeLangTo = (lang) => {
    for (const k in lang) {
        if (lang.hasOwnProperty(k)) {
            const v = lang[k];
            document.querySelector(`#${k}`).innerHTML = v;
        }
    }
};

const navButtonSelect = (id) => {
    const ids = ['about', 'experience', 'projects'];
    const navButtons = document.querySelectorAll('#nav_button');

    if (ids.includes(id)) {
        navButtons.forEach((navButton) => {
            navButton.classList.remove('selected');
            if (navButton.getAttribute('btn-id') === id) {
                navButton.classList.add('selected');
            }
        });
    }
};
/*
----------------
END - FUNCTIONS
----------------
*/

/*
--------------
TRANSLATIONS
--------------
*/
if (getCookie('lang') === null) {
    const langSelectorEn = document.querySelector('#lang_selector_en');

    document.cookie = 'lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    langSelectorEn.setAttribute('selected', '');
} else {
    const langSelectors = document.querySelectorAll('.lang_select');
    const langCookie = getCookie('lang');

    if (langList.includes(langCookie)) {
        langSelectors.forEach((langSelector) => {
            if (langSelector.getAttribute('value') === langCookie) {
                fetch(`./langs/${langCookie}.json`)
                    .then((response) => response.json())
                    .then((data) => {
                        changeLangTo(data);
                        langSelector.setAttribute('selected', '');
                    });
            }
        });
    }
}

/*
-------------------
END - TRANSLATIONS
-------------------
*/

/*
-------------------
PROGRAMMER QUOTES
-------------------
*/
if (getCookie('lang') !== null) {
    langList.forEach((lang) => {
        if (getCookie('lang') === lang) {
            fetch(`./langs/${lang}_quotes.json`)
                .then((response) => response.json())
                .then((programmerQuotes) => {
                    setProgrammerQuote(programmerQuotes);
                });
        }
    });
}

/*
------------------------
END - PROGRAMMER QUOTES
------------------------
*/

/* 
------------------
GET GITHUB REPOS
------------------
*/
fetch('https://api.github.com/users/IParzivalDev/repos?per_page=20&page=1', {
    headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        'Authorization':'Bearer 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',
    },
})
    .then((response) => response.json())
    .then((data) => {
        for (const repo of data) {
            const owner = repo.owner.login;
            const name = repo.name;
            const description = repo.description;
            const stars = repo.stargazers_count;
            const watchers = repo.watchers_count;
            const forks = repo.forks_count;
            const url = repo.html_url;
            const projects = document.querySelector('#projects');

            const project = document.createElement('div');
            project.innerHTML = `
        <a href="${url}" target="_blank">
          <h2 class="project_name">
            <span class="project_owner">${owner}/</span>${name}
          </h2>
          <p class="project_description">${description}</p>
          <div class="project_other">
            <div title="${stars} Stars" class="project_stars">
              <i class="bx bxs-star"></i>
              <span>${stars}</span>
            </div>
            <div title="${watchers} Watchers" class="project_watchings">
              <i class="bx bx-tv"></i>
              <span>${watchers}</span>
            </div>
            <div title="${forks} Forks" class="project_forks">
              <i class="bx bx-git-repo-forked"></i>
              <span>${forks}</span>
            </div>
          </div>
        </a>`;
            project.classList.add('project');

            projects.appendChild(project);
        }
    });

/*
-----------------------
END - GET GITHUB REPOS 
-----------------------
*/

/* 
------------
CHANGE HASH
------------
*/
window.addEventListener('hashchange', () => {
    let url = window.location.href;
    let id = url.substring(url.indexOf('#') + 1);
    navButtonSelect(id);
});
/* 
-------------------
END - CHANGE HASH
-------------------
*/

/*
-----------------
ON FOCUS SECTION
-----------------
*/
window.addEventListener('scroll', () => {
    let ids = ['about', 'experience', 'projects'];

    ids.forEach(function (id) {
        let element = document.querySelector(`#${id}`);

        if (element) {
            let rect = element.getBoundingClientRect();

            if (rect.bottom <= window.innerHeight / 2 || rect.top <= window.innerHeight / 2) {
                navButtonSelect(id);
            }
        }
    });
});
/*
-----------------------
END - ON FOCUS SECTION
-----------------------
*/

/* 
--------------
CHANGE LANG
--------------
*/
const langSelector = document.getElementById('lang_selector');

langSelector.addEventListener('change', () => {
    langList.forEach((lang) => {
        if (langSelector.value === lang) {
            document.cookie = `lang=${lang}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

            window.location.reload();
        }
    });
});
/* 
-------------------
END - CHANGE LANG
-------------------
*/

document.addEventListener('mousemove', (e) => {
    let cursor = document.getElementById('custom-cursor');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});


// si ves esto, eres guapo.

// ¿Porqué sigues leyendo mi código? ¡¿Acaso quieres copiarme, EH?!.

// Ya vete de aquí y escribe tu propio código bro, es malo copiar código de los demás.

// ¡¿ENSERIO SIGUES LEYENDO?! nah bro, que copión. Seguro tu página web tiene puro código git clone. XDDDDDDDD.