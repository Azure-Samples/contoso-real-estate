import { faker } from "@faker-js/faker";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug }: { slug?: number } = {}) {
  return {
    id: faker.database.mongodbObjectId(),
    user: {
      id: faker.database.mongodbObjectId(),
    },
    reservation: {
      id: faker.database.mongodbObjectId(),
    },
    invoice: {
      id: faker.database.mongodbObjectId(),
      provider: faker.helpers.arrayElements(["stripe", "paypal"], 1),
      status: faker.helpers.arrayElements(["pending", "declined", "completed", "cancelled"], 1),
      amount: faker.finance.amount(),
      currency: faker.helpers.arrayElements(["USD", "EUR", "GBP"], 1),
    },
    createdAt: faker.date.past(),
    slug: slug || faker.lorem.slug(),
  };
}

export async function getPaymentsMock({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    model.$self = `/api/payments/${model.slug}`;
    return model;
  });
}

export async function getPaymentBySlugMock({ slug }: { slug: number }): Promise<any> {
  return Promise.resolve(CACHE.find(model => model.slug === slug));
}
