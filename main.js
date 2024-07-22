let chatWindowOpened = false;
let actionInProgress = false;

// Utility function to create and dispatch a click event
function simulateClick(element) {
    element.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    }));
}

// Utility function to check if an element is visible
function isElementVisible(element) {
    return element && element.offsetParent !== null;
}

// Function to retry finding and interacting with elements
function retryUntilSuccess(action, maxRetries = 50, delay = 100, onSuccess, onFailure) {
    let attempts = 0;

    function tryAction() {
        attempts++;
        if (action()) {
            onSuccess();
        } else if (attempts < maxRetries) {
            setTimeout(tryAction, delay);
        } else {
            onFailure(new Error(`Failed to complete action after ${maxRetries} attempts`));
        }
    }

    tryAction();
}

function openMoreOptionsPanel() {
    return new Promise((resolve, reject) => {
        const moreOptionsSelector = '[jscontroller="PIVayb"][aria-label="More options"]';
        const moreOptionsPanelSelector = '.TZFSLb.AM6FT.P9KVBf.qjTEB';

        retryUntilSuccess(() => {
            const moreOptionsButton = document.querySelector(moreOptionsSelector);
            if (isElementVisible(moreOptionsButton)) {
                console.log("More options button is visible. Clicking...");
                simulateClick(moreOptionsButton);
                return true;
            }
            return false;
        }, 50, 100, () => {
            console.log("More options button clicked. Waiting for panel...");
            retryUntilSuccess(() => {
                const moreOptionsPanel = document.querySelector(moreOptionsPanelSelector);
                return isElementVisible(moreOptionsPanel);
            }, 50, 100, () => {
                console.log("More options panel opened successfully.");
                resolve();
            }, err => {
                console.error("Failed to open more options panel.", err);
                reject(err);
            });
        }, err => {
            console.error("More options button not found.", err);
            reject(err);
        });
    });
}

function clickChatButton() {
    return new Promise((resolve, reject) => {
        const chatButtonSelector = '[aria-label="Chat with everyone"][jsname="A5il2e"]';
        const chatWindowSelector = '[jsname="ME4pNd"]';

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
                    if (chatWindow && chatWindow.classList.contains('R3Gmyc') && !chatWindow.classList.contains('qdulke')) {
                        console.log("Chat window opened successfully.");
                        resolve();
                    } else {
                        console.log("Chat window not opened yet. Retrying...");
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

function masterScript() {
    return new Promise((resolve, reject) => {
        function tryAssignButtons(attempts = 0) {
            if (attempts >= 50) {
                reject(new Error("Failed to assign buttons after 50 attempts."));
                return;
            }

            const chatButton = document.querySelector('[aria-label="Chat with everyone"][jsname="A5il2e"]');
            const moreOptionsButton = document.querySelector('[jscontroller="PIVayb"][aria-label="More options"]');

            if (isElementVisible(chatButton)) {
                console.log("Chat button assigned. Clicking...");
                clickChatButton().then(resolve).catch(reject);
            } else if (isElementVisible(moreOptionsButton)) {
                console.log("More options button assigned. Clicking...");
                openMoreOptionsPanel().then(() => clickChatButton().then(resolve).catch(reject)).catch(reject);
            } else {
                console.log("Buttons not assigned. Retrying...");
                setTimeout(() => tryAssignButtons(attempts + 1), 200);
            }
        }
        tryAssignButtons();
    });
}

function initializecharmscheck() {
    console.log("Initializing charmscheck...");
    createcharmscheckpanel();
    console.log("Charmscheck initialized");
    console.log("Testing...");

    masterScript().then(() => {
        addeventlistener();

        return new Promise((resolve, reject) => {
            clickChatButton().then(() => {
                console.log("Chat window confirmed.");
                resolve();
            }).catch(err => {
                console.error("Failed to open chat window:", err);
                reject(err);
            });
        });
    }).then(() => {
        msgpostmanager(`{AUTOMATED MESSAGE} Hey everyone! I have logged in with my charms check extension enabled!`);
        console.log("Message posted.");
    }).catch(err => {
        console.error("Error during testing:", err);
    });
}
