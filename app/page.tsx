"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";

type Botanical = {
  kind: "blossom" | "daisy" | "leaf" | "sprig" | "bud";
  x: number;
  y: number;
  size: number;
  rotation: number;
  depth: number;
  tone?: "rose" | "plum" | "cream" | "sage";
  mobile?: boolean;
};

const botanicals: Botanical[] = [
  { kind: "sprig", x: 3, y: 8, size: 112, rotation: -34, depth: 1.1, tone: "sage" },
  { kind: "blossom", x: 15, y: 11, size: 60, rotation: 18, depth: 1.4, tone: "rose" },
  { kind: "leaf", x: 28, y: 4, size: 48, rotation: 66, depth: 0.7, tone: "sage", mobile: true },
  { kind: "bud", x: 42, y: 13, size: 38, rotation: -12, depth: 0.6, tone: "plum" },
  { kind: "daisy", x: 57, y: 5, size: 42, rotation: 12, depth: 1.2, tone: "cream", mobile: true },
  { kind: "leaf", x: 73, y: 13, size: 70, rotation: -48, depth: 1, tone: "sage" },
  { kind: "blossom", x: 89, y: 8, size: 82, rotation: -18, depth: 1.6, tone: "plum" },
  { kind: "sprig", x: 98, y: 25, size: 105, rotation: 148, depth: 0.9, tone: "sage", mobile: true },
  { kind: "daisy", x: 6, y: 33, size: 46, rotation: -17, depth: 0.8, tone: "cream", mobile: true },
  { kind: "leaf", x: 19, y: 31, size: 40, rotation: 24, depth: 0.5, tone: "sage" },
  { kind: "bud", x: 34, y: 25, size: 27, rotation: 42, depth: 0.4, tone: "rose" },
  { kind: "blossom", x: 78, y: 34, size: 43, rotation: 9, depth: 0.7, tone: "rose" },
  { kind: "daisy", x: 96, y: 49, size: 56, rotation: 31, depth: 1.4, tone: "cream" },
  { kind: "blossom", x: 3, y: 61, size: 76, rotation: -8, depth: 1.5, tone: "rose" },
  { kind: "bud", x: 14, y: 72, size: 33, rotation: -40, depth: 0.6, tone: "plum", mobile: true },
  { kind: "sprig", x: 25, y: 88, size: 90, rotation: 22, depth: 0.9, tone: "sage" },
  { kind: "leaf", x: 41, y: 79, size: 37, rotation: -36, depth: 0.5, tone: "sage" },
  { kind: "daisy", x: 56, y: 91, size: 39, rotation: 16, depth: 0.7, tone: "cream", mobile: true },
  { kind: "bud", x: 68, y: 78, size: 29, rotation: 29, depth: 0.45, tone: "rose" },
  { kind: "blossom", x: 80, y: 88, size: 64, rotation: 22, depth: 1.2, tone: "plum" },
  { kind: "leaf", x: 95, y: 72, size: 54, rotation: -78, depth: 0.8, tone: "sage" },
  { kind: "sprig", x: 103, y: 92, size: 122, rotation: 195, depth: 1.5, tone: "sage" },
  { kind: "leaf", x: 9, y: 95, size: 51, rotation: 38, depth: 0.7, tone: "sage", mobile: true },
  { kind: "bud", x: 91, y: 29, size: 25, rotation: 14, depth: 0.5, tone: "rose", mobile: true },
];

const visualThemes = [
  { id: "original", name: "Jardim suspenso" },
  { id: "herbario", name: "Herbário" },
  { id: "moldura", name: "Moldura floral" },
  { id: "campo", name: "Campo de flores" },
] as const;

