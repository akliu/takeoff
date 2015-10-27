# Takeoff

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.flytakeoff.xyz/

## Minimum Viable Product

Takeoff is a web application inspired by Uber built using Ruby on Rails
and React.js. Takeoff allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] View nearest airports and available jets for hire
- [ ] Create, read, edit, and delete flight reservations
- [ ] Add jets to be rented by the service

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline


### Phase 1: User Authentication (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component.

[Details][phase-one]

### Phase 2: Airport Index and Map (2.5 days)

In phase 2, I will setup the full JSON API for airports and seed my database
with airports.  I will then create
the react view logic using the google maps API.  At the end of this stage, users
will be able to airports on the map and click on airport marks to go to the
reservation creation page to be created in phase 3.  I will also begin
implementing basic CSS for the map/index page.

[Details][phase-two]

### Phase 3:  Reservation creation (1.5 days)

In phase 3, I will setup the JSON API for new reservations and implement the
react view logic for reservation creation.  I will seed my database with
reservations, and I will also add basic CSS styling to
the reservation creation form.  At the end of this stage, users should be able
to navigate to the reservation creation form from the map, and then submit a
reservation which is saved to the database.

[Details][phase-three]

### Phase 4:  Reservation updating and deletion (2 days)

In phase 4, I will update the JSON reservation API to add support for modifying
and deleting existing reservations.  I will then update the react views to
allow users to view previously created reservations and modify them.  At the
end of this stage, users should be able to view, modify, and delete their
reservations and have this saved to the database.

[Details][phase-four]

### Phase 5: Jets (3 days)

In phase 5, I will add a table to keep track of jets and link jets to owners.  
I will create a full JSON API for jets to be utilized by my react views.  I will
add a view for owners to register their jets and update the reservation creation
form to allow users to select a jet from available jets at the origin airport. I
will also add basic CSS styling to the the jet registration page and seed the
database with jets.

[Details][phase-five]

### Phase 6: Styling and seeding (2 days)

Phase 6 will focus on polishing my app's styling and seed data. I will add
additional CSS to fully polish the site and add more seeding to the database
to create a strong demo experience.


### Bonus Features (TBD)
- [ ] Add features to jets such as prices, ratings, reviews, photos, and comments
- [ ] Improve pricing system


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
