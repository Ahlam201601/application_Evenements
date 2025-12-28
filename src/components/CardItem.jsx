export default function CardItem({ item }) {
  

  return (
    <div className="flex gap-3 bg-[#050517] p-2 rounded mb-2">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-200">{item.price} $</p>
      </div>
    </div>
  );
}