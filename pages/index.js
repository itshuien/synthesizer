import Head from 'next/head';
import Chord from '../components/Chord';
import Keyboard from '../components/Keyboard';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Synthesizer</title>
      </Head>

      <main>
        <h1 className="title">Synthesizer</h1>
        <div className="chords-wrapper">
          <Chord chordName="g" notes={['G3', 'Bb3', 'D3']} />
          <Chord chordName="a" notes={['A3', 'C4', 'E4']} />
          <Chord chordName="Bb" notes={['Bb3', 'D4', 'F4']} />
          <Chord chordName="C" notes={['C4', 'E4', 'G4']} />
          <Chord chordName="d" notes={['D4', 'F4', 'A4']} />
          <Chord chordName="F" notes={['F3', 'A3', 'C3']} />
        </div>

        <Keyboard />
      </main>

      <style jsx>{`
        .chords-wrapper {
          display: flex;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin-bottom: 24px;
          line-height: 1.15;
          font-size: 4rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background-color: #eeeeee;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}