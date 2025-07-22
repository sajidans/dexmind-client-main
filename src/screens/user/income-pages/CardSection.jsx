export const CardSection = ({ filter, dateData }) => {
  console.log("Current filter:", filter, "Date data:", dateData);

  // Fallback data if API returns no data
  const defaultData = [
    { title: "Registered Member", value: dateData?.totalTeam ?? 0 },
    { title: "Total Member A", value: dateData?.teamA ?? 0 },
    { title: "Total Member B", value: dateData?.teamB ?? 0 },
    { title: "Total Member C", value: dateData?.teamC ?? 0 },
    { title: "Total Member D", value: dateData?.teamD ?? 0 },
    // { title: "Total Valid Member", value: 0 },
    // { title: "Total Valid A", value: dateData?.teamAMembers?.length ?? 0 },
    // { title: "Total Valid B", value: dateData?.teamBMembers?.length ?? 0 },
    // { title: "Total Valid C", value: dateData?.teamCMembers?.length ?? 0 },
  ];

  // Use dateData if available and is an array, otherwise fallback to defaultData
  const cards = Array.isArray(dateData) && dateData.length > 0 ? dateData : defaultData;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={`${card.title}-${index}`} className="flex flex-col items-center w-full">
              <p className="text-xl mb-2 text-center">{card.title || "Title Missing"}</p>
              <div className="bg-[#01EBE0] rounded-lg p-4 w-full flex items-center justify-center">
                <h1 className="text-[1.3rem] font-bold text-white">{card.value ?? "N/A"}</h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl col-span-full">No data available for the selected filter</p>
        )}
      </div>
    </section>
  );
};