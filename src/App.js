import React from "react";
import styles from "./App.module.css";
import Card from "./components/Card";

const App = () => {
  return (
    <main className={styles.section}>
      <section className={styles.containersss}>
        <div className={styles.layout}>
          <Card />
        </div>
      </section>
    </main>
  );
};

export default App;
