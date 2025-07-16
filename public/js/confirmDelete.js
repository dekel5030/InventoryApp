async function confirmDelete(resourcePath, resourceId) {
  const confirmed = confirm("Are you sure you want to delete this?");
  if (!confirmed) return;

  try {
    const response = await fetch(`/${resourcePath}/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || "Failed to delete.");
      return;
    }

    const data = await response.json();

    if (data.redirectTo) {
      window.location.href = data.redirectTo;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Something went wrong. Please try again.");
  }
}
