export default function ProfileInformation({
  imageSource,
  person,
  review,
  Rating,
}) {
  return (
    <>
      <div className='profileInformation'>
        <img src={imageSource} alt={`${person.name} Review`}></img>
        <div className='personRating'>
          <p>{person.name}</p>
          {Rating && <Rating />}
        </div>
        <div className='review'>
          <p>{review}</p>
        </div>
      </div>
    </>
  );
}
