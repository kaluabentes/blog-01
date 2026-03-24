"use server";

interface SubscribeState {
  error?: string;
  success?: boolean;
}

export async function subscribeAction(
  _: SubscribeState | null,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get("email")?.toString().trim();

  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiKey = process.env.BEEHIIV_API_KEY;

  if (!publicationId || !apiKey) {
    return { error: "Newsletter is not configured." };
  }

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
      }),
    },
  );

  if (!res.ok) {
    const data = await res.json();
    if (res.status === 409) {
      return { error: "This email is already subscribed." };
    }
    console.error("Beehiiv error:", data);
    return { error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
