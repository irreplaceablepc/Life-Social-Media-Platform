function previewImage(input) {
    var img = document.getElementById('uploaded-image');
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        img.src = e.target.result;
        img.style.display = 'block';
    };

    reader.readAsDataURL(file);
}