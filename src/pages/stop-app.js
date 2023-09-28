import React, { useState, useEffect } from 'react';

const AbecedarioComponent = () => {
  const [letras, setLetras] = useState([]);
  const [letraActual, setLetraActual] = useState('');
  const [letrasUsadas, setLetrasUsadas] = useState([]);

  // Función para generar una letra aleatoria que no haya sido usada previamente
  const generarLetraAleatoria = () => {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasDisponibles = [...abecedario].filter(letra => !letrasUsadas.includes(letra));
    
    if (letrasDisponibles.length === 0) {
      // Si se han usado todas las letras, reiniciar
      setLetrasUsadas([]);
    } else {
      const letraAleatoria = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
      setLetraActual(letraAleatoria);
      setLetrasUsadas([...letrasUsadas, letraAleatoria]);
    }
  };

  // Generar la primera letra al iniciar el componente
  useEffect(() => {
    generarLetraAleatoria();
  }, []);


  return (
    <div>
      <h1>Letra actual: {letraActual}</h1>
      <button onClick={generarLetraAleatoria}>Generar letra</button>
    </div>
  );
};

export default AbecedarioComponent;
