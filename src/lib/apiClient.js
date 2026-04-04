import API_CONSTANT from "@/constants/api.constant";
const BaseUrl = API_CONSTANT.BASE_URL;

async function request({ path, method = "GET", data, headers = {} }) {
  const url = `${BaseUrl}/${path}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        message: responseData?.message || "Something went wrong",
        data: responseData,
      };
    }

    return responseData;
  } catch (err) {
    console.error("API Error:", err);

    throw {
      status: err.status || 500,
      message: err.message || "Network error",
      data: err.data || null,
    };
  }
}

const apiClient = {
  get: (path, headers) => request({ path, method: "GET", headers }),

  post: (path, data, headers) =>
    request({ path, method: "POST", data, headers }),

  put: (path, data, headers) => request({ path, method: "PUT", data, headers }),

  delete: (path, headers) => request({ path, method: "DELETE", headers }),
};

export default apiClient;
