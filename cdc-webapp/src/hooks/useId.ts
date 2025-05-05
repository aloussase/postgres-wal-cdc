import { useServerUrl } from "./useServerUrl";

export const useId = () => {
  const { serverUrl } = useServerUrl();

  const nextId = async () => {
    const res = await fetch(`${serverUrl}/todos/id`);
    const { id } = await res.json();
    return id;
  };

  return {
    createId: async () => {
      return await nextId();
    },
  };
};
