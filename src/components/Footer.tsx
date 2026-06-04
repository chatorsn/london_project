"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) ?? "en";
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#05050a] py-20 px-12 font-jost border-t border-[rgba(200,215,235,0.08)]">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-[rgba(200,215,235,0.08)]">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[rgba(220,230,245,0.85)] font-extralight leading-relaxed mb-6">
              London Route<br />Transfers
            </p>
            <p className="text-[11px] font-extralight text-[rgba(160,178,208,0.75)] leading-[1.9] tracking-[0.03em]">
              Private Limited Company<br />registered in England and Wales<br />Company No: 00000000
            </p>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(170,185,215,0.5)] font-light mb-5">Contacts</p>
            <p className="text-[11px] font-extralight text-[rgba(185,200,225,0.8)] leading-8 tracking-[0.03em]">
              booking@example.test<br />+44 0000 000000<br />10 Example House, London
            </p>
          </div>

          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(170,185,215,0.5)] font-light mb-5">Legal</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: t("privacy"), href: `/${locale}/privacy` },
                { label: t("cookies"), href: `/${locale}/cookies` },
                { label: t("terms"), href: `/${locale}/terms` },
                { label: t("managerLink"), href: `/${locale}/manager` },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-[11px] font-extralight text-[rgba(170,188,215,0.7)] tracking-[0.04em] no-underline hover:text-[rgba(210,222,238,0.9)] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8">
          <p className="text-[10px] font-extralight text-[rgba(150,168,200,0.5)] tracking-[0.06em]">© London Route Transfers, 2009–2026. All rights reserved.</p>
          <p className="text-[10px] font-extralight text-[rgba(150,168,200,0.5)] tracking-[0.06em]">VAT: GB 000000000</p>
        </div>
      </div>
    </footer>
  );
}
