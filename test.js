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