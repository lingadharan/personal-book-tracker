import { env } from './env';

export default async function handleDeleteButton(_id: string) {
  try {
    await fetch(`${env.backendURL}/delete-book?_id=${_id}`, {
      method: 'DELETE',
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
