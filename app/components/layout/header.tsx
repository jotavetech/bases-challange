"use client";

import Image from "next/image";
import {Link} from '../../utils/navigation';
import {useRouter} from '../../utils/navigation';
import ModeToggle from "./mode-toggle";
import { useLocale, useTranslations } from "next-intl";
import { ChangeLocale } from "../locale/change-locale";

const Header = () => {
  const translate = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();

  const handleStatsNav = () => {
    const accept = confirm(translate("lost_progress_confirm"));

    if (accept) {
      router.push("/stats");
    }
  };

  return (
    <header className="w-full h-20 lg:h-36 fixed top-0 left-0 flex items-center justify-between px-7 md:px-12 lg:px-28 xl:px-52 z-30 bg-app-bg dark:bg-app-bg-dark">
      <Link href="/" aria-label="go to bases challange">
        <Image
          className="dark:invert lg:w-64"
          src={"/assets/lowercase-logo.svg"}
          width={180}
          height={180}
          color="#fff"
          alt="bases challange logo"
        />
      </Link>
      <div className="space-x-2 flex items-center">
      <ChangeLocale locale={locale} />
        <ModeToggle />
   
        <Link href="/faq" aria-label="go to faq" className="inline lg:hidden">
          <button className="bg-button-bg-1 dark:bg-button-bg-1-dark text-primary dark:text-primary-dark font-medium px-2 rounded-xl hover:-translate-y-1">
            FAQ
          </button>
        </Link>
        <Link href="/faq" aria-label="go to faq" className="hidden lg:inline">
          <button className="bg-button-bg-1 dark:bg-button-bg-1-dark text-primary dark:text-primary-dark font-medium px-4 py-3 rounded-md hover:-translate-y-1">
            {translate("faq")}
          </button>
        </Link>

        <button
          className="bg-button-bg-2 text-primary dark:text-primary-dark font-medium px-2 rounded-xl lg:rounded-md lg:px-4 lg:py-3 hover:-translate-y-1"
          onClick={handleStatsNav}
        >
          {translate("stats")}
        </button>
      </div>
    </header>
  );
};

export default Header;
