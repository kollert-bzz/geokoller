// Karte initialisieren
const map = L.map('map').setView([20, 0], 2); // Weltansicht

// Tile Layer hinzufügen (z. B. OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// GeoJSON-Daten laden und auf der Karte anzeigen
fetch('countries_dummy.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: "#007BFF",
                weight: 2,
                fillOpacity: 0.5
            },
            onEachFeature: (feature, layer) => {
                const name = feature.properties.name;
                const lastUpdated = feature.properties.last_updated;

                // Popup mit Länderinformationen
                layer.bindPopup(`<strong>${name}</strong><br>Last Updated: ${lastUpdated}`);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Fehler beim Laden der GeoJSON-Daten:', error));
