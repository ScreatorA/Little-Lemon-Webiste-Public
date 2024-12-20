import "./Highlights.css";

export default function Highlights() {
  return (
    <section className='highlights' aria-label='This Week’s Specials'>
      <div className='textContent'>
        <h2>This weeks Specials!</h2>
        <button
          className='buttonMenu'
          aria-label='View the online menu of weekly specials'
        >
          Online Menu
        </button>
      </div>
      <div className='highlightCards'>
        <article className='article greekSaladCard'>
          <div className='cardImage'>
            <img
              src='./images/Greek salad.jpg'
              alt='Greek salad'
              id='greekSalad'
            ></img>
          </div>
          <div className='menuInformation'>
            <div className='menu'>
              <p className='menuName'>Greek Salad</p>
              <p className='menuPrice'>10.99$</p>
            </div>
            <div className='cardDescription'>
              <p>
                A fresh and vibrant mix of crisp cucumbers, juicy tomatoes, red
                onions, Kalamata olives, and creamy feta cheese, tossed in our
                signature olive oil and lemon dressing.
              </p>
            </div>
            <div className='cardOrderInformation'>
              <p>Order a delivery</p>
              <img
                src='./icons_assets/Transfer Motorcycle.svg'
                alt='Transfer Motorcycle'
                id='transferMotorcycle'
              ></img>
            </div>
          </div>
        </article>
        <article className='article bruschettaCard'>
          <div className='cardImage'>
            <img
              src='./images/Bruschetta.jpg'
              alt='Bruschetta'
              id='bruschetta'
            ></img>
          </div>
          <div className='menuInformation'>
            <div className='menu'>
              <p className='menuName'>Bruschetta</p>
              <p className='menuPrice'>4.99$</p>
            </div>
            <div className='cardDescription'>
              <p>
                Toasted artisan bread topped with a medley of ripe tomatoes,
                fresh basil, and garlic, finished with a drizzle of balsamic
                glaze for the perfect bite.
              </p>
            </div>
            <div className='cardOrderInformation'>
              <p>Order a delivery</p>
              <img
                src='./icons_assets/Transfer Motorcycle.svg'
                alt='Transfer Motorcycle'
                id='transferMotorcycle'
              ></img>
            </div>
          </div>
        </article>
        <article className='article lemonDessertCard'>
          <div className='cardImage'>
            <img
              src='./images/Lemon Dessert.jpg'
              alt='Lemon Dessert'
              id='lemonDessert'
            ></img>
          </div>
          <div className='menuInformation'>
            <div className='menu'>
              <p className='menuName'>Lemon Dessert</p>
              <p className='menuPrice'>7.99$</p>
            </div>
            <div className='cardDescription'>
              <p>
                Indulge in our refreshing lemon dessert, featuring a tangy-sweet
                custard topped with whipped cream and a sprinkle of lemon zest.
              </p>
            </div>
            <div className='cardOrderInformation'>
              <p>Order a delivery</p>
              <img
                src='./icons_assets/Transfer Motorcycle.svg'
                alt='Transfer Motorcycle'
                id='transferMotorcycle'
              ></img>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
