DROP TABLE ideatoparts;
DROP TABLE ideas CASCADE;
DROP TABLE dayparts CASCADE;

CREATE TABLE ideas (
  IdeaID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  ldr_alt TEXT NOT NULL
);

INSERT INTO ideas (name, cost, ldr_alt)
VALUES  ('Obtain kites and fly them.', 2, 'Attend a virtual kite festivals. Get crafty and make kites over video call. Learn about different types of kites or kite history.'),
        ('Scuba Dive', 3, 'Explore virtual dives into American Samoa, the Florida Keys, Flower Garden Banks, Gray''s Reef, and Thunder Bay by visiting the National Marine Sanctuary System online at noaa.gov'),
        ('Make pet rocks', 1, 'Paint rocks over video call. Look into the story/success of the original Pet Rock and its inventor, Gary Dahl. iRock and virtual pet rocks may be worth looking into.'),
        ('Build a sand fortress', 2, 'Create an indoor sandbox or visit Sandcastles a web-based amusement created by Vectorpark.'),
        ('Visit an apiary.', 2, 'Adopt a bee hive. Learn about hive inspections through online beekeeping courses. Take a virtual tour of an apiary.'),
        ('Karaoke at home.', 1, 'Follow a step-by-step guide on hosting a virtual karaoke party. Download Smule, a social karaoke singing app.'),
        ('Watch the sun rise.', 1, 'Exchanging photographs of the sunrise can be fun way to keep in touch across timezones.'),
        ('Chat over coffee/tea/other beverages.', 1, 'A video call chat is a simple way to catch up. Perhaps, mail each other different teas or coffees to try. Exchange your favorites.'),
        ('Neighborhood litter cleanup.', 1, 'Pick up litter in your perspective neighborhoods. Chat about how it went. Any notable finds?'),
        ('Find a new recipe. Gather ingredients. Cook.', 2, 'Online cooking lessons. Call and cook. Exchange recipes or ingredients via snail mail.'),
        ('Zipline.', 3, 'Zipline over Niagara Falls, London, or even treetops in North Carolina through 360 degree video.')
;

CREATE TABLE dayparts (
  DayPartID SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO dayparts (name)
VALUES  ('Morning'),
        ('Afternoon'),
        ('Evening'),
        ('Overnight')
;

CREATE TABLE ideatoparts (
  IdeaToPartID SERIAL PRIMARY KEY,
  IdeaID SERIAL NOT NULL,
  DayPartID SERIAL NOT NULL,
  FOREIGN KEY (IdeaID) REFERENCES ideas (IdeaID),
  FOREIGN KEY (DayPartID) REFERENCES dayparts (DayPartID)
);

INSERT INTO ideatoparts (IdeaID, DayPartID)
VALUES  (1, 1), (1, 2),
        (2, 1), (2, 2),
        (3, 1), (3, 2), (3, 3), (3, 4),
        (4, 1), (4, 2),
        (5, 1), (5, 2),
        (6, 2), (6, 3), (6, 4),    
        (7, 1), 
        (8, 1), (8, 2), (8, 3), (8, 4),
        (9, 1), (9, 2), 
        (10, 1), (10, 2), (10, 3), (10, 4),
        (11, 1), (11, 2) 
;
