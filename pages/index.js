import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [firstWordInput, setFirstWordInput] = useState("");
  const [secondWordInput, setSecondWordInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ words: firstWordInput + " " + secondWordInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setFirstWordInput("");
    setSecondWordInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Tell me where to go</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="First word"
            placeholder="Enter a word related to a place you'd want to go"
            value={firstWordInput}
            onChange={(e) => setFirstWordInput(e.target.value)}
          />
          <input
            type="text"
            name="Second word"
            placeholder="Enter another word related to a place you'd want to go"
            value={setFirstWordInput}
            onChange={(e) => setSecondWordInput(e.target.value)}
          />
          <input type="submit" value="Generate Places" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}