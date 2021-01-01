DROP TABLE ideas CASCADE;

CREATE TABLE ideas (
  IdeaID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  ldr_alt TEXT NOT NULL,
  morning BOOLEAN NOT NULL, 
  afternoon BOOLEAN NOT NULL, 
  evening BOOLEAN NOT NULL, 
  overnight BOOLEAN NOT NULL
);

INSERT INTO ideas (name, cost, ldr_alt, morning, afternoon, evening, overnight)
VALUES  ('Obtain kites and fly them.', 2, 'Attend a virtual kite festivals. Get crafty and make kites over video call. Learn about different types of kites or kite history.', true, true, false, false),
        ('Scuba Dive', 3, 'Explore virtual dives into American Samoa, the Florida Keys, Flower Garden Banks, Gray''s Reef, and Thunder Bay by visiting the National Marine Sanctuary System online at noaa.gov', true, true, false, false),
        ('Make pet rocks', 1, 'Paint rocks over video call. Look into the story/success of the original Pet Rock and its inventor, Gary Dahl. iRock and virtual pet rocks may be worth looking into.', true, true, true, true),
        ('Build a sand fortress', 2, 'Create an indoor sandbox or visit Sandcastles a web-based amusement created by Vectorpark.', true, true, false, false),
        ('Visit an apiary.', 2, 'Adopt a bee hive. Learn about hive inspections through online beekeeping courses. Take a virtual tour of an apiary.', true, true, false, false),
        ('Karaoke at home.', 1, 'Follow a step-by-step guide on hosting a virtual karaoke party. Download Smule, a social karaoke singing app.', false, true, true, true),
        ('Watch the sun rise.', 1, 'Exchanging photographs of the sunrise can be fun way to keep in touch across timezones.', true, false, false, false),
        ('Chat over coffee/tea/other beverages.', 1, 'A video call chat is a simple way to catch up. Perhaps, mail each other different teas or coffees to try. Exchange your favorites.', true, true, true, true),
        ('Neighborhood litter cleanup.', 1, 'Pick up litter in your perspective neighborhoods. Chat about how it went. Any notable finds?', true, true, false, false),
        ('Find a new recipe. Gather ingredients. Cook.', 2, 'Online cooking lessons. Call and cook. Exchange recipes or ingredients via snail mail.', true, true, true, true),
        ('Zipline.', 3, 'Zipline over Niagara Falls, London, or even treetops in North Carolina through 360 degree video.', true, true, false, false)
;
