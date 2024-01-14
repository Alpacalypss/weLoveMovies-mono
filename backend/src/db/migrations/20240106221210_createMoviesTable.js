//creates movies table with incrementing primary id
exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary();
    table.string("title");
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true); //adds created_at and updated_at columns
  });
};

//ability to undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
