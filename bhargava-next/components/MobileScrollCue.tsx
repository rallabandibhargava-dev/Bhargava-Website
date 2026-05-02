export default function MobileScrollCue() {
  return (
    <div className="mobile-scroll-cue" aria-hidden="true">
      <span className="mobile-scroll-cue__mouse">
        <span className="mobile-scroll-cue__wheel" />
      </span>
      <span className="mobile-scroll-cue__chevrons">
        <span className="mobile-scroll-cue__chevron" />
        <span className="mobile-scroll-cue__chevron" />
      </span>
    </div>
  );
}
