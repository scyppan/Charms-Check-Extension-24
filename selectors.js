let selectors = {
    chatbtn: null,
    submitbtn: null,
    moreoptionsbtn: null,
    collapsedchatbtn: null,
    charmscheckpanel: null,
    chatarea: null,
};

let parentContainer = null;

function assignselectors() {
    if (!selectors.chatbtn) { selectors.chatbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc'); }
    if (!selectors.submitbtn) { selectors.submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button'); }
    if (!selectors.moreoptionsbtn) { selectors.moreoptionsbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div > div > span > button > div'); }
    if (!selectors.collapsedchatbtn) { selectors.collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button'); }
    if (!selectors.mainscreen) { selectors.mainscreen = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf.i8wGAe.ZbBNqf > div > div.CNjCjf'); }
    if (!selectors.chatarea) { selectors.chatarea = document.querySelector('#bfTqV'); }
}

function tryassigncollapsedchatbtn(attempts = 0) {
    if (selectors.collapsedchatbtn) {
        console.log("clicking collapsed chat button:", selectors.collapsedchatbtn);
        selectors.collapsedchatbtn.click();
        setTimeout(() => tryassignchatarea(), 150);
    } else if (attempts < 1000) {
        console.log(`collapsedchatbtn not found, attempt ${attempts}`);
        setTimeout(() => tryassigncollapsedchatbtn(attempts + 1), 100);
    } else {
        console.error("collapsedchatbtn not found after 1000 attempts.");
    }
}

function tryassignchatarea(attempts = 0) {
    selectors.chatarea = document.querySelector('#bfTqV'); // Ensure the correct selector for chatarea

    if (selectors.chatarea) {
        console.log("chatarea assigned:", selectors.chatarea);
        postmsgtochatarea("hi mum");
    } else if (attempts < 1000) {
        setTimeout(() => {
            selectors.collapsedchatbtn.click();
            tryassignchatarea(attempts + 1);
        }, 100);
    } else {
        console.error("chatarea not found after 1000 attempts.");
    }
}