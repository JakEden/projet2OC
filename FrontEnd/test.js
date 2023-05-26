const loginForm = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const loginData = {
    email: emailInput,
    password: passwordInput
  };
  console.log(login)

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      // Connection is confirmed, redirect to home page
      window.location.href = 'index.html';
    } else {
      // Display error message
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Incorrect email or password';
      loginForm.appendChild(errorMessage);
    }
  } catch (error) {
    console.log('Error:', error);
  }
}





// const loginForm = document.querySelector('form');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');

// loginForm.addEventListener('submit', fetchHandler);

// const loginData = {
//     email: emailInput,
//     password: passwordInput
//   };

// async function fetchHandler (){
//     try {
//         const response = await fetch('http://localhost:5678/api/users/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(loginData)
//         });
//         const dataResponse = await response.json();
//         setDAta(dataResponse);
//       } catch (error) {
//         console.log('Error:', error);
//       }
//     };