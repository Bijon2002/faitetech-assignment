# Profile Management App

A **React + Node.js + MongoDB** app for managing user profiles with login, registration, and profile updates.

---

## **1️⃣ Installation Steps**

1. **Clone the repository**:

```bash
git clone https://github.com/Bijon2002/faitetech-assignment.git
cd faitetech-assignment
```

2. **Install backend dependencies**:

```bash
cd backend
npm install
```

3. **Install frontend dependencies**:

```bash
cd ../frontend
npm install
```

---

## **2️⃣ Environment Variables**

Create a `.env` file in the **backend** folder with:

```env
PORT=5000
MONGO_URI=<your-mongodb-uri>   # e.g., mongodb://localhost:27017/profileApp
JWT_SECRET=<your-secret-key>   # any random string
REFRESH_SECRET=<your-refresh-token-secret>  # random string for refresh tokens
```

Create a `.env` file in **frontend** folder if needed:

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## **3️⃣ How to Run Backend**

1. Navigate to backend folder:

```bash
cd backend
```

2. Start server (with nodemon for hot reload):

```bash
npm run dev
```

3. Backend will run on **[http://localhost:5000](http://localhost:5000)**

---

## **4️⃣ How to Run Frontend**

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Start frontend:

```bash
npm start
```

3. Open in browser: [http://localhost:3000](http://localhost:3000)

---

## **5️⃣ Features**

* User registration & login with JWT
* Profile view & update
* Profile picture upload
* Password change


---

## **6️⃣ Folder Structure**

```
backend/
├─ models/
├─ routes/
├─ middleware/
├─ utils/
├─ uploads/
frontend/
├─ public/
│  └─ banner.jpg
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ api.js
│  ├─ App.jsx
│  └─ index.js
```

---

## **7️⃣ License**

MIT License © 2025

---

## **8️⃣ Repo**

[GitHub Repository Link](https://github.com/Bijon2002/faitetech-assignment)
