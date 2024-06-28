//This script ensures that we're fully in a google meet call
let observerconnected = true;
let mainscreen= null;

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