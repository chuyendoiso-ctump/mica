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
        // Decap CMS expects exactly this format:
        // authorization:github:success:{"token":"...", "provider":"github"}
        // Decap CMS EXPECTS this specific two-way handshake format
        const script = `
      function receiveMessage(e) {
        console.log("receiveMessage %o", e)
        const allowedOrigins = [
             new URL(window.location.href).origin
        ];
        if (!allowedOrigins.includes(e.origin)) {
            console.log("Origin not allowed");
            return;
        }
        
        console.log("sending message back to window.opener");
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          e.origin
        )
      }
      
      console.log("Adding message listener");
      window.addEventListener("message", receiveMessage, false)
      console.log("Sending initial message to window.opener");
      window.opener.postMessage("authorizing:github", "*")
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
