import "./styles.css";

export default function Card(props) {
  return (
    <div
      style={{
        backgroundColor: "lightGrey",
        width: "200px",
        height: "125px",
        border: "solid",
        borderRadius: "5px",
        overflow: "auto",
        className: "card",
      }}>
      <h4 style={{ fontSize: "20px", lineHeight: "1px", padding: "5px" }}>
        {props.title}
      </h4>
      <hr />
      <h3>{props.number}</h3>
    </div>
  );
}
