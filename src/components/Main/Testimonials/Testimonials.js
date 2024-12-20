import "./Testimonials.css";
import Rating from "./Rating";
import { FourStarRating } from "./Rating";
import { ThreeStarRating } from "./Rating";
import ProfileInformation from "./ProfileInformation";

export default function Testimonials() {
  return (
    <section className='testimonials'>
      <div className='testimonialsHeader'>
        <h2>Testimonials</h2>
      </div>
      <div className='testimonialsArticle'>
        <article>
          <div className='profile'>
            <ProfileInformation
              person={{ name: "Alisha" }}
              imageSource={"./images/Alisha.jpg"}
              review={
                '"Fresh ingredients and attentive staff make this my new favorite spot."'
              }
              Rating={Rating}
            />
          </div>
        </article>
        <article>
          <div className='profile'>
            <ProfileInformation
              person={{ name: "Lorenz" }}
              imageSource={"./images/Lorenz.jpg"}
              review={
                '"Great flavors and presentation! A little more variety would make this a 5-star for me."'
              }
              Rating={FourStarRating}
            />
          </div>
        </article>
        <article>
          <div className='profile'>
            <ProfileInformation
              person={{ name: "Tanya" }}
              imageSource={"./images/Tanya.jpg"}
              review={
                '"I enjoyed the food, but it didn’t quite live up to the hype for the price."'
              }
              Rating={ThreeStarRating}
            />
          </div>
        </article>
        <article>
          <div className='profile'>
            <ProfileInformation
              person={{ name: "Chris" }}
              imageSource={"./images/Chris.jpg"}
              review={
                '"The lemon dessert is to die for! It’s the star of the menu and worth every penny."'
              }
              Rating={Rating}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
