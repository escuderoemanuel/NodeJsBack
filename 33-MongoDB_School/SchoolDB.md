# Practice

✅ Sobre una base de datos llamada “colegio”, crear una colección “estudiantes” donde se agregarán documentos con los siguientes datos:
  - nombre
  - apellido
  - curso
  - edad
  - correo
  - sexo
 
✅ Insertar 5 estudiantes con todos los campos

✅ Insertar 1 estudiante con nombre, apellido y curso solamente 

✅ Realizar una búsqueda para obtener a todos los estudiantes.

✅ Realizar una búsqueda para obtener a todos los estudiantes de sexo H (hombre)

✅ Realizar un conteo para obtener el número de documentos totales.

✅ Realizar un conteo para obtener el número de documentos totales que cumplan con el criterio: “Es mujer”

✅ Insertar 5 datos más:
  { name : "Pablo", age : 25 }
  { name : "Juan", age : 22 }
  { name : "Lucia", age : 25 }
  { name : "Juan", age : 29 }
  { name : "Fede", age : 35 }

✅ Listar todos los documentos de la colección clientes ordenados por edad descendente.

✅ Listar el cliente más joven.

✅ Listar el segundo cliente más joven.

✅ Listar los clientes llamados 'Juan'

✅ Listar los clientes llamados 'Juan' que tengan 29 años.

✅ Listar los clientes llamados 'Juan' ó 'Lucia'.


