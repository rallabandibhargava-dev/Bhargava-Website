type ShortStoryProps = {
  summary: {
    whatHappened: string;
    howWeSolved: string;
    outcome: string;
  };
};

export default function CaseShortStory({ summary }: ShortStoryProps) {
  return (
    <section className="tldr reveal">
      <div className="eyebrow tldr__label">Short story</div>
      <div className="tldr__grid">
        <div className="tldr__item">
          <div className="tldr__heading">The problem</div>
          <p>{summary.whatHappened}</p>
        </div>
        <div className="tldr__item">
          <div className="tldr__heading">The solve</div>
          <p>{summary.howWeSolved}</p>
        </div>
        <div className="tldr__item">
          <div className="tldr__heading">The outcomes</div>
          <p>{summary.outcome}</p>
        </div>
      </div>
    </section>
  );
}
