import connectDB from "@/config/database";
import Property from "@/app/models/Property";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async () => {
  await connectDB();

  const RecentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {RecentProperties.length == 0 ? (
            <p>No properties available.</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {RecentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/*second section*/}
      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/Properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-grey-700"
        >
          View all Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
