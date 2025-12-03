function renderWorkouts() {
  const container = document.getElementById("workout-list");
  WORKOUTS.forEach(w => {
    const el = document.createElement("div");
    el.className = "workout-card";
    el.innerHTML = `
      <h3>${w.title}</h3>
      <p>${w.type} · ${w.difficulty}</p>
      <p>Instructor: ${w.instructor}</p>
    `;
    el.onclick = () => {
      amplitude.track("Workout Viewed", { workout_id: w.id });
      window.location.href = `workout.html?id=${w.id}`;
    };
    container.appendChild(el);
  });
}

function renderWorkoutDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const workout = WORKOUTS.find(w => w.id === id);

  const container = document.getElementById("workout-detail");
  container.innerHTML = `
    <h2>${workout.title}</h2>
    <p>Type: ${workout.type}</p>
    <p>Instructor: ${workout.instructor}</p>
    <p>Difficulty: ${workout.difficulty}</p>
    <button id="start-btn" class="cta-btn">Start Workout</button>
  `;

  amplitude.track("Workout Detail Loaded", { workout_id: id });

  document.getElementById("start-btn").onclick = () => {
    amplitude.track("Workout Started", { workout_id: id });

    let count = parseInt(localStorage.getItem("completed") || "0");
    localStorage.setItem("completed", count + 1);

    alert("Workout started!");
  };
}

function loadProfile() {
  document.getElementById("user-id").textContent =
    localStorage.getItem("amplimove_user_id");

  document.getElementById("completed-count").textContent =
    localStorage.getItem("completed") || "0";
}
