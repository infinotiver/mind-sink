export async function fetchData(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return formatData(data);
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

function formatData(data: any) {
  // Example formatting logic
  return Array.isArray(data) ? data.map((item) => ({ ...item })) : { ...data };
}
