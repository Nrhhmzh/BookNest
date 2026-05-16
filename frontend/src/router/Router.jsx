import { Routes, Route, Outlet  } from "react-router-dom";

import Layout from '@/layout/Layout';

import Login from "@/pages/Login/Login";
import BookList from "@/pages/Book/BookList";
import AddBook from "@/pages/Book/AddBook";
import UpdateBook from "@/pages/Book/UpdateBook";

export default function AppRouter() {
  return (
    <Routes>

      {/* Public route (NO layout) */}
      <Route path="/" element={<Login />} />

      {/* Protected / App routes (WITH layout) */}
      <Route element={<Layout />}>
        <Route path="/books" element={<BookList />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/edit/:id" element={<UpdateBook />} />
      </Route>

    </Routes>
  );
}