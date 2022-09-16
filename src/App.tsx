import { useState } from "react";

export function App() {
  const [people, setPeople] = useState("");
  const [peoples, setPeoples] = useState<string[]>([]);

  function handleAddPeople() {
    if (!people) return;

    // setTimeout(() => { // exemplo com await findBy
    //   setPeoples((peoples) => [...peoples, people]);
    // }, 500);

    setPeoples((peoples) => [...peoples, people]);
    setPeople("");
  }

  function handleRemovePeople(item: string) {
    setPeoples(peoples.filter((people) => people !== item));
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
          <li key={index}>
            {people}
            <button onClick={() => handleRemovePeople(people)}>
              Remove People
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddPeople}>Add People</button>
    </div>
  );
}
