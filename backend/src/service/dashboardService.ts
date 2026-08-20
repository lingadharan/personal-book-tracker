import dashboardRepository from '../repository/dashboardRepository.js';

class DashboardService {
  async getDashboardDetails(userId: string) {
    return dashboardRepository.getDashboardDetails(userId);
  }
}

export default new DashboardService();
