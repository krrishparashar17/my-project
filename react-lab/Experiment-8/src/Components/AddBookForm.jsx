import React from 'react'

const AddBookForm = ({ 
  newBookTitle, 
  newBookAuthor, 
  onTitleChange, 
  onAuthorChange, 
  onAddBook 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onAddBook()
  }

  return (
    <div className="add-book-section">
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          placeholder="New book title"
          value={newBookTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          className="book-input"
        />
        <input
          type="text"
          placeholder="New book author"
          value={newBookAuthor}
          onChange={(e) => onAuthorChange(e.target.value)}
          className="book-input"
        />
        <button type="submit" className="add-button">
          Add Book
        </button>
      </form>
    </div>
  )
}

export default AddBookForm