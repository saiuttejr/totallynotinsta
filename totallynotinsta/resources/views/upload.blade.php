<!DOCTYPE html>
<html>
<head>
    <title>Upload to Cloudinary</title>
</head>
<body>
    <h2>Upload Image to Cloudinary</h2>

    @if(isset($imageUrl))
        <p>Image uploaded successfully!</p>
        <img src="{{ $imageUrl }}" alt="Uploaded Image" width="300">
    @endif

    <form method="POST" action="{{ route('upload.image') }}" enctype="multipart/form-data">
        @csrf
        <input type="file" name="image" required>
        <button type="submit">Upload</button>
    </form>
</body>
</html>
