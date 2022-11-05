import { Building } from "../models";
import axios from "axios";

export const BuildingService = {
  search: async (query: string): Promise<Building[]> =>
    await axios.get("/api/search", { params: { query } }).then((res) => res.data),
};
