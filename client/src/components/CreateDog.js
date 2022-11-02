import React, { useState } from "react";

function CreateDog({user}){
    let baseData = {
        user_id: user,
        is_adopted: false,
        name: "",
        gender: "",
        breed: "",
        image_url: "",
        size: "",
        age: 0
    }
    const [formData, setFormData] = useState(baseData)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e){
        setFormData({...formData, [e.target.id]:e.target.value})
        console.log(formData)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((data) => console.log(data));
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

                <label htmlFor="gender">Gender</label>
                <input
                    type="text"
                    id="gender"
                    autoComplete="off"
                    value={formData.gender}
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
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="big">Big</option>
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