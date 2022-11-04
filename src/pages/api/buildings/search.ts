import type { NextApiRequest, NextApiResponse } from "next";
import { times } from "lodash-es";
import { faker } from "@faker-js/faker";
import { Building } from "../../../models";
import NextCors from "nextjs-cors";

export default async (request: NextApiRequest, response: NextApiResponse<Building[]>) => {
  console.error("foo");
  await NextCors(request, response, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  response.status(200).json(
    times(4, () => ({
      id: faker.datatype.uuid(),
      names: times(4, () => faker.address.streetName()),
      geolocation: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      },
    })),
  );
};
