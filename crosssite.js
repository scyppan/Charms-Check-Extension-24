let messagePosted = false; // Flag to check if message was successfully posted
let initialAttemptFailed = false; // Flag to check if initial attempt failed
let messagePending = false;
let chatWindowOpen = false; // Track the state of the chat window

function callfunction(msg) {
    switch (msg) {
        case "test":
            console.log("test");
            msgpostmanager("Charms Check Extension is ready!");
            break;
        default:
            msgpostmanager(msg);
            break;
    }
}

function isChatWindowOpen() {
    const chatWindow = document.querySelector('[jsname="ME4pNd"]');
    const messageInput = document.querySelector('textarea');
    const sendButton = document.querySelector('button[jsname="SoqoBf"]');

    return chatWindow && isElementVisible(chatWindow) && messageInput && sendButton;
}

function openChatWindow() {
    return new Promise((resolve, reject) => {
        const chatButtonSelector = '[aria-label="Chat with everyone"][jsname="A5il2e"]';
        const chatButton = document.querySelector(chatButtonSelector);

        if (isElementVisible(chatButton)) {
            simulateClick(chatButton);
            setTimeout(() => {
                if (isChatWindowOpen()) {
                    chatWindowOpen = true;
                    resolve();
                } else {
                    reject(new Error("Failed to open chat window."));
                }
            }, 200); // Adjust delay as necessary
        } else {
            reject(new Error("Chat button not found or not visible."));
        }
    });
}

let debounceTimeout = null;

function msgpostmanager(message) {
    // Clear any existing debounce timeout
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    debounceTimeout = setTimeout(() => {
        // Set the flag indicating a message is pending
        messagePending = true;

        // Check if chat window is open, if not, try to open it
        if (!chatWindowOpen) {
            openChatWindow().then(() => {
                sendMessage(message).then(() => {
                    messagePending = false; // Reset the flag after sending the message
                    chatWindowOpen = true; // Keep the chat window open
                }).catch(err => {
                    console.error("Error sending message:", err);
                    messagePending = false; // Reset the flag even if there's an error
                    chatWindowOpen = true; // Keep the chat window open to attempt manually
                });
            }).catch(err => {
                console.error("Error opening chat window:", err);
                messagePending = false; // Reset the flag if opening the chat window fails
                chatWindowOpen = false; // Allow the chat window to close
            });
        } else {
            sendMessage(message).then(() => {
                messagePending = false; // Reset the flag after sending the message
            }).catch(err => {
                console.error("Error sending message:", err);
                messagePending = false; // Reset the flag even if there's an error
            });
        }
    }, 300); // Adjust debounce delay as necessary
}

function sendMessage(msg) {
    return new Promise((resolve, reject) => {
        console.log("Attempting to send message...");
        const messageInputSelector = 'textarea'; // Selector for the message input field
        const sendButtonSelector = 'button[jsname="SoqoBf"]'; // Selector for the send button
        const messageContainerSelector1 = '.jO4O1'; // Selector for messages with class jO4O1
        const messageContainerSelector2 = '.chmVPb'; // Selector for messages with class chmVPb

        let messageInput = document.querySelector(messageInputSelector);
        let sendButton = document.querySelector(sendButtonSelector);
        let messageContainer1 = document.querySelectorAll(messageContainerSelector1);
        let messageContainer2 = document.querySelectorAll(messageContainerSelector2);

        if (messageInput && sendButton) {
            if (sendButton.hasAttribute('disabled')) {
                sendButton.removeAttribute('disabled');
            }

            messageInput.value = msg;
            simulateClick(sendButton);
            console.log("Message sent.");

            let initialMessageCount = messageContainer1.length + messageContainer2.length;
            setTimeout(() => {
                let newMessageContainer1 = document.querySelectorAll(messageContainerSelector1);
                let newMessageContainer2 = document.querySelectorAll(messageContainerSelector2);
                let newMessageCount = newMessageContainer1.length + newMessageContainer2.length;

                console.log(`Initial message count: ${initialMessageCount}, New message count: ${newMessageCount}`);
                if (newMessageCount > initialMessageCount) {
                    console.log("Message successfully posted.");
                    messagePosted = true;
                    messagePending = false; // Reset the flag after sending the message
                    resolve();
                } else {
                    console.log("Message was not posted. Retrying...");
                    handleRetryOrFailure(1, msg).then(resolve).catch(reject); // Start retries with attempts = 1
                }
            }, 1000); // Increase the delay to ensure the message is detected
        } else {
            console.log("Message input or send button not found. Retrying...");
            handleRetryOrFailure(1, msg).then(resolve).catch(reject); // Start retries with attempts = 1
        }
    });
}

function handleRetryOrFailure(attempts, msg) {
    return new Promise((resolve, reject) => {
        const maxAttempts = 50;
        if (attempts >= maxAttempts) {
            if (!initialAttemptFailed) {
                initialAttemptFailed = true;
                showInitialFailurePrompt();
            }
            messagePending = false; // Reset the flag even if there's an error
            chatWindowOpen = true; // Keep the chat window open to attempt manually
            reject(new Error("Maximum retry attempts reached."));
        } else {
            setTimeout(() => {
                sendMessage(msg).then(resolve).catch(() => {
                    handleRetryOrFailure(attempts + 1, msg).then(resolve).catch(reject);
                });
            }, 500); // Increase the delay to prevent rapid retries
        }
    });
}

