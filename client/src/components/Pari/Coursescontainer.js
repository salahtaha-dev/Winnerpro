import { useEffect, React, useState } from "react";
import { isEmpty } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { getParis } from "../../actions/pari.actions";
import Card from "../Paristars/Card";

const Coursescontainer = (props) => {
  const [loadPari, setLoadPari] = useState(true);
  const dispatch = useDispatch();
  const paris = useSelector((state) => state.pariReducer);

  useEffect(() => {
    if (loadPari) {
      dispatch(getParis());
      setLoadPari(false);
      //console.log("getPari démarré!");
    }
  }, [loadPari, dispatch]);

  return (
    <div
      className={
        "courses-container " +
        (props.sender === "AllParis" || props.sender === "Administration"
          ? "courses-container-allparis"
          : "")
      }
    >
      {!isEmpty(paris[0]) &&
        paris.map((pari, index) => {
          return (
            <Card
              pari={pari}
              index={index}
              key={pari._id}
              link={props.link}
              sender={props.sender}
            />
          );
        })}
    </div>
  );
};

export default Coursescontainer;
