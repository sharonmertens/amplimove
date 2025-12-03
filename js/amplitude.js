// --- INSERT YOUR API KEY ---
const AMPLITUDE_API_KEY = "YOUR_API_KEY_HERE";

// --- INSERT YOUR EXPERIMENT DEPLOYMENT KEY ---
const EXPERIMENT_KEY = "YOUR_EXPERIMENT_DEPLOYMENT_KEY";

amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    pageViews: true,
    sessions: true,
    formInteractions: true,
  },
});

// Identify pseudo-user
const userId = "user_" + Math.floor(Math.random() * 100000);
amplitude.setUserId(userId);

// Save for profile page
localStorage.setItem("amplimove_user_id", userId);

// Load experiment CTA variant
async function loadCTAExperiment() {
  try {
    const variant = await amplitude.experiment().variant(EXPERIMENT_KEY);

    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;

    if (variant?.value === "B") {
      heroCta.textContent = "Let’s Ride!";
    } else {
      heroCta.textContent = "Start Your First Workout";
    }

    // Log exposure
    amplitude.track("Experiment CTA Viewed", { variant: variant?.value });

  } catch (e) {
    console.error("Experiment error", e);
  }
}

document.addEventListener("DOMContentLoaded", loadCTAExperiment);