function showInitialFailurePrompt() {
    const modal = document.createElement('div');
    modal.id = 'initialFailureModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <h3>Unable to connect to chat</h3>
        <p>Charms Check is having difficulty connecting to the chat window. Can you please open it yourself?</p>
        <button id="closeInitialFailureModal">Close</button>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeInitialFailureModal').addEventListener('click', () => {
        modal.remove();
    });
}

function showFailurePrompt(msg) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
        <h3>Unable to post to chat</h3>
        <p>However, here is your roll result: ${msg}</p>
        <p>Closing any mini-windows (such as the "breakout rooms") and clicking the chat button yourself will likely resolve this issue.</p>
        <button id="closeModal">Close</button>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove();
    });
}

function simulateClick(element) {
    if (element) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(event);
    } else {
        console.error("Element not found to click.");
    }
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

// Initialize MutationObserver for continuous retries
initButtonObserver();

function initButtonObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log("DOM mutation detected. Checking if buttons need to be assigned...");
                if (messagePending) {
                    tryAssignButtons();
                } else {
                    console.log("No message pending. Not trying to open chat window.");
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function tryAssignButtons() {
    if (!messagePending) {
        console.log("No message pending. Not trying to open chat window.");
        return;
    }

    const chatButton = document.querySelector('[aria-label="Chat with everyone"][jsname="A5il2e"]');
    const moreOptionsButton = document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');
    const possibleChatWindow = document.querySelector('[jsname="ME4pNd"]');

    if (isElementVisible(chatButton)) {
        if (isChatWindow(possibleChatWindow)) {
            console.log("Chat window is already open. Proceeding...");
            finalizeInitialization();
        } else {
            console.log("Chat button found. Clicking...");
            clickChatButton().then(() => {
                console.log("Chat button clicked successfully.");
                finalizeInitialization();
            }).catch(err => {
                console.error("Error clicking chat button: ", err);
            });
        }
    } else if (isElementVisible(moreOptionsButton)) {
        console.log("More options button found. Clicking...");
        openMoreOptionsPanel().then(() => {
            console.log("More options panel opened. Trying to click chat button...");
            clickChatButton().then(() => {
                console.log("Chat button clicked successfully.");
                finalizeInitialization();
            }).catch(err => {
                console.error("Error clicking chat button: ", err);
            });
        }).catch(err => {
            console.error("Error opening more options panel: ", err);
        });
    } else {
        console.log("Buttons not found. Retrying...");
        setTimeout(() => tryAssignButtons(), 50);
    }
}

function finalizeInitialization() {
    if (initialAttemptFailed) {
        document.getElementById('initialFailureModal')?.remove(); // Close the initial failure modal if it exists
        msgpostmanager(`{AUTOMATED MESSAGE} Hey everyone! I have logged in with my charms check extension enabled!`);
        initialAttemptFailed = false;
    }
}

function clickChatButton() {
    return new Promise((resolve, reject) => {
        const chatButtonSelector = '[aria-label="Chat with everyone"][jsname="A5il2e"]';
        const chatWindowSelector = '[jsname="ME4pNd"]';
        const messageInputSelector = 'textarea'; // Adjust selector as needed
        const sendButtonSelector = 'button[jsname="SoqoBf"]'; // Adjust selector as needed

        function clickChatButtonAndCheck(attempts = 0) {
            if (attempts >= 50) {
                console.error("Failed to open chat window after 50 attempts.");
                reject(new Error("Failed to open chat window."));
                return;
            }

            const chatButton = document.querySelector(chatButtonSelector);
            if (isElementVisible(chatButton)) {
                console.log("Chat button is visible. Clicking...");
                simulateClick(chatButton);

                // Add a short delay before checking the chat window state
                setTimeout(() => {
                    const chatWindow = document.querySelector(chatWindowSelector);
                    const messageInput = document.querySelector(messageInputSelector);
                    const sendButton = document.querySelector(sendButtonSelector);

                    console.log("Chat window state:", {
                        chatWindow: chatWindow ? 'visible' : 'not visible',
                        messageInput: messageInput ? 'found' : 'not found',
                        sendButton: sendButton ? 'found' : 'not found'
                    });

                    if (chatWindow && messageInput && sendButton) {
                        console.log("Chat window opened successfully.");
                        resolve();
                    } else {
                        console.log("Chat window or required elements not detected. Retrying...");
                        clickChatButtonAndCheck(attempts + 1);
                    }
                }, 200); // Adjust delay as necessary
            } else {
                console.log("Chat button not visible or not found. Retrying...");
                setTimeout(() => clickChatButtonAndCheck(attempts + 1), 200); // Adjust delay as necessary
            }
        }

        clickChatButtonAndCheck();
    });
}

function openMoreOptionsPanel() {
    return new Promise((resolve, reject) => {
        const moreOptionsButton = document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');
        if (moreOptionsButton) {
            simulateClick(moreOptionsButton);
            resolve();
        } else {
            reject(new Error("More options button not found"));
        }
    });
}

function isChatWindow(element) {
    if (!element) return false;

    // Check for the presence of chat-specific elements
    const messageInput = element.querySelector('textarea');
    const sendButton = element.querySelector('button[jsname="SoqoBf"]');

    return isElementVisible(messageInput) && isElementVisible(sendButton);
}

function isElementVisible(el) {
    return el && el.offsetWidth > 0 && el.offsetHeight > 0;
}
