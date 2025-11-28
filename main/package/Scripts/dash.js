//yeah whatever..

const theUser = document.getElementById('theUser');
const theUserHover = document.getElementById('theUser-hover')



fetch("http://127.0.0.1:8000/qr?text=Hello%20from%20Dashboard")
  .then(res => res.json())
  .then(data => {

    if (user.exists === false) {

      // Tell Electron main process to reopen Start window
      window.electronAPI.goToStart();

      return;
    }

    // If user exists, render the UI
    document.getElementById("qr-output").innerHTML = `<img src="data:image/png;base64,${data.qr}">`;
    document.getElementById("fullname").textContent = user.fullName;
    document.getElementById("username").textContent = user.username;
  });

  async function loadTeacherAttendance() {
    const data = await attendyAPI.getTeacherAttendanceList();
    const tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.date}</td>
            <td>
                <select class="statusSelect">
                    <option value="Present" ${row.status === "Present" ? "selected" : ""}>Present</option>
                    <option value="Late" ${row.status === "Late" ? "selected" : ""}>Late</option>
                    <option value="Excused" ${row.status === "Excused" ? "selected" : ""}>Excused</option>
                    <option value="Absent" ${row.status === "Absent" ? "selected" : ""}>Absent</option>
                </select>
            </td>
            <td><input type="text" class="notesInput" value="${row.notes || ""}"></td>
            <td><button class="saveBtn">Save</button></td>
        `;

        tr.querySelector(".saveBtn").addEventListener("click", async () => {
            const newStatus = tr.querySelector(".statusSelect").value;
            const newNotes = tr.querySelector(".notesInput").value;

            await attendyAPI.updateStatus({
                user_id: row.user_id,
                date: row.date,
                status: newStatus,
                notes: newNotes
            });

            alert("Attendance updated!");
        });

        tbody.appendChild(tr);
    });
}
