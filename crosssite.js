function callfunction(msg) {
    switch(msg) {
        case "test":
            console.log("test");
            postmsgtochatarea("Charms Check Extension is ready!");
            break;
        default:
            postmsgtochatarea(msg);
            break;
    }
}

function postToChat(msg) {
    assignselectors(); // Ensure the selectors are up-to-date

    if (selectors.chatarea) {
        postmsgtochatarea(msg);
    } else if (selectors.chatbtn) {
        clickchatandpost();
    } else if (selectors.moreoptionsbtn) {
        clickmoreoptionsbtn();
    } else {
        console.error("Error posting to chat, unable to find necessary elements.");
    }
}