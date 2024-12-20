import "./About.css"

export default function About() {
  return (
    <section className='about'>
      <div className='aboutText'>
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </p>
      </div>
      <div className='aboutImage'>
        <img src='./icons_assets/restaurant.jpg' alt='Restaurant'></img>
        <img
          src='./icons_assets/Mario and Adrian b.jpg'
          alt='Adrian and Mario'
        ></img>
      </div>
    </section>
  );
}
