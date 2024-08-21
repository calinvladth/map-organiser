/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ihrw7y20qdjdwwc")

  // remove
  collection.schema.removeField("mzob4lyg")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ihrw7y20qdjdwwc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mzob4lyg",
    "name": "isPublic",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
