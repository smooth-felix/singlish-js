import { transliterate } from "@felix-tech/singlish-js";

const PHRASES: { label: string; roman: string }[] = [
  { label: "Hello / Long life", roman: "aayuboewan" },
  { label: "Thank you", roman: "sthuuthiyi" },
  { label: "Thank you very much", roman: "bohoma sthuuthiyi" },
  { label: "Yes", roman: "ow" },
  { label: "No", roman: "nae" },
  { label: "Good morning", roman: "suba udhAasanak" },
  { label: "Good night", roman: "suba raathriyak" },
  { label: "How are you?", roman: "kohomadha?" },
  { label: "I am fine", roman: "mama honndhin" },
  { label: "My name is…", roman: "magea nama…" },
  { label: "Where is…?", roman: "...koheadha?" },
  { label: "Sri Lanka", roman: "shrii la\nkaa" },
  { label: "Truth / reality", roman: "sathya" },
  { label: "Blessed / auspicious", roman: "shri" },
  { label: "Mother", roman: "amma" },
  { label: "Father", roman: "thaththa" },
  { label: "Village", roman: "gama" },
  { label: "Water", roman: "wathura" },
  { label: "Rice", roman: "bath" },
  { label: "Mango", roman: "aBa" },
];

export default function PhraseTable() {
  return (
    <section className="demo">
      <h2>Common phrases</h2>
      <p className="demo-desc">
        All conversions happen at render time — zero network calls.
      </p>

      <table className="phrase-table">
        <thead>
          <tr>
            <th>English</th>
            <th>Singlish (input)</th>
            <th>Sinhala (output)</th>
          </tr>
        </thead>
        <tbody>
          {PHRASES.map(({ label, roman }) => (
            <tr key={roman}>
              <td>{label}</td>
              <td>
                <code>{roman}</code>
              </td>
              <td className="sinhala-cell">{transliterate(roman)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
