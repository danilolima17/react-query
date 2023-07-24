import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


type TodoProps = {
  userId: number;
  title: string;
  id: number;
};

const fetchData = async () => {
  try {
    const result = await axios.get<TodoProps[]>('https://jsonplaceholder.typicode.com/todos');
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Home: NextPage = () => {
  const { data, isLoading } = useQuery<TodoProps[], Error>({
    queryKey: ["todos"],
    queryFn: fetchData,
  });

  const todos = data;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>React Query</title>
        <link rel="icon" href="" />
      </Head>

      <main className="relative flex w-full flex-1 flex-col items-center px-20 text-center">
       
        <div className="flex flex-col gap-y-4">
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              <p className="text-2xl font-bold my-5">Products</p>
              {todos?.map((todo) => (
                <div
                  key={todo.id}
                  className="max-w-sm shadow-lg border p-4 border-gray-200 rounded-lg text-left"
                >
                  <p className="text-lg font-semibold">{todo.title}</p>
                  <p className="text-gray-700">{`User ID: ${todo.userId}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
