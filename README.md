## API Usage

This project exposes one main endpoint to resize images.

### Endpoint
`GET /api/images`

### Query Parameters
- `filename` (string, required): The name of the image file (without extension) located in `images/full/`
- `width` (number, required): The desired image width
- `height` (number, required): The desired image height

### Example
If you have an image named `fjord.jpg` in the `images/full/` directory:
