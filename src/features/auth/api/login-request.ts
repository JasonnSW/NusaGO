export const loginRequest = async (formData: {
  email: string;
  password: string;
}) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const errorText = await response.text();
    return { error: errorText };
  }

  const data = await response.json();
  console.log("Data:", data);
  return { token: data.token };
};
