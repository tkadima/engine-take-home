# API Documentation

## Endpoint: `/api/content`

**Method:** GET

**Description:** Retrieves a paginated list of content from the database, sorted by metadata priority.

### Query Parameters:
- `page` (optional): The page number to retrieve (default is 1).
- `limit` (optional): The number of items per page (default is 20).

### Responses:
#### 200 OK
- `content`: An array of content items.
- `totalPages`: The total number of pages available.

#### 500 Internal Server Error
- `error`: Error message.
- `details`: Detailed error information.

### Example Request:
```http
GET /api/content?page=1&limit=20 HTTP/1.1
Host: localhost:3000
