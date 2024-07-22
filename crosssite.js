function callfunction(msg) {
    switch(msg) {
        case "test":
            console.log("test");
            msgpostmanager("Charms Check Extension is ready!");
            break;
        default:
            msgpostmanager(msg);
            break;
    }
}

function msgpostmanager(msg) {
    console.log("posting msg");
    postmsg(msg);
    console.log("msg posted");
}

function postmsg(msg) {
    console.log("postmsg called with msg:", msg); // Log the received message
    return new Promise((resolve, reject) => {
        const messageInputSelector = 'textarea'; // Simplified textarea selector
        const sendButtonSelector = 'button[jsname="SoqoBf"]'; // Specific button selector
        const messageContainerSelector = '[jsname="xySENc"]'; // Container for individual messages

        function trySendMessage(attempts) {
            let messageInput = document.querySelector(messageInputSelector);
            let sendButton = document.querySelector(sendButtonSelector);
            let messageContainer = document.querySelector(messageContainerSelector);

            console.log(`Attempt ${attempts}: messageInput`, messageInput, 'sendButton', sendButton, 'messageContainer', messageContainer);

            if (messageInput && sendButton && messageContainer) {
                // Check if the send button is disabled
                if (sendButton.hasAttribute('disabled')) {
                    // If disabled, attempt to enable it
                    sendButton.removeAttribute('disabled');
                }

                messageInput.value = msg;
                // Try to click the send button
                simulateClick(sendButton);
                console.log("Message sent.");

                // Check if the message was actually posted
                let initialMessageCount = messageContainer.childElementCount;
                setTimeout(() => {
                    let newMessageCount = messageContainer.childElementCount;
                    if (newMessageCount > initialMessageCount) {
                        resolve();
                    } else {
                        console.log("Message was not posted.");
                    }
                }, 1000);
            } else if (attempts < 50) {
                console.log(`Message input or send button not found, attempt ${attempts}`);
                setTimeout(() => trySendMessage(attempts + 1), 100);
            } else {
                reject(new Error("Message input or send button not found after 50 attempts."));
            }
        }

        trySendMessage(0);
    });
}

function simulateClick(element) {
    element.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
}

function addeventlistener() {
    window.addEventListener("message", function(event) {
        // Ensure the message is coming from the expected origin, if possible
        if (event.origin !== "https://charmscheck.com") {
            return;
        }

        // Process the message
        const message = event.data;
        console.log("Received message from iframe:", message);

        // Call the function to post the message to chat
        msgpostmanager(message);
    }, false);
}
