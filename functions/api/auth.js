export async function onRequestGet(context) {
    const GITHUB_CLIENT_ID = context.env.GITHUB_CLIENT_ID;

    if (!GITHUB_CLIENT_ID) {
        return new Response("Missing GITHUB_CLIENT_ID environment variable", { status: 500 });
    }

    // Redirect to GitHub for Authentication
    const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID,
        scope: "repo,user",
    });

    return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
}
