import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Alert } from "../../components/";
import { ErrorsTextAlert } from "../../constants/";
import { useGetRequest } from "../../hooks";
import { validateUrl } from "../../utils";

import "./styles.css";

export default function HomePage() {
  const [inputField, setInputField] = useState<string>("");
  const [shortCode, setShortCode] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const [errors, setErrors] = useState<Array<String>>([]);

  const { data: response } = useGetRequest(
    `s?real_url=${encodeURIComponent(inputField)}`
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (validateUrl(inputField) === false) {
      setInputField("");
      return setErrors([...errors, ErrorsTextAlert.invalidLink]);
    } else if (inputField === "") {
      return setErrors([...errors, ErrorsTextAlert.invalidField]);
    } else if (!!response?.data === false) {
      return;
    }

    setErrors([]);

    const { short_code } = response?.data;

    setShortCode(short_code);

    setInputField(`https://shortly.cloud/c/${short_code ?? null}`);

    setClicked(true);
  }

  function copyToClipboard() {
    return navigator.clipboard.writeText(inputField);
  }

  useEffect(() => {
    localStorage.setItem("@recent-url-shorted", inputField);
  }, [inputField]);

  return (
    <div>
      <img
        alt="logo"
        className="shortly-logo"
        src="https://i.imgur.com/IPy0h87.png"
        title="ShortLy_logo"
      />
      {errors.length !== 0 && (
        <Alert isError content={`${errors[errors.length - 1]}`} />
      )}

      {clicked && (
        <Alert content="Clique no botão copiar para utilizar a URL encurtada" />
      )}
      <div className="container" style={{ height: 32 }}></div>
      <div className="container">
        <div className="style_card_apresentacao padding">
          <h2 id="text-info" className="text-center">
            {clicked ? `URL encurtada ✔️` : `Cole a URL para ser encurtada`}
          </h2>

          <form onSubmit={handleSubmit}>
            <div id="input-container" className="input-group">
              <input
                id="input-url"
                type="text"
                className="form-control"
                placeholder="Cole o link aqui"
                aria-label="Cole o link aqui"
                aria-describedby="button-addon2"
                value={inputField}
                disabled={clicked}
                onChange={(event) => setInputField(event.target.value)}
              ></input>
              <div className="input-group-append padding-top">
                {clicked ? (
                  <button
                    id="button-flex"
                    type="button"
                    className="btn btn-success"
                    onClick={copyToClipboard}
                  >
                    Copiar URL
                  </button>
                ) : (
                  <button id="button-flex" type="submit" className="btn btn-primary button-url">
                    Encurtar URL
                  </button>
                )}
              </div>
            </div>
          </form>
          {clicked && (
            <div className="row">
              <p className="text-url">
                O Encurtador de URL permite diminuir um link longo tornando-o
                fácil de lembrar Após encurtar a URL, é possível saber{" "}
                <Link to={`/click/${shortCode}`}>
                  quantos cliques ela recebeu
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-5">
        <div className="container mb-5">
          <div className="row">
            <div className="col-sm">
              <img
                src="https://i.ibb.co/h79nxr8/1.png"
                alt="easy-and-intuitive"
              />
              <p className="mt-3">FÁCIL E INTUITIVO</p>
              <p className="text-justify text-size mb-5">
                Domínio fácil e intuitivo de se memorizar e usar, tornando os
                seus links encurtados mais amigáveis para se compartilhar e
                facilitando o engajamento da sua audiência.
              </p>
            </div>
            <div className="col-sm">
              <img src="https://i.ibb.co/nmKqsbv/2.png" alt="secure-links" />
              <p className="mt-3">LINKS SEGUROS</p>
              <p className="text-justify text-size mb-5">
                Todas as suas URLs encurtadas são criptografas por padrão,
                tornandos as mais seguras através de certif icados de segurança
                (HTTPS) consolidados no mercado.
              </p>
            </div>
            <div className="col-sm">
              <img src="https://i.ibb.co/7vxRz2y/3.png" alt="simplify" />
              <p className="mt-3">FEITO PARA SIMPLIFICAR</p>
              <p className="text-justify text-size mb-5">
                Tendo como objetivo principal encurtar links, nós focamos na
                melhor experiência possível para que você consiga encurtá-los da
                maneira mais simples e rápida possível.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
