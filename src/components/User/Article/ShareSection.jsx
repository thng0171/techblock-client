import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

export function ShareSection() {
  const url = window.location.href;
  return (
    <section className="">
      <EmailShareButton>
        <EmailIcon size={32} />
      </EmailShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} />
      </TwitterShareButton>
    </section>
  );
}
