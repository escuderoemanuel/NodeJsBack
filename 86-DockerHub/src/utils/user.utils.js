import { faker } from '@faker-js/faker';

const generateUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.url(),
  }
}

export default generateUser;