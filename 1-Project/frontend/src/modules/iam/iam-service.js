import authAxios from '@/shared/axios/auth-axios';

export class IamService {
  static async enable(ids) {
    return this._changeStatus(ids, false);
  }

  static async disable(ids) {
    return this._changeStatus(ids, true);
  }

  static async _changeStatus(ids, disabled) {
    const body = {
      ids,
      disabled: !!disabled,
    };

    const response = await authAxios.put(
      '/iam/status',
      body,
    );

    return response.data;
  }

  static async edit(data) {
    const body = {
      data,
    };
    const response = await authAxios.put('/iam', body);
    return response.data;
  }

  static async remove(emails, roles, all = false) {
    const params = {
      emails,
      roles,
      all,
    };

    const response = await authAxios.delete('/iam', {
      params,
    });

    return response.data;
  }

  static async create(data) {
    const body = {
      data,
    };

    const response = await authAxios.post('/iam', body);
    return response.data;
  }

  static async import(values, importHash) {
    const body = {
      data: {
        ...values,
      },
      importHash,
    };

    const response = await authAxios.post(
      '/iam/import',
      body,
    );
    return response.data;
  }

  static async find(id) {
    const response = await authAxios.get(`/iam/${id}`);
    return response.data;
  }

  static async fetchUsers(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(`/iam/user`, {
      params,
    });
    return response.data;
  }

  static async fetchRoles(filter, orderBy) {
    const params = {
      filter,
      orderBy,
    };

    const response = await authAxios.get(`/iam/role`, {
      params,
    });

    return {
      rows: response.data,
      count: response.data.length,
    };
  }

  static async fetchUserAutocomplete(query, limit) {
    const params = {
      query,
      limit,
    };

    const response = await authAxios.get(
      `/iam/user/autocomplete`,
      {
        params,
      },
    );
    return response.data;
  }
}
