import { useState } from 'react';
import LiveInput from './demos/LiveInput';
import Editor from './demos/Editor';
import PhraseTable from './demos/PhraseTable';
import './App.css';

const TABS = ['Live input', 'Editor', 'Phrase table'] as const;
type Tab = (typeof TABS)[number];

export default function App() {
  const [tab, setTab] = useState<Tab>('Live input');

  return (
    <div className="app">
      <header className="header">
        <h1>singlish-js demo</h1>
        <p className="subtitle">
          Type romanised Sinhala (Singlish) — get Unicode Sinhala instantly.
          <br />
          Powered by{' '}
          <a
            href="https://www.npmjs.com/package/@felix-tech/singlish-js"
            target="_blank"
            rel="noreferrer"
          >
            @felix-tech/singlish-js
          </a>
        </p>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab ${tab === t ? 'tab--active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        {tab === 'Live input' && <LiveInput />}
        {tab === 'Editor' && <Editor />}
        {tab === 'Phrase table' && <PhraseTable />}
      </main>
    </div>
  );
}
