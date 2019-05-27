class UI {
  constructor() {
    // app initialization
    this.init();
  }
  // method when the app starts
  init() {
    // display categories in <select>
    this.printCategories();

    // Select the results
    this.result = document.querySelector("#result");
  }

  // Display events from the API

  displayEvents(events) {
    // Build the template
    let HTMLTemplate = "";

    // Loop through events and print the results
    events.forEach(eventInfo => {
      HTMLTemplate += `
    <div class="col-md-4 mt-4">
      <div class="card">
          <div class="card-body">
              <img class="img-fluid mb-2" src="${
                eventInfo.logo !== null
                  ? eventInfo.logo.url
                  : "img/no-image-available.jpg"
              }" alt="Event Logo">
          </div>
          <div class="card-body">
              <div class="card-text">
                  <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                  <p class="lead text-info">Event Information: </p>
                  <p>${
                    typeof eventInfo.description.text === "string"
                      ? eventInfo.description.text.substring(0, 200)
                      : ""
                  }...</p>
                  <span class="badge badge-primary">Capacity: ${
                    eventInfo.capacity
                  }</span>
                  <span class="badge badge-secondary">Date & Time: ${
                    eventInfo.start.local
                  }</span>
                  <a href="${
                    eventInfo.url
                  }" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
              </div>
          </div>
      </div>
  </div>`;
    });

    this.result.innerHTML = HTMLTemplate;
  }

  printCategories() {
    const categoriesList = eventbrite
      .getCategoriesAPI()
      .then(categories => {
        const categoriesList = categories.categories.categories;
        const categorySelect = document.querySelector("#category");

        categoriesList.forEach(category => {
          // create category options and add to select
          const option = document.createElement("option");
          option.value = category.id;
          option.appendChild(document.createTextNode(category.name));
          categorySelect.appendChild(option);
        });
        // console.log(categoriesList);
      })
      .catch(error => console.log(error));
  }

  // Display a message
  printMessage(message, className) {
    const div = document.createElement("div");
    div.className = className;

    div.appendChild(document.createTextNode(message));

    const searchDiv = document.querySelector("#search-events");
    searchDiv.appendChild(div);

    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  }

  // Remove message
  removeMessage() {
    const alert = document.querySelector(".response-alert");
    if (alert) {
      alert.remove();
    }
  }
}
