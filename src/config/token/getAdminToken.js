import Cookies from 'universal-cookie';

export const getAdminToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('admin_token');
    return token;
  };