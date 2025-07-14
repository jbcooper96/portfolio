import Image from "next/image";

export default function Home() {
  return (

    <div>
      <p>
        I'm a Full-Stack Web Developer with a passion for building dynamic,
        user-friendly applications. With a background in Salesforce development
        and a growing expertise in modern web technologies like React.js, Flask, and Electron.js,
        I thrive on crafting seamless digital experiences.
      </p>
      <br />
      <h2 className="text-2xl animate-pulse">What I Do</h2>
      <ul className="list-disc ml-10">
        <li><b>Web Development</b> - Building interactive frontends and scalable backends.</li>
        <li><b>Electron.js Apps</b> - Creating cross-platform desktop applications.</li>
        <li><b>Salesforce Development</b> - Custom LWC solutions and API integrations.</li>
        <li><b>Full-Stack Solutions</b> - Leveraging React, Flask, and Node.js for powerful web apps.</li>
      </ul>
      <br />
      <h2 className="text-2xl animate-pulse">Recent Project: A Custom Notes App</h2>

      <p>
        I recently built a cross-platform note-taking app with Electron.js,
        featuring resizable sticky notes and a line-drawing tool to boost organization and creativity.
      </p>

      <h2>Always Learning & Innovating</h2>

      <p>
        I'm always diving into new technologies and refining my craft. Whether it's optimizing
        UI performance, streamlining backend logic, or experimenting with new frameworks,
        I love the challenge of turning ideas into reality.
      </p>

      <p>
        Check out my work below!
      </p>

    </div>
  );
}
