import "./globals.css";

export const metadata = {
  title: "Property Pulse",
  keyword: "property,real estate",
  description: "Find the perfect property with Property Pulse",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
