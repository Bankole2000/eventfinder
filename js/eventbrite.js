class EventBrite {
  // Constructor when instantiated
  constructor() {
    this.auth_token = "";
    // this.auth_token = "37WEWG7Z24VJFPREEWJA";
    this.apikey = "JOMPXQNXHCSKGUBXS5";
    this.secret = "BHVEINZS54T7476VOJ7QQYMYFXEQSFVU4QYFRL43XPL2LZ7QMU";
    this.privatetoken = "63VUN7LEHNQVZAVULLXP";
    this.publictoken = "CHRI7RR3ZOMAGUXCMDVG";
    this.orderby = "date";
    // this.proxyurl = "";
    this.proxyurl = "https://cors-anywhere.herokuapp.com/";
  }

  async getVenue(venueId) {
    const venueResponse = await fetch(
      `${this.proxyurl}https://www.eventbriteapi.com/v3/venues/${venueId}/`, 
      {
        headers : {
          'Authorization' : 'Bearer 63VUN7LEHNQVZAVULLXP'
        }
      }
    );
    const venue = await venueResponse.json();
    console.log(venue);
    return venue;
  }

  // Get the Events from API
  async queryAPI(eventName, category) {
    const eventsResponse = await fetch(
      `${this.proxyurl}https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${
        this.orderby
      }&categories=${category}`, 
      {
        headers : {
          'Authorization' : 'Bearer 63VUN7LEHNQVZAVULLXP'
        }
      }
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
      `${this.proxyurl}https://www.eventbriteapi.com/v3/categories/`, 
      {
        headers : {
          'Authorization' : 'Bearer 63VUN7LEHNQVZAVULLXP'
        }
      }
    );

    // Hold for the response and then return as json
    const categories = await categoriesResponse.json();

    return {
      categories
    };
  }
}
