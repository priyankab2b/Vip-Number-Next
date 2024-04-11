import React from "react";
import { useEffect, useState } from "react";

const Sitemap = () => {
  const [xmlContent, setXmlContent] = useState(null);
  useEffect(() => {
    fetch("/sitemap.xml")
      .then((response) => response.text())
      .then((data) => setXmlContent(data));
  }, []);

  return (
    <div>
      <pre>{xmlContent}</pre>
    </div>
  );
};

export default Sitemap;