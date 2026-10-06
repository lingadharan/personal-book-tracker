import { env } from './env';
import { API_ROUTES } from './constants';

export default async function handleDeleteButton(_id: string) {
  try {
    await fetch(`${env.backendURL}${API_ROUTES.DELETE_BOOK}?_id=${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(
      'Something went wrong during deletion of the book details: ',
      error
    );
  }
}
