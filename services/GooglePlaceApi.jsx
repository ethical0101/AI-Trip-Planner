// Geoapify API service for place search and autocomplete
const GEOAPIFY_API_KEY = "73aa27e3458e41159ef1ef827eee131e";

export const SearchPlaces = async (query) => {
    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${query}&zoom=12&apiKey=${GEOAPIFY_API_KEY}`
        );
        return response;
    } catch (error) {
        console.error("Geoapify search error:", error);
        return null;
    }
};

export const GetPlaceAutocomplete = async (placeName) => {
    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(placeName)}&limit=10&apiKey=${GEOAPIFY_API_KEY}`
        );
        const result = await response.json();
        return result.features || [];
    } catch (error) {
        console.error("Geoapify autocomplete error:", error);
        return [];
    }
};

export const GetPlaceDetails = async (placeName) => {
    try {
        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(placeName)}&limit=1&apiKey=${GEOAPIFY_API_KEY}`
        );
        const result = await response.json();

        if (result.features && result.features.length > 0) {
            const place = result.features[0];
            return {
                name: place.properties.name || place.properties.formatted,
                coordinates: {
                    lat: place.properties.lat,
                    lng: place.properties.lon,
                },
                address: place.properties.formatted,
                photoRef: null, // Geoapify doesn't provide photos
                url: place.properties.url || null,
            };
        }
        return null;
    } catch (error) {
        console.error("Geoapify place details error:", error);
        return null;
    }
};

// Legacy function kept for compatibility
export const GetPhotoRef = async (placeName) => {
    return GetPlaceDetails(placeName);
};
