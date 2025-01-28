document.getElementById('statsQueryForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let responseJson = {};
    // Example of sending form data to an API
    fetch('https://localhost:44347/SwingSaver/GetPlayerStats/' + this[0].value + '/' + this[1].value, {
        method: 'GET',
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder(); // Decodes Uint8Array chunks into strings

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                console.log('Response JSON:', responseJson);

                // Render the found player stats or an empty table
                renderPlayerStats(responseJson);

                return;
            }

            // Decode the Uint8Array chunk to a string
            const chunk = decoder.decode(value, { stream: true });
            responseJson = JSON.parse(chunk);
            console.log('Received chunk:', chunk);

            // Continue reading the stream
            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to render player stats in the table
function renderPlayerStats(player) {
    const playerStatsBody = document.getElementById('playerStatsBody');
    playerStatsBody.innerHTML = ''; // Clear existing content

    if (player) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.player}</td>
            <td>${player.batting_Average.toFixed(3)}</td>
            <td>${player.games_Pitched}</td>
            <td>${player.plate_Appearances}</td>
            <td>${player.at_Bat}</td>
            <td>${player.on_Base_Percentage.toFixed(3)}</td>
            <td>${player.on_Base_Plus_Slugging.toFixed(3)}</td>
            <td>${player.slugging_Percentage.toFixed(3)}</td>
            <td>${player.hits}</td>
            <td>${player.base_On_Balls}</td>
            <td>${player.strikeout_Looking}</td>
        `;
        playerStatsBody.appendChild(row);
    } else {
        // If player not found, show a message or keep the table empty
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="11" class="text-center">Player not found</td>`;
        playerStatsBody.appendChild(row);
    }
}

document.getElementById("toggleButton").addEventListener("click", function() {
    const form = document.getElementById("myForm");
    const updateForm = document.getElementById("updateForm");
    const deleteForm = document.getElementById("deleteForm");

    // Toggle the display property
    if (form.style.display === "none" || form.style.display === "") {
        updateForm.style.display = "none";
        deleteForm.style.display = "none";

        // Position the form underneath the button without affecting the button's size
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
});

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let responseJson = {};
    // Example of sending form data to an API
    fetch('https://localhost:44347/SwingSaver/CreateNewPlayer/' + 
        this[0].value + '/' + 
        this[1].value + '/' +
        this[2].value + '/' +
        this[3].value + '/' +
        this[4].value + '/' +
        this[5].value + '/' + 
        this[6].value + '/' + 
        this[7].value + '/' + 
        this[8].value + '/' + 
        this[9].value + '/' + 
        this[10].value + '/' + 
        this[11].value, 
    {
        method: 'GET',
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder(); // Decodes Uint8Array chunks into strings

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                console.log('Response JSON:', responseJson);

                const messageDiv = document.createElement("div");
                messageDiv.textContent = "Player added";
                messageDiv.className = "message success"; // Add classes for styling

                // Append the message to the body or a specific container
                document.body.appendChild(messageDiv);

                // Automatically remove the message after 3 seconds
                setTimeout(() => {
                    messageDiv.remove();
                }, 3000);

                // Hide and clear the form
                const form = document.getElementById("myForm");
                form.reset();
                form.style.display = "none";
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            responseJson = JSON.parse(chunk);
            console.log('Received chunk:', chunk);

            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById("updateToggleButton").addEventListener("click", function () {
    const updateButton = this; // The button that was clicked
    const updateForm = document.getElementById("updateForm");
    const form = document.getElementById("myForm");
    const deleteForm = document.getElementById("deleteForm");

    // Hide other forms
    form.style.display = "none";
    deleteForm.style.display = "none";

    // Toggle visibility of the update form
    if (updateForm.style.display === "none" || updateForm.style.display === "") {
        // Get the button's position
        const buttonRect = updateButton.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Position the form below the button
        updateForm.style.top = `${buttonRect.bottom + scrollTop + 5}px`; // Button bottom + small margin
        updateForm.style.left = `${buttonRect.left + scrollLeft}px`; // Align with button's left
        updateForm.style.display = "block"; // Show the form
    } else {
        updateForm.style.display = "none"; // Hide the form
    }
});


document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let responseJson = {};

    if (this[2].value == "") {

        this[2].value = "0";

    }
    if (this[3].value == "") {

        this[3].value = "0";

    }
    if (this[4].value == "") {

        this[4].value = "0";

    }
    if (this[5].value == "") {

        this[5].value = "0";

    }
    if (this[6].value == "") {

        this[6].value = "0";

    }
    if (this[7].value == "") {

        this[7].value = "0";

    }
    if (this[8].value == "") {

        this[8].value = "0";

    }
    if (this[9].value == "") {

        this[9].value = "0";

    }
    if (this[10].value == "") {

        this[10].value = "0";

    }
    if (this[11].value == "") {

        this[11].value = "0";

    }

    // Example of sending form data to an API
    fetch('https://localhost:44347/SwingSaver/UpdatePlayer/' + 
        this[0].value + '/' + 
        this[1].value + '/' +
        this[2].value + '/' +
        this[3].value + '/' +
        this[4].value + '/' +
        this[5].value + '/' + 
        this[6].value + '/' + 
        this[7].value + '/' + 
        this[8].value + '/' + 
        this[9].value + '/' + 
        this[10].value + '/' + 
        this[11].value, 
    {
        method: 'GET',
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                console.log('Response JSON:', responseJson);

                const messageDiv = document.createElement("div");
                messageDiv.textContent = "Player updated";
                messageDiv.className = "message success";

                document.body.appendChild(messageDiv);

                setTimeout(() => {
                    messageDiv.remove();
                }, 3000);

                const form = document.getElementById("updateForm");
                form.reset();
                form.style.display = "none";
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            responseJson = JSON.parse(chunk);
            console.log('Received chunk:', chunk);

            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById("deleteToggleButton").addEventListener("click", function() {
    const form = document.getElementById("myForm");
    const updateForm = document.getElementById("updateForm");
    const deleteForm = document.getElementById("deleteForm");

    // Toggle the display property
    if (deleteForm.style.display === "none" || deleteForm.style.display === "") {
        form.style.display = "none";
        updateForm.style.display = "none";

        // Position the delete form underneath the button
        deleteForm.style.display = "block";
    } else {
        deleteForm.style.display = "none";
    }
});

document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    let responseJson = {};
    // Example of sending form data to an API
    fetch('https://localhost:44347/SwingSaver/DeletePlayer/' + 
        this[0].value + '/' + 
        this[1].value, {
        method: 'GET',
    })
    .then(response => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        return reader.read().then(function processText({ done, value }) {
            if (done) {
                console.log('Stream complete');
                console.log('Response JSON:', responseJson);

                const messageDiv = document.createElement("div");
                messageDiv.textContent = "Player deleted";
                messageDiv.className = "message success";

                document.body.appendChild(messageDiv);

                setTimeout(() => {
                    messageDiv.remove();
                }, 3000);

                const form = document.getElementById("deleteForm");
                form.reset();
                form.style.display = "none";
                return;
            }

            const chunk = decoder.decode(value, { stream: true });
            responseJson = JSON.parse(chunk);
            console.log('Received chunk:', chunk);

            return reader.read().then(processText);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
