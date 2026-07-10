const SHEET_ID = "1CGFzrKhVgDeXkEemcdJiVtfnWeHjnU6wlFqHV3NPgw8";

const fallbackMembers = [
  {
    active: "yes",
    sort_order: "1",
    name: "George",
    role: "Singer / lead guitar",
    bio: "Lead singer and lead guitarist for Ruby. Drives the band's live energy, original songwriting, and big-stage rock feel.",
    photo_url: "assets/george-stage.jpg",
    instagram_url: "@g_ata888"
  }
];

const fallbackShows = [
  {
    active: "yes",
    sort_order: "1",
    date: "2026-08-14",
    month: "August",
    day: "14",
    title: "Friday Night at Heroes West",
    venue: "Heroes West",
    location: "Lemont, IL",
    time: "8:00 PM",
    ticket_url: "",
    note: "High-energy cover set with a late-night crowd focus."
  },
  {
    active: "yes",
    sort_order: "2",
    date: "2026-09-04",
    month: "September",
    day: "4",
    title: "Start The Long Weekend Off Strong At The Underground Lounge",
    venue: "Underground Lounge",
    location: "Chicago, IL",
    time: "8:00 PM",
    ticket_url: "https://example.com/tickets",
    note: "$10 cover at the door only"
  }
];

const eventsList = document.getElementById("events-list");
const membersList = document.getElementById("members-list");
const additionalPlayersList = document.getElementById("additional-players-list");
const additionalPlayersSection = document.getElementById("additional-players-section");

function normalizeKey(key) {
  return String(key || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isVisible(row) {
  return String(row.active || "").trim().toLowerCase() !== "no";
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const aOrder = Number.parseInt(a.sort_order, 10);
    const bOrder = Number.parseInt(b.sort_order, 10);
    return (Number.isFinite(aOrder) ? aOrder : 999) - (Number.isFinite(bOrder) ? bOrder : 999);
  });
}

function getPhotoUrl(row) {
  const rawUrl = row.photo_url || row.photo_url_google_drive_link || row.image_url || "";
  const url = String(rawUrl).trim();

  if (!url || url.toLowerCase() === "tbd" || url.toLowerCase() === "n/a") {
    return "";
  }

  const driveMatch = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);

  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
  }

  return url;
}

function cleanMemberName(name) {
  return String(name || "").replace(/\s*\((additional)\)\s*$/i, "").trim();
}

function isAdditionalPlayer(row) {
  const section = String(row.section || row.category || "").toLowerCase();
  const name = String(row.name || "").toLowerCase();
  return section.includes("additional") || name.includes("(additional)");
}

function getInstagramLink(value) {
  const raw = String(value || "").trim();

  if (!raw || raw.toLowerCase() === "n/a") {
    return "";
  }

  if (raw.startsWith("http")) {
    return raw;
  }

  if (raw.startsWith("@")) {
    return `https://www.instagram.com/${raw.slice(1)}/`;
  }

  return "";
}

function getTicketUrl(value) {
  const raw = String(value || "").trim();
  return raw.startsWith("http") && !raw.includes("example.com") ? raw : "";
}

function loadSheet(sheetName) {
  return new Promise((resolve, reject) => {
    const callbackName = `handleRubySheet_${sheetName}_${Date.now()}`.replace(/\W/g, "_");
    const script = document.createElement("script");
    const params = new URLSearchParams({
      tqx: `out:json;responseHandler:${callbackName}`,
      sheet: sheetName
    });

    window[callbackName] = (response) => {
      cleanup();

      if (response.status === "error") {
        reject(new Error(response.errors?.[0]?.detailed_message || `Could not load ${sheetName}`));
        return;
      }

      resolve(formatSheetRows(response.table));
    };

    function cleanup() {
      delete window[callbackName];
      script.remove();
    }

    script.onerror = () => {
      cleanup();
      reject(new Error(`Could not load ${sheetName}`));
    };

    script.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?${params.toString()}`;
    document.body.appendChild(script);
  });
}

function formatSheetRows(table) {
  const keys = table.cols.map((column) => normalizeKey(column.label));

  return table.rows.map((row) => {
    return row.c.reduce((data, cell, index) => {
      const key = keys[index];

      if (key) {
        data[key] = cell?.f ?? cell?.v ?? "";
      }

      return data;
    }, {});
  });
}

function renderMemberCard(member) {
  const name = cleanMemberName(member.name);
  const role = member.role || "";
  const bio = member.bio || "";
  const photoUrl = getPhotoUrl(member);
  const instagramLink = getInstagramLink(member.instagram_url);
  const instagramLabel = String(member.instagram_url || "").trim();

  return `
    <article class="member-card">
      <div class="member-photo">
        ${
          photoUrl
            ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(name)} of Ruby" loading="lazy" referrerpolicy="no-referrer" />`
            : `<span>${escapeHtml(name || "Ruby member")}</span>`
        }
      </div>
      <h3>${escapeHtml(name)}</h3>
      ${role ? `<p class="member-role">${escapeHtml(role)}</p>` : ""}
      ${bio ? `<p>${escapeHtml(bio)}</p>` : ""}
      ${
        instagramLink
          ? `<a class="text-link member-social" href="${escapeHtml(instagramLink)}">${escapeHtml(instagramLabel)}</a>`
          : ""
      }
    </article>
  `;
}

function renderMembers(members) {
  const visibleMembers = sortRows(
    members.filter((member) => isVisible(member) && member.name)
  );
  const coreMembers = visibleMembers.filter((member) => !isAdditionalPlayer(member));
  const additionalPlayers = visibleMembers.filter(isAdditionalPlayer);

  if (membersList) {
    membersList.innerHTML = coreMembers.length
      ? coreMembers.map(renderMemberCard).join("")
      : `<p class="loading-note">No active members are listed yet.</p>`;
  }

  if (additionalPlayersList && additionalPlayersSection) {
    additionalPlayersList.innerHTML = additionalPlayers.map(renderMemberCard).join("");
    additionalPlayersSection.hidden = additionalPlayers.length === 0;
  }
}

function renderEventCard(event) {
  const ticketUrl = getTicketUrl(event.ticket_url);
  const time = event.time ? `<p class="event-time">${escapeHtml(event.time)}</p>` : "";
  const action = ticketUrl
    ? `<a class="button button-secondary" href="${escapeHtml(ticketUrl)}">Tickets</a>`
    : `<a class="button button-secondary" href="booking.html">Inquire</a>`;

  return `
    <article class="event-card">
      <div class="event-date">
        <span>${escapeHtml(event.month)}</span>
        <strong>${escapeHtml(event.day)}</strong>
      </div>
      <div class="event-meta">
        <h3>${escapeHtml(event.title)}</h3>
        <p><strong>${escapeHtml(event.venue)}</strong> - ${escapeHtml(event.location)}</p>
        ${time}
        <p>${escapeHtml(event.note)}</p>
      </div>
      ${action}
    </article>
  `;
}

function renderEvents(events) {
  const visibleEvents = sortRows(
    events.filter((event) => isVisible(event) && event.title)
  );

  if (eventsList) {
    eventsList.innerHTML = visibleEvents.length
      ? visibleEvents.map(renderEventCard).join("")
      : `<p class="loading-note">No upcoming Ruby shows are listed yet.</p>`;
  }
}

if (membersList) {
  loadSheet("Members")
    .then(renderMembers)
    .catch(() => renderMembers(fallbackMembers));
}

if (eventsList) {
  loadSheet("Shows")
    .then(renderEvents)
    .catch(() => renderEvents(fallbackShows));
}
