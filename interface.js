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
            setTimeout(() => clickmoreoptionsbtn(attempts + 1), 50);
        } else {
            console.error("collapsedchatbtn not found after 1000 attempts.");
        }
    }, 150);
}

function postmsgtochatarea(msg) {
    if (selectors.chatarea) {
        selectors.chatarea.textContent = msg;

        function trysubmittobutton(attempts = 0) {
            assignselectors();
            if (selectors.submitbtn) {
                clicksubmitbtn();
            } else if (attempts < 1000) {
                setTimeout(() => trysubmittobutton(attempts + 1), 50);
            } else {
                console.error("submitbtn not found after 1000 attempts.");
            }
        }

        setTimeout(() => trysubmittobutton(), 50);
    } else {
        console.error("chatarea not found.");
    }
}