

export default function ExperienceDropDown() {

    const [experience, setExperience] = useState("");

    return (
        <div className="relative w-full lg:max-w-sm">

            <div className="grid justify-items-center">
              <select onChange={(event) => setExperience({experience: event.target.value})}
              
              className="mx-auto w-4/6 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>Please select an option:</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Experienced Gym Goer</option>
              </select>
            </div>

        </div>
    )}