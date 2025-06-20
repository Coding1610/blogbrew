# 🚀 BlogBrew – A Full-Stack Blogging Platform

**BlogBrew** is a modern, full-stack blogging platform built with the MERN stack. It allows users to create, manage, and interact with blogs while offering an admin panel for content moderation and category management. The site is fully responsive and features rich text editing, real-time interactions, and role-based access control.

---

<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 201813.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 201859.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 202107.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 202147.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-06 123352.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 202510.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 203009.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 202640.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-04 202647.png' />
<img className="flex justify-center items-center" src='./Screenshots/Screenshot 2025-06-06 123543.png' />
---

## 📌 Features

### 👤 Normal User

- 📝 Add new blogs with rich text (CKEditor)
- 👍 Like / 👎 Unlike any blog
- 💬 Comment on own and others' blogs
- 🛠 Manage own blogs (Edit/Delete)
- 🧾 View and manage all personal comments
- 🧾 View and manage comments on own blogs
- 🧑‍💼 View and update profile
- 🔔 Real-time notifications and count updates for likes and comments

### 🛡 Admin

- 📄 View and delete any blog
- 💬 View and delete any comment
- 🗂 Add, edit, and manage blog categories
- 👥 View all users and manage them (Delete)
- 🧑‍💼 View and update admin profile
- 🔔 Real-time analytics for comments & likes across platform

### 🌍 Public Access

- 🌐 View all blogs
- 📖 Read single blog with full content
- 🧩 See **Related Blogs** based on category or tags
- 🔍 Search blogs by title or category

### 💌 Mail

- ✅ Mail sent to the blog's author from BlogBrew Official when someone likes or comments on their blog.
- ✅ Mail sent to the author when they register successfully.
---

## 🛠 Tech Stack

| Category        | Technology                                                                 |
|-----------------|----------------------------------------------------------------------------|
| **Frontend**    | React.js, Tailwind CSS, Shadcn/ui, Redux Toolkit, Firebase (Google Auth)   |
| **Backend**     | Node.js, Express.js, MongoDB Atlas, JWT, Zod, Cloudinary, CKEditor         |
| **State Mgmt**  | Redux Toolkit                                                              |
| **Authentication** | Firebase (Google OAuth), JWT-based auth with Zod validation              |
| **Authorization** | Custom middlewares `Authenticate` and `AdminView`                        |
| **Editor**      | CKEditor 5                                                                 |
| **Media Upload**| Cloudinary                                                                 |
| **Database**    | MongoDB Atlas with Mongoose                                                |

---

## 🛡 Authentication & Authorization

- 🔒 **JWT** tokens stored in HTTP-only cookies using `cookie-parser`
- ✅ Input validation via **Zod**
- 🔐 Separate protected routes for:
  - Admin (`/admin`)
  - Authenticated Users (`/dashboard`, `/my-blogs`, etc.)
- 🧱 Middleware:
  - `Authenticate`: Verifies user and adds user info to request
  - `AdminView`: Checks admin privileges

---

## 🧩 Additional Features

- 🧠 **Related Blogs**: When viewing a specific blog, users can see similar blogs based on category or tags in the sidebar
- 🔁 Real-time like and comment count updates
- 📄 Rich blog content using CKEditor
- 📷 Image/media uploads via Cloudinary
- 📬 Firebase-powered Google Authentication

---

## 🧑‍💼Dummy User

- email : premal45@gmail.com
- password : plokijuh45

---