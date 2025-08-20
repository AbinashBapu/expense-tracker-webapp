export const useFetch = () => {
  const get = async (url: string, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "GET",
      headers: {
        Authorization: `Bearer asdfasdf.asdfasd.asdfasdf`,
      },
    });
    if (!response.ok) {
      // Server responded but with an error (e.g., 404, 500)
      return { error: `Request failed with status ${response.status}` };
    }
    return response.json();
  };

  const post = async (url: string, data: any, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer asdfasdf.asdfasd.asdfasdf`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Server responded but with an error (e.g., 404, 500)
      return { error: `Request failed with status ${response.status}` };
    }
    return response.json();
  };

  const postWithQueryParams = async (
    url: string,
    data: any,
    queryParams: any,
    config?: RequestInit
  ) => {
    const queryParamString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join("&");
    const response = await fetch(`${url}?${queryParamString}`, {
      ...config,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer asdfasdf.asdfasd.asdfasdf`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Server responded but with an error (e.g., 404, 500)
      return { error: `Request failed with status ${response.status}` };
    }
    return response.json();
  };

  const put = async (url: string, data: any, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer asdfasdf.asdfasd.asdfasdf`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // Server responded but with an error (e.g., 404, 500)
      return { error: `Request failed with status ${response.status}` };
    }
    return response.json();
  };

  const del = async (url: string, config?: RequestInit) => {
    const response = await fetch(url, {
      ...config,
      method: "DELETE",
    });
    if (!response.ok) {
      // Server responded but with an error (e.g., 404, 500)
      return { error: `Request failed with status ${response.status}` };
    }
    return response.json();
  };

  return {
    get,
    post,
    put,
    del,
    postWithQueryParams,
  };
};
