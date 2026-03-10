export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return new Response("Missing code parameter", { status: 400 });
    }

    try {
        const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return new Response(`Error from GitHub: ${tokenData.error_description || tokenData.error}`, { status: 400 });
        }

        const token = tokenData.access_token;
        const provider = "github";

        // Decap CMS expects exactly this HTML message to receive the token
        const script = `
    const receiveMessage = (message) => {
        const allowedOrigins = [
            new URL(window.location.href).origin
        ];

        if (!allowedOrigins.includes(message.origin)) return;

        window.opener.postMessage(
            "authorization:${provider}:success:${JSON.stringify({ token })}",
            message.origin
        );
    };

    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:${provider}", "*");
    `;

        const html = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>OAuth Callback</title>
    </head>
    <body>
        <script>${script}</script>
    </body>
</html>`;

        return new Response(html, {
            headers: {
                "Content-Type": "text/html;charset=UTF-8",
            },
        });
    } catch (error) {
        return new Response(error.message || "Internal Server Error", { status: 500 });
    }
}
