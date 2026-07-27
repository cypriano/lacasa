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
  { id: "florescer", name: "Florescer mágico" },
] as const;

const galleryPhotos = [
  { src: "/gallery/01.webp", label: "Casamentos", alt: "Casal em meio a uma instalação floral iluminada" },
  { src: "/gallery/02.webp", label: "A festa", alt: "Casal dançando sob luzes coloridas" },
  { src: "/gallery/03.webp", label: "Cerimônias", alt: "Casal cercado por um arco de flores brancas" },
  { src: "/gallery/04.webp", label: "Cenografia", alt: "Mesa de celebração com flores intensas e globos espelhados" },
  { src: "/gallery/05.webp", label: "Detalhes", alt: "Bolo de casamento decorado com rosas vermelhas" },
  { src: "/gallery/06.webp", label: "Detalhes", alt: "Bolo branco entre flores e luzes suspensas" },
  { src: "/gallery/07.webp", label: "Celebrações", alt: "Debutante em vestido bordado junto à decoração floral" },
  { src: "/gallery/08.webp", label: "Celebrações", alt: "Debutante sorrindo diante de uma parede de flores" },
  { src: "/gallery/09.webp", label: "Detalhes", alt: "Bolo de quinze anos suspenso sobre cristais" },
  { src: "/gallery/10.webp", label: "Casamentos", alt: "Retrato de noiva diante de flores brancas" },
  { src: "/gallery/11.webp", label: "Noite", alt: "Casal na entrada floral da La Casa à noite" },
  { src: "/gallery/12.webp", label: "Casamentos", alt: "Noiva com buquê branco em cenário floral" },
  { src: "/gallery/13.webp", label: "Casamentos", alt: "Casal sorrindo diante da mesa do casamento" },
  { src: "/gallery/14.webp", label: "A festa", alt: "Casal dançando em frente ao palco" },
  { src: "/gallery/15.webp", label: "Casamentos", alt: "Noiva ao lado do bolo sob luzes quentes" },
  { src: "/gallery/16.webp", label: "Casamentos", alt: "Noiva em retrato frontal no salão" },
  { src: "/gallery/17.webp", label: "Memórias", alt: "Retrato em preto e branco de noiva com buquê" },
  { src: "/gallery/18.webp", label: "O espaço", alt: "Jardim, fonte e arquitetura externa da La Casa" },
  { src: "/gallery/19.webp", label: "Memórias", alt: "Casal dentro do carro após a celebração" },
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
  const [bloomProgress, setBloomProgress] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [previousGalleryIndex, setPreviousGalleryIndex] = useState<number | null>(null);
  const [galleryDirection, setGalleryDirection] = useState<1 | -1>(1);
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const bloomRef = useRef(0);
  const dragRef = useRef<{ y: number; progress: number; pointerId: number } | null>(null);
  const galleryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gallerySwipeRef = useRef<{ x: number; pointerId: number } | null>(null);
  const galleryThumbsRef = useRef<HTMLDivElement>(null);
  const theme = visualThemes[themeIndex];
  const isBloom = theme.id === "florescer";

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
    if (galleryTimerRef.current) clearTimeout(galleryTimerRef.current);
  }, []);

  useEffect(() => {
    const activeThumb = galleryThumbsRef.current?.querySelector<HTMLElement>(`[data-gallery-thumb="${galleryIndex}"]`);
    activeThumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [galleryIndex]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !isBloom) return;
    const handleWheel = (event: WheelEvent) => {
      const current = bloomRef.current;
      if (event.deltaY < 0 || current < 0.995) {
        event.preventDefault();
        const next = Math.min(1, Math.max(0, current + event.deltaY / 820));
        bloomRef.current = next;
        setBloomProgress(next);
      }
    };
    hero.addEventListener("wheel", handleWheel, { passive: false });
    return () => hero.removeEventListener("wheel", handleWheel);
  }, [isBloom]);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      document.querySelector("#proxima")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => setLeaving(false), 700);
    }, 520);
  };

  const cycleTheme = () => {
    setThemeIndex((current) => {
      const next = (current + 1) % visualThemes.length;
      if (visualThemes[next].id === "florescer") {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        bloomRef.current = reducedMotion ? 1 : 0;
        setBloomProgress(reducedMotion ? 1 : 0);
      }
      return next;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!isBloom || bloomProgress >= 0.995) return;
    dragRef.current = { y: event.clientY, progress: bloomProgress, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    moveGarden(event);
    const drag = dragRef.current;
    if (!isBloom || !drag || drag.pointerId !== event.pointerId) return;
    const next = Math.min(1, Math.max(0, drag.progress + (drag.y - event.clientY) / (window.innerHeight * .68)));
    bloomRef.current = next;
    setBloomProgress(next);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  const showGalleryImage = (nextIndex: number, direction: 1 | -1) => {
    if (nextIndex === galleryIndex) return;
    setPreviousGalleryIndex(galleryIndex);
    setGalleryDirection(direction);
    setGalleryIndex(nextIndex);
    if (galleryTimerRef.current) clearTimeout(galleryTimerRef.current);
    galleryTimerRef.current = setTimeout(() => setPreviousGalleryIndex(null), 950);
  };

  const stepGallery = (step: 1 | -1) => {
    const next = (galleryIndex + step + galleryPhotos.length) % galleryPhotos.length;
    showGalleryImage(next, step);
  };

  const handleGallerySwipeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    gallerySwipeRef.current = { x: event.clientX, pointerId: event.pointerId };
  };

  const handleGallerySwipeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const swipe = gallerySwipeRef.current;
    if (!swipe || swipe.pointerId !== event.pointerId) return;
    const distance = event.clientX - swipe.x;
    gallerySwipeRef.current = null;
    if (Math.abs(distance) > 45) stepGallery(distance < 0 ? 1 : -1);
  };

  return (
    <main>
      <section
        ref={heroRef}
        className={`hero hero--theme-${theme.id}${bloomProgress >= .995 ? " hero--bloom-complete" : ""}${leaving ? " hero--leaving" : ""}`}
        style={{ "--bloom": bloomProgress.toFixed(3) } as CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        aria-labelledby="la-casa-title"
      >
        <div className="paper-grain" aria-hidden="true" />
        <div className="background-gallery" aria-hidden="true">
          <div className="background-gallery__image background-gallery__image--herbario" />
          <div className="background-gallery__image background-gallery__image--moldura" />
          <div className="background-gallery__image background-gallery__image--campo" />
          <div className="background-gallery__image background-gallery__image--florescer" />
        </div>
        <div className="magic-dust" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, sparkle) => (
            <i key={sparkle} style={{
              "--sparkle-x": `${8 + ((sparkle * 37) % 84)}%`,
              "--sparkle-y": `${18 + ((sparkle * 23) % 68)}%`,
              "--sparkle-delay": `${-(sparkle * .41)}s`,
            } as CSSProperties} />
          ))}
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
          <span className="theme-switcher__count" aria-hidden="true">0{themeIndex + 1} / 05</span>
        </button>

        <div className="hero__center">
          <p className="eyebrow"><span /> {isBloom ? "Quando a beleza encontra morada" : "Um lugar para sentir"} <span /></p>
          <h1 id="la-casa-title">La Casa</h1>
          <p className="subtitle">{isBloom ? "há lugares que não se visitam — se sentem" : "flores • encontros • delicadezas"}</p>
          <button className="enter-button" type="button" onClick={enter} aria-label="Entrar no site La Casa" disabled={isBloom && bloomProgress < .9}>
            <span>Entrar</span>
            <i aria-hidden="true">↓</i>
          </button>
        </div>

        {isBloom && (
          <div className="bloom-guide" aria-hidden="true">
            <span><i /></span>
            <p>{bloomProgress < .9 ? "Deslize para florescer" : "O jardim despertou"}</p>
            <b>↑</b>
          </div>
        )}

        <p className="edition">São Paulo · 2026</p>
        <p className="scroll-hint" aria-hidden="true">descubra</p>
      </section>

      <section id="proxima" className="next-section" aria-labelledby="next-title">
        <div className="next-section__ornament" aria-hidden="true"><i /><span /><i /></div>
        <p>O começo de uma história</p>
        <h2 id="next-title">Bem-vindo à<br /><em>La Casa</em></h2>
        <p className="next-section__note">Cada celebração encontra aqui um jeito único de florescer.</p>
        <button type="button" onClick={() => document.querySelector("#momentos")?.scrollIntoView({ behavior: "smooth" })}>Conheça nossas histórias ↓</button>
      </section>

      <section
        id="momentos"
        className="gallery-section"
        aria-labelledby="gallery-title"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") stepGallery(1);
          if (event.key === "ArrowLeft") stepGallery(-1);
        }}
      >
        <header className="gallery-header">
          <div>
            <p><span /> La Casa por dentro</p>
            <h2 id="gallery-title">Histórias<br /><em>vividas aqui</em></h2>
          </div>
          <p className="gallery-header__note">Festas, encontros e detalhes que transformam cada noite em uma memória particular.</p>
        </header>

        <div
          className="gallery-stage"
          onPointerDown={handleGallerySwipeStart}
          onPointerUp={handleGallerySwipeEnd}
          onPointerCancel={() => { gallerySwipeRef.current = null; }}
        >
          <div
            key={`backdrop-${galleryIndex}`}
            className="gallery-stage__backdrop"
            style={{ backgroundImage: `url(${galleryPhotos[galleryIndex].src})` }}
            aria-hidden="true"
          />
          {previousGalleryIndex !== null && (
            <img
              className={`gallery-photo gallery-photo--outgoing gallery-photo--direction-${galleryDirection > 0 ? "next" : "previous"}`}
              src={galleryPhotos[previousGalleryIndex].src}
              alt=""
              aria-hidden="true"
            />
          )}
          <img
            key={`photo-${galleryIndex}`}
            className={`gallery-photo gallery-photo--active gallery-photo--direction-${galleryDirection > 0 ? "next" : "previous"}`}
            src={galleryPhotos[galleryIndex].src}
            alt={galleryPhotos[galleryIndex].alt}
            loading={galleryIndex < 2 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
          <button className="gallery-stage__advance" type="button" onClick={() => stepGallery(1)} aria-label="Ver próxima fotografia" />
          <div className="gallery-stage__caption" aria-live="polite">
            <span>{galleryPhotos[galleryIndex].label}</span>
            <p>{String(galleryIndex + 1).padStart(2, "0")} <i /> {String(galleryPhotos.length).padStart(2, "0")}</p>
          </div>
        </div>

        <div className="gallery-controls">
          <div className="gallery-arrows">
            <button type="button" onClick={() => stepGallery(-1)} aria-label="Fotografia anterior">←</button>
            <button type="button" onClick={() => stepGallery(1)} aria-label="Próxima fotografia">→</button>
          </div>
          <div className="gallery-thumbs" ref={galleryThumbsRef} aria-label="Escolher fotografia">
            {galleryPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className={index === galleryIndex ? "is-active" : ""}
                data-gallery-thumb={index}
                onClick={() => showGalleryImage(index, index > galleryIndex ? 1 : -1)}
                aria-label={`Ver fotografia ${index + 1}: ${photo.label}`}
                aria-current={index === galleryIndex ? "true" : undefined}
              >
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
