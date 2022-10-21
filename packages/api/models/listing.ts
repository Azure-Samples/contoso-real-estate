import { faker } from "@faker-js/faker";
import { model as addressModel } from "./address";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug }: { slug?: number } = {}) {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.lorem.sentence(),
    isFeatured: faker.datatype.boolean(),
    isFavorited: faker.datatype.boolean(),
    isRecommended: faker.datatype.boolean(),
    bedrooms: +faker.random.numeric(),
    bathrooms: +faker.random.numeric(),
    capacity: +faker.datatype.number({
      min: 1,
      max: 5,
    }),
    fees: {
      cleaning: +faker.commerce.price(10, 100),
      service: +faker.commerce.price(10, 100),
      occupancy: +faker.commerce.price(10, 100),
      rent: +faker.commerce.price(500, 3000),
      discount: +faker.datatype.number({
        min: 0,
        max: 100,
      }),
      currency: faker.helpers.arrayElement([
        {
          code: "EURO",
          symbol: "€",
        },
        {
          code: "GBP",
          symbol: "£",
        },
        {
          code: "USD",
          symbol: "$",
        },
        {
          code: "INR",
          symbol: "₹",
        },
      ]),
    },
    reviews: {
      stars: faker.datatype.number({
        min: 0,
        max: 5,
      }),
      number: faker.datatype.number({
        min: 0,
        max: 500,
      }),
    },
    amenities: faker.helpers.arrayElements(
      // See https://fonts.google.com/icons
      [
        { icon: "waves", label: "Swimming Pool" },
        { icon: "self_improvement", label: "Gym" },
        { icon: "wifi", label: "Wi-Fi" },
        { icon: "local_parking", label: "Parking" },
        { icon: "balcony", label: "Balcony" },
        { icon: "deck", label: "Terrace" },
        { icon: "outdoor_garden", label: "Garden" },
        { icon: "deck", label: "Patio" },
        { icon: "hot_tub", label: "Sauna" },
        { icon: "hot_tub", label: "Jacuzzi" },
        { icon: "fireplace", label: "Fireplace" },
        { icon: "heat_pump", label: "Air Conditioning" },
        { icon: "hvac", label: "Heating" },
        { icon: "elevator", label: "Elevator" },
        { icon: "local_laundry_service", label: "Laundry Room" },
        { icon: "dishwasher_gen", label: "Dishwasher" },
        { icon: "microwave_gen", label: "Microwave" },
        { icon: "chair", label: "Furniture" },
        { icon: "info", label: "No Furniture" },
      ],
      5,
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
      10,
    ),
    address: addressModel(),
    createdAt: faker.date.past(),
    slug: slug || faker.lorem.slug(),
  };
}

export async function getListings({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    model.$self = `/api/listings/${model.slug}`;
    return model;
  });
}

export async function getListingBySlug({ slug }: { slug: string | undefined }): Promise<any> {
  if (!slug) {
    return Promise.resolve();
  }

  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model());
  }

  return Promise.resolve(CACHE.find(model => model.slug === slug));
}
