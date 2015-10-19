# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151019182454) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "airports", force: :cascade do |t|
    t.float    "lat",        null: false
    t.float    "lng",        null: false
    t.string   "name",       null: false
    t.string   "code",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jets", force: :cascade do |t|
    t.integer  "owner_id",   null: false
    t.integer  "airport_id", null: false
    t.string   "model",      null: false
    t.integer  "capacity",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "jets", ["airport_id"], name: "index_jets_on_airport_id", using: :btree
  add_index "jets", ["owner_id"], name: "index_jets_on_owner_id", using: :btree

  create_table "reservations", force: :cascade do |t|
    t.integer  "user_id",        null: false
    t.integer  "origin_id",      null: false
    t.integer  "destination_id", null: false
    t.integer  "jet_id",         null: false
    t.datetime "departure_time", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.float    "price"
  end

  add_index "reservations", ["destination_id"], name: "index_reservations_on_destination_id", using: :btree
  add_index "reservations", ["jet_id"], name: "index_reservations_on_jet_id", using: :btree
  add_index "reservations", ["origin_id"], name: "index_reservations_on_origin_id", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
