import { faker } from "@faker-js/faker";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug }: { slug?: number } = {}) {
  return {
    id: faker.database.mongodbObjectId(),
    user: {
      id: faker.database.mongodbObjectId(),
    },
    listing: {
      id: faker.database.mongodbObjectId(),
    },
    reason: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    slug: slug || faker.lorem.slug(),
  };
}

export async function getFavoriteMock({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    model.$self = `/api/favorites/${model.slug}`;
    return model;
  });
}

export async function getFavoriteBySlugMock({ slug }: { slug: number }): Promise<any> {
  return Promise.resolve(CACHE.find(model => model.slug === slug));
}
