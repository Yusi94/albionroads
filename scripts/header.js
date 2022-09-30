const header = document.createElement("header");
const toggleHeader = document.createElement("div");
// const linkContainer = document.createElement("div");
const vidContainer = document.querySelector(".video-container");
// const homeLink = document.createElement("a");
// const roadMapsLink = document.createElement("a");

// homeLink.setAttribute("href", "index.html");
// roadMapsLink.setAttribute("href", "#roads");
// linkContainer.setAttribute("id", "link-container");

// const homeLinkText = document.createTextNode("Home");
// homeLink.appendChild(homeLinkText);

// const roadMapsLinkText = document.createTextNode("Road Maps");
// roadMapsLink.appendChild(roadMapsLinkText);

// linkContainer.insertAdjacentElement("afterbegin", homeLink);
// linkContainer.insertAdjacentElement("beforeend", roadMapsLink);

toggleHeader.setAttribute("class", "header-toggle");

document.body.insertAdjacentElement("afterbegin", header);
// headerContainer.insertAdjacentElement("afterbegin", linkContainer);
header.insertAdjacentElement("beforeend", vidContainer);
header.insertAdjacentElement("beforeend", toggleHeader);

toggleHeader.addEventListener('click', () => {
    vidContainer.classList.toggle("hide-video-container");
    toggleHeader.classList.toggle("rotate-header-toggle");
});