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