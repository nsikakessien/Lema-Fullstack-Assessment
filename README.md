## Getting Started

### 1. Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

---

### 2. Set Up the Database

- The backend uses an SQLite database file named `data.db` (located in the `backend` folder).
- If you need to seed address adders for users, run the seed script:

```sh
cd backend
npx ts-node src/db/seed-address-adders.ts
```

---

### 3. Run Migrations (if any)

- The backend automatically creates the `user_adders` table if it does not exist.
- No additional migrations are required unless you modify the schema.

---

### 4. Start the Servers

#### Backend

```sh
cd backend
npm run dev
```

or

```sh
npm start
```

- The backend will start on the port specified in `config/default.json` (default: `3001`).

#### Frontend

```sh
cd frontend
npm start
```

- The frontend will start on [http://localhost:3000](http://localhost:3000) by default.

---

### 5. Run Unit Tests

#### Frontend

```sh
cd frontend
npm test
```

---

### 6. Access the Application

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use the web UI.

---

**Note:**

- Ensure both backend and frontend servers are running simultaneously.
- If you encounter database errors, verify that `data.db` exists and is accessible in the `backend` folder.
