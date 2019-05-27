class EventBrite {
  // Constructor when instantiated
  constructor() {
    this.auth_token = "37WEWG7Z24VJFPREEWJA";
    this.orderby = "date";
  }

  async getVenue(venueId) {
    const venueResponse = await fetch(
      `https://www.eventbriteapi.com/v3/venues/${venueId}/?token=${
        this.auth_token
      }`
    );
    const venue = await venueResponse.json();
    console.log(venue);
    return venue;
  }

  // Get the Events from API
  async queryAPI(eventName, category) {
    const eventsResponse = await fetch(
      `https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${
        this.orderby
      }&categories=${category}&token=${this.auth_token}`
    );

    // wait for response and return as json
    const events = await eventsResponse.json();

    // for (const event of events.events) {
    //   const venueResponse = await fetch(
    //     `https://www.eventbriteapi.com/v3/venues/${event.venue_id}/?token=${
    //       this.auth_token
    //     }`
    //   );
    //   event.venueDetails = await venueResponse.json();
    //   console.log(event);
    // }

    return events;
  }

  // Get Categoies from API
  async getCategoriesAPI() {
    // Query the API
    const categoriesResponse = await fetch(
      `https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`
    );

    // Hold for the response and then return as json
    const categories = await categoriesResponse.json();

    return {
      categories
    };
  }
}
