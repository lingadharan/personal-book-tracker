
export default async function handleDeleteButton(_id: string) {
  try {
    const response = await fetch(`http://localhost:5000/api/delete-book?_id=${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const result = await response.json();
    if (result && result.success) {
      alert("Delete was successfully.")
    }

  }
  catch (error) {
    console.log("Something went wrong during deletion of the book details.")
  }
}