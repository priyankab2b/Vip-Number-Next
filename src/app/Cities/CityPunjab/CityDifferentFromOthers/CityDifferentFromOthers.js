import React from "react";
import CityHeading from "../CityHeading/CityHeading";
import "./CityDifferentFromOthers.css";

const CityDifferentFromOthers = ({
  heading,
  heading1,
  text11,
  text12,
  heading2,
  text21,
  text22,
  heading3,
  text31,
  text32,
  heading4,
  text41,
  text42,
  heading5,
  text51,
  text52,
}) => {
  return (
    <section className="CityDifferentFromOthers-section default-section-os">
      <div className="container-os">
        <div className="CityDifferentFromOthers-heading-os">
          <CityHeading title={heading} />
        </div>
        <div className="CityDifferentFromOthers-row-os">
          <div className="CityCard-col-os CityCard-col-1-os">
            {heading1 && <h3>{heading1}</h3>}
            {text11 && <p>{text11}</p>}
            {text12 && <p>{text12}</p>}
          </div>

          <div className="CityCard-col-os CityCard-col-2-os">
            {heading2 && <h3>{heading2}</h3>}
            {text21 && <p>{text21}</p>}
            {text22 && <p>{text22}</p>}
          </div>

          <div className="CityCard-col-os CityCard-col-3-os">
            {heading3 && <h3>{heading3}</h3>}
            {text31 && <p>{text31}</p>}
            {text32 && <p>{text32}</p>}
          </div>

          <div className="CityCard-col-os CityCard-col-4-os">
            {heading4 && <h3>{heading4}</h3>}
            {text41 && <p>{text41}</p>}
            {text42 && <p>{text42}</p>}
          </div>

          <div className="CityCard-col-os CityCard-col-5-os">
            {heading5 && <h3>{heading5}</h3>}
            {text51 && <p>{text51}</p>}
            {text52 && <p>{text52}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CityDifferentFromOthers;
