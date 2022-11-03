import React, { useState } from "react";

function CreateDog(){
    let baseData = {
        name: "simba",
        gender: "",
        breed: "",
        image_url: "",
        size: "Big",
        age: 0
    }
    const [formData, setFormData] = useState(baseData)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.id]:e.target.value})
        // console.log(formData)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData)
        setIsLoading(true);
        fetch("/dogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((dog) => {
                console.log(dog.user.username)
                setErrors([])});
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br/>
                
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    id="breed"
                    autoComplete="off"
                    value={formData.breed}
                    onChange={handleChange}
                />
                <br/>
                
                <label htmlFor="imageUrl">Image Link</label>
                <input
                    type="text"
                    id="image_url"
                    autoComplete="off"
                    value={formData.image_url}
                    onChange={handleChange}
                />
                <br/>

                <label htmlFor="age">Age</label>
                <input
                    type="text"
                    id="age"
                    autoComplete="off"
                    value={formData.age}
                    onChange={handleChange}
                />
                <br/>
                
                <select id='size' onChange={handleChange} >
                    <option>What is the size of your dog</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Big">Big</option>
                </select>
                <br/>

                <select id='gender' onChange={handleChange} >
                    <option>What is the gender of your dog</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <br/>

                
                <button variant="fill" color="primary" type="submit">
                    {isLoading ? "Loading..." : "Create Dog Profile"}
                </button>
                <br/>
                
                {errors.map((err) => (
                    <h5 key={err}>{err}</h5>
                ))}
                <br/>
            </form>
        </>
    );
}

export default CreateDog;