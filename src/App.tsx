import React, { useState } from 'react'

import './App.css'

import Copy from './assets/copy.svg'

function App() {
  const [password, setPassword] = useState('');
  const [charactersLength, setCharactersLength] = useState(4);
  const [level, setLevel] = useState('');
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  
  const handleUpperCase = () => {
    setUpperCase(!upperCase);
  }

  const handleLowerCase = () => {
    setLowerCase(!lowerCase);
  }

  const handleNumbers = () => {
    setNumbers(!numbers);
  }

  const handleSymbols = () => {
    setSymbols(!symbols);
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
  }

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const symbols = '!@#$%^&*()_+{}|:"<>?';


    let validChars = '';
    if (upperCase) validChars += upper;
    if (lowerCase) validChars += lower;
    if (numbers) validChars += number;
    if (symbols) validChars += symbols;

    
    let generatedPassword = '';
    for (let i = 0; i < charactersLength; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[index];
    }

    setPassword(generatedPassword);
    verifyStrength();
  }

  const verifyStrength = () => {
    if (password.length <= 7) {
      setLevel('Weak')
    }
    if (password.length >= 8 && password.length <= 14 && (upperCase || symbols || numbers)) {
      setLevel('Medium')
    }

    if (password.length >= 17 && (upperCase && lowerCase && numbers && symbols)) {
      setLevel('Strong')
    }
  }

  return (
      <div className="main">
        <h1>Gerador de senhas</h1>
        <div className="copyPass">
          {/*<input className='passInput'  type="text" value={password} onChange={()=>setPassword}/>*/}
          <p>{password}</p>
          <img src={Copy} alt="copy" title='Copiar senha?' onClick={handleCopyPassword}/>    
        </div>
        <div className="optPass">
          <div className="optHead">
            <p>Quantidade de Caracteres</p>
            <label>{charactersLength}</label>
          </div>
          <input className='range' type="range" min="4" max="20" step="1" value={charactersLength} onChange={(e) => setCharactersLength(Number(e.target.value))} />
          <div className="boxes">
            <div className="box">
              <input type="checkbox" onChange={handleUpperCase}/>
              <label>Incluir letras Maiúsculas</label>
            </div>
            <div className="box">
              <input type="checkbox" onChange={handleLowerCase}/>
              <label>Incluir letras Minúsculas</label>
            </div>
            <div className="box">
              <input type="checkbox" onChange={handleNumbers}/>
              <label>Incluir números</label>
            </div>
            <div className="box">
              <input type="checkbox" onChange={handleSymbols}/>
              <label>Incluir símbolos</label>
            </div>

          </div>
          <div className="level">
            <p>Level</p>
            <div className="strength-bar">
              <p className="category">{level}</p>
              <div className="strength-bar-fill"></div>
            </div>
          </div>
          {
            upperCase || lowerCase || numbers || symbols ?
              <button className="generate-password" onClick={generatePassword}><p>Generate</p></button> 
            :
              <button className="generate-password" onClick={generatePassword} disabled><p>Generate</p></button>
          }
          
        </div>
        { !(upperCase || lowerCase || numbers || symbols) ? 
          <p className='validation'>Selecione ao menos uma opção!</p> 
        : 
          null }
      </div>
    )
}

export default App