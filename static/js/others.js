// Get the file input and the form
const avatarInput = document.getElementById('avatarInput');
const uploadForm = document.getElementById('uploadForm');
const uploadButton = document.getElementById('uploadButton');

// Add an event listener to the file input
avatarInput.addEventListener('change', function() {
    // Submit the form when a file is selected
    uploadForm.submit();
});