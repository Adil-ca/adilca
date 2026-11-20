"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Command,
  Menu,
  X,
  Search,
  CornerDownLeft,
  Folder,
  Hash,
  Globe,
  Keyboard,
} from "lucide-react";
import Brand from "./Brand";
import { navigation, external } from "@/data/site";

const subscribePlatform = () => () => {};
const getShortcut = () =>
  /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ K" : "Ctrl K";

type Entry = { label: string; url: string; group: string; terms?: string };
export default function Header({
  records,
}: {
  records: { name: string; slug: string }[];
}) {
  const shortcut = useSyncExternalStore(
    subscribePlatform,
    getShortcut,
    () => "Ctrl K",
  );
  const pathname = usePathname(),
    router = useRouter();
  const modal = useRef<HTMLDialogElement>(null),
    trigger = useRef<HTMLButtonElement>(null),
    closeButton = useRef<HTMLButtonElement>(null),
    input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(""),
    [selected, setSelected] = useState(0),
    [open, setOpen] = useState(false),
    [menu, setMenu] = useState(false),
    [active, setActive] = useState("intro");
  const entries: Entry[] = [
    ...navigation.map((n) => ({
      label: n.label === "Work" ? "Selected work" : n.label,
      url: n.href ?? "/#" + n.id,
      group: "Navigate",
      terms:
        n.id === "work"
          ? "projects archive"
          : n.id === "contact"
            ? "social connect contact"
            : n.label,
    })),
    {
      label: "Experiment log",
      url: "/#experiments",
      group: "Navigate",
      terms: "hackathons projects",
    },
    { label: "Toolkit", url: "/#toolkit", group: "Navigate" },
    ...records.map((p) => ({
      label: p.name,
      url: "/work/" + p.slug,
      group: "Case study",
    })),
    { label: "X / HunterMonkX", url: external.x, group: "Social" },
    { label: "LinkedIn", url: external.linkedin, group: "Social" },
    { label: "GitHub / Adil-ca", url: external.github, group: "Social" },
    {
      label: "Keyboard help",
      url: "help",
      group: "Help",
      terms: "commands shortcuts",
    },
  ];
  const filtered = entries.filter((e) =>
    (e.label + " " + e.group + " " + (e.terms || ""))
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  function show() {
    setQuery("");
    setSelected(0);
    setMenu(false);
    setOpen(true);
    if (!modal.current?.open) modal.current?.showModal();
    input.current?.focus();
  }
  function hide() {
    modal.current?.close();
  }
  function run(e: Entry) {
    if (e.url === "help") {
      setQuery("help");
      setSelected(0);
      return;
    }
    hide();
    if (e.url.startsWith("https:"))
      window.open(e.url, "_blank", "noopener,noreferrer");
    else router.push(e.url);
  }
  useEffect(() => {
    function keys(e: KeyboardEvent) {
      if (document.querySelector("dialog[open]") && !modal.current?.open) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (modal.current?.open) modal.current.close();
        else show();
      } else if (e.key === "Escape") {
        setMenu(false);
      }
    }
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, []);
  useEffect(() => {
    if (pathname !== "/") return;
    function update() {
      if (
        document.documentElement.scrollHeight -
          window.innerHeight -
          window.scrollY <
        4
      ) {
        setActive("contact");
        return;
      }
      const id =
        [...navigation].reverse().find((n) => {
          const el = document.getElementById(n.id);
          return (
            el && el.getBoundingClientRect().top <= window.innerHeight * 0.4
          );
        })?.id || "intro";
      setActive(id);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  useEffect(() => {
    if (open)
      document
        .getElementById("command-" + selected)
        ?.scrollIntoView({ block: "nearest" });
  }, [selected, open, query]);
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary">
            {navigation.map((n) => (
              <Link
                key={n.id}
                href={n.href ?? "/#" + n.id}
                aria-current={
                  n.href === pathname
                    ? "page"
                    : pathname === "/" && active === n.id
                      ? "location"
                      : undefined
                }
                className={
                  (pathname === "/" && active === n.id) ||
                  n.href === pathname ||
                  (pathname.startsWith("/work/") && n.id === "work")
                    ? "current"
                    : ""
                }
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <button
              ref={trigger}
              className="command-trigger"
              aria-keyshortcuts="Control+K Meta+K"
              onClick={show}
            >
              <Command size={16} />
              <span className="shortcut-label">
                <span className="sr-only">Open </span>Command
                <span className="sr-only"> palette </span>
              </span>
              <kbd>{shortcut}</kbd>
            </button>
            <button
              className="menu-toggle"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-nav" aria-label="Mobile navigation">
            {navigation.map((n) => (
              <Link
                key={n.id}
                onClick={() => setMenu(false)}
                href={n.href ?? "/#" + n.id}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <dialog
        className="palette"
        ref={modal}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          event.preventDefault();
          const target =
            document.activeElement === input.current ? closeButton : input;
          target.current?.focus();
        }}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === modal.current) hide();
        }}
        aria-labelledby="command-title"
      >
        <div className="dialog-inner">
          <div className="window-bar">
            <span id="command-title">
              <Command size={14} /> Archive commands
            </span>
            <button
              ref={closeButton}
              onClick={hide}
              aria-label="Close command palette"
            >
              <X size={20} />
            </button>
          </div>
          <div className="search-line">
            <Search size={21} />
            <input
              ref={input}
              autoComplete="off"
              aria-label="Search archive commands"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls="command-results"
              aria-activedescendant={
                filtered.length ? "command-" + selected : undefined
              }
              placeholder="Find a project, page or social…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              onKeyDown={(e) => {
                if (!filtered.length) return;
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelected(
                    (selected +
                      (e.key === "ArrowDown" ? 1 : -1) +
                      filtered.length) %
                      filtered.length,
                  );
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  run(filtered[selected]);
                }
              }}
            />
          </div>
          {query.trim().toLowerCase() === "help" && (
            <p className="help-copy">
              Type a project or section name. Use the arrow keys to select a
              result, Enter to open it, and Escape to close.
            </p>
          )}
          <div
            className="results"
            id="command-results"
            role="listbox"
            aria-label="Commands"
          >
            {filtered.map((e, i) => (
              <div
                role="option"
                key={e.url}
                id={"command-" + i}
                aria-selected={selected === i}
                className={i === selected ? "chosen" : ""}
                onMouseDown={(ev) => ev.preventDefault()}
                onClick={() => run(e)}
              >
                {e.group === "Case study" ? (
                  <Folder />
                ) : e.group === "Social" ? (
                  <Globe />
                ) : e.group === "Help" ? (
                  <Keyboard />
                ) : (
                  <Hash />
                )}
                <span>{e.label}</span>
                <small>{e.group}</small>
              </div>
            ))}
          </div>
          {!filtered.length && (
            <p className="help-copy" role="status">
              No matching records. Try “work” or “social”.
            </p>
          )}
          <div className="palette-foot">
            <span>↑ ↓ Select</span>
            <span>
              <CornerDownLeft size={13} /> Open
            </span>
            <span>Esc Close</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
