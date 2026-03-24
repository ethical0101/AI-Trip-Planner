// Free image service using Pexels API
// Sign up at https://www.pexels.com/api/ for a free API key
// Free tier: 200 requests per hour

const PEXELS_API_KEY = 'qaIxsuGQtkEVsmEyqAOhGOzBDF7OhMWglSO2CHldiENPN8W3eAlETFI3';

// Cache to avoid repeated API calls
const imageCache = new Map();
const wikiCache = new Map();
const wikidataCache = new Map();

const buildQueries = ({ name, location, type }) => {
    const safeName = (name || "").trim();
    const safeLocation = (location || "").trim();

    if (type === "hotel") {
        return [
            `${safeName} ${safeLocation} hotel`,
            `${safeName} hotel exterior`,
            `${safeLocation} luxury hotel`,
        ].filter(Boolean);
    }
    if (type === "destination") {
        return [
            `${safeLocation || safeName} city skyline`,
            `${safeLocation || safeName} landmark`,
            `${safeLocation || safeName} travel`,
        ].filter(Boolean);
    }
    // place/attraction
    return [
        `${safeName} ${safeLocation} landmark`,
        `${safeName} ${safeLocation} attraction`,
        `${safeName} ${safeLocation}`,
    ].filter(Boolean);
};

const scoreAlt = (alt, tokens) => {
    if (!alt) return 0;
    const lowerAlt = alt.toLowerCase();
    let score = 0;
    tokens.forEach((token) => {
        if (token && lowerAlt.includes(token)) {
            score += 1;
        }
    });
    return score;
};

const pickBestPhoto = (photos, tokens) => {
    if (!photos || photos.length === 0) return null;
    let best = photos[0];
    let bestScore = scoreAlt(photos[0].alt, tokens);
    for (let i = 1; i < photos.length; i += 1) {
        const score = scoreAlt(photos[i].alt, tokens);
        if (score > bestScore) {
            best = photos[i];
            bestScore = score;
        }
    }
    return best;
};

const hashToId = (seed) => {
    if (!seed) return 1;
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash % 1000) + 1;
};

const getWikipediaImage = async (title) => {
    const safeTitle = (title || "").trim();
    if (!safeTitle) return null;

    if (wikiCache.has(safeTitle)) {
        return wikiCache.get(safeTitle);
    }

    try {
        const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(safeTitle)}`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            wikiCache.set(safeTitle, null);
            return null;
        }

        const contentType = response.headers.get("content-type") || "";
        const rawText = await response.text();
        if (!contentType.includes("application/json")) {
            wikiCache.set(safeTitle, null);
            return null;
        }

        const data = JSON.parse(rawText);
        const imageUrl = data?.thumbnail?.source || null;
        wikiCache.set(safeTitle, imageUrl);
        return imageUrl;
    } catch (error) {
        console.error("Error fetching image from Wikipedia:", error);
        wikiCache.set(safeTitle, null);
        return null;
    }
};

const getWikidataImage = async (searchTerm) => {
    const safeTerm = (searchTerm || "").trim();
    if (!safeTerm) return null;

    if (wikidataCache.has(safeTerm)) {
        return wikidataCache.get(safeTerm);
    }

    try {
        const searchResponse = await fetch(
            `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
                safeTerm
            )}&language=en&format=json&limit=1&origin=*`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!searchResponse.ok) {
            wikidataCache.set(safeTerm, null);
            return null;
        }

        const searchText = await searchResponse.text();
        const searchData = JSON.parse(searchText);
        const entityId = searchData?.search?.[0]?.id;

        if (!entityId) {
            wikidataCache.set(safeTerm, null);
            return null;
        }

        const entityResponse = await fetch(
            `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${entityId}&props=claims&format=json&origin=*`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (!entityResponse.ok) {
            wikidataCache.set(safeTerm, null);
            return null;
        }

        const entityText = await entityResponse.text();
        const entityData = JSON.parse(entityText);
        const claims = entityData?.entities?.[entityId]?.claims;
        const p18 = claims?.P18?.[0]?.mainsnak?.datavalue?.value;

        if (!p18) {
            wikidataCache.set(safeTerm, null);
            return null;
        }

        const commonsUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p18)}`;
        wikidataCache.set(safeTerm, commonsUrl);
        return commonsUrl;
    } catch (error) {
        console.error("Error fetching image from Wikidata:", error);
        wikidataCache.set(safeTerm, null);
        return null;
    }
};

/**
 * Search for images related to a place, hotel, or destination
 * @param {Object} params
 * @param {string} params.name - Name of place/hotel
 * @param {string} params.location - City/country context
 * @param {"place"|"hotel"|"destination"} params.type - Image context
 * @returns {Promise<string>} - Image URL or fallback
 */
export const getRelevantImage = async ({ name, location, type = "place" }) => {
    const queries = buildQueries({ name, location, type });
    const tokens = `${name || ""} ${location || ""}`
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

    if (!queries || queries.length === 0) {
        return getPlaceholderImage();
    }

    // 1) Try Wikidata (P18) for exact image match
    const wikiTitle = type === "destination" ? location || name : name || location;
    const wikidataImage = await getWikidataImage(wikiTitle);
    if (wikidataImage) {
        return wikidataImage;
    }

    // 2) Try Wikipedia summary thumbnail
    const wikiImage = await getWikipediaImage(wikiTitle);
    if (wikiImage) {
        return wikiImage;
    }

    // 3) Fallback to Pexels search
    for (const query of queries) {
        if (imageCache.has(query)) {
            return imageCache.get(query);
        }

        try {
            const response = await fetch(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
                {
                    headers: {
                        Authorization: PEXELS_API_KEY,
                    },
                }
            );

            // Check for network errors or invalid status
            if (!response || !response.ok) {
                console.error('Pexels fetch failed or returned non-OK status:', response && response.status);
                continue;
            }

            let data = null;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('Error parsing Pexels response JSON:', jsonError);
                continue;
            }

            if (data && data.photos && data.photos.length > 0) {
                const bestPhoto = pickBestPhoto(data.photos, tokens) || data.photos[0];
                const imageUrl = bestPhoto.src.medium;
                imageCache.set(query, imageUrl);
                return imageUrl;
            }
        } catch (error) {
            console.error('Error fetching image from Pexels:', error);
        }
    }

    const fallbackUrl = getPlaceholderImage();
    return fallbackUrl;
};

/**
 * Backwards-compatible helper
 * @param {string} query
 */
export const getPlaceImage = async (query) => {
    return getRelevantImage({ name: query, type: "place" });
};

/**
 * Get a generic placeholder image from Picsum
 * @returns {string} - Placeholder image URL
 */
export const getPlaceholderImage = () => {
    // Random image from picsum
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return `https://picsum.photos/id/${randomId}/400/300`;
};

export const getDeterministicPlaceholder = (seed) => {
    const id = hashToId(seed || "placeholder");
    return `https://picsum.photos/id/${id}/400/300`;
};