```powershell
use school

db.createCollection('students')

db.students.insertMany(
  [
    {
      name: 'Emma',
      lastName: 'Smith',
      course: 'Mathematics 101',
      email: 'emma.smith@example.com',
      genre: 'female'
    },
    {
      name: 'John',
      lastName: 'Doe',
      course: 'History 201',
      email: 'john.doe@example.com',
      genre: 'male'
    },
    {
      name: 'Sophia',
      lastName: 'Garcia',
      course: 'Biology 301',
      email: 'sophia.garcia@example.com',
      genre: 'female'
    },
    {
      name: 'Michael',
      lastName: 'Johnson',
      course: 'Chemistry 202',
      email: 'michael.johnson@example.com',
      genre: 'male'
    },
    {
      name: 'Isabella',
      lastName: 'Martinez',
      course: 'Physics 101',
      email: 'isabella.martinez@example.com',
      genre: 'female'
    }
  ]
  )

db.students.insertOne(
  {
    name: 'Hilary',
    lastName: 'Thomson',
    course: 'Chemistry 202',
  }
)
# Show all students
db.students.find()
# Show all students with genre 'male'
db.students.find({genre: 'male'})
# Count estimated students
db.students.estimatedDocumentCount()
# Show all students with gewnre 'female'
db.students.countDocuments({genre: 'female'})
# Find documents where name is 'John'
db.students.find({name: {$eq: 'John'}}) 
# Find documents where name is not 'John'
db.students.find({name: {$not: {$eq: 'John'}}}) 
# Find documents where name is not equal to 'John'
db.students.find({name: {$ne: 'John'}}) 
# Find documents where name is 'Johnnie' or 'Hilary'
db.students.find({$or: [{name:'Johnnie'},{name: 'Hilary'}]}) 
# Find documents where age is 23 or name is 'Hilary'
db.students.find({$or: [{age: 23},{name: 'Hilary'}]}) 
# Find documents where age is less than or equal to 25 or name is 'Hilary'
db.students.find({$or: [{age: {$lte: 25}},{name: 'Hilary'}]}) 
# Find documents where email field exists
db.students.find({email:{$exists:true}}) 
# Find documents where age field is of type string
db.students.find({age:{$type:'string'}}) 
# Get distinct ages from students collection
db.students.distinct('age') 
# Get distinct names from students collection
db.students.distinct('name') 

db.students.insertMany(
  [
    {
      name: 'Jack',
      lastName: 'Sparrow',
      course: 'FrontEnd',
      age: 30,
      email: 'capsparrow@gmail.com',
      genre: 'male'
    },
    {
      name: 'Gwen',
      lastName: 'Smith',
      course: 'Marketing',
      age: 42,
      email: 'gwensmith@gmail.com',
      genre: 'female'
    },
    {
      name: 'Andrea',
      lastName: 'Ghrowl',
      course: 'FrontEnd',
      age: 39,
      email: 'andy@gmail.com',
      genre: 'female'
    },
    {
      name: 'Carlos',
      lastName: 'López',
      course: 'UX IU',
      age: 24,
      email: 'charly@gmail.com',
      genre: 'male'
    },
    {
      name: 'Tatiana',
      lastName: 'Garza',
      course: 'UX IU',
      age: 34,
      email: 'tati@gmail.com',
      genre: 'female'
    }
  ]
)

# show students and their names
db.students.find({},{name: 1})
# show students and their names and ages
db.students.find({},{name: 1, age:1})
# show students and their names but without their _id property
db.students.find({},{name: 1, age:1, _id: 0})
# show students, ordered by ascendent name
db.students.find({},{name: 1, age:1, _id: 0}).sort({name: 1})
# show students, ordered by descendent age
db.students.find({},{name: 1, age:1, _id: 0}).sort({age: -1})
# show students, without the first two
db.students.find({},{name: 1, age:1, _id: 0}).skip(2)
# show only two students
db.students.find({},{name: 1, age:1, _id: 0}).limit(2)
# show two students, without the first two
db.students.find({},{name: 1, age:1, _id: 0}).skip(2).limit(2)

# Insert 5 docs in a new collection called 'clients'
db.clients.insertMany([{ name: "Pablo", age: 25 }, { name: "Juan", age: 22 }, { name: "Lucia", age: 25 }, { name: "Juan", age: 29 }, { name: "Fede", age: 35 }])


# Listar todos los documentos de la colección clientes ordenados por edad descendente.
db.clients.find().sort({age: -1})
# Listar el cliente más joven.
db.clients.find().sort({age: 1}).limit(1)
# Listar el segundo cliente más joven.
db.clients.find().sort({age: 1}).skip(1).limit(1)
# Listar los clientes llamados 'Juan' 
db.clients.find({name: 'Juan'})
# Listar los clientes llamados 'Juan' que tengan 29 años. 
db.clients.find({name: 'Juan', age: 29})
db.clients.find({$and:[{name: 'Juan', age: 29}]})
# Listar los clientes llamados 'Juan' ó 'Lucia'.
db.clients.find({$or: [{name: 'Juan'}, {name: 'Lucia'}]})
# Listar los clientes que tengan más de 25 años.
db.clients.find( {age: {$gt :25} })
# Listar los clientes que tengan 25 años ó menos.
db.clients.find({age: {$lte :25} })
# Listar los clientes que NO tengan 25 años.
db.clients.find({age: {$ne :25} })
# Listar los clientes que estén entre los 26 y 35 años.
db.clients.find({$and: [{age: {$gt :25}},{age: {$lt: 36}}] })
# Actualizar la edad de Fede a 36 años, listando y verificando que no aparezca en el último listado.
db.clients.updateOne({name: 'Fede'},{$set: {age: 36}})
# Actualizar todas las edades de 25 años a 26 años, listando y verificando que aparezcan en el último listado.
db.clients.updateMany({age: 25}, {$set: {age: 26}})
# Borrar los clientes que se llamen 'Juan' y listar verificando el resultado.
db.clients.deleteMany({name: 'Juan'})
# Eliminar además todos los documentos de estudiantes que hayan quedado con algún valor.
db.students.deleteMany({})

```

# Find the Bugs

- Insertar múltiples mascotas:
  - db.pets.insertOne([{name:”aletas”,specie:”fish”},{name:”Doby”,{specie:”dog”}])
```powershell
db.pets.insertOne([{name:'aletas',specie:'fish'},{name:'Doby'},{specie:'dog'}])
```
- Obtener sólo las últimas 5 mascotas que sean peces 
  - db.pets.find({specie:”fish}).limit(5)
```powershell
db.pets.find({specie:'fish'}).limit(5)
```
- Obtener sólo el nombre de las últimas 5 mascotas cuya edad sea menor de 10 años: 
  - db.pets.find(age:{ $gte:{10}}},{name:1}).sort(age:1).limit(5)
```powershell
db.pets.find({age:{ $lt: 10}},{name:1}).sort(age:-1).limit(5)
```