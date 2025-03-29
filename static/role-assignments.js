let queuedUpdates = [];

const rows = document.querySelectorAll("[data-volunteer-id]");
const saveButton = document.getElementById("save");

rows.forEach((row) => {
    const volunteerId = row.getAttribute("data-volunteer-id");
    const selects = row.querySelectorAll(`select[name^="scheduleSlot-"]`);

    selects.forEach((select) => {
        const scheduleSlotId = select.getAttribute("name").split("-")[1];

        select.addEventListener("change", (e) => {
            const value = e.target.value;
            queuedUpdates.push({
                volunteerId,
                scheduleSlotId,
                roleId: value,
            });

            saveButton.disabled = false;
        });
    });
});

saveButton.addEventListener("click", () => {
    saveButton.disabled = true;

    fetch(window.location.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ queuedUpdates }),
    }).then((response) => {
        if (response.ok) {
            alert("Saved");
            window.location.reload();
        } else {
            alert("Failed to save.");
        }
    });
});

