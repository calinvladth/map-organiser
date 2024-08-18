/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vubsc0i3u04eitn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "06gmt5ak",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vubsc0i3u04eitn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "06gmt5ak",
    "name": "text",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
