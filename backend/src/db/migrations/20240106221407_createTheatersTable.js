//creating theaters table
exports.up = function (knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary();
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true); //adds created_at and updated_at columns
  });
};

//ability to undo migration
exports.down = function (knex) {
  return knex.schema.dropTable("theaters");
};
