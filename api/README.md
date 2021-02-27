# Plague Inc Co. API

## Setup

__Requirements__

- NodeJS 14+
- Yarn
- MongoDB

1. Install dependencies

```
yarn
```

2. Configure the run environment as required by your MongoDB installation

```bash
export DB_DSN=mongodb://domain/database
export DB_USER=user
export DB_PASS=password
```

3. Import the base dataset

```bash
node src/project.js --import data/data.csv
```

4. Start the backend server

```bash
node src/project.js --serve
```

## Configuration

Configuration goes through the process' environment.

- `PORT` (defaults to `8080`): The HTTP server's listening port.
- `DB_DSN` (defaults to `mongodb://127.0.0.1/project`): The MongoDB connection URL.
- `DB_USER` (defaults to `root`): The MongoDB user that will be used for this project.
- `DB_PASS` (defaults to `example`): The MongoDB password for this user.

\newpage
