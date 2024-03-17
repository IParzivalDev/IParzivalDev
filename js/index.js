/*
----------------
FUNCTIONS
----------------
*/
const setProgrammerQuote = (programmerQuotes) => {
  const randomQuote = programmerQuotes[Math.floor(Math.random() * programmerQuotes.length)];

  document.querySelector("#quote").innerHTML = randomQuote;
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
  switch (id) {
    case "about":
      document.querySelector("#nav_button_about").classList.add("selected");
      document.querySelector("#nav_button_experience").classList.remove("selected");
      document.querySelector("#nav_button_projects").classList.remove("selected");
      break;

    case "experience":
      document.querySelector("#nav_button_about").classList.remove("selected");
      document.querySelector("#nav_button_experience").classList.add("selected");
      document.querySelector("#nav_button_projects").classList.remove("selected");
      break;

    case "projects":
      document.querySelector("#nav_button_about").classList.remove("selected");
      document.querySelector("#nav_button_experience").classList.remove("selected");
      document.querySelector("#nav_button_projects").classList.add("selected");
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
  document.cookie = "lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  document.querySelector("#lang_selector_en").setAttribute("selected","");
} else {
  switch (getCookie("lang")) {
    case "en":
      fetch("./langs/en.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        document.querySelector("#lang_selector_en").setAttribute("selected","");
      });
      break;
    case "es":
      fetch("./langs/es.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        document.querySelector("#lang_selector_es").setAttribute("selected","");
      });
      break;
  
    default:
      fetch("./langs/en.json").then(response => response.json()).then(data => {
        changeLangTo(data);
        document.querySelector("#lang_selector_en").setAttribute("selected","");
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

      document.querySelector("#projects").appendChild(project);
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
const lang_selector = document.getElementById("lang_selector");

lang_selector.addEventListener("change",()=>{
  switch (lang_selector.value) {
    case "es":
      document.cookie = "lang=es; expires=Fri, 31 Dec 9999 23:59:59 GMT";

      window.location.reload();
      break;

    case "en":
      document.cookie = "lang=en; expires=Fri, 31 Dec 9999 23:59:59 GMT";

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