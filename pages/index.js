import Head from 'next/head';
import Chord from '../components/Chord';
import Keyboard from '../components/Keyboard';
import SynthModeNav from '../components/SynthModeNav';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Synthesizer</title>
      </Head>

      <main>
        <h1 className="title">Synthesizer</h1>

        <SynthModeNav activeTabId={0}>
          <div data-mode="keyboard" key="0">
            <Keyboard />
          </div>

          <div data-mode="chord" key="1">
            <div style={{ display: 'flex' }}>
              <Chord chordName="g" notes={['G3', 'Bb3', 'D3']} />
              <Chord chordName="a" notes={['A3', 'C4', 'E4']} />
              <Chord chordName="Bb" notes={['Bb3', 'D4', 'F4']} />
              <Chord chordName="C" notes={['C4', 'E4', 'G4']} />
              <Chord chordName="d" notes={['D4', 'F4', 'A4']} />
              <Chord chordName="F" notes={['F3', 'A3', 'C3']} />
            </div>
          </div>
        </SynthModeNav>
      </main>
    </div>
  )
}