//This script ensures that we're fully in a google meet call
let observerconnected = true;
let endcallbtn= null;

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (endcallbtn) {
            if (observerconnected) {
                disablemutationobserver();
                initializecharmscheck();
            }
        } else {
            console.log("searching for end call btn");
            attempttoassignendcallbtn();
        }
    });
});

observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
});

function attempttoassignendcallbtn() {
    endcallbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(26) > div.crqnQb > div.fJsklc.nulMpf.Didmac.G03iKb > div > div > div.Tmb7Fd > div > div.NHaLPe > span > button');
    if (endcallbtn) {
        console.log("endcallbtn found", endcallbtn);
    }
}

function disablemutationobserver() {
    console.log("disabling mutation observer");
    observer.disconnect();
    observerconnected = false;
    console.log("mutation observer disconnected");
}