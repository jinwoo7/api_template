# API Template

## Setup

### Step 1
```bash
docker-compose up
```

## How to use it
If you make a `GET` request to localhost:3000/items, you should get an empty array (`[]`).
Available default commands:

| Request Type | address:port/route | Use-case |
| --- | --- | --- |
| GET | localhost:3000/items | Get all items |
| POST | localhost:3000/items | Add one item |
| DELETE | localhost:3000/items | Deletes one item |
| DELETE | localhost:300/items-reset | Deletes all items |