function BotanicalElement({ item, index }: { item: Botanical; index: number }) {
  const style = {
    "--x": `${item.x}%`,
    "--y": `${item.y}%`,
    "--size": `${item.size}px`,
    "--rotation": `${item.rotation}deg`,
    "--depth": item.depth,
    "--delay": `${-(index * 1.37)}s`,
    "--duration": `${8 + (index % 5) * 1.8}s`,
  } as CSSProperties;

  const petals = item.kind === "daisy" ? 10 : 7;

  return (
    <div
      className={`botanical botanical--${item.kind} tone--${item.tone ?? "rose"}${item.mobile ? " botanical--mobile" : ""}`}
      style={style}
      aria-hidden="true"
    >
      <div className="botanical__float">
        {(item.kind === "blossom" || item.kind === "daisy") && (
          <div className="flower">
            {Array.from({ length: petals }).map((_, petal) => (
              <i key={petal} style={{ "--petal": petal } as CSSProperties} />
            ))}
            <b />
          </div>
        )}
        {item.kind === "leaf" && <div className="single-leaf" />}
        {item.kind === "bud" && <div className="flower-bud"><i /><b /></div>}
        {item.kind === "sprig" && (
          <div className="sprig">
            <span />
            {Array.from({ length: 6 }).map((_, leaf) => (
              <i key={leaf} style={{ "--leaf": leaf } as CSSProperties} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [leaving, setLeaving] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const theme = visualThemes[themeIndex];

  const moveGarden = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !heroRef.current) return;
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      heroRef.current?.style.setProperty("--mouse-x", x.toFixed(3));
      heroRef.current?.style.setProperty("--mouse-y", y.toFixed(3));
    });
  }, []);

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      document.querySelector("#proxima")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => setLeaving(false), 700);
    }, 520);
  };

  const cycleTheme = () => {
    setThemeIndex((current) => (current + 1) % visualThemes.length);
  };

  return (
    <main>
      <section
        ref={heroRef}
        className={`hero hero--theme-${theme.id}${leaving ? " hero--leaving" : ""}`}
        onPointerMove={moveGarden}
        aria-labelledby="la-casa-title"
      >
        <div className="paper-grain" aria-hidden="true" />
        <div className="background-gallery" aria-hidden="true">
          <div className="background-gallery__image background-gallery__image--herbario" />
          <div className="background-gallery__image background-gallery__image--moldura" />
          <div className="background-gallery__image background-gallery__image--campo" />
        </div>
        <div className="botanical-field" aria-hidden="true">
          {botanicals.map((item, index) => (
            <BotanicalElement item={item} index={index} key={`${item.kind}-${index}`} />
          ))}
        </div>

        <button className="theme-switcher" type="button" onClick={cycleTheme} aria-label={`Mudar cenário. Atual: ${theme.name}`}>
          <span className="theme-switcher__icon" aria-hidden="true">✦</span>
          <span className="theme-switcher__copy">
            <small>Trocar cenário</small>
            <strong aria-live="polite">{theme.name}</strong>
          </span>
          <span className="theme-switcher__count" aria-hidden="true">0{themeIndex + 1} / 04</span>
        </button>

        <div className="hero__center">
          <p className="eyebrow"><span /> Um lugar para sentir <span /></p>
          <h1 id="la-casa-title">La Casa</h1>
          <p className="subtitle">flores • encontros • delicadezas</p>
          <button className="enter-button" type="button" onClick={enter} aria-label="Entrar no site La Casa">
            <span>Entrar</span>
            <i aria-hidden="true">↓</i>
          </button>
        </div>

        <p className="edition">São Paulo · 2026</p>
        <p className="scroll-hint" aria-hidden="true">descubra</p>
      </section>

      <section id="proxima" className="next-section" aria-labelledby="next-title">
        <div className="next-section__ornament" aria-hidden="true"><i /><span /><i /></div>
        <p>O começo de uma história</p>
        <h2 id="next-title">Bem-vindo à<br /><em>La Casa</em></h2>
        <p className="next-section__note">Nossa próxima página está florescendo.</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Voltar ao jardim ↑</button>
      </section>
    </main>
  );
}
