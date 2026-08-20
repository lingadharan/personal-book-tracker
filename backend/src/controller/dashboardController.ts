import type { Request, Response } from 'express';
import dashboardService from '../service/dashboardService.js';

class DashboardController {
  async getDashboardDetails(req: Request, res: Response): Promise<Response> {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const dashboardDetails = await dashboardService.getDashboardDetails(userId);

    return res.status(200).json({
      success: true,
      data: dashboardDetails,
    });
  }
}

export default new DashboardController();
