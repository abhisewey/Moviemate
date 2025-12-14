import ItemCard from "../components/ItemCard";

function Home({ items }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>MovieMate</h1>

      {items.length === 0 ? (
        <p>No items added yet</p>
      ) : (
        items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

export default Home;
