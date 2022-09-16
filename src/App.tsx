import { useState } from "react";

export function App() {
  const [people, setPeople] = useState("");
  const [peoples, setPeoples] = useState<string[]>([]);

  function handleAddPeoples() {
    if (!people) return;
    setPeoples((peoples) => [...peoples, people]);
    setPeople("");
  }

  return (
    <div>
      <h1>Family</h1>
      <input
        type="text"
        onChange={(event) => setPeople(event.target.value)}
        value={people}
      />
      <ul>
        {peoples.map((people, index) => (
          <li key={index}>{people}</li>
        ))}
      </ul>
      <button onClick={handleAddPeoples}>Add People</button>
    </div>
  );
}
