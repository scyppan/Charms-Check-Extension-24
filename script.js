let chatbtn = null;
let submitbtn = null;
let moreoptionsbtn = null;
let collapsedchatbtn = null;
let charmscheckpanel = null;
let mainscreen = null;
let parentContainer = null;
let observerconnected = true;

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mainscreen) {
            if (observerconnected) {
                disablemutationobserver();
                initializecharmscheck();
            }
        } else {
            console.log("searching for main screen");
            attempttoassignmainscreen();
        }
    });
});

observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
});

function attempttoassignmainscreen() {
    mainscreen = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf.i8wGAe.ZbBNqf > div > div.CNjCjf');
    if (mainscreen) {
        console.log("mainscreen found", mainscreen);
    }
}

function disablemutationobserver() {
    console.log("disabling mutation observer");
    observer.disconnect();
    observerconnected = false;
    console.log("mutation observer disconnected");
}

function assignselectors() {
    if (!chatbtn) { chatbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc'); }
    if (!submitbtn) { submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button > i'); }
    if (!moreoptionsbtn) { moreoptionsbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div > div > span > button > div'); }
    if (!collapsedchatbtn) { collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc'); }
    if (!mainscreen) { mainscreen = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf.i8wGAe.ZbBNqf > div > div.CNjCjf'); }
}

function initializecharmscheck() {
    console.log("initializing charmscheck...");
    createcharmscheckpanel();
    console.log("charmscheck initialized");
}

function createcharmscheckpanel() {
    // Create a parent container
    parentContainer = document.createElement('div');
    parentContainer.id = 'parent-container';

    // Get the charmscheckpanel element
    var charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!charmscheckpanel) {
        charmscheckpanel = document.createElement('div');
        charmscheckpanel.id = "charmscheckpanel";
        charmscheckpanel.classList.add('collapsed');

        // Add some content to the panel to make it visible
        var content = document.createElement('div');
        content.innerHTML = '<p>Charms Check Extension v24</p>';
        charmscheckpanel.appendChild(content);
    }

    // Append the charmscheckpanel to the parent container
    parentContainer.appendChild(charmscheckpanel);

    // Create a button to toggle the panel
    var toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<img src="https://charmscheck.com/wp-content/uploads/2021/09/cropped-Icon1.png" alt="Toggle" style="width: 24px; height: 24px;">'; // Replace with your WordPress icon URL
    toggleButton.classList.add('toggle-button');

    toggleButton.addEventListener('click', function () {
        if (charmscheckpanel.classList.contains('expanded')) {
            charmscheckpanel.classList.remove('expanded');
            charmscheckpanel.classList.add('collapsed');
        } else {
            charmscheckpanel.classList.remove('collapsed');
            charmscheckpanel.classList.add('expanded');
        }
    });

    // Append the toggle button to the parent container
    parentContainer.appendChild(toggleButton);

    // Append the parent container to the body
    document.body.prepend(parentContainer);

    createiframe();
}

// Function to create and append an iframe to charmscheckpanel
function createiframe() {
    // Get the charmscheckpanel element
    var charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!charmscheckpanel) {
        console.error('Element with id "charmscheckpanel" not found.');
        return;
    }

    // Create an iframe element
    var iframe = document.createElement('iframe');
    iframe.src = "https://charmscheck.com/extension-homepage-2/";
    iframe.classList.add('iframe-content'); // Add class to iframe

    // Append the iframe to the charmscheckpanel
    charmscheckpanel.appendChild(iframe);
}

