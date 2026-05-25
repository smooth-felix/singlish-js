import { useState } from 'react';
import { transliterate } from '@felix-tech/singlish-js';

export default function Editor() {
  const [draft, setDraft] = useState('');
  const sinhala = transliterate(draft);

  function copyToClipboard() {
    navigator.clipboard.writeText(sinhala);
  }

  return (
    <section className="demo">
      <h2>Side-by-side editor</h2>
      <p className="demo-desc">
        Write Singlish on the left, get Sinhala Unicode on the right. Copy the
        result to paste anywhere.
      </p>

      <div className="editor-grid">
        <div className="editor-pane">
          <div className="pane-header">Singlish (romanised)</div>
          <textarea
            className="editor-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="mama api sinhala kathaawa karanawaa..."
            spellCheck={false}
          />
        </div>

        <div className="editor-pane">
          <div className="pane-header">
            Sinhala Unicode
            <button
              className="copy-btn"
              onClick={copyToClipboard}
              disabled={!sinhala}
              title="Copy to clipboard"
            >
              Copy
            </button>
          </div>
          <div className="editor-preview" aria-live="polite">
            {sinhala || <span className="placeholder">preview…</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
