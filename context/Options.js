export const SelectTravelerList = [
    {
        id: "1",
        title: "Just Me",
        desc: "A sole traveler in exploration",
        icon: "✈️",
        people: "1",
    },
    {
        id: "2",
        title: "Couple",
        desc: "Traveling with a partner",
        icon: "🥂",
        people: "2 People",
    },
    {
        id: "3",
        title: "Family",
        desc: "A family trip with loved ones",
        icon: "🏠",
        people: "3 to 5 People",
    },
    {
        id: "4",
        title: "Friends",
        desc: "An adventure with friends",
        icon: "⛵",
        people: "5 to 10 People",
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💴",
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Balance between cost and comfort",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Experience the best of everything",
        icon: "💎",
    },
];

export const AI_PROMPT =
    `Generate a travel itinerary in this EXACT JSON format for {location} for {totalDays} days, {totalNight} nights for {traveler} travelers with {budget} budget:
{
  "location": "{location}",
  "duration": "{totalDays} Days and {totalNight} Nights",
  "budget": "{budget}",
  "flightDetails": {
    "airline": "real airline name",
    "price": "actual estimated price in INR",
    "bookingUrl": "https://www.makemytrip.com"
  },
  "hotelOptions": [
    {
      "hotelName": "actual real hotel name",
      "address": "actual address",
      "pricePerNight": "price in INR",
      "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      "rating": 4.5,
      "description": "brief description"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "theme": "theme name",
      "places": [
        {
          "name": "real place name",
          "description": "detailed description",
          "imageUrl": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
          "coordinates": {"lat": number, "lng": number},
          "ticketPrice": "price or 'Free'",
          "timeToVisit": "2 hours"
        }
      ]
    }
  ]
}
IMPORTANT: For imageUrl fields, use Unsplash URLs like "https://images.unsplash.com/photo-[random-id]?w=400" or use generic working URLs. Use REAL place names, REAL prices, REAL hotel names.`;
