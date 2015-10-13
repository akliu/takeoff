# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## reservations
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key (references users), indexed
origin_id         | integer   | not null, foreign key (references airports), indexed
destination_id    | integer   | not null, foreign key (references airports), indexed
jet_id            | integer   | not null, foreign key (references jets), indexed
departure_time    | datetime  | not null, default: false

## airports
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
latitude    | float     | not null
longitude   | float     | not null
name        | string    | not null, (ex: San Francisco Airport)
code        | string    | not null, (ex: SFO)

## jets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users), indexed
airport_id  | integer   | not null, foreign key (references airports), indexed
name        | string    | not null
passengers  | integer   | not null
