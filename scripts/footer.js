const footer = document.createElement("footer");
const footerContent = document.createElement("div");
const copyright = document.createElement("p");
const slogan = document.createElement("p");

const infoButton = document.createElement('button');
const infoIcon = document.createElement('p');

footerContent.setAttribute("class", "footer-content-container");
infoButton.setAttribute("class", "info-button");

copyright.textContent = `© 2021`;
slogan.textContent = `Making your roads experience easier`;
infoIcon.textContent = `i`;

document.body.insertAdjacentElement('beforeend', footer);
footer.insertAdjacentElement("beforeend", footerContent);

infoButton.appendChild(infoIcon);
footerContent.appendChild(copyright);
footerContent.appendChild(slogan);
footerContent.appendChild(infoButton);

infoButton.addEventListener('click', () => {
    document.querySelector("#overlay").classList.add("darkscale");
    document.querySelector(".notification-container").classList.remove("hide-notification");

    document.querySelector('.notification-container').style.display = 'flex';
});