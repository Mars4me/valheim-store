const AboutExampes = () => {
  return (
    <div>
      <h1 className="mt-3 mb-4 fw-bold">Example Projects</h1>

      <h4 className="text-muted">
        There are many example projects created by the React community. We’re keeping this page focused on the ones that use React
        without third-party state management libraries.
      </h4>

      <div className="my-3">
        <p>If you add a project, please commit to keeping it up to date with the latest versions of React.</p>
      </div>
      <hr />

      <h3 className="fw-bold my-3">Small Examples</h3>

      <ul className="fw-bold my-3 g-2">
        <li className="my-3 g-2">
          Calculator <span className="fw-normal ">Implementation of the iOS calculator built in React</span>
        </li>
        <li>
          Emoji Search <span className="fw-normal ">React app for searching emoji</span>
        </li>
        <li>
          Snap Shot <span className="fw-normal ">A photo gallery with search</span>
        </li>
        <li>
          BMI Calculator <span className="fw-normal ">A React Hooks app for calculating BMI</span>
        </li>
      </ul>
    </div>
  );
};

export default AboutExampes;
