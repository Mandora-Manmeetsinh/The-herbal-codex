function PlantDetail({ plant }) {
    return (
      <div className="container mt-5">
        <h1>{plant.name}</h1>
        <img src={plant.image} alt={plant.name} className="img-fluid" />
        <p>{plant.description}</p>
        <h3>Benefits</h3>
        <ul>
          {plant.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    );
    }

export default PlantDetail;