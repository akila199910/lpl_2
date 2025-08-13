import { getOverviewService } from "../services/overview.service.mjs"

export const getOverviewController = async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const role = req.query.role || ''
    const rating = req.query.rating || ''
  
    const result = await getOverviewService(page, limit, role, rating)
  
    return res.status(result.success ? 200 : 400).json(result)
  }
  

// export const getBidController = async (req, res) => {
//     const result = await getBidService(req.body);
//     return res.status(result.success ? 200 : 400).json(result);
//   };