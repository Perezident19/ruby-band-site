const events = [
  {
    month: "JUN",
    day: "06",
    title: "Friday Night at Cubby Bear",
    venue: "Cubby Bear",
    location: "Chicago, IL",
    note: "High-energy cover set with a late-night crowd focus."
  },
  {
    month: "JUN",
    day: "14",
    title: "Summer Set at Home Away From Home",
    venue: "Home Away From Home",
    location: "Chicago, IL",
    note: "Neighborhood venue night with covers plus original music highlights."
  },
  {
    month: "JUN",
    day: "21",
    title: "Private Event Booking",
    venue: "Chicago Area",
    location: "Private Event",
    note: "Placeholder example for weddings, fundraisers, or private parties."
  },
  {
    month: "JUN",
    day: "28",
    title: "Originals Spotlight Night",
    venue: "TBA",
    location: "Chicago, IL",
    note: "A sample event card that can highlight new releases or special sets."
  }
];

const eventsList = document.getElementById("events-list");

if (eventsList) {
  eventsList.innerHTML = events
    .map(
      (event) => `
        <article class="event-card">
          <div class="event-date">
            <span>${event.month}</span>
            <strong>${event.day}</strong>
          </div>
          <div class="event-meta">
            <h3>${event.title}</h3>
            <p><strong>${event.venue}</strong> - ${event.location}</p>
            <p>${event.note}</p>
          </div>
          <a class="button button-secondary" href="booking.html">Inquire</a>
        </article>
      `
    )
    .join("");
}
