import React from 'react'
import BookItem from './BookItem'

const BookList = ({ books, onRemoveBook }) => {
  if (books.length === 0) {
    return (
      <div className="books-list">
        <p className="no-books">No books found matching your search.</p>
      </div>
    )
  }

  return (
    <div className="books-list">
      {books.map(book => (
        <BookItem 
          key={book.id} 
          book={book} 
          onRemove={onRemoveBook}
        />
      ))}
    </div>
  )
}

export default BookList