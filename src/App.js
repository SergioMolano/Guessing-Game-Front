import React, { useState } from 'react';

const App = () => {
  // Variables de estado
  const [responseText, setResponseText] = useState('');
  const [attemptsText, setAttemptsText] = useState('');

  // Manejo de click
  const checkGuess = () => {
    const userValue = Number(document.getElementById('guess').value);
    const baseUrl = 'http://localhost:8080/adivinar/';
    const guessUrl = `${baseUrl}${userValue}`;

    // Fetch request 
    fetch(guessUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setResponseText(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    const baseUrlIntentos = 'http://localhost:8080/intentos';

    // Fetch request 
    fetch(baseUrlIntentos)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        const attemptsText = `El número de intentos realizados es: ${data}`;
        setAttemptsText(attemptsText);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Manejo de click
  const newGame = () => {
    const nueGameUrl = 'http://localhost:8080/nuevo';

    // Fetch request 
    fetch(nueGameUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        setResponseText("");
        setAttemptsText("");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Juego de Adivinanza de Números</h1>
      <p>Adivina un número entre 1 y 100</p>
      <input type="number" id="guess" min="1" max="100" />
      <button id="submit" onClick={checkGuess}>
        Enviar
      </button>
      <p id="hint">{responseText}</p>
      <p id="attempts">{attemptsText}</p>
      <button id="nuevo" onClick={newGame}>
        Nuevo Juego
      </button>
    </div>
  );
};

export default App;
