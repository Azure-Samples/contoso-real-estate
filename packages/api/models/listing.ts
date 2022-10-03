import { faker } from "@faker-js/faker";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug }: { slug?: number } = {}) {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.lines(1),
    city: faker.address.city(),
    isFeatured: faker.datatype.boolean(),
    isFavorited: faker.datatype.boolean(),
    isRecommended: faker.datatype.boolean(),
    bedrooms: +faker.random.numeric(),
    bathrooms: +faker.random.numeric(),
    amenities: faker.helpers.arrayElements(
      [
        "swimming pool",
        "gym",
        "wi-fi",
        "parking",
        "balcony",
        "terrace",
        "garden",
        "patio",
        "sauna",
        "jacuzzi",
        "fireplace",
        "air conditioning",
        "heating",
        "elevator",
        "laundry room",
        "dishwasher",
        "microwave",
        "furniture",
        "no furniture",
      ],
      3,
    ),
    description: faker.lorem.paragraphs(3),
    photos: faker.helpers.arrayElements(
      [
        "pic-blue.png",
        "pic-bluegreen.png",
        "pic-green.png",
        "pic-orange.png",
        "pic-pink.png",
        "pic-purple.png",
        "pic-salmon.png",
        "pic-yellowgreen.png",
      ],
      1,
    ),
    slug: slug || faker.lorem.slug(),
  };
}

export async function getListingsMock({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    delete model.amenities;
    model.$self = `/api/listings/${model.slug}`;
    return model;
  });
}

export async function getListingBySlugMock({ slug }: { slug: number }): Promise<any> {
  return Promise.resolve(CACHE.find(model => model.slug === slug));
}
