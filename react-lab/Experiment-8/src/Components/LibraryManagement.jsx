import React, { useState } from 'react'
import SearchBar from './SearchBar'
import AddBookForm from './AddBookForm'
import BookList from './BookList'

const LibraryManagement = () => {
  // Initial books data
  const [books, setBooks] = useState([
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ])

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('')
  
  // State for adding new books
  const [newBookTitle, setNewBookTitle] = useState('')
  const [newBookAuthor, setNewBookAuthor] = useState('')

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Add new book function
  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      const newBook = {
        id: Date.now(), // Simple ID generation
        title: newBookTitle.trim(),
        author: newBookAuthor.trim()
      }
      setBooks([...books, newBook])
      setNewBookTitle('')
      setNewBookAuthor('')
    }
  }

  // Remove book function
  const removeBook = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  return (
    <div className="library-management">
      <h1>Library Management</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <AddBookForm 
        newBookTitle={newBookTitle}
        newBookAuthor={newBookAuthor}
        onTitleChange={setNewBookTitle}
        onAuthorChange={setNewBookAuthor}
        onAddBook={addBook}
      />

      <BookList 
        books={filteredBooks}
        onRemoveBook={removeBook}
      />
    </div>
  )
}

export default LibraryManagement