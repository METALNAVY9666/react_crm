import { Dispatch, SetStateAction, useEffect } from "react";
import { apiUrl } from "../../basics";
import { getCookie, setCookie } from "typescript-cookie";
import { notification } from "../../Functions";

declare global {
  interface Window {
    FB: any;
  }
}

interface Props {
  setLoginSuccessful: Dispatch<SetStateAction<boolean>>;
}

interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  reauthorize_required_in: number;
  signedRequest: string;
  userID: string;
}

interface FacebookLoginResponse {
  status: string;
  authResponse: FacebookAuthResponse;
}

function FacebookLogin({ setLoginSuccessful }: Props) {
  useEffect(() => {
    // Charger le SDK Facebook
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2400467286830789", // ID de votre app Facebook
        cookie: true, // Activer les cookies pour garder la session
        xfbml: true, // Parse les boutons de connexion
        version: "v15.0", // Version de l'API Graph
      });
    };

    // Charger le SDK Facebook de façon asynchrone
    (function (d, s, id) {
      let js: HTMLScriptElement | null = d.createElement(
          s
        ) as HTMLScriptElement,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response: FacebookLoginResponse) {
        if (response.authResponse) {
          console.log("Successfully logged in", response);
          const accessToken = response.authResponse.accessToken;
          // Envoyer le token au backend Flask
          fetch(apiUrl + "/facebook/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              access_token: accessToken,
              dealership_id: parseInt(String(getCookie("selected_dealership"))),
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Server response:", data);
            });
          notification(
            "Configuration Facebook",
            "Facebook configuré !",
            "success"
          );
          setLoginSuccessful(true);
          setCookie("facebookConfigured", "true");
        } else {
          notification(
            "Configuration Facebook",
            "L'utilistteur a annulé la configuration ou n'a pas donné les bonnes autorisations.",
            "warning"
          );
          setLoginSuccessful(false);
        }
      },
      { scope: "public_profile,email,pages_show_list,pages_manage_posts" }
    );
  };

  return <button onClick={handleFacebookLogin}>Configurer Facebook</button>;
}

export default FacebookLogin;
