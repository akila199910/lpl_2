import { getOverviewRepository } from "../repositories/overview.repository.mjs";
import { successResponse } from "../utils/apiResponse.mjs";

export const getOverviewService = async (page, limit, role, rating) => {
  const { overview, total } = await getOverviewRepository(page, limit, role, rating);

  return successResponse("Overview fetched", {
    players: overview,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
};
