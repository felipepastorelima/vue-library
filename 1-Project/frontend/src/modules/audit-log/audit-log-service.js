import authAxios from '@/shared/axios/auth-axios';

export class AuditLogService {
  static async fetch(filter, orderBy, limit, offset) {
    const query = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get('/auditLog', {
      params: query,
    });

    return response.data;
  }
}
