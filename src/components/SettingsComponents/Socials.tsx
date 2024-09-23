import { socialImages } from "../consts";
// @ts-ignore
import GradientButton from "react-custom-gradient-button";
import { useEffect, useState } from "react";
import { apiUrl } from "../basics";
import axios from "axios";
import { getBasicFormData } from "../Functions";
// https://github.com/emre-cil/react-custom-gradient-button

export default function Socials() {
  // consts
  const loading: string = "Chargement ...";
  const translations: Record<string, string> = {
    SYNCED: "Connecté",
    "NOT SYNCED": "À configurer",
    EXPIRED: "Connexion expirée",
    SYNCING: "Connexion en cours ...",
  };

  // link status
  const [twitterStatus, setTwitterStatus] = useState<string>(loading);
  const [instagramStatus, setInstagramStatus] = useState<string>(loading);
  const [facebookStatus, setFacebookStatus] = useState<string>(loading);
  const [snapchatStatus, setSnapchatStatus] = useState<string>(loading);

  // link status updater
  const refreshLinkStatus = () => {
    axios
      .post(apiUrl + "get_link_status", getBasicFormData())
      .then((response) =>
        [
          setTwitterStatus,
          setInstagramStatus,
          setFacebookStatus,
          setSnapchatStatus,
        ].forEach((setter, index) => {
          setter(translations[response.data.socials[index]]);
        })
      );
  };
  useEffect(refreshLinkStatus, []);

  // button handlers
  const handleClick = (social: string) => {
    alert(social);
  };

  // getters
  const socialImage = (social: string) => (
    <img
      src={socialImages[social]}
      className="rounded me-5 border border-dark"
      width="32px"
      height="32px"
    />
  );

  return (
    <div className="m-3">
      <div>
        <GradientButton
          border="black"
          color="black"
          end="#1da1f2"
          middle=""
          start="#ffffff"
          onClick={() => handleClick("twitter")}
        >
          <img
            src={socialImages.twitter}
            className="rounded me-5 border border-dark"
            width="32px"
            height="32px"
          />
          {twitterStatus}
        </GradientButton>
      </div>

      <div>
        <GradientButton
          color="black"
          end="#d62976"
          middle=""
          start="#ffffff"
          onClick={() => handleClick("instagram")}
        >
          <img
            src={socialImages.instagram}
            className="rounded me-5 border border-dark"
            width="32px"
            height="32px"
          />
          {instagramStatus}
        </GradientButton>
      </div>

      <div>
        <GradientButton
          color="black"
          end="#3b5998"
          middle=""
          start="#ffffff"
          onClick={() => handleClick("facebook")}
        >
          <img
            src={socialImages.facebook}
            className="rounded me-5 border border-dark"
            width="32px"
            height="32px"
          />
          {facebookStatus}
        </GradientButton>
      </div>

      <div>
        <GradientButton
          color="black"
          end="#FFFC00"
          middle=""
          start="#ffffff"
          onClick={() => handleClick("snapchat")}
        >
          <img
            src={socialImages.snapchat}
            className="rounded me-5 border border-dark"
            width="32px"
            height="32px"
          />
          {snapchatStatus}
        </GradientButton>
      </div>
    </div>
  );
}
