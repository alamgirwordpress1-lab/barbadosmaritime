/** Heading text with one italic teal-to-gold phrase, as in the mockup. */
export function AccentTitle({ before, accent, after }: { before: string; accent: string; after?: string }) {
  return (
    <>
      {before}
      <span className="accent">{accent}</span>
      {after}
    </>
  );
}
