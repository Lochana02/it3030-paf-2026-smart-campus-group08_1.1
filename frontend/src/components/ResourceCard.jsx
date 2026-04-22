function ResourceCard({ resource, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

      {/* LEFT SIDE */}
      <div>
        <h3 className="text-lg font-bold">{resource.name}</h3>

        <p className="text-sm text-gray-500">
          Type: {resource.type}
        </p>

        <p className="text-sm">
          Capacity: {resource.capacity}
        </p>

        <p className="text-sm">
          Location: {resource.location}
        </p>

        <p className="text-xs text-gray-400">
          {resource.availableFrom} - {resource.availableTo}
        </p>

       <p
  className={`text-sm font-semibold mt-1 ${
    resource.status === "ACTIVE"
      ? "text-green-500"
      : "text-red-500"
  }`}
>
  {resource.status}
</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(resource)}
          className="bg-yellow-400 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(resource.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default ResourceCard;