import React from 'react'

const BookItem = ({ book, onRemove }) => {
  return (
    <div className="book-item">
      <div className="book-info">
        <span className="book-title">{book.title}</span>
        <span className="book-author">by {book.author}</span>
      </div>
      <button 
        onClick={() => onRemove(book.id)}
        className="remove-button"
      >
        Remove
      </button>
    </div>
  )
}

export default BookItem