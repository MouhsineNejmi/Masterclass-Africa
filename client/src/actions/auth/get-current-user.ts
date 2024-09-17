import serverAxios from '@/axios/axios-server';

export default async function getCurrentUser() {
  try {
    const { data } = await serverAxios.get('api/users/currentuser');
    return data.currentUser;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}
