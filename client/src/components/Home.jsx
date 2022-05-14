export default function Home({sendToPlantAPI, setFile}) {
  return (
    <div>
      <h1>Herbiview</h1>
      <form onSubmit={sendToPlantAPI}>
        <input type="file" onChange={setFile} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
