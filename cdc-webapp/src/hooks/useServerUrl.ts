export const useServerUrl = () => {
  const proto = "http";
  const host = import.meta.env.VITE_SERVER_HOST;
  const port = import.meta.env.VITE_SERVER_PORT;
  return {
    serverUrl: `${proto}://${host}:${port}`,
  };
};
