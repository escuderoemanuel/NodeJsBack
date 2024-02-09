# Consignas

- Crear una database 'dbCRUD'
- Crear una collection 'pets'
- Insertar un elemento en la collection 'pets' con las propiedades 'name', 'specie', 'age'.
- Insertar 2 elementos más en la misma collection.
- Mostrar los elementos filtrados por 'specie'
- Mostrar elementos filtrados por 'age'


```powershell
use dbCRUD

db.createCollection('pets')

db.pets.insertOne(
  {
    name: 'Coco',
    specie: 'Dog',
    age: 3
  }
)

db.pets.insertMany(
  [
    {
      name: 'Tomy',
      specie: 'Dog',
      age: 6
    },
    {
      name: 'Enzo',
      specie: 'Cat',
      age: 25
    },
    ]
)

db.pets.find( { specie: 'Dog' } )
db.pets.find( { specie: 'Cat' } )
db.pets.find( { age: 6 } )

```