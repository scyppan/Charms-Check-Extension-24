let selectors = {
    chatbtn: null,
    submitbtn: null,
    moreoptionsbtn: null,
    collapsedchatbtn: null,
    charmscheckpanel: null,
    mainscreen: null,
    chatarea: null,
};

let parentContainer = null;
let observerconnected = true;

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (selectors.mainscreen) {
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
    selectors.mainscreen = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf.i8wGAe.ZbBNqf > div > div.CNjCjf');
    if (selectors.mainscreen) {
        console.log("mainscreen found", selectors.mainscreen);
    }
}

function disablemutationobserver() {
    console.log("disabling mutation observer");
    observer.disconnect();
    observerconnected = false;
    console.log("mutation observer disconnected");
}

function assignselectors() {
    if (!selectors.chatbtn) { selectors.chatbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc'); }
    if (!selectors.submitbtn) { selectors.submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button'); }
    if (!selectors.moreoptionsbtn) { selectors.moreoptionsbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div > div > span > button > div'); }
    if (!selectors.collapsedchatbtn) { selectors.collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button'); }
    if (!selectors.mainscreen) { selectors.mainscreen = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(2) > div.axUSnc.cZXVke.P9KVBf > div.dkjMxf.i8wGAe.ZbBNqf > div > div.CNjCjf'); }
    if (!selectors.chatarea) { selectors.chatarea = document.querySelector('#bfTqV'); }
}

function initializecharmscheck() {
    console.log("initializing charmscheck...");
    createcharmscheckpanel();
    console.log("charmscheck initialized");
	console.log("testing...");
    testpost();
    console.log("testing complete");
}

function createcharmscheckpanel() {
    // Create a parent container
    parentContainer = document.createElement('div');
    parentContainer.id = 'parent-container';

    // Get the charmscheckpanel element
    selectors.charmscheckpanel = document.getElementById('charmscheckpanel');
    if (!selectors.charmscheckpanel) {
        selectors.charmscheckpanel = document.createElement('div');
        selectors.charmscheckpanel.id = "charmscheckpanel";
        selectors.charmscheckpanel.classList.add('collapsed');

        // Add some content to the panel to make it visible
        var content = document.createElement('div');
        content.innerHTML = '<p>Charms Check Extension v24</p>';
        selectors.charmscheckpanel.appendChild(content);
    }

    // Append the charmscheckpanel to the parent container
    parentContainer.appendChild(selectors.charmscheckpanel);

    // Create a button to toggle the panel
    var toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<img src="https://charmscheck.com/wp-content/uploads/2021/09/cropped-Icon1.png" alt="Toggle" style="width: 24px; height: 24px;">'; // Replace with your WordPress icon URL
    toggleButton.classList.add('toggle-button');

    toggleButton.addEventListener('click', function () {
        if (selectors.charmscheckpanel.classList.contains('expanded')) {
            selectors.charmscheckpanel.classList.remove('expanded');
            selectors.charmscheckpanel.classList.add('collapsed');
        } else {
            selectors.charmscheckpanel.classList.remove('collapsed');
            selectors.charmscheckpanel.classList.add('expanded');
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

function testpost() {
    assignselectors(); // Ensure selectors are assigned
    console.log(selectors);

    if (selectors.mainscreen) {
        if (selectors.chatarea) {
            console.log("I did this one");
            postmsgtochatarea("hi mum");
        } else if (selectors.chatbtn) {
            clickchatandpost();
        } else if (selectors.moreoptionsbtn) {
            clickmoreoptionsbtn();
        } else {
            console.error("Error posting to chat, but here's your roll result...");
        }
    } else {
        console.error("mainscreen not found.");
    }
}

function clickchatandpost() {
    console.log("It was this one that had happened!!");
    selectors.chatbtn.click();
    setTimeout(() => postmsgtochatarea("hi mum"), 3000);
}

function clicksubmitbtn(attempts = 0) {
    assignselectors();

    if (selectors.submitbtn) {
        const messageContainer = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.tyW8df > div.Ge9Kpc.z38b6');
        const initialChildCount = messageContainer ? messageContainer.childElementCount : null;

        if (initialChildCount !== null) {
            selectors.submitbtn.disabled = false; // Ensure the button is not disabled
            selectors.submitbtn.click();

            function confirmmsgposted(attempts = 0) {
                const currentChildCount = messageContainer.childElementCount;
                if (currentChildCount > initialChildCount) {
                    console.log("Message posted successfully.");
                } else if (attempts < 1000) {
                    console.log(`Message not confirmed, attempt ${attempts}`);
                    setTimeout(() => confirmmsgposted(attempts + 1), 50);
                } else {
                    console.error("Message not posted after 1000 attempts.");
                }
            }

            setTimeout(() => confirmmsgposted(), 50);
        } else {
            console.error("Message container not found.");
        }
    } else if (attempts < 1000) {
        console.log(`submitbtn not found, attempt ${attempts}`);
        selectors.submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button'); 
        setTimeout(() => clicksubmitbtn(attempts + 1), 50);
    } else {
        console.error("submitbtn not found after 1000 attempts.");
    }
}


function clickmoreoptionsbtn(attempts = 0) {
    console.log("clicking more options btn");

    selectors.moreoptionsbtn.click();

    setTimeout(() => {
        selectors.collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button');
        if (selectors.collapsedchatbtn) {
            tryassigncollapsedchatbtn(attempts);
        } else if (attempts < 1000) {
            console.log(`collapsedchatbtn not found, retrying moreoptionsbtn click, attempt ${attempts}`);
            setTimeout(() => clickmoreoptionsbtn(attempts + 1), 3000);
        } else {
            console.error("collapsedchatbtn not found after 1000 attempts.");
        }
    }, 150);
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


function postmsgtochatarea(msg) {
    if (selectors.chatarea) {
        selectors.chatarea.textContent = msg;

        function trysubmittobutton(attempts = 0) {
            assignselectors();
            if (selectors.submitbtn) {
                clicksubmitbtn();
            } else if (attempts < 1000) {
                setTimeout(() => trysubmittobutton(attempts + 1), 100);
            } else {
                console.error("submitbtn not found after 1000 attempts.");
            }
        }

        setTimeout(() => trysubmittobutton(), 100);
    } else {
        console.error("chatarea not found.");
    }
}

function callfunction(msg){
    switch(msg){
        case "test":
            console.log("test");
            postToChat("Charms Check Extension is ready!");
            break;
        default:
            postToChat(msg);
            break;
    }
}

const postToChat = (msg) => {
    assignselectors(); // Ensure the selectors are up-to-date
    console.log(selectors);

    
}