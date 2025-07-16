async function confirmDelete(resourcePath, resourceId) {
  const confirmed = confirm("Are you sure you want to delete this?");
  if (!confirmed) return;

  const password = prompt("Enter admin password:");
  if (!password) return;

  try {
    const response = await fetch(`/${resourcePath}/${resourceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminPassword: password }),
    });

    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to delete.");
      return;
    }

    if (data.redirectTo) {
      window.location.href = data.redirectTo;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Something went wrong. Please try again.");
  }
}
