import { useState } from 'react';
import '../App.css'

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [count, setCount] = useState(0)

  const convertToAge = (date) => {
    const dob = new Date(date);
    const currentDate = new Date();
    
    let age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    } else {
      return age;
    }
};

  const regex = /\d/; //validate nums
  const regex2 = /\D/; //validate alphabet letters

  const handleUserNameBlur = () => {
    if (userName.length >= 8 && !regex.test(userName)){
      alert(`${userName} cannot be used, Username must includes numbers!`);
    } else if (userName.length >= 8 && !regex2.test(userName)){
      alert(`${userName} cannot be used, Username must includes alphabet!`);
    }
  };

  const handlePasswordBlur = () => {
    if (password.length >= 8 && !regex.test(password)){
      alert(`${password} cannot be used, Password must includes numbers!`);
    } else if (password.length >= 8 && !regex2.test(password)){
      alert(`${password} cannot be used, Password must includes alphabet!`);
    }
  };

  const handleCount = () =>{
    setCount(count + 1);
  }

  String.prototype.hashCode = function() {
    let hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  const submitForm = () => {
    const user = {
      firstName,
      lastName,
      userName,
      password: password.hashCode(),
      age: convertToAge(dateOfBirth),
    };

    if (user.firstName != null && user.lastName != null && 
      user.userName != null && user.password != 0 && !user.age.isNan){
      handleCount();
      alert(`Congrats ${user.firstName}! You have been successfully registered!`)
    } else {
      alert('Please fill your information to complete your registration!');
    }

    console.log('Submitted user:', user);

    // Reset state or perform any other actions after submission
    setFirstName('');
    setLastName('');
    setUserName('');
    setPassword('');
    setDateOfBirth('');
  };

  return (
    <div>
      <h1>Divider</h1>
      <div className='card'>Total registry: {count}</div>

      <label htmlFor="fname">First name:</label>
      <br />
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder="Your first name: ex. John"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label htmlFor="lname">Last name:</label>
      <br />
      <input
        type="text"
        id="lname"
        name="lname"
        placeholder="Your last name: ex. Wick"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label htmlFor="uname">Username:</label>
      <br />
      <input
        type="text"
        id="uname"
        name="uname"
        placeholder="Your username: must be characters & numbers"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onBlur={handleUserNameBlur}
      />
      <br />
      <label htmlFor="fname">Password:</label>
      <br />
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Your password: must be at least 8 characters and numbers"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handlePasswordBlur}
      />
      <br />
      <label htmlFor="fname">Date of Birth:</label>
      <br />
      <input
        type="date"
        id="dob"
        name="dob"
        placeholder="Your date of birth"
        value={firstName}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <br />

      <button type="submit" onClick={submitForm}>
        Register
      </button>
    </div>
  );
}

export default RegistrationForm;