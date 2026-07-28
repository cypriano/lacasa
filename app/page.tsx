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
  { id: "natural", name: "Jardim natural" },
  { id: "narrativa", name: "Nova narrativa" },
  { id: "narrativa-branca", name: "Manifesto branco" },
  { id: "aquarela", name: "Aquarela" },
  { id: "aquarela-editorial", name: "Aquarela editorial" },
] as const;

const kineticWords = ["Sonhar", "Acreditar", "Realizar", "Celebrar"] as const;
const kineticPatternRows = [
  "Sonhar Acreditar Realizar && Celebrar !",
  "Celebrar ! Sonhar Acreditar Realizar &&",
  "Realizar && Celebrar ! Sonhar Acreditar",
  "Acreditar Realizar && Celebrar ! Sonhar",
] as const;
const spacePhotoIndices = [17, 3, 5, 8, 0, 10] as const;
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH || "";

const galleryPhotos = [
  { src: `${assetBase}/gallery/01.webp`, label: "Casamentos", alt: "Casal em meio a uma instalação floral iluminada" },
  { src: `${assetBase}/gallery/02.webp`, label: "A festa", alt: "Casal dançando sob luzes coloridas" },
  { src: `${assetBase}/gallery/03.webp`, label: "Cerimônias", alt: "Casal cercado por um arco de flores brancas" },
  { src: `${assetBase}/gallery/04.webp`, label: "Cenografia", alt: "Mesa de celebração com flores intensas e globos espelhados" },
  { src: `${assetBase}/gallery/05.webp`, label: "Detalhes", alt: "Bolo de casamento decorado com rosas vermelhas" },
  { src: `${assetBase}/gallery/06.webp`, label: "Detalhes", alt: "Bolo branco entre flores e luzes suspensas" },
  { src: `${assetBase}/gallery/07.webp`, label: "Celebrações", alt: "Debutante em vestido bordado junto à decoração floral" },
  { src: `${assetBase}/gallery/08.webp`, label: "Celebrações", alt: "Debutante sorrindo diante de uma parede de flores" },
  { src: `${assetBase}/gallery/09.webp`, label: "Detalhes", alt: "Bolo de quinze anos suspenso sobre cristais" },
  { src: `${assetBase}/gallery/10.webp`, label: "Casamentos", alt: "Retrato de noiva diante de flores brancas" },
  { src: `${assetBase}/gallery/11.webp`, label: "Noite", alt: "Casal na entrada floral da La Casa à noite" },
  { src: `${assetBase}/gallery/12.webp`, label: "Casamentos", alt: "Noiva com buquê branco em cenário floral" },
  { src: `${assetBase}/gallery/13.webp`, label: "Casamentos", alt: "Casal sorrindo diante da mesa do casamento" },
  { src: `${assetBase}/gallery/14.webp`, label: "A festa", alt: "Casal dançando em frente ao palco" },
  { src: `${assetBase}/gallery/15.webp`, label: "Casamentos", alt: "Noiva ao lado do bolo sob luzes quentes" },
  { src: `${assetBase}/gallery/16.webp`, label: "Casamentos", alt: "Noiva em retrato frontal no salão" },
  { src: `${assetBase}/gallery/17.webp`, label: "Memórias", alt: "Retrato em preto e branco de noiva com buquê" },
  { src: `${assetBase}/gallery/18.webp`, label: "O espaço", alt: "Jardim, fonte e arquitetura externa da La Casa" },
  { src: `${assetBase}/gallery/19.webp`, label: "Memórias", alt: "Casal dentro do carro após a celebração" },
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

function EditorialPhoto({ index, className = "" }: { index: number; className?: string }) {
  const photo = galleryPhotos[index];
  return (
    <figure className={`editorial-photo ${className}`}>
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      <figcaption><span>{photo.label}</span><i>{String(index + 1).padStart(2, "0")}</i></figcaption>
    </figure>
  );
}

function WatercolorPainting({ className = "" }: { className?: string }) {
  return (
    <div className={`watercolor-painting ${className}`} aria-hidden="true">
      <div className="watercolor-painting__base" />
      <div className="watercolor-painting__brushes">
        {Array.from({ length: 14 }).map((_, index) => <i key={index} />)}
      </div>
      <div className="watercolor-painting__wash" />
    </div>
  );
}

export default function Home() {
  const [leaving, setLeaving] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [bloomProgress, setBloomProgress] = useState(0);
  const [typeProgress, setTypeProgress] = useState(0);
  const [watercolorWelcomeVisible, setWatercolorWelcomeVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const typeSectionRef = useRef<HTMLElement>(null);
  const watercolorWelcomeRef = useRef<HTMLElement>(null);
  const typeFrameRef = useRef<number | null>(null);
  const watercolorExitFrameRef = useRef<number | null>(null);
  const spaceCarouselRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const bloomRef = useRef(0);
  const dragRef = useRef<{ y: number; progress: number; pointerId: number } | null>(null);
  const theme = visualThemes[themeIndex];
  const isBloom = theme.id === "florescer";
  const isNarrative = theme.id === "narrativa" || theme.id === "narrativa-branca";
  const isWhiteNarrative = theme.id === "narrativa-branca";
  const isWatercolorEditorial = theme.id === "aquarela-editorial";
  const isWatercolor = theme.id === "aquarela" || isWatercolorEditorial;

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
    if (typeFrameRef.current) cancelAnimationFrame(typeFrameRef.current);
    if (watercolorExitFrameRef.current) cancelAnimationFrame(watercolorExitFrameRef.current);
  }, []);

  useEffect(() => {
    setWatercolorWelcomeVisible(false);
    if (!isWatercolor) return;
    const section = watercolorWelcomeRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setWatercolorWelcomeVisible(true);
    }, { threshold: .24 });
    observer.observe(section);
    return () => observer.disconnect();
  }, [isWatercolor]);

  useEffect(() => {
    if (!isNarrative) return;
    const updateProgress = () => {
      if (typeFrameRef.current) cancelAnimationFrame(typeFrameRef.current);
      typeFrameRef.current = requestAnimationFrame(() => {
        const section = typeSectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, rect.height - window.innerHeight);
        setTypeProgress(Math.min(1, Math.max(0, -rect.top / distance)));
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isNarrative]);

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
    if (isWatercolor) {
      const target = document.querySelector<HTMLElement>("#proxima");
      const hero = heroRef.current;
      if (!target || !hero) return;
      const startY = window.scrollY;
      const destinationY = target.getBoundingClientRect().top + window.scrollY;
      const startTime = performance.now();
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : isWatercolorEditorial ? 4600 : 3700;
      setLeaving(true);
      const animate = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        const eased = progress < .5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        hero.style.setProperty("--aquarela-exit", progress.toFixed(3));
        window.scrollTo(0, startY + (destinationY - startY) * eased);
        if (progress < 1) watercolorExitFrameRef.current = requestAnimationFrame(animate);
        else {
          watercolorExitFrameRef.current = null;
          setLeaving(false);
        }
      };
      watercolorExitFrameRef.current = requestAnimationFrame(animate);
      return;
    }
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

  const scrollSpaceCarousel = (direction: 1 | -1) => {
    const carousel = spaceCarouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: carousel.clientWidth * .78 * direction, behavior: "smooth" });
  };

  return (
    <main style={{
      "--floral-herbario": `url("${assetBase}/floral-herbario.webp")`,
      "--floral-moldura": `url("${assetBase}/floral-moldura.webp")`,
      "--floral-campo": `url("${assetBase}/floral-campo.webp")`,
      "--la-casa-aquarela": `url("${assetBase}/la-casa-aquarela.jpg")`,
    } as CSSProperties}>
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
          <div className="background-gallery__image background-gallery__image--natural" />
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
          <span className="theme-switcher__count" aria-hidden="true">{String(themeIndex + 1).padStart(2, "0")} / 10</span>
        </button>

        <div className="hero__center">
          <p className="eyebrow"><span /> {isNarrative ? "Um lugar para celebrar" : isBloom ? "Quando a beleza encontra morada" : "Um lugar para sentir"} <span /></p>
          <h1 id="la-casa-title">La Casa</h1>
          <p className="subtitle">{isNarrative ? "Sonhar • Acreditar • Realizar" : isBloom ? "há lugares que não se visitam — se sentem" : "flores • encontros • delicadezas"}</p>
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

      {isNarrative ? (
        <>
          <section id="proxima" className="next-section next-section--narrative" aria-labelledby="next-title">
            <div className="next-section__ornament" aria-hidden="true"><i /><span /><i /></div>
            <p>O começo de uma história</p>
            <h2 id="next-title">Bem-vindo ao<br /><em>La Casa</em></h2>
            <p className="next-section__note">Cada celebração e cada evento encontram aqui um espaço único para florescer.</p>
            <button type="button" onClick={() => document.querySelector("#manifesto")?.scrollIntoView({ behavior: "smooth" })}>Conheça nosso espaço ↓</button>
          </section>

          <section id="manifesto" ref={typeSectionRef} className={`kinetic-section${isWhiteNarrative ? " kinetic-section--light" : ""}`} aria-label="Sonhar, acreditar, realizar e celebrar">
            <div className="kinetic-sticky">
              <div className="kinetic-index"><span>{isWhiteNarrative ? "Manifesto de luz" : "Manifesto"}</span><i>{String(Math.round(typeProgress * 100)).padStart(2, "0")}</i></div>
              {isWhiteNarrative ? (
                <div className="kinetic-pattern" aria-hidden="true">
                  {Array.from({ length: 16 }).map((_, index) => {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const offset = (typeProgress - .5) * direction * (10 + index % 4 * 2.5);
                    return <p key={index} style={{ transform: `translateX(calc(-50% + ${offset}vw))` }}>{kineticPatternRows[index % kineticPatternRows.length]}</p>;
                  })}
                </div>
              ) : (
                <>
                  <b className="kinetic-ampersand" aria-hidden="true" style={{ transform: `translate(-50%, -50%) rotate(${typeProgress * 80 - 40}deg)` }}>&amp;</b>
                  <div className="kinetic-words" aria-hidden="true">
                    {kineticWords.map((word, index) => {
                      const midpoint = .12 + index * .25;
                      const distance = typeProgress - midpoint;
                      const opacity = Math.max(.12, 1 - Math.abs(distance) * 3.7);
                      const direction = index % 2 === 0 ? 1 : -1;
                      return (
                        <span key={word} style={{
                          opacity,
                          transform: `translateX(${distance * direction * 125}vw) scale(${.92 + opacity * .08})`,
                        }}>{word}{index === 3 ? "." : ""}</span>
                      );
                    })}
                  </div>
                </>
              )}
              <p className="kinetic-hint">Continue para descobrir <span>↓</span></p>
            </div>
          </section>

          <section id="espaco" className="space-carousel-section" aria-labelledby="space-title">
            <header className="space-carousel-header">
              <div><p>La Casa Cerimonial</p><h2 id="space-title">Um espaço,<br /><em>muitas histórias.</em></h2></div>
              <div className="space-carousel-arrows">
                <button type="button" onClick={() => scrollSpaceCarousel(-1)} aria-label="Voltar nas imagens">←</button>
                <button type="button" onClick={() => scrollSpaceCarousel(1)} aria-label="Avançar nas imagens">→</button>
              </div>
            </header>
            <div className="space-carousel" ref={spaceCarouselRef}>
              {spacePhotoIndices.map((photoIndex, index) => {
                const photo = galleryPhotos[photoIndex];
                return (
                  <figure key={photo.src}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                    <figcaption><span>{photo.label}</span><i>0{index + 1} / 06</i></figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          <section className="memorable-section" aria-labelledby="memorable-title">
            <figure><img src={galleryPhotos[17].src} alt={galleryPhotos[17].alt} loading="lazy" decoding="async" /></figure>
            <div>
              <p><span /> La Casa por inteiro</p>
              <h2 id="memorable-title">Experiências<br /><em>Memoráveis</em></h2>
              <p className="memorable-copy">Cada detalhe do La Casa Cerimonial é pensado para criar uma experiência inesquecível do início ao fim. E tudo começa no momento em que os convidados chegam. Na entrada principal, uma elegante fonte de água dá as boas-vindas, envolvendo-os em uma atmosfera acolhedora ao som suave das águas em movimento. Essa é a primeira impressão de um evento cuidadosamente planejado, onde cada elemento contribui para um ambiente sofisticado e memorável.</p>
            </div>
          </section>
        </>
      ) : (
        <>
          {isWatercolorEditorial ? (
            <>
              <section id="proxima" className="next-section next-section--aquarela" aria-labelledby="next-title">
                <div className="next-section__ornament" aria-hidden="true"><i /><span /><i /></div>
                <p>O começo de uma história</p>
                <h2 id="next-title">Bem-vindo ao<br /><em>La Casa</em></h2>
                <p className="next-section__note">Cada celebração encontra aqui um jeito único de florescer.</p>
                <button type="button" onClick={() => document.querySelector("#aquarela-reveal")?.scrollIntoView({ behavior: "smooth" })}>Conheça nosso espaço ↓</button>
              </section>
              <section id="aquarela-reveal" ref={watercolorWelcomeRef} className={`watercolor-editorial-reveal${watercolorWelcomeVisible ? " is-visible" : ""}`} aria-label="La Casa em aquarela">
                <div className="watercolor-editorial-reveal__intro"><span>Nosso espaço</span><i /></div>
                <WatercolorPainting className="watercolor-painting--framed" />
                <p className="watercolor-editorial-reveal__caption">Um jardim para celebrar histórias inesquecíveis.</p>
              </section>
            </>
          ) : isWatercolor ? (
            <section id="proxima" ref={watercolorWelcomeRef} className={`watercolor-welcome${watercolorWelcomeVisible ? " is-visible" : ""}`} aria-labelledby="next-title">
              <WatercolorPainting className="watercolor-painting--welcome" />
              <div className="watercolor-welcome__content">
                <p>Um espaço para florescer</p>
                <h2 id="next-title">Bem-vindo ao<br /><em>La Casa</em></h2>
                <button type="button" onClick={() => document.querySelector("#momentos")?.scrollIntoView({ behavior: "smooth" })}>Conheça nosso espaço ↓</button>
              </div>
            </section>
          ) : (
            <section id="proxima" className="next-section" aria-labelledby="next-title">
              <div className="next-section__ornament" aria-hidden="true"><i /><span /><i /></div>
              <p>O começo de uma história</p>
              <h2 id="next-title">Bem-vindo à<br /><em>La Casa</em></h2>
              <p className="next-section__note">Cada celebração encontra aqui um jeito único de florescer.</p>
              <button type="button" onClick={() => document.querySelector("#momentos")?.scrollIntoView({ behavior: "smooth" })}>Conheça nossas histórias ↓</button>
            </section>
          )}

          <section id="momentos" className="editorial-section" aria-labelledby="editorial-title">
            <header className="editorial-header"><p><span /> La Casa por dentro</p><div><h2 id="editorial-title">Histórias<br /><em>vividas aqui</em></h2><p>Festas, encontros e detalhes que transformam cada noite em uma memória particular.</p></div></header>
            <EditorialPhoto index={17} className="editorial-photo--venue" />
            <div className="editorial-spread editorial-spread--opening"><EditorialPhoto index={0} /><div className="editorial-spread__aside"><p>Uma casa feita para celebrar o que é único.</p><EditorialPhoto index={1} /></div></div>
            <EditorialPhoto index={3} className="editorial-photo--panorama" />
            <div className="editorial-spread editorial-spread--details"><EditorialPhoto index={4} /><EditorialPhoto index={5} /></div>
            <div className="editorial-statement"><p>Flores, luz e movimento</p><h3>Cada detalhe compõe<br />uma <em>atmosfera.</em></h3></div>
            <div className="editorial-triptych"><EditorialPhoto index={6} /><EditorialPhoto index={7} /><EditorialPhoto index={8} /></div>
            <EditorialPhoto index={2} className="editorial-photo--cinema" />
            <div className="editorial-spread editorial-spread--portraits"><EditorialPhoto index={9} /><EditorialPhoto index={11} /><EditorialPhoto index={12} /></div>
            <div className="editorial-spread editorial-spread--quiet"><EditorialPhoto index={14} /><div className="editorial-spread__aside"><blockquote>“Um lugar onde cada história encontra seu próprio cenário.”</blockquote><EditorialPhoto index={15} /></div></div>
            <div className="editorial-night"><header><span>Noite</span><h3>Quando a casa<br /><em>ganha outra luz</em></h3></header><EditorialPhoto index={10} /><EditorialPhoto index={13} /></div>
            <div className="editorial-finale"><EditorialPhoto index={16} /><EditorialPhoto index={18} /><p>Memórias para levar<br />muito além da festa.</p></div>
          </section>
        </>
      )}
    </main>
  );
}
