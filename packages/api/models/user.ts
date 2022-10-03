import { faker } from "@faker-js/faker";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug }: { slug?: number } = {}) {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.helpers.fake("{{name.firstName}} {{name.lastName}}"),
    role: faker.helpers.arrayElements(["guest", "renter", "admin"], 1),
    status: faker.helpers.arrayElements(["active", "suspended", "inactive"], 1),
    photo: faker.image.avatar(),
    address: faker.address.streetAddress(),
    payment: {
        provider: faker.helpers.arrayElements(["stripe", "paypal"], 1),
        id: faker.helpers.arrayElements(["cus_123", "cus_456"], 1),
        address: faker.address.streetAddress(),
    },
    email: faker.internet.email(),
    auth: {
        provider: faker.helpers.arrayElements(["aad", "apple", "twitter", "google", "facebook"], 1),
        id: faker.helpers.arrayElements(["123", "456"], 1),
        token: faker.random.alphaNumeric(128),
        lastLogin: faker.date.past(),
    },
    slug: slug || faker.lorem.slug(),
  };
}

export async function getUsersMock({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    model.$self = `/api/users/${model.slug}`;
    return model;
  });
}

export async function getUserBySlugMock({ slug }: { slug: number }): Promise<any> {
  return Promise.resolve(CACHE.find(model => model.slug === slug));
}
