import { useState } from "react";
import { transliterate } from "@felix-tech/singlish-js";

export default function LiveInput() {
  const [roman, setRoman] = useState("");
  const sinhala = transliterate(roman);

  return (
    <section className="demo">
      <h2>Live transliteration</h2>
      <p className="demo-desc">
        Type Singlish below. Sinhala Unicode renders on every keystroke — no
        button press needed.
      </p>

      <label className="field-label" htmlFor="live-input">
        Singlish
      </label>
      <input
        id="live-input"
        className="roman-input"
        value={roman}
        onChange={(e) => setRoman(e.target.value)}
        placeholder="mama gamata yanawaa..."
        autoFocus
        spellCheck={false}
      />

      <div className="sinhala-output" aria-live="polite">
        {sinhala || <span className="placeholder">මම ගමට යනවා…</span>}
      </div>

      <details className="hint">
        <summary>Quick cheat sheet</summary>
        <ul>
          <li>
            <code>a</code> = inherent vowel (bare consonant), <code>aa</code> =
            long ā
          </li>
          <li>
            <code>sh</code> = ශ, <code>Sh</code> = ෂ, <code>th</code> = ත,{" "}
            <code>dh</code> = ද
          </li>
          <li>
            <code>shri</code> → ශ්‍රී (Rakaransaya conjunct)
          </li>
          <li>
            <code>sathya</code> → සත්‍ය (Yansaya conjunct)
          </li>
          <li>
            <code>kAma</code> → කැම (uppercase A = short ae)
          </li>
          <li>
            <code>aBa</code> → අඹ (uppercase B = amba ඹ)
          </li>
        </ul>
      </details>
    </section>
  );
}
