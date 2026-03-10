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
        // Decap CMS expects exactly this format:
        // authorization:github:success:{"token":"...", "provider":"github"}
        const script = `
        const message = "authorization:${provider}:success:${JSON.stringify({
            token: "${token}",
            provider: "${provider}"
        })}";
        
        console.log("Sending token to parent window");
        
        if (window.opener) {
            window.opener.postMessage(message, "*");
            // Optional: wait a moment before closing to ensure message is sent
            setTimeout(() => {
                window.close();
            }, 1000);
        } else {
            console.error("No window.opener found! Are you running this in a popup?");
        }
        `;

        const html = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>OAuth Callback</title>
    </head>
    <body>
        <p>Authentication successful! Please wait...</p>
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
