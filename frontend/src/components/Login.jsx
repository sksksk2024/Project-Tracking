import { useMutation } from '@tanstack/react-query';

function Login() {
  // Define the mutation
  const { mutate, data, isLoading, error } = useMutation({
    mutationFn: async () => {
      const response = await fetch('http://localhost:5000/api/login');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  return (
    <section className="flex flex-col items-center">
      <button
        onClick={() => mutate()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>

      {error && <p className="text-red mt-4">Error: {error.message}</p>}

      {data && <p className="text-green-500 mt-4">{data.message}</p>}
    </section>
  );
}

export default Login;
