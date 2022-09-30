const darkScale = document.createElement("div");
const notificationContainer = document.createElement("div");
const closeNotificationContainer = document.createElement("div");
const closeNotification = document.createElement("p");
const welcomeMessage = document.createElement("h1");
const ul = document.createElement("ul");
const li = [];

for(let i = 0; i < 6; i++) {
    li[i] = document.createElement("li");
}

darkScale.setAttribute("id", "overlay");
notificationContainer.setAttribute("class", "notification-container");

welcomeMessage.textContent = `Welcome to Albion Roads!`;
closeNotification.textContent = `X`;

li[0].textContent = `The purpose of this website is to display tier information for every zone in roads.`;
li[1].textContent = `Currently it displays the tier for each chest, dungeon, and resource location.`;
li[2].textContent = `In future, I'd like to provide more detailed information (such as fading insight locations, hidden treasure locations, no. of resources (by tier), etc)
but as I want to have this out sooner rather than later, I decided to make further updates later down the line to include these.`;
li[3].textContent = `As for hideout zones, I will not be providing which guilds/alliances currently reside in these zones as I (and I'm sure many of you) feel it would be 
hugely disliked to publicize your hideout location.`;
li[4].textContent = `I have yet to gather information on every single road but it is my priority to do so.`;
li[5].textContent = `Everyone has access to this website without any barriers, and I hope that it is a useful tool.`; 

document.body.insertAdjacentElement('afterbegin', notificationContainer);
document.body.insertAdjacentElement('afterbegin', darkScale);
notificationContainer.insertAdjacentElement('afterbegin', closeNotificationContainer);
closeNotificationContainer.insertAdjacentElement('afterbegin', closeNotification);
notificationContainer.insertAdjacentElement('beforeend', welcomeMessage);
notificationContainer.insertAdjacentElement('beforeend', ul);

for(let i = 0; i < 6; i++) {
    ul.insertAdjacentElement('beforeend', li[i]);
}

document.querySelector("#overlay").classList.add("darkscale");

closeNotification.addEventListener('click', () => {
    if(notificationContainer.hasAttribute("class", "show-notification")) {
        notificationContainer.classList.remove("show-notification");
    }

    notificationContainer.classList.add("hide-notification");

    setTimeout( () => {
        document.querySelector('.hide-notification').style.display = 'none';
    }, 750);
    
    document.querySelector("#overlay").classList.remove("darkscale");
});

document.querySelector("#overlay").addEventListener('click', () => {
    if(notificationContainer.hasAttribute("class", "show-notification")) {
        notificationContainer.classList.remove("show-notification");
    }

    notificationContainer.classList.add("hide-notification");

    setTimeout( () => {
        document.querySelector('.hide-notification').style.display = 'none';
    }, 750);

    document.querySelector("#overlay").classList.remove("darkscale");
}); 

window.addEventListener('load', () => {
    localStorage.setItem('notificationDisplayed', true); 
});

if(localStorage.getItem('notificationDisplayed')) {
    notificationContainer.style.display = 'none';
    document.querySelector("#overlay").classList.remove("darkscale");
}