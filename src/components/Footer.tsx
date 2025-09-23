/**
 * Renders the footer section of the website.
 *
 * This component displays company information, social media links, and navigation
 * to other parts of the site. It also includes the copyright notice.
 *
 * @returns {JSX.Element} The rendered footer section.
 */
export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2  space-y-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex items-center gap-2"
          >
            {/* <LogoIcon /> */}
            Pivotr Technologies Pvt Ltd.
          </a>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">CIN :</span> U62020KA2024PTC193295
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">GST :</span> 29AAPCP0858F1Z0
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Address :</span> C/O 220, 2ND Main, 2ND Cross, CGI,
            Yamaluru, Marathahalli, Bangalore- 560037, Karnataka
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow US</h3>
          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div> */}

          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div> */}

          <div>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/company/pivotr/"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>

          <div>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.facebook.com/share/p/15xx9bH76o/"
              className="opacity-60 hover:opacity-100"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Platforms</h3>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
              Web
            </a>
          </div>

          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
              Mobile
            </a>
          </div>

          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">
              Desktop
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a rel="noreferrer noopener" href="#features" className="opacity-60 hover:opacity-100">
              Features
            </a>
          </div>

          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </a>
          </div> */}

          <div>
            <a rel="noreferrer noopener" href="#faq" className="opacity-60 hover:opacity-100">
              FAQ
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Youtube
            </a>
          </div> */}

          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://discord.com/"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>

          {/* <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Twitch
            </a>
          </div> */}
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy;2024 - {new Date().getFullYear()},{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.pivotr.in"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Pivotr Technologies Pvt Ltd.{" "}
          </a>
          All rights reserved.
        </h3>
      </section>
    </footer>
  );
};
