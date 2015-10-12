# Takeoff

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Takeoff is a web application inspired by Uber built using Ruby on Rails
and React.js. Takeoff allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] View nearest airports and available jets for hire
- [ ] Create, read, edit, and delete flight reservations

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Airports Model, Reservations Model and JSON API (2.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Users, Airports, and
Reservations.

[Details][phase-one]

### Phase 2: Flux Architecture and Reservations CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, Reservation and Airports stores will be implemented and a set of actions
corresponding to the needed CRUD functionality created. Once this is done, I
will create React views for the Map `Index`, reservation `Index` and reservation
`Create/Modify`. At the end of Phase 2, reservations can be created, read,
edited and destroyed in the browser. Reservations should save to the database
and be accessible to the front end through ajax calls.

[Details][phase-two]

### Phase 3: Map (2.5 days)

Phase 3 involves the integration of google maps into the map/index page that
users are taken to upon sign in.  Users will be able to see the nearest airports
marked on the map and can click these markers to go to the reservation
create/modify page.  The form will default the origin to the airport the user
clicked on.  Map will need to generate ajax calls to populate the airports store
with airports in the map's view.

[Details][phase-three]

### Phase 4: Styling and Seeding (2.5 days)

Phase 4 will focus on polishing my app's styling and database seeding.  In the
previous stages, I will use CSS to make the app layout match my proposed
wireframes.  In this stage, I will add additional CSS to fully polish the site.
I will also seed the database with additional data to create a better demo
experience.

### Bonus Features (TBD)
- [ ] Add Jets to the JSON API and allow users to select a specific jet
- [ ] Add sign up form for jet owners to rent their jets
- [ ] Improve pricing system


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
