function toggleEdit(button) {
  // Find the next row which should be the edit form
  const editRow = button.closest('tr').nextElementSibling;
  
  if (editRow && editRow.classList.contains('hide')) {
    // Show the edit form
    editRow.style.display = 'table-row';
    editRow.classList.remove('hide');
  } else if (editRow) {
    // Hide the edit form
    editRow.style.display = 'none';
    editRow.classList.add('hide');
  }
}
