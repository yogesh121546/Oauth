require('dotenv').config();

const getGoogleAuthURL = ()=>{
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: "https://oauth-lt6w.onrender.com/google/auth/callback",
      client_id: process.env.googleClientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "email","profile",
        // "https://www.googleapis.com/auth/userinfo.profile",
        // "https://www.googleapis.com/auth/userinfo.email",
        // "https://openidconnect.googleapis.com/v1/userinfo",
      ].join(" "),
    };
  
    const qs = new URLSearchParams(options);
    
    console.log({googleAuthURL:`${rootUrl}?${qs.toString()}`});
  
}
module.export= getGoogleAuthURL();