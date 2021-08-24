
//get the numbers of sections
let arrlength = document.querySelectorAll('section').length;
let blocking = true; //blocking of functions
// creating views and assiging classes
function createNavElements() {
    //console.log(arrlength);
    let listitem = [];
    let listitemlink = [];
    let ItemLinkFlag;
    for (let x = 0; x < arrlength; x++) {
        listitem[x] = document.createElement('li');
        listitemlink[x] = document.createElement('a');
        let xinc = x + 1;
        listitem[x].setAttribute("class", "listnavelement" + xinc);
        listitemlink[x].setAttribute("class", "listnavlinkelement" + xinc);
        listitemlink[x].textContent = document.querySelector('#section' + xinc).getAttribute('data-nav');
    }
    for (let o = 0; o < listitem.length; o++) {
        document.querySelector('#navbar__list').appendChild(listitem[o]);
        ItemLinkFlag = listitem[o].className;
        document.querySelector('.' + ItemLinkFlag).appendChild(listitemlink[o]);
    }
}


createNavElements(); // creationg list elements
//creating event listeners
let listitemln = [];
listitemln = document.querySelectorAll('#navbar__list li a');
for (let item of listitemln) {
    let varflag = '.' + item.className;

    document.querySelector(varflag).addEventListener("click", clickElement);
    document.querySelector(varflag).addEventListener("mouseover", hoverElement);
    document.querySelector(varflag).addEventListener("mouseout", hoveroutElement);
}

//styles as css variables
let r = document.querySelector(':root');
let rs = getComputedStyle(r);
let rss = rs.getPropertyValue('--color-val');
let rsst = rs.getPropertyValue('--color-backgr');

let dimension1 = document.querySelector('.page__header').getBoundingClientRect().top;
let dimensionRound1 = Math.floor(dimension1);

//onscroll function
window.onscroll = function() {
    myFunction()
};

//determining the available sections
let sections = [];
for (let y = 1; y <= arrlength; y++) {
    sections.push("#section" + y);
}

// scrolling section determination function
function myFunction() {

    if (blocking) {
        let arrflag = sections;
        for (let variable of sections) {
            if (Math.floor(document.querySelector(variable).getBoundingClientRect().top) > -250 && Math.floor(document.querySelector(variable).getBoundingClientRect().top) <= 250) {
                strx = document.querySelector(variable).id;
                let matches = strx.match(/\d+/g); //section number inview
                let num = matches[0];
                document.querySelector(".listnavlinkelement" + num).style.backgroundColor = rsst;
                document.querySelector(".listnavlinkelement" + num).style.borderRadius = "0.5rem";
                document.querySelector('#section' + num).style.border = "1px solid yellow";
                //determining the sections not inview
                let filtered = arrflag.filter(function(value, index, arr) {
                    return index + 1 != num;
                });
                for (const value of filtered) {
                    let vallink = value.replace("#section", "");
                    document.querySelector('.listnavlinkelement' + vallink).style.removeProperty("background-color");
                    document.querySelector('.listnavlinkelement' + vallink).style.color = rss;
                    document.querySelector('.listnavlinkelement' + vallink).style.textDecorationLine = "none";
                    document.querySelector('#section' + vallink).style.removeProperty("border");

                }

            }
        }
    }
    //regaining default styling to sections which isn't inview
    if (Math.floor(document.querySelector(".anyclass h1").getBoundingClientRect().top) > 0) {
        document.querySelector('.listnavlinkelement' + 1).style.removeProperty("background-color");
        document.querySelector('.listnavlinkelement' + 1).style.color = rss;
        document.querySelector('.listnavlinkelement' + 1).style.textDecorationLine = "none";
        document.querySelector('#section' + 1).style.removeProperty("border");
    }

}

function clickElement(e) {
    blocking = false;     // to block scrolling function during clicking to prevent laggy view
    let variable = e.target.className;
    let arr2 = [];
    let elementColor = e.target.style.color;
    let matches = variable.match(/(\d+)/);  // get the number of clicked section
    // move from navbar to clicked section
    let sec = document.querySelector('#section' + matches[0]);
    sec.scrollIntoView({behavior: "smooth"});

    // clicked section new styling
    e.target.style.backgroundColor = rsst;
    e.target.style.borderRadius = "0.5rem";
    for (let k = 1; k <= arrlength; k++) {
        arr2.push(k);
    }
    //clicked section border
    document.querySelector('#section' + matches[0]).style.border = "1px solid yellow";

    let filtered = arr2.filter(function(value, index, arr) {
        return matches[0] != value;
    });
// loop that regains default styles for navbar element which aren't clicked
    for (const alt of filtered) {
        altinc = parseInt(alt);
        document.querySelector('.listnavlinkelement' + altinc).style.removeProperty("background-color");
        document.querySelector('.listnavlinkelement' + altinc).style.color = rss;
        document.querySelector('.listnavlinkelement' + altinc).style.textDecorationLine = "none";
        document.querySelector('#section' + altinc).style.removeProperty("border");
    }


    blocking = true;
}

///////////////////////////////////////////////////
//function that decorates text when hovering
function hoverElement(e) {
    e.target.style.color = "#333";
    e.target.style.cursor = "pointer";
    e.target.style.textDecorationLine = "none";
}
//function that regains text decorations when hovering out
function hoveroutElement(e) {
    e.target.style.color = rss;
}

// measuring performance
let t = performance.now();
console.log(t);
