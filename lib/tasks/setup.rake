namespace :setup do
  desc "Populates the database with seed data"
  task seed_db: :environment do
    t = User.new(
      email: "admin@useriq.com",
      name: "John Doe",
      nickname: "Iron Man",
      password: "useriq16",
      password_confirmation: "useriq16",
      admin: true
    )
    t.save!

    r = User.new(
      email: "user@useriq.com",
      name: "Jane Doe",
      nickname: "Superwoman",
      password: "useriq16",
      password_confirmation: "useriq16",
      admin: false
    )
    r.save!


    Destination.create([
      {
        name: "Great Barrier Reef", continent: "Australia", score: 90,
        desc_long: "The world's largest coral reef system boasts incredible scenery, whether you view it underwater, from the air or by boat. Though plenty of diving and snorkeling spots can be found along Queensland's coast, to escape the crowds, take an excursion to Hamilton Island.",
        desc_short: "The world's largest coral reef.",
        user_id: 1,
        image_src: "app/img/great-barrier-reef.jpg"
      },
      {
        name: "Paris", continent: "Europe", score: 85,
        desc_long: "Year after year, the magnetic City of Light draws travelers looking to cross the Eiffel Tower and Notre Dame off their bucket lists. But what visitors really fall in love with are the city's quaint cafes, vibrant markets, trendy shopping districts and unmistakable je ne sais quoi charm.",
        desc_short: "The magnetic City of Light.",
        user_id: 2,
        image_src: "app/img/paris.jpg"
      },
      {
        name: "Bora Bora", continent: "Europe", score: 87,
        desc_long: "It's hard not to be enchanted by this paradisiacal destination: Lush jungles extend into sky high volcanoes and sands stretch into upscale resorts. Remember, though, that a trip to this Pacific paradise does not come cheap.",
        desc_short: "Lush jungles extend into sky high volcanoes and sands stretch into upscale resorts.",
        user_id: 1,
        image_src: "app/img/bora-bora.jpg"
      },
      {
        name: "Florence", continent: "Europe", score: 88,
        desc_long: "The historic city of Florence offers plenty of world-famous attractions, including the Duomo, the Piazzale Michelangelo and the Piazza della Signoria. After appreciating the city's Renaissance architecture and art, sample some of the region's delectable Tuscan food and wine.",
        desc_short: "The beautiful city of Renaissance.",
        user_id: 2,
        image_src: "app/img/florence.jpeg"
      },
      {
        name: "Tokyo", continent: "Asia", score: 83,
        desc_long: "Temples, markets and museums are just some of the offerings you'll find in the bustling, tech-centric city of Tokyo. And thanks to the city's abundance of free attractions, you'll be able to visit top spots like Tsukiji Market and the Imperial Palace without breaking the bank.",
        desc_short: "Temples, Tech and Sushi.",
        user_id: 1,
        image_src: "app/img/tokyo.jpeg"
      },
      {
        name: "Cusco", continent: "South America", score: 89,
        desc_long: "Known as the heart of the Inca Empire and the archaeological capital of the Americas, Cusco offers plenty for history and architecture buffs to enjoy. If you're up for a challenging, yet life-changing experience, try hiking the Inca Trail to Machu Picchu.",
        desc_short: "the heart of the Inca Empire and the archaeological capital of the Americas.",
        user_id: 2,
        image_src: "app/img/cusco.jpg"
      },
      {
        name: "London", continent: "Europe", score: 90,
        desc_long: "London is a world unto itself. The eclectic neighborhoods – which house a blend of historic landmarks and modern-day attractions – can keep you occupied for days. Be sure to visit the Tower of London, Buckingham Palace and the British Museum during your stay.",
        desc_short: "London is a world unto itself.",
        user_id: 1,
        image_src: "app/img/london.jpeg"
      },
      {
        name: "Rome", continent: "Europe", score: 88,
        desc_long: "When you visit the Eternal City, prepare to cross a few must-see attractions – the Colosseum, Trevi Fountain and the Pantheon, to name a few – off your bucket list. Additional treasures like St. Peter's Basilica and the Sistine Chapel can be found in nearby Vatican City.",
        desc_short: "The Eternal City brimming with life.",
        user_id: 2,
        image_src: "app/img/rome.jpeg"
      },
      {
        name: "New York City", continent: "North America", score: 84,
        desc_long: "New York City hosts infinite urban adventures: Wander through Central Park, tour the exhibits at the Met, catch a Broadway show or peruse SoHo's stylish boutiques. And at night, admire Manhattan's glittering skyscrapers from the top of the Empire State Building.",
        desc_short: "A host of infinite urban adventures.",
        user_id: 1,
        image_src: "app/img/nyc.jpeg"
      },
      {
        name: "Maui", continent: "North America", score: 87,
        desc_long: "Maui – one of the most beloved of all the Hawaiian Islands – lives up to its superlatives with exotic beaches (like Kaanapali Beach), palatial resorts (like the Four Seasons Resort Maui at Wailea) and lush terrain (as seen in Iao Valley State Park).",
        desc_short: "The most beloved Hawaiian Island.",
        user_id: 2,
        image_src: "app/img/maui.jpg"
      },
      {
        name: "Cape Town", continent: "Africa", score: 90,
        desc_long: "This South African city appeals to adventure seekers and mellow travelers alike. Kick-start your day by climbing Table Mountain. Afterward, sunbathe along Clifton Beach's khaki-colored sands or tour the vineyards of Constantia Valley.",
        desc_short: "The colorful and adventurous city of South Africa",
        user_id: 1,
        image_src: "app/img/cape-town.jepg"
      },
      {
        name: "Barcelona", continent: "Europe", score: 92,
        desc_long: "Though known for its fútbol team, Barcelona boasts much more than athletic talent. The city is a feast for the eyes: Visitors can walk past medieval architecture in the Barri Gòtic and Gaudi's unique creations at Güell Park. Meanwhile, Las Ramblas buzzes at all hours.",
        desc_short: "A feast for the eyes.",
        user_id: 2,
        image_src: "app/img/barcelona.jpeg"
      },
      {
        name: "Sydney", continent: "Australia", score: 84,
        desc_long: "This metropolis offers more than just a dizzying array of landmarks (e.g., the Sydney Opera House and the Sydney Harbour Bridge). Sydney boasts a warm, sunny climate ideal for enjoying local beaches like Coogee and Bondi.",
        desc_short: "Home of the Sydney Opera House.",
        user_id: 1,
        image_src: "app/img/sydney.jpeg"
      },
      {
        name: "Rio de Janeiro", continent: "South America", score: 85,
        desc_long: "The host of the 2016 Olympic Games is arguably South America's hottest spot – and not just for its warm weather. The famous Christ the Redeemer statue sits above Copacabana Beach, and you'll be hard-pressed to find a livelier event than Rio's Carnival.",
        desc_short: "The Carnival city.",
        user_id: 2,
        image_src: "app/img/rio.jpg"
      },
      {
        name: "Yellowstone", continent: "North America", score: 80,
        desc_long: "More than 3,000 square miles of nature's finest canyons, geysers and rocky cliffs are an easy sell for nature enthusiasts. Geothermic wonders like the Mammoth Hot Springs, Old Faithful and Yellowstone Lake are not to be missed at this national park.",
        desc_short: "A natural beauty to behold.",
        user_id: 1,
        image_src: "app/img/yellowstone.jpg"
      },
      {
        name: "Amsterdam", continent: "Europe", score: 88,
        desc_long: "Though Amsterdam's notorious Red Light District and coffee shops can still be found in the city, more family-friendly attractions have sprouted up in recent years. Some of Amsterdam's must-see spots include the Van Gogh Museum, the Anne Frank House and the Verzetsmuseum.",
        desc_short: "Van Gogh and more.",
        user_id: 2,
        image_src: "app/img/amsterdam.jpg"
      },
      {
        name: "Hong Kong", continent: "Asia", score: 89,
        desc_long: "Hong Kong is worth visiting for its one-of-a-kind cultural fusion. Only here will you find a Disney theme park rubbing elbows with ancient temples. Peruse a street market, ride the Star Ferry from Tsim Sha Tsui pier or check out the views from atop Victoria Peak.",
        desc_short: "Cultural Fusion at its finest.",
        user_id: 1,
        image_src: "app/img/hong_kong.jpeg"
      },
      {
        name: "Bali", continent: "Asia", score: 84,
        desc_long: "Serene temples and beaches are the biggest draws to this lush paradise. You'll also have plenty of opportunities to interact with monkeys and elephants while exploring Bali. To avoid the region's notorious wet season, consider visiting between April and October.",
        desc_short: "Exploring mother nature.",
        user_id: 2,
        image_src: "app/img/bali.jpeg"
      },
    ])
  end

end
