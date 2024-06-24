let extensionwindow = null;
let meetwindow = null;

// Define global variables for the buttons
let chatbtn = null;
let submitbtn = null;
let moreoptionsbtn = null;
let collapsedchatbtn = null;
let joinnowbtn = null;
let menubar = null;

function assignSelectors() {
  if (!chatbtn) {
    chatbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc');
  }
  
  if (!submitbtn) {
    submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button > i');
  }
  
  if (!moreoptionsbtn) {
    moreoptionsbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div > div > span > button > div');
  }
  
  if (!collapsedchatbtn) {
    collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc');
  }

  if (!joinnowbtn) {
    joinnowbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(26) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button');
  }

  if (!menubar) {
    menubar = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.Tmb7Fd > div');
  }
}

function waitForJoinNowButton() {
  const observer = new MutationObserver(() => {
    if (document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(26) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button')) {
      joinnowbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(26) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button');
      observer.disconnect(); // Stop observing once the button is found
      setTimeout(assignSelectors, 500); // Wait 500ms and then assign other buttons
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Function to post a message to chat
const postToChat = (msg) => {
  // Re-assign variables each time
  chatbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc');
  submitbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div.R3Gmyc > div:nth-child(2) > div > div.hWX4r > div > div.SjMC3 > div.mcadHd > span > button > i');
  moreoptionsbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.jsNRx > div > div > div > span > button > div');
  collapsedchatbtn = document.querySelector('#yDmH0d > div.TZFSLb.AM6FT.P9KVBf.qjTEB > span > div.G8AM9 > div:nth-child(4) > div > div > span > button > i.google-symbols.ebW6mc.NtU4hc');
  joinnowbtn = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(26) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div.shTJQe > div.jtn8y > div.XCoPyb > div:nth-child(1) > button');
  menubar = document.querySelector('#yDmH0d > c-wiz > div > div > div:nth-child(25) > div.crqnQb > div:nth-child(11) > div > div > div.Tmb7Fd > div');
  
  // Log elements for testing
  console.log('chatbtn:', chatbtn);
  console.log('submitbtn:', submitbtn);
  console.log('moreoptionsbtn:', moreoptionsbtn);
  console.log('collapsedchatbtn:', collapsedchatbtn);
  console.log('joinnowbtn:', joinnowbtn);
  console.log('menubar:', menubar);

  // Simulate clicking the chat button to open the chat
  if (chatbtn) {
    chatbtn.click();
    setTimeout(() => {
      const chatInputElement = document.querySelector('textarea[aria-label="Send a message"]');
      const chatButtonElement = submitbtn; // Assuming submitbtn is the send button

      console.log('chatInputElement:', chatInputElement);
      console.log('chatButtonElement:', chatButtonElement);

      if (chatInputElement && chatButtonElement) {
        chatInputElement.value = msg;
        chatInputElement.dispatchEvent(new Event('input', { bubbles: true })); // Dispatch input event to ensure any listeners are triggered
        chatButtonElement.click();
      }
    }, 500); // Wait for the chat to open
  }
}

// Function to handle various messages
function callfunction(msg) {
  switch (msg) {
    case "resize":
      console.log("resize");
      // Add your resize handling logic here
      break;
    case "test":
      console.log("test");
      postToChat("Charms Check Extension is ready!");
      break;
    case "reload":
      location.reload();
      break;
    case "toggle":
      // Add your toggle handling logic here
      break;
    default:
      postToChat(msg);
      break;
  }
}

// Function to get elements and listen to messages from iframe
function getElement() {
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  // Listen to message from child window
  eventer(messageEvent, function(e) {
    var key = e.message ? "message" : "data";
    var data = e[key];
    
    if (data != "dispatchCoroutine" && data != "[object Object]" && data != "toggle") {
      callfunction(data);
    }
  }, false);
}

// Call the function to start listening for the join now button
waitForJoinNowButton();
getElement();

function clickJoinNowButton() {
  setTimeout(() => {
    if (joinnowbtn) {
      // Create a new click event
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      // Dispatch the event to simulate a click
      meetwindow = window;
      console.log("meetwindow set");
      joinnowbtn.dispatchEvent(clickEvent);
      console.log("Join Now button clicked.");
    } else {
      console.error("Join Now button not found.");
    }
  }, 2000);
}

// Function to add a new child div with textContent="charmscheck" to menubar
function addCharmsCheckToMenubar() {
  if (menubar) {
    const newDiv = document.createElement('div');
    newDiv.textContent = "charmscheck";
    menubar.appendChild(newDiv);
    console.log("New div with textContent 'charmscheck' added to menubar.");
  } else {
    console.error("Menubar not found.");
  }
}

// Example usage
clickJoinNowButton();
addCharmsCheckToMenubar();
