async function confirmDelete(itemId) {
  const confirmed = confirm("Are you sure you want to delete this item?");
  if (!confirmed) return;

  try {
    const response = await fetch(`/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/items";
    } else {
      const result = await response.json();
      alert(result.error || "Failed to delete item.");
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Something went wrong.");
  }
}
