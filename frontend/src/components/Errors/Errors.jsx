import "./errors.css";

export default function Errors({ errors, handleShowErrors }) {
  const errorsList = Object.values(errors);

  return errorsList.length > 0 ? (
    <div className="alert">
      <span className="closebtn" onClick={handleShowErrors}>
        &times;
      </span>
      <ul>
        {errorsList.map((error) => (
          <li>{error}</li>
        ))}
      </ul>
    </div>
  ) : null;
}
