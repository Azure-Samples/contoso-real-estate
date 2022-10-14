import { faker } from "@faker-js/faker";
import { model as addressModel } from "./address";

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
      // See https://fonts.google.com/icons
      [
        { id: "waves", label: "Swimming Pool" },
        { id: "self_improvement", label: "Gym" },
        { id: "wifi", label: "Wi-Fi" },
        { id: "local_parking", label: "Parking" },
        { id: "balcony", label: "Balcony" },
        { id: "deck", label: "Terrace" },
        { id: "outdoor_garden", label: "Garden" },
        { id: "deck", label: "Patio" },
        { id: "hot_tub", label: "Sauna" },
        { id: "hot_tub", label: "Jacuzzi" },
        { id: "fireplace", label: "Fireplace" },
        { id: "heat_pump", label: "Air Conditioning" },
        { id: "hvac", label: "Heating" },
        { id: "elevator", label: "Elevator" },
        { id: "local_laundry_service", label: "Laundry Room" },
        { id: "dishwasher_gen", label: "Dishwasher" },
        { id: "microwave_gen", label: "Microwave" },
        { id: "chair", label: "Furniture" },
        { id: "info", label: "No Furniture" },
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
