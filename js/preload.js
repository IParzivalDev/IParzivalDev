/*
----------------
FUNCTIONS
----------------
*/
function nav_button_select(id) {
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
-------------------
PROGRAMMER QUOTES
-------------------
*/
const programmerQuotes = [
  "In the world of programming, errors are opportunities to learn and grow.",
  "Well-written code is the best legacy a programmer can leave behind.",
  "Creativity is the secret ingredient in the art of programming.",
  "Patience and persistence are key to solving programming problems.",
  "The best programs are not only functional but also elegant and easy to understand.",
  "A programmer's success is measured by the quality of their solutions, not the quantity of lines of code.",
  "Teamwork and collaboration are essential to building great software projects.",
  "Every error is an opportunity to improve and strengthen your skills as a programmer.",
  "Programming is an endless journey of discovery and constant learning.",
  "A successful programmer is one who solves problems before they become crises.",
  "Programming is like a giant puzzle, and each line of code is a piece that fits into place.",
  "Curiosity is the driving force that compels a programmer to explore new technologies and innovative solutions.",
  "Do not fear change, embrace new technologies and adapt to them to stay relevant.",
  "Well-documented code is a gift to your future self and to the developers who come after you.",
  "Simplicity is the key to creating powerful and easy-to-maintain software.",
  "Programming is an art that allows you to turn abstract ideas into tangible realities.",
  "Continuous learning is essential in programming, as technology is constantly evolving.",
  "Passion for programming is the spark that ignites creativity and innovation.",
  "Do not be discouraged by challenges; each obstacle overcome makes you a stronger programmer.",
  "Success in programming is not just about writing code but about solving problems and making people's lives easier.",
];

const randomQuote = programmerQuotes[Math.floor(Math.random() * programmerQuotes.length)];

document.querySelector("#quote").innerHTML = randomQuote;
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
  nav_button_select(id);
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
        nav_button_select(id);
      }
    }
  });
});
/*
-----------------------
END - ON FOCUS SECTION
-----------------------
*/
