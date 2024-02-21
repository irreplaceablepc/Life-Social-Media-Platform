// Get the file input and the form
const avatarInput = document.getElementById('avatarInput');
const uploadForm = document.getElementById('uploadForm');
const uploadButton = document.getElementById('uploadButton');

// Add an event listener to the file input
avatarInput.addEventListener('change', function() {
    // Submit the form when a file is selected
    uploadForm.submit();
});

//  home to post button and back
function togglePage(pageId) {
    var page = document.getElementById(pageId);
    if (page.style.display === 'none') {
        page.style.display = 'block';
    } else {
        page.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('comment-button').addEventListener('click', function () {
        var commentDiv = document.getElementById('comment-div');
        if (commentDiv.style.display === 'none') {
            commentDiv.style.display = 'block';
        } else {
            commentDiv.style.display = 'none';
        }
    });
});