const WEEKS = 53;
const DAYS = WEEKS * 7;
const TODAY = DAYS - 4; // a Thursday (weeks start on Monday), like the tour's captures: Thu 1 October
const MONTHS = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

// A made-up year of habits, seeded so every visit draws the same one: patchy in November, steadier by autumn.
const LEVELS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: TODAY }, (_, i) => {
    const t = i / DAYS;
    return rnd() < 0.25 + 0.65 * t ? 1 + Math.min(3, Math.floor(rnd() * 4 * (0.4 + t))) : 0;
  });
})();

// The hero's year heatmap: it fills in week by week on load, then today pops in. Decorative; styles in index.css.
export function Heatmap() {
  return (
    <div aria-hidden="true">
      <div className="heat heat-months">
        {MONTHS.map((m, i) => (
          <span key={m} style={{ gridColumn: 1 + Math.round(i * 4.42) }}>{m}</span>
        ))}
      </div>
      <div className="heat heat-days">
        {Array.from({ length: DAYS }, (_, i) =>
          i === TODAY ? (
            <i key={i} className="today"><span className="heat-tip">Today · 4 of 5 kept</span></i>
          ) : i > TODAY ? (
            <i key={i} className="future" />
          ) : (
            <i key={i} data-l={LEVELS[i] || undefined} style={{ animationDelay: `${600 + Math.floor(i / 7) * 16}ms` }} />
          ),
        )}
      </div>
    </div>
  );
}
