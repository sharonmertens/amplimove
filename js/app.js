// Load Amplitude Browser SDK with Autocapture + Session Replay
(function(){
  var s = document.createElement('script');
  s.src = "https://cdn.amplitude.com/script/6346197fe6ea814dcab926acbda632cf.js";
  s.async = true;
  document.head.appendChild(s);
})();

// When Amplitude is ready, track page views
document.addEventListener("DOMContentLoaded", () => {
  if (window.amplitude) {
    window.amplitude.track("Page Viewed", {
      page: window.location.pathname
    });
  }
});
