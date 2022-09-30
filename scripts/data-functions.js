import {roadData} from './road-data.js';

const roadsList = document.querySelector(".grid__roads-list");
const roadDescription = document.querySelector(".grid__road-description");
const roadMap = document.querySelector(".grid__road-map");

const search = document.querySelector(`input[type='search']`);

search.addEventListener('focusin', () => {
    search.parentNode.style.borderBottom = '2px solid #e9631b';
});
search.addEventListener('focusout', () => {
    search.parentNode.style.borderBottom = '2px solid #2e2e2e';
});

const getRoadData = JSON.parse(roadData);
JSON.stringify(getRoadData);

// display all roads or roads filtered based on search value
export const displayNames = (word = "") => {
    if(word === "")
    {
        roadsList.innerHTML = ""

        getRoadData.map(road => {
            roadsList.insertAdjacentHTML('beforeend', `<li class='road' id='${road.id}'><span class='item-container' id='${road.id}'>${road.roadName}</span></li>`);
        }).join("");
    }
    else
    {
        roadsList.innerHTML = "";
    
        word = cleanupWord(word);
    
        const filtered = filterData(word);

        filtered.forEach(item => {
            roadsList.insertAdjacentHTML("beforeend", `<li class='road' id='${item.id}'><span class='item-container' id='${item.id}'>${item.roadName}</span></li>`);
        });
    }
}

const hideInfo = () => {
    roadDescription.style.display = 'none';
    roadMap.style.display = 'none';
}

const showInfo = () => {
    roadDescription.style.display = 'block';
    roadMap.style.display = 'block';
}

// displays information on clicked road
export const displayInfo = () => {
    // set initial state of info
    hideInfo();

    // store id of clicked items to allow info of newly clicked item to display immediately or disappear if same id was clicked
    let previousRoadId = [];
    // store element of clicked items to style the background colour
    let previousRoadElement = [];
    let i = 0;
    
    roadsList.addEventListener('click', (e) => {
        if(e.target.matches('li') || e.target.matches('span')) {
            if(previousRoadId.length === 0) 
            {
                e.target.style.backgroundColor = '#e9631b';
                insertData(e.target.id);
                showInfo();

                previousRoadId.push(e.target.id);
                previousRoadElement.push(e.target);
                i++;
            } else if(e.target.id !== previousRoadId[i - 1]) {
                previousRoadElement[i - 1].style.backgroundColor = null;
                e.target.style.backgroundColor = '#e9631b';
                removeData();
                insertData(e.target.id);
                showInfo();

                previousRoadId.push(e.target.id);
                previousRoadElement.push(e.target);
                i++;
            } else {
                e.target.style.backgroundColor = null;
                hideInfo();
                removeData();
                
                previousRoadId.length = 0;
                previousRoadElement.length = 0;
                i = 0;
            }
        }
    });
}

// delete data of currently selected list item to avoid duplication
const removeData = () => {
    const getRoadDescription = roadDescription.querySelectorAll(".road-description");
    const getRoadMap = roadMap.querySelector(".road-map");

    if(getRoadDescription !== null && getRoadMap !== null) {
        getRoadDescription.forEach(description => {
            description.remove();
        });
    
        getRoadMap.remove();
    }   
}

/* 
    @param (item) the specified index in 'road-data.js'
    generate number of hover over icons needed for each road map
*/
const generateHoverOverIcons = (item) => {
    for(let i = 0; i < getRoadData[item].noOfResourceSpots; i++) {
        // create a div container per hover over icon
        const hoverOverIconDiv = document.createElement('div');
        hoverOverIconDiv.setAttribute('class', `hover-over-icon hover-over-icon-${i + 1}`);
        roadMap.querySelector(".road-map").appendChild(hoverOverIconDiv);

        // insert tooltip of resource info into their containing div's
        hoverOverIconDiv.insertAdjacentHTML('beforeend', 
        `<img id='resource-info-img' src='${Object.values(getRoadData[item].resourceTooltipImages.image[i])}' alt='Resource Information'>`);
    }

    positionHoverOverIcons(item);
}

/* 
    @param (item) the specified index in 'road-data.js'
    position each hoverOverIconDiv based on xy coordinates of the resource spots
*/
const positionHoverOverIcons = (item) => {
    for(let i = 0; i < getRoadData[item].noOfResourceSpots; i++) {
        const x = getRoadData[item].resourceSpotCoords.coordinate[i].x;
        const y = getRoadData[item].resourceSpotCoords.coordinate[i].y;

        roadMap.querySelector(`.hover-over-icon-${i + 1}`).style.position = 'absolute';
        roadMap.querySelector(`.hover-over-icon-${i + 1}`).style.left = `${x}%`;
        roadMap.querySelector(`.hover-over-icon-${i + 1}`).style.top = `${y}%`;
    }
}

/* 
    @param (item) the specified index in 'road-data.js'
    insert the HTML for the description and map img
*/
const insertData = (item) => {
    roadDescription.insertAdjacentHTML('beforeend',
    `<div class='road-description'>
        <h2>${getRoadData[item].roadName}</h2>
    </div>
    <div class='road-description'>
        <h3>Zone Tier:</h3>
        <h3 style='color: ${applyZoneTierColors(item)}'>${getRoadData[item].zoneTier}</h3>
    </div>`);

    roadMap.insertAdjacentHTML('beforeend', 
    `<div class='road-map'>
        <img src='${getRoadData[item].roadMap}' alt='Road Map'>
    </div>`);

    generateHoverOverIcons(item);
}

// apply colour styling based on zone tier for each road
const applyZoneTierColors = (item) => {
    let colour = '';
    if(getRoadData[item].zoneTier === '4') 
    {
        colour = '#3c78d8';
    }
    else if(getRoadData[item].zoneTier === '5') 
    {
        colour = '#cc0000';
    }
    else if(getRoadData[item].zoneTier === '6') 
    {
        colour = '#e69138';
    }
    else if(getRoadData[item].zoneTier === '7') 
    {
        colour = '#f1c232';
    }
    else if(getRoadData[item].zoneTier === '8') 
    {
        colour = '#fff';
    }

    return colour;
}

/*
    @param (item) the parent node of the selected element in the list
    change background colour of list elements when clicked
*/
const changeListItemBackground = (item) => {

}

const cleanupWord = (word) => {
    return word.toLowerCase().trim();
}

const filterData = (word) => {
    return getRoadData.filter((item) => {
        return item.roadName.toLowerCase().includes(word);
    });
}

search.addEventListener("input", () => {
    displayNames(search.value);
});

const resetSearchValue = () => {
    return search.value = "";
}

window.onload = resetSearchValue();