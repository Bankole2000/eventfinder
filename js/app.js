// Instanciate both classes

const eventbrite = new EventBrite();
const ui = new UI();
const loader = document.querySelector("#loading");

const displayLoader = () => {
  loader.style.display = "block";
};

const hideLoader = () => {
  loader.style.display = "none";
};

// Create Listener for the Submit button
document.querySelector("#submitBtn").addEventListener("click", e => {
  e.preventDefault();

  // Get values from form
  const eventName = document.querySelector("#event-name").value;
  const category = document.querySelector("#category").value;

  // Check if user input
  if (eventName !== "") {
    displayLoader();
    // Query even brite api
    eventbrite.queryAPI(eventName, category).then(events => {
      // Check if there are any events
      const eventsList = events.events.length;
      if (eventsList > 0) {
        // Print Events
        ui.displayEvents(events.events);
        ui.printMessage(
          "Search Successful!",
          "text-center alert alert-success mt-4 response-alert"
        );
        hideLoader();
      } else {
        // THere are no events
        ui.printMessage(
          "Sorry, No Events matching your search found",
          "text-center alert alert-warning mt-4 response-alert"
        );
        hideLoader();
      }
      // console.log(events.events);
    });
  } else {
    ui.printMessage(
      "Please Add an Event or City",
      "text-center alert alert-danger mt-4 response-alert"
    );
  }
  // console.log(`event: ${eventName} of category: ${category }`);
});
// console.log(eventbrite);
