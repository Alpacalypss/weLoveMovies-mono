//creating the critics table with incrementing primary id
exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true); //adds created_at and updated_at columns
  });
};

//ability to undo the migration
exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};
