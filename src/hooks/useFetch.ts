export const useFetch = () => {
  const get = async (url: string, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "GET",
    });
    return response.json();
  };

  const post = async (url: string, data: any, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const put = async (url: string, data: any, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const del = async (url: string, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "DELETE",
    });
    return response.json();
  };

  return {
    get,
    post,
    put,
    del,
  };
};
