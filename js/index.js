/*
----------------
FUNCTIONS
----------------
*/
const setProgrammerQuote = (programmerQuotes) => {
  const quote = document.querySelector("#quote");
  const randomQuote = programmerQuotes[Math.floor(Math.random() * programmerQuotes.length)];

  quote.innerHTML = randomQuote;
}

const getCookie = (cookieName) => {
  let name = cookieName + "=";
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
}

const changeLangTo = (lang) => {
  for (const k in lang) {
    if (lang.hasOwnProperty(k)) {
      const v = lang[k];
      document.querySelector(`#${k}`).innerHTML = v;
    }
  }
}

const navButtonSelect = (id) => {
  const navButtonAbout = document.querySelector("#nav_button_about");
  const navButtonExperience = document.querySelector("#nav_button_experience");
  const navButtonProjects = document.querySelector("#nav_button_projects");
  switch (id) {
    case "about":
      navButtonAbout.classList.add("selected");
      navButtonExperience.classList.remove("selected");
      navButtonProjects.classList.remove("selected");
      break;

    case "experience":
      navButtonAbout.classList.remove("selected");
      navButtonExperience.classList.add("selected");
      navButtonProjects.classList.remove("selected");
      break;

    case "projects":
      navButtonAbout.classList.remove("selected");
      navButtonExperience.classList.remove("selected");
      navButtonProjects.classList.add("selected");
      break;

    default:
      break;
  }
}
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
if (getCookie("lang") === null) {
  const langSelectorEn = document.querySelector("#lang_selector_en")
  document.cookie = "lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  langSelectorEn.setAttribute("selected","");
} else {
  const langSelectorEn = document.querySelector("#lang_selector_en")
  const langSelectorEs = document.querySelector("#lang_selector_es")
  const langSelectorTr = document.querySelector("#lang_selector_tr")
  switch (getCookie("lang")) {
    case "en":
      fetch("./langs/en.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        langSelectorEn.setAttribute("selected","");
      });
      break;
    case "es":
      fetch("./langs/es.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        langSelectorEs.setAttribute("selected","");
      });
      break;

    case "tr":
      fetch("./langs/tr.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        langSelectorTr.setAttribute("selected","");
      });
      break;
  
    default:
      fetch("./langs/en.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        langSelectorEn.setAttribute("selected","");
      });
      break;
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
if (getCookie("lang") !== null) {
  switch (getCookie("lang")) {
    case "en":
      fetch("./langs/en_quotes.json").then(response => response.json()).then(programmerQuotes => {
        setProgrammerQuote(programmerQuotes);
      });
      break;

    case "es":
      fetch("./langs/es_quotes.json").then(response => response.json()).then(programmerQuotes => {
        setProgrammerQuote(programmerQuotes);
      });
      break;

    case "tr":
      fetch("./langs/tr_quotes.json").then(response => response.json()).then(programmerQuotes => {
        setProgrammerQuote(programmerQuotes);
      });
      break;
  
    default:
      fetch("./langs/en_quotes.json").then(response => response.json()).then(programmerQuotes => {
        setProgrammerQuote(programmerQuotes);
      });
      break;
  }
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
fetch("https://api.github.com/users/IParzivalDev/repos?per_page=20&page=1", {
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
}).then((response) => response.json())
  .then((data) => {
    for (const repo of data) {
      const owner = repo.owner.login;
      const name = repo.name;
      const description = repo.description;
      const stars = repo.stargazers_count;
      const watchers = repo.watchers_count;
      const forks = repo.forks_count;
      const url = repo.html_url;
      const projects = document.querySelector("#projects");

      const project = document.createElement("div");
      project.innerHTML = `
        <a href="${url}" target="_blank">
          <h1 class="project_name">
            <span class="project_owner">${owner}/</span>${name}
          </h1>
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
      project.classList.add("project");

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
window.addEventListener("hashchange", () => {
  let url = window.location.href;
  let id = url.substring(url.indexOf("#") + 1);
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
window.addEventListener("scroll", () => {
  let ids = ["about", "experience", "projects"];

  ids.forEach(function (id) {
    let element = document.querySelector(`#${id}`);

    if (element) {
      let rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > window.innerHeight) {
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
const langSelector = document.getElementById("lang_selector");

langSelector.addEventListener("change",()=>{
  switch (langSelector.value) {
    case "es":
      document.cookie = "lang=es; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      window.location.reload();
      break;

    case "en":
      document.cookie = "lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      window.location.reload();
      break;
    
    case "tr":
      document.cookie = "lang=tr; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      window.location.reload();
      break;

    default:
      document.cookie = "lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      window.location.reload();
      break;
  }
})
/* 
-------------------
END - CHANGE LANG
-------------------
*/