"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { Lock, LogIn, Clock, ArrowRight, Loader2 } from "lucide-react";

type State = "loading" | "member" | "pending" | "rejected" | "none" | "signedout";

/**
 * Gates content to APPROVED AI Hub Switzerland members. Being a signed-up user
 * is not enough — the account must have an approved membership. Resolves after
 * the initial load. Fails open if auth is not configured.
 */
export function MemberGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setState("member");
      return;
    }
    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (!data.user) { setState("signedout"); return; }
        const res = await fetch("/api/switzerland/join");
        const j = await res.json();
        const status = j.application?.status;
        if (status === "approved") setState("member");
        else if (status === "pending") setState("pending");
        else if (status === "rejected") setState("rejected");
        else setState("none");
      } catch {
        setState("none");
      }
    })();
  }, []);

  if (state === "loading") {
    return <div className="min-h-[220px] flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;
  }
  if (state === "member") return <>{children}</>;

  const wall = {
    signedout: {
      icon: LogIn,
      title: "Members only",
      desc: "The AI Hub Switzerland network is open to approved members. Sign in, or apply for free membership.",
      primary: { label: "Sign in", href: "/login?redirect=/switzerland/network" },
      secondary: { label: "Apply for membership", href: "/switzerland/join" },
    },
    pending: {
      icon: Clock,
      title: "Application under review",
      desc: "Thanks for applying! Your membership is pending approval — we'll email you as soon as it's confirmed.",
      primary: { label: "Back to AI Hub Switzerland", href: "/switzerland" },
      secondary: null,
    },
    rejected: {
      icon: Lock,
      title: "Membership required",
      desc: "Your account doesn't have an active membership. You're welcome to apply again.",
      primary: { label: "Apply for membership", href: "/switzerland/join" },
      secondary: null,
    },
    none: {
      icon: Lock,
      title: "Membership required",
      desc: "You're signed in, but not yet a member. Apply for free membership to access the network.",
      primary: { label: "Apply for membership", href: "/switzerland/join" },
      secondary: null,
    },
  }[state]!;

  const Icon = wall.icon;
  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-md mx-auto text-center ring-gradient">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{wall.title}</h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{wall.desc}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href={wall.primary.href} className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white text-sm font-medium shadow-md shadow-violet-500/30 hover:brightness-110 transition w-full sm:w-auto">
          {wall.primary.label} <ArrowRight className="w-4 h-4" />
        </Link>
        {wall.secondary && (
          <Link href={wall.secondary.href} className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border bg-background text-sm font-medium hover:bg-accent transition w-full sm:w-auto">
            {wall.secondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
