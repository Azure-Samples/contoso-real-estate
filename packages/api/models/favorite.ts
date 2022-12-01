import { faker } from "@faker-js/faker";

const MAX_ENTRIES = 100;
let CACHE: any[] = [];

function model({ slug, user, listing }: { slug?: string; listing: any; user: any }) {
  return {
    id: faker.database.mongodbObjectId(),
    user: {
      id: user.id ?? faker.database.mongodbObjectId(),
    },
    listing: {
      id: listing.id ?? faker.database.mongodbObjectId(),
    },
    reason: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    slug: slug || faker.lorem.slug(),
  };
}

export async function getFavoriteMock({ offset, limit }: { offset: number; limit: number }): Promise<any[]> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model({ listing: {}, user: {} }));
  }

  return CACHE.slice(offset, offset + limit).map(model => {
    model.$self = `/api/favorites/${model.slug}`;
    return model;
  });
}

export async function getFavoriteByListingIdAndUserId({
  listingId,
  userId,
}: {
  listingId: string;
  userId: string;
}): Promise<any> {
  if (CACHE.length === 0) {
    CACHE = Array.from({ length: MAX_ENTRIES }, () => model({ listing: {}, user: {} }));
  }

  return Promise.resolve(CACHE.find(model => model.listing.id === listingId && model.user.id === userId));
}

export async function getFavoriteBySlugMock({ slug }: { slug: number }): Promise<any> {
  return Promise.resolve(CACHE.find(model => model.slug === slug));
}

export async function postFavoriteMock({ listing, user }: { listing: any; user: any }): Promise<any> {
  const favorite = model({ listing, user });
  CACHE.push(favorite);
  return Promise.resolve(false);
}

export async function deleteFavoriteMockBySlug({ listing, user }: { listing: string; user: string }): Promise<any> {
  const index = CACHE.findIndex(model => model.listing.id === listing && model.user.id === user);
  if (index > -1) {
    CACHE.splice(index, 1);
    return Promise.resolve(true);
  }
  return Promise.resolve(false);
}
