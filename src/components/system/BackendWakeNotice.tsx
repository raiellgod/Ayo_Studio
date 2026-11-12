"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SHOW_AFTER_MS = 4000;
const CHECK_INTERVAL_MS = 3000;

export function BackendWakeNotice() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);

  const noticeWasShownRef = useRef(false);

  const reloadingRef = useRef(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333";

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      const hideNoticeTimer = window.setTimeout(() => {
        setVisible(false);
      }, 0);

      return () => {
        window.clearTimeout(hideNoticeTimer);
      };
    }

    let backendReady = false;

    const noticeTimer = window.setTimeout(() => {
      if (!backendReady) {
        noticeWasShownRef.current = true;
        setVisible(true);
      }
    }, SHOW_AFTER_MS);

    async function checkBackend() {
      try {
        const response = await fetch(`${apiUrl}/health?t=${Date.now()}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          backendReady = false;
          return;
        }

        backendReady = true;

        window.clearTimeout(noticeTimer);

        /*
         * Se o aviso chegou a aparecer,
         * significa que partes da página
         * podem ter falhado ao carregar
         * enquanto o backend dormia.
         *
         * Quando o backend volta,
         * recarregamos uma única vez para
         * refazer todas as requisições
         * públicas e recuperar imagens/dados.
         */
        if (noticeWasShownRef.current && !reloadingRef.current) {
          reloadingRef.current = true;

          setVisible(false);

          window.location.reload();

          return;
        }

        setVisible(false);
      } catch {
        backendReady = false;
      }
    }

    void checkBackend();

    const interval = window.setInterval(() => {
      void checkBackend();
    }, CHECK_INTERVAL_MS);

    return () => {
      window.clearTimeout(noticeTimer);

      window.clearInterval(interval);
    };
  }, [apiUrl, pathname]);

  if (pathname.startsWith("/admin") || !visible) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 bottom-4 z-[9999] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-md sm:right-6 sm:bottom-6"
    >
      <p className="font-accent text-ayo-red text-[11px] tracking-[0.12em] uppercase">AYŌ Studio</p>

      <p className="text-ayo-cream/80 mt-2 font-sans text-sm leading-relaxed">
        O servidor está iniciando. O conteúdo será carregado automaticamente em alguns instantes.
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span aria-hidden="true" className="bg-ayo-red h-2 w-2 animate-pulse rounded-full" />

        <span className="font-sans text-[11px] tracking-[0.08em] text-white/35 uppercase">
          Aguardando conteúdo
        </span>
      </div>
    </div>
  );
}
