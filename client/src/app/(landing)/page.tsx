import serverAxios from '@/axios/axios-server';

async function getCurrentUser() {
  try {
    const { data } = await serverAxios.get('api/users/currentuser');
    return data.currentUser;
  } catch (error) {
    console.error('Error fetching user in landing page:', error);
    return null;
  }
}

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <h1>Landing Page</h1>
      {currentUser ? (
        <p>Welcome, {currentUser.email}</p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}
