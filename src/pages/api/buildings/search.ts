import type { NextApiRequest, NextApiResponse } from "next";
import { times } from "lodash-es";
import { faker } from "@faker-js/faker";
import { Building } from "../../../models";

export default (request: NextApiRequest, response: NextApiResponse<Building[]>) => {
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
