import "./Hero.css";

export default function Hero() {
  return (
    <section className='heroSection' aria-label='Restaurant introduction'>
      <div className='textContent'>
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
        <button
          className='buttonReservation'
          aria-label='Reserve a table at Little Lemon restaurant'
        >
          Reserve a table
        </button>
      </div>
      <aside>
        <img
          src='./icons_assets/restauranfood.jpg'
          alt='Bruscheta Serving from Chef'
          id='restaurantFood'
        ></img>
      </aside>
    </section>
  );
}
