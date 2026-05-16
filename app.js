const currentUser =
  localStorage.getItem("loggedInUser");

if (!currentUser) {

  window.location.href = "index.html";
}

const STORAGE_KEY = "dsa_problems";

const form = document.getElementById("trackerForm");
const list = document.getElementById("problemList");
const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");

let problems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let chart;
let editIndex = null; // 🔥 tracks which item is being edited

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(problems));
}

// ADD
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const problem = document.getElementById("problem").value.trim();
  const difficulty = document.getElementById("difficulty").value;
  const topic = document.getElementById("topic").value.trim();
  const time = document.getElementById("time").value.trim();

  if (!problem || !topic || !time) {
    alert("Fill all fields");
    return;
  }

  if (editIndex === null) {
  // ➕ ADD
  problems.push({ name: problem, difficulty, topic, time });
} else {
  // ✏️ UPDATE
  problems[editIndex] = { name: problem, difficulty, topic, time };
  editIndex = null;
  submitBtn.innerText = "Add";
}

  saveData();
  form.reset();
  displayProblems();
});

// DISPLAY
function displayProblems() {
  list.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  problems
  .filter(p => p.name.toLowerCase().includes(search))
  .forEach((p) => {

    const index = problems.indexOf(p);
    const div = document.createElement("div");

    div.className = "card";

    // TEXT
    const text = document.createElement("span");
    text.innerText = `${p.name} - ${p.difficulty} - ${p.topic} - ${p.time}`;

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.style.background = "#22c55e";
      editBtn.style.marginRight = "8px";
      
      editBtn.onclick = () => {
        document.getElementById("problem").value = p.name;
        document.getElementById("difficulty").value = p.difficulty;
        document.getElementById("topic").value = p.topic;
        document.getElementById("time").value = p.time;
        
        editIndex = index;
        submitBtn.innerText = "Update";
    };

      // DELETE BUTTON
      const btn = document.createElement("button");
      btn.innerText = "Delete";

      btn.style.background = "#ef4444";
      btn.style.width = "80px";
      btn.style.height = "35px";

      btn.onclick = () => {
        problems.splice(index, 1);   // remove item
        saveData();                 // update storage
        displayProblems();          // refresh UI
      };

      const btnGroup = document.createElement("div");
      btnGroup.style.display = "flex";
      btnGroup.style.gap = "8px";
      
      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(btn);
      
      div.appendChild(text);
      div.appendChild(btnGroup);

      list.appendChild(div);
    });

  updateStats();
  updateChart();
}

// STATS
function updateStats() {
  document.getElementById("total").textContent = problems.length;

  let easy = 0, medium = 0, hard = 0;

  problems.forEach(p => {
    if (p.difficulty === "Easy") easy++;
    if (p.difficulty === "Medium") medium++;
    if (p.difficulty === "Hard") hard++;
  });

  document.getElementById("easyCount").textContent = easy;
  document.getElementById("mediumCount").textContent = medium;
  document.getElementById("hardCount").textContent = hard;
}

// CHART
function updateChart() {
  if (typeof Chart === "undefined") return;

  const data = [
    problems.filter(p => p.difficulty === "Easy").length,
    problems.filter(p => p.difficulty === "Medium").length,
    problems.filter(p => p.difficulty === "Hard").length
  ];

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [{
        data: data,
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"]
      }]
    }
  });
}

// SEARCH
searchInput.addEventListener("input", displayProblems);

// INIT
displayProblems();