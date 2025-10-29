import InfoBox from "./Infobox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              text: "Browse Properties",
              link: "/Properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgroundcolor="bg-blue-100"
            buttonInfo={{
              text: "Add Property",
              link: "/Properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your property and find potential tenants. Rent as airbnb or
            longterm
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
